from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import io
import sys
import threading

app = FastAPI(
    title="OmniScope Notebook API",
    description="Backend for executing notebook code cells",
    version="0.1"
)

# Enable CORS for local React dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage of execution namespaces per session
_sessions: dict[str, dict] = {}
_sessions_lock = threading.Lock()

class ExecuteRequest(BaseModel):
    session_id: str
    code: str

class ExecuteResponse(BaseModel):
    output: str

@app.get("/", tags=["General"])
def read_root():
    """Health check endpoint."""
    return {"message": "OmniScope Notebook API is running. Visit /docs for details."}

@app.post("/execute", response_model=ExecuteResponse, tags=["Execution"])
def execute_code(req: ExecuteRequest):
    """
    Execute Python code in the context of the given session.
    Captures stdout output and last-expression evaluation.
    """
    # Initialize namespace for new session
    with _sessions_lock:
        if req.session_id not in _sessions:
            _sessions[req.session_id] = {}
    ns = _sessions[req.session_id]

    # Capture stdout
    buffer = io.StringIO()
    old_stdout = sys.stdout
    sys.stdout = buffer
    result = None

    try:
        # Split code into lines
        lines = req.code.splitlines()
        if not lines or req.code.strip() == "":
            return ExecuteResponse(output="")

        # If single-line, try eval first
        if len(lines) == 1:
            try:
                result = eval(req.code, ns)
            except SyntaxError:
                exec(req.code, ns)
        else:
            # Execute all but last line
            exec("\n".join(lines[:-1]), ns)
            # Evaluate or exec the last line
            try:
                result = eval(lines[-1], ns)
            except SyntaxError:
                exec(lines[-1], ns)

        # Print the result of last expression if present
        if result is not None:
            print(result)

    except Exception as e:
        # Restore stdout before raising
        sys.stdout = old_stdout
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        # Restore stdout
        sys.stdout = old_stdout

    # Return captured output
    output = buffer.getvalue()
    return ExecuteResponse(output=output)
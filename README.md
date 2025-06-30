# OmniScope-Assessment

This repository contains the backend and frontend components for the OmniScope notebook interface.

## 📁 Project Structure

```
OmniScope-Assessment/
├── backend/            # FastAPI backend service
├── frontend_static/    # Static HTML frontend
├── requirements.txt    # Python dependencies for backend
└── .gitignore          # Excludes .venv/, __pycache__/, etc.
```

---

## 🛠 Prerequisites

* **Python**: 3.10 or higher
* **pip**: Included with Python
---

## ⚙️ Backend Setup (FastAPI)

1. **Create and activate a virtual environment**

   ```bash
   cd backend
   python -m venv .venv    # create venv

   # Windows:
   .\.venv\Scripts\activate

   # macOS/Linux:
   source .venv/bin/activate
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Start the API server**

   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

   The backend will be available at:
   [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🌐 Frontend Setup (Static)

1. Open a new terminal window and navigate to the frontend folder:

   ```bash
   cd frontend_static
   ```

2. Serve the static HTML:

   ```bash
   python -m http.server 8001
   ```

3. Open your browser to view the notebook interface:

   ```
   [http://localhost:8001]
   ```



````

---

## 🎨 Features

- **Markdown Cells**: Write rich text using Markdown and render instantly.
- **Code Cells**: Execute Python code on the server, showing `print()` output and the result of the last expression.

---

## 📝 Usage

1. **Add a Markdown Cell**  
   Click **Add Markdown Cell**, type your Markdown, and press **Render Markdown**.

2. **Add a Code Cell**  
   Click **Add Code Cell**, enter Python code, and press **Run Code**.

3. **View Output**  
   The output appears directly beneath the code editor.

**Example Code Cell:**

```python
x = 1
y = 2
print(f"x = {x}")
print(f"y = {y}")
x + y  # returns 3
````

---


import { v4 as uuidv4 } from 'uuid';

const BASE = 'http://localhost:8000';

export function getSessionId() {
  let id = localStorage.getItem('session_id');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('session_id', id);
  }
  return id;
}

export async function execute(code) {
  const res = await fetch(`${BASE}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: getSessionId(), code }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  const data = await res.json();
  return data.output;
}
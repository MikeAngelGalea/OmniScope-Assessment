import React, { useState, useEffect } from 'react';
import { execute } from '../api';

export default function CodeCell({ initial, onChange, onRun, output }) {
  const [code, setCode] = useState(initial);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    onChange(code);
  }, [code]);

  const run = async () => {
    setRunning(true);
    try {
      const out = await execute(code);
      onRun(out);
    } catch (err) {
      onRun(err.message);
    }
    setRunning(false);
  };

  return (
    <div>
      <textarea
        style={{ width: '100%', height: 100 }}
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button onClick={run} disabled={running}>
        {running ? 'Running…' : 'Run'}
      </button>
      <pre style={{ background: '#f7f7f7', padding: 10, marginTop: 10 }}>
        {output}
      </pre>
    </div>
  );
}
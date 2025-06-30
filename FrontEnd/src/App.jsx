import React, { useState } from 'react';
import MarkdownCell from './components/MarkdownCell';
import CodeCell from './components/CodeCell';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [cells, setCells] = useState([]);

  const addCell = (type) => {
    setCells([...cells, { id: uuidv4(), type, content: '', output: '' }]);
  };

  const updateCell = (id, updates) => {
    setCells(cells.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>OmniScope Notebook</h1>
      <button onClick={() => addCell('markdown')}>Add Markdown</button>
      <button onClick={() => addCell('code')}>Add Code</button>

      {cells.map(cell => (
        <div key={cell.id} style={{ marginTop: 20 }}>
          {cell.type === 'markdown' ? (
            <MarkdownCell
              initial={cell.content}
              onChange={text => updateCell(cell.id, { content: text })}
            />
          ) : (
            <CodeCell
              initial={cell.content}
              onChange={code => updateCell(cell.id, { content: code })}
              onRun={output => updateCell(cell.id, { output })}
              output={cell.output}
            />
          )}
        </div>
      ))}
    </div>
  );
}
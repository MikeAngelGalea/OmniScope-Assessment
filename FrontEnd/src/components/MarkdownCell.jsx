import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

export default function MarkdownCell({ initial, onChange }) {
  const [text, setText] = useState(initial);
  const [html, setHtml] = useState('');

  useEffect(() => {
    onChange(text);
  }, [text]);

  return (
    <div>
      <textarea
        style={{ width: '100%', height: 100 }}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => setHtml(marked(text))}>Render</button>
      <div
        style={{ border: '1px solid #ddd', padding: 10, marginTop: 10 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
import React, { useState, useEffect } from 'react';

function LifecycleDemo({ name }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted - ' + name);
    document.title = `${name} | React Demo`;
    return () => {
      console.log('Component unmounting - ' + name);
    };
  }, []);

  useEffect(() => {
    console.log('Count updated to:', count);
  }, [count]);

  return (
    <div style={{ fontFamily: 'Georgia, serif', border: '1px solid #ccc', padding: '16px', borderRadius: '8px', margin: '10px' }}>
      <h3>{name}</h3>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 16px' }}>Increment</button>
      <p style={{ fontSize: '12px', color: '#555' }}>Check browser console for lifecycle logs.</p>
    </div>
  );
}

export default LifecycleDemo;

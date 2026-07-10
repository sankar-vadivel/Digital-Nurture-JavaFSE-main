import React, { useState } from 'react';
import LifecycleDemo from './components/LifecycleDemo';

function App() {
  const [showSecond, setShowSecond] = useState(true);
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '24px', backgroundColor: '#f8fafc' }}>
      <h1 style={{ color: '#0f172a' }}>React Lifecycle Explorer</h1>
      <LifecycleDemo name="Primary Module" />
      <button onClick={() => setShowSecond(s => !s)} style={{ margin: '12px 0', padding: '10px 20px', borderRadius: '6px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>
        {showSecond ? 'Unmount' : 'Mount'} Secondary Module
      </button>
      {showSecond && <LifecycleDemo name="Secondary Module" />}
    </div>
  );
}
export default App;

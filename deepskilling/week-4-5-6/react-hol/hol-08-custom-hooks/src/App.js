import React, { useState } from 'react';
import useFetch from './components/useFetch';

// HOL 8: Custom Hooks
function App() {
  const [userId, setUserId] = useState(1);
  const { data: user, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const { data: posts, loading: postsLoading } = useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=5`);

  return (
    <div style={{ fontFamily: 'Verdana, sans-serif', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>HOL 8 – Custom Hooks</h1>
      <div style={{ marginBottom: '16px' }}>
        <label>User ID (1-10): </label>
        <input type="range" min="1" max="10" value={userId} onChange={e => setUserId(Number(e.target.value))} style={{ margin: '0 10px' }} />
        <strong>{userId}</strong>
      </div>
      {loading ? <p>Loading user...</p> : error ? <p style={{ color: '#e74c3c' }}>{error}</p> : user && (
        <div style={{ background: '#e0f2fe', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
          <h3>{user.name}</h3>
          <p>📧 {user.email} | 📞 {user.phone}</p>
        </div>
      )}
      <h3>Posts:</h3>
      {postsLoading ? <p>Loading...</p> : (
        <ul>{(posts || []).map(p => <li key={p.id}>{p.title}</li>)}</ul>
      )}
    </div>
  );
}
export default App;

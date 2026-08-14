import { useState, useEffect } from 'react';

export default function App() {
  const [status, setStatus] = useState('Connecting to backend...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.message))
      .catch((err) => setStatus('Backend connection failed: ' + err.message));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>🚀 Hackathon Unified JS App</h1>
      <p>Progressive Web App (PWA) template ready for rapid coding! testing </p>
      <div style={{ padding: '1rem', background: '#f0f0f0', borderRadius: '8px', display: 'inline-block' }}>
        <strong>Backend Status:</strong> {status}
      </div>
    </div>
  );
}

import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const res = await fetch('https://a18b-35-247-182-8.ngrok-free.app/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('Failed to generate image');
      const data = await res.json();
      if (data.image_base64) {
        setImageUrl('data:image/png;base64,' + data.image_base64);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Batman POV Image Generator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={4}
          style={{ width: '100%', fontSize: 16 }}
          placeholder="Describe your Batman POV scene..."
          required
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      {imageUrl && (
        <div>
          <h2>Result</h2>
          <img src={imageUrl} alt="Generated Batman POV" style={{ width: '100%', borderRadius: 8, boxShadow: '0 2px 12px #0008' }} />
        </div>
      )}
    </div>
  );
}

export default App; 
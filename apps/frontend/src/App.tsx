import { useState } from 'react';
import './App.css';

function App() {
  const [pdf1, setPdf1] = useState<File | null>(null);
  const [pdf2, setPdf2] = useState<File | null>(null);
  const [diff, setDiff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (f: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdf1 || !pdf2) {
      setError('Please select both PDF files.');
      return;
    }
    setLoading(true);
    setError('');
    setDiff([]);
    const formData = new FormData();
    formData.append('pdf1', pdf1);
    formData.append('pdf2', pdf2);
    try {
      const res = await fetch('http://localhost:3001/diff', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.diff) {
        setDiff(data.diff);
      } else {
        setError('No diff found.');
      }
    } catch (err) {
      setError('Failed to get diff.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>PDF Diff App</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>PDF 1: <input type="file" accept="application/pdf" onChange={e => handleFileChange(e, setPdf1)} /></label>
        </div>
        <div>
          <label>PDF 2: <input type="file" accept="application/pdf" onChange={e => handleFileChange(e, setPdf2)} /></label>
        </div>
        <button type="submit" disabled={loading}>Compare</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>Loading...</div>}
      <div style={{ textAlign: 'left', marginTop: 20 }}>
        {diff.length > 0 && diff.map((part, idx) => (
          <span key={idx} style={{ background: part.added ? '#d4fcbc' : part.removed ? '#ffecec' : 'none', color: part.added ? 'green' : part.removed ? 'red' : 'black' }}>
            {part.value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;

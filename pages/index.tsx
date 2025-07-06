import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, slug: customSlug }),
    });

    const data = await res.json();
    if (res.ok) setShortUrl(data.shortUrl);
    else alert(data.error);
  };

  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Slice.ly ✂️</h1>

      <input
        placeholder="Paste a long URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-80"
      />
      <br />
      <input
        placeholder="Custom slug (optional)"
        value={customSlug}
        onChange={(e) => setCustomSlug(e.target.value)}
        className="border p-2 w-80 mt-2"
      />
      <br />
      <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={handleShorten}>
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-4">
          <p>Your short URL:</p>
          <a href={shortUrl} className="text-blue-600 underline" target="_blank">{shortUrl}</a>
        </div>
      )}
    </main>
  );
}

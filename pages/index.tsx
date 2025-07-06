import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function Home() {
  const [scissorsAnim, setScissorsAnim] = useState<Record<string, unknown> | null>(null);
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  useEffect(() => {
    fetch('/scissors.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load scissors.json');
        return res.json();
      })
      .then(setScissorsAnim)
      .catch((err) => {
        console.error('Error loading scissors.json:', err);
        setScissorsAnim(null);
      });
  }, []);

  const handleShorten = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (!url) {
      alert('Please enter a URL.');
      return;
    }
    try {
      console.log('Sending URL:', url, 'Slug:', customSlug); // ✅ debug log
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, slug: customSlug }),
      });
      const data = await res.json();
      console.log('Response:', data); // ✅ debug log
      if (res.ok) {
        setShortUrl(data.shortUrl);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      alert('Network error.');
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white overflow-hidden">
      {/* 🎬 Animated Scissors (multiple) */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        {/* Show error if animation failed to load */}
        {!scissorsAnim && (
          <div className="absolute top-0 left-0 w-full text-center text-red-500 text-xs">Scissors animation failed to load</div>
        )}
        {scissorsAnim && (
          <>
            <Lottie
              animationData={scissorsAnim}
              loop
              style={{ width: '120px', height: '120px' }}
              className="opacity-50 absolute top-10 left-10 animate-float hover:scale-110 transition duration-300"
            />
            <Lottie
              animationData={scissorsAnim}
              loop
              style={{ width: '100px', height: '100px' }}
              className="opacity-50 absolute bottom-16 left-1/2 animate-float-delayed hover:scale-110 transition duration-300"
            />
            <Lottie
              animationData={scissorsAnim}
              loop
              style={{ width: '80px', height: '80px' }}
              className="opacity-50 absolute top-1/2 right-10 animate-float-slow hover:scale-110 transition duration-300"
            />
          </>
        )}
      </div>

      {/* ✨ UI Container */}
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">Slice.ly ✂️</h1>

        <input
          placeholder="Paste a long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500"
        />

        <input
          placeholder="Custom slug (optional)"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-500"
        />

        <button
          onClick={handleShorten}
          className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-yellow-600 transition"
        >
          Slice it!
        </button>

        {shortUrl && (
          <div className="mt-6 text-blue-800 font-medium">
            <p>Your short URL:</p>
            <a href={shortUrl} className="underline" target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

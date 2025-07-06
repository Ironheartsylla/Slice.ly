import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');


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
      {/* 🎬 Animated Scissors (SVG, custom) */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          // Randomize size, position, and opacity for each SVG
          const sizes = [
            'w-10 h-10', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20', 'w-24 h-24', 'w-28 h-28', 'w-32 h-32',
          ];
          const tops = [
            'top-2', 'top-10', 'top-20', 'top-1/3', 'top-1/2', 'top-3/4', 'top-0', 'top-16', 'top-24', 'top-32', 'top-40', 'top-52'
          ];
          const lefts = [
            'left-2', 'left-10', 'left-1/4', 'left-1/2', 'left-3/4', 'left-0', 'left-16', 'left-24', 'left-32', 'left-40', 'left-52', 'right-2', 'right-10', 'right-16', 'right-24', 'right-32', 'right-40', 'right-52'
          ];
          const opacities = ['opacity-30', 'opacity-40', 'opacity-50', 'opacity-60', 'opacity-70'];
          const anims = ['animate-float', 'animate-float-delayed', 'animate-float-slow'];
          // Pick random values for each
          const size = sizes[Math.floor(Math.random() * sizes.length)];
          const top = tops[Math.floor(Math.random() * tops.length)];
          const left = lefts[Math.floor(Math.random() * lefts.length)];
          const opacity = opacities[Math.floor(Math.random() * opacities.length)];
          const anim = anims[Math.floor(Math.random() * anims.length)];
          // Random rotation
          const rotate = `rotate(${Math.floor(Math.random() * 360)}deg)`;
          return (
            <svg
              key={i}
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${size} absolute ${top} ${left} ${opacity} ${anim}`}
              style={{ pointerEvents: 'none', transform: rotate }}
            >
              <circle cx="20" cy="20" r="10" stroke="#e11d48" strokeWidth="4" fill="#fff" />
              <circle cx="44" cy="44" r="10" stroke="#f59e42" strokeWidth="4" fill="#fff" />
              <rect x="18" y="18" width="28" height="8" rx="4" fill="#e11d48" transform="rotate(45 32 22)" />
              <rect x="18" y="38" width="28" height="8" rx="4" fill="#f59e42" transform="rotate(-45 32 42)" />
              <circle cx="32" cy="32" r="3" fill="#f59e42" />
            </svg>
          );
        })}
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

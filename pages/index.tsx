import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [sliceEffect, setSliceEffect] = useState(false); // 🚀 for flying scissor

  const handleShorten = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (!url) {
      alert('Please enter a URL.');
      return;
    }
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, slug: customSlug }),
      });
      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.shortUrl);
        // ✂️ Trigger slice effect
        setSliceEffect(true);
        setTimeout(() => setSliceEffect(false), 1000);
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
      {/* ✂️ Random Floating Scissors */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => {
          const sizes = ['w-10 h-10', 'w-12 h-12', 'w-16 h-16'];
          const tops = ['top-2', 'top-10', 'top-20', 'top-1/3', 'top-1/2', 'top-3/4'];
          const sides = ['left-2', 'left-10', 'left-1/4', 'left-1/2', 'right-2', 'right-10', 'right-1/4'];
          const opacities = ['opacity-30', 'opacity-40', 'opacity-50'];
          const anims = ['animate-float', 'animate-float-left', 'animate-float-right', 'animate-float-diagonal'];

          const size = sizes[Math.floor(Math.random() * sizes.length)];
          const top = tops[Math.floor(Math.random() * tops.length)];
          const side = sides[Math.floor(Math.random() * sides.length)];
          const opacity = opacities[Math.floor(Math.random() * opacities.length)];
          const anim = anims[Math.floor(Math.random() * anims.length)];
          const rotate = `rotate(${Math.floor(Math.random() * 360)}deg)`;

          return (
            <img
              key={i}
              src="/scissors.svg"
              alt="Scissors"
              className={`${size} absolute ${top} ${side} ${opacity} ${anim}`}
              style={{
                pointerEvents: 'none',
                transform: rotate,
              }}
            />
          );
        })}
      </div>

      {/* ✂️ Flying Scissors Animation on Click */}
      {sliceEffect &&
        [...Array(3)].map((_, i) => (
          <img
            key={i}
            src="/scissors.svg"
            alt="Slicing"
            className="absolute w-12 left-1/2 top-1/2 animate-slice-zoom-fly z-50"
            style={{
              transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

      {/* 🔳 UI Box */}
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Slice.ly ✂️
        </h1>

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
            <p>Your sliced URL:</p>
            <a href={shortUrl} className="underline" target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

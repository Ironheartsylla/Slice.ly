import { useState } from 'react';
import Lottie from 'lottie-react';
import scissorsAnim from '../public/scissors.json';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');

const handleShorten = async () => {
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
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white overflow-hidden">
      {/* 🎬 Animated Scissors (multiple) */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <Lottie
          animationData={scissorsAnim}
          loop
          className="w-24 md:w-36 opacity-10 absolute top-10 left-10 animate-float hover:scale-110 transition duration-300"
        />
        <Lottie
          animationData={scissorsAnim}
          loop
          className="w-20 md:w-32 opacity-10 absolute bottom-16 left-1/2 animate-float-delayed hover:scale-110 transition duration-300"
        />
        <Lottie
          animationData={scissorsAnim}
          loop
          className="w-16 md:w-28 opacity-10 absolute top-1/2 right-10 animate-float-slow hover:scale-110 transition duration-300"
        />
      </div>

      {/* ✨ UI Container */}
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-700">Slice.ly ✂️</h1>

        <input
          placeholder="Paste a long URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          placeholder="Custom slug (optional)"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleShorten}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
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

import React from 'react';

export default function DistanceVisual({ name1, name2, loc1, loc2, km, mi }) {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:to-slate-900">
      {/* Globe glow */}
      <div className="absolute w-80 h-80 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="z-10 p-6 max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {name1} <span role="img" aria-label="heart">💖</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You and {name2} are doing amazing <span role="img" aria-label="globe">🌍</span>
          <br />
          From <strong>{loc1}</strong> to <strong>{loc2}</strong>
        </p>

        <div className="my-6 relative w-full h-[120px]">
          {/* SVG arc with plane */}
          <svg viewBox="0 0 300 120" className="w-full h-full" fill="none">
            <circle cx="30" cy="100" r="5" fill="#e11d48" />
            <circle cx="270" cy="100" r="5" fill="#e11d48" />
            <path d="M30 100 Q150 10 270 100" stroke="#9333ea" strokeWidth="2" strokeDasharray="4" fill="transparent" />
            <circle r="8" fill="#10b981">
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath href="#arcPath" />
              </animateMotion>
            </circle>
            <path id="arcPath" d="M30 100 Q150 10 270 100" fill="transparent" />
          </svg>
        </div>

        <p className="text-lg">
          <span role="img" aria-label="pin">📍</span> You're <strong>{km} km</strong> (<strong>{mi} mi</strong>) apart.
        </p>
      </div>
    </div>
  );
}
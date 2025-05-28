import { Link } from "react-router-dom";

export default function HomeVisual({ name1, name2, loc1, loc2, km, mi }) {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:to-slate-900 text-center px-4">
      {/* Earth glow */}
      <div className="absolute w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />

      {/* Card with welcome + arc */}
      <div className="z-10 p-6 max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {name1} 💖</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You and {name2} are doing amazing 🌍
          <br />
          From <strong>{loc1}</strong> to <strong>{loc2}</strong>
        </p>

        <div className="my-6">
          <svg width="100%" height="120" viewBox="0 0 300 120" fill="none">
            <circle cx="30" cy="100" r="5" fill="#e11d48" />
            <circle cx="270" cy="100" r="5" fill="#e11d48" />
            <path
              d="M30 100 Q150 10 270 100"
              stroke="#9333ea"
              strokeWidth="2"
              strokeDasharray="4"
              fill="transparent"
              className="animate-pulse"
            />
          </svg>
        </div>

        <p className="text-lg">
          📍 You're <strong>{km} km</strong> ({mi} mi) apart.
        </p>
      </div>

      {/* Grid of blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        <Link to="/dashboard" className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-4 rounded-xl shadow text-lg font-medium transition">
          Our Notes
        </Link>
        <div className="bg-pink-100 hover:bg-pink-200 text-pink-800 p-4 rounded-xl shadow text-lg font-medium transition">
          📸 Photo Memories
        </div>
        <div className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-4 rounded-xl shadow text-lg font-medium transition">
          🌟 Bucket List
        </div>
      </div>
    </div>
  );
}
export default function HomeVisual({ name1, name2, loc1, loc2, km, mi }) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:to-slate-900 text-center">
      {/* Globe glow */}
      <div className="absolute w-80 h-80 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="z-10 p-6 max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {name1} 💖
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You and {name2} are doing amazing 🌍
          <br />
          From <strong>{loc1}</strong> to <strong>{loc2}</strong>
        </p>

        <div className="my-6">
          {/* SVG ARC */}
          <svg width="100%" height="120" viewBox="0 0 300 120" fill="none">
            <circle cx="30" cy="100" r="5" fill="#e11d48" />
            <circle cx="270" cy="100" r="5" fill="#e11d48" />
            <path
              d="M30 100 Q150 10 270 100"
              stroke="#9333ea"
              strokeWidth="2"
              strokeDasharray="4"
              fill="transparent"
            />
          </svg>
        </div>

        <p className="text-lg">
          📍 You're <strong>{km} km</strong> ({mi} mi) apart.
        </p>
      </div>
    </div>
  );
}
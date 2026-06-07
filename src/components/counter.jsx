import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-white">

      <p className="text-sm text-gray-400 uppercase tracking-widest">Count</p>

      <h1 className={`text-8xl font-medium transition-colors duration-200 ${
        count > 0 ? "text-green-500" : "text-gray-800"
      }`}>
        {count}
      </h1>

      <div className="flex items-center gap-4">

        {count > 0 && (
          <button
            onClick={() => setCount(count - 1)}
            className="px-8 py-3 text-lg font-medium border border-red-300 text-red-500 rounded-lg hover:bg-red-50 active:scale-95 transition-all"
          >
            − Decrease
          </button>
        )}

        <button
          onClick={() => setCount(count + 1)}
          className="px-8 py-3 text-lg font-medium border border-green-300 text-green-500 rounded-lg hover:bg-green-50 active:scale-95 transition-all"
        >
          + Increase
        </button>

      </div>

      <button
        onClick={() => setCount(0)}
        className="text-sm text-gray-400 border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50 transition"
      >
        Reset
      </button>

      {count === 0 && (
        <p className="text-sm text-gray-400">Decrease button is hidden at zero</p>
      )}

    </div>
  );
}

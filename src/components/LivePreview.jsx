import { useState } from "react";

export default function LivePreview() {

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg">

        <h2 className="text-xl font-medium text-gray-800 mb-6">Live Text Preview</h2>

        <div className="mb-5">
          <label className="block text-sm text-gray-500 mb-1">
            Type something
          </label>
          <input
            type="text"
            value={text}
            onChange={handleChange}
            maxLength={200}
            placeholder="Start typing..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:border-gray-500 transition"
          />

          <p className="text-right text-xs text-gray-400 mt-1">
            <span className="font-medium text-gray-600">{text.length}</span> / 200 characters
          </p>
        </div>


        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Live preview
          </label>
          <textarea
            value={text}
            readOnly
            rows={5}
            placeholder="Your text will appear here..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-base bg-gray-50 text-gray-700 resize-none focus:outline-none"
          />
        </div>

      </div>
    </div>
  );
}
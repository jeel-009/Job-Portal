import React from "react";

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <p className="text-gray-500 text-sm text-center md:text-left">
          © 2026 Jobs Portal. All rights reserved.
        </p>

        {/* Right Links */}
        <div className="flex items-center gap-6 text-sm cursor-pointer">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Facebook
          </a>

          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-500 transition"
          >
            Google
          </a>
        </div>

      </div>
    </footer>
  );
}
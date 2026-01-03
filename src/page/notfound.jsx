import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        
        <h1 className="text-7xl font-extrabold text-gray-200 mb-4">404</h1>
        <p className="text-gray-400 mb-6">
          Halaman yang kamu cari tidak ditemukan.
        </p>

        <div className="flex flex-col gap-3 items-center">
          <Link
            to="/"
            className="w-full max-w-xs flex items-center justify-center gap-2 bg-[#111] border border-[#333] hover:bg-[#1a1a1a] transition px-4 py-3 rounded-lg"
          >
            ← Kembali ke Beranda
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full max-w-xs bg-transparent border border-[#333] px-4 py-3 rounded-lg text-gray-300 hover:bg-[#1a1a1a] transition"
          >
            ← Kembali Sebelumnya
          </button>
        </div>

      </div>
    </div>
  );
}

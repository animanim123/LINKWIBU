import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4">
      {/* LOGO DI ATAS */}
      <div className="flex justify-center pt-10 pb-6">
        <img src="/logo2.png" alt="Logo" className="max-w-[270px] w-full" />
      </div>
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-3">Ups! Kamu nyasar 😅</h1>
        <p className="text-gray-400 text-center mb-6 text-sm sm:text-sm">
          Link yang kamu buka tidak tersedia atau sudah
          tidak aktif. Coba cek lagi linknya ya.
        </p>
      </div>
    </div>
  );
};

export default App;

import React from "react";

const Pp = () => {
  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      {/* LOGO */}
      <div className="flex justify-center pb-6">
        <img src="/logo2.png" alt="Logo" className="max-w-[270px] w-full" />
      </div>

      {/* CARD */}
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-3xl mx-auto shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Privacy Policy</h1>

        <p className="text-gray-400 text-sm text-center mb-8">
          Terakhir diperbarui: 24 Mei 2026
        </p>

        <div className="space-y-6 text-gray-300 leading-7">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              Informasi Pengunjung
            </h2>

            <p>
              Website ini tidak meminta login atau pendaftaran pengguna. Namun,
              beberapa informasi dasar seperti alamat IP, jenis browser,
              perangkat, dan halaman yang dikunjungi dapat tercatat secara
              otomatis untuk keperluan keamanan dan analitik.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              Iklan Pihak Ketiga
            </h2>

            <p>
              Website ini menggunakan layanan iklan pihak ketiga dari Adsterra
              yang dapat menampilkan iklan, redirect, atau tautan promosi.
              Layanan tersebut dapat menggunakan teknologi seperti cookies atau
              tracking sesuai kebijakan mereka masing-masing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              Tautan Eksternal
            </h2>

            <p>
              Beberapa link pada website ini dapat mengarah ke situs eksternal
              yang berada di luar kendali kami. Kami tidak bertanggung jawab
              atas isi atau kebijakan privasi dari situs pihak ketiga tersebut.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              Persetujuan
            </h2>

            <p>
              Dengan menggunakan website ini, Anda dianggap telah membaca dan
              menyetujui Privacy Policy ini.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Pp;

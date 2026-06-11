import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";

export default function Step1() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    checkSlug();
  }, []);

  const checkSlug = async () => {
    const { data, error } = await supabase
      .from("link")
      .select("destination")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      setError(true);
      setLoading(false);
      return;
    }

    // simpan destination
    setDestination(data.destination);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white text-4xl flex flex-col items-center justify-center font-bold">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Link tidak ditemukan
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4">
      {/* LOGO DI ATAS */}
      <div className="flex justify-center pt-10 pb-6">
        <img src="/logo2.png" alt="Logo" className="max-w-[270px] w-full" />
      </div>
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-3">
          🚀 Siap Melanjutkan
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Klik tombol di bawah untuk membuka link tujuan anda
        </p>

        <button
          onClick={async () => {
            // ambil data views sekarang
            const { data } = await supabase
              .from("link")
              .select("views")
              .eq("slug", slug)
              .single();

            // update views + 1
            await supabase
              .from("link")
              .update({
                views: (data?.views || 0) + 1,
              })
              .eq("slug", slug);

            // redirect
            window.location.href = destination;
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Lanjutkan
        </button>

        <div className="text-xs text-gray-500 text-center mt-8">
          <p>Jika link error hubungi admin untuk meperbaikinya</p>

          <div className="flex gap-1 justify-center items-center">
            <a
              href="https://tako.id/GAZZ_DEV"
              className="text-white border-b font-semibold border-white"
            >
              Hubungi Sekarang
            </a>

            <a
              href="/privacypolicy"
              className="text-white border-b font-semibold border-white"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

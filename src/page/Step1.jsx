import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";

export default function Step1() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkSlug();
  }, []);

  const checkSlug = async () => {
    const { data } = await supabase
      .from("link")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!data) {
      setError(true);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const createToken = async () => {
    // 1. Ambil data link (id + views)
    const { data, error } = await supabase
      .from("link")
      .select("id, views")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error("Gagal ambil link");
      return;
    }

    const currentViews = data.views ?? 0;

    // 2. Update views
    await supabase
      .from("link")
      .update({ views: currentViews + 1 })
      .eq("id", data.id);
    const token = crypto.randomUUID();

    await supabase.from("step_token").insert({
      slug,
      token,
      used: false,
      expires_at: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
    });

    navigate(`/go/${slug}/open/${token}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
          🔗 Link Terkunci
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Klik tombol untuk melanjutkan
        </p>

        <button
          onClick={createToken}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Lanjutkan
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Jangan refresh halaman ini
        </p>
      </div>
    </div>
  );
}

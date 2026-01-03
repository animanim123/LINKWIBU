import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";

export default function Step3() {
  const { slug, token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    const now = new Date().toISOString(); // 🔥 WAJIB

    const { data, error } = await supabase
      .from("step_token")
      .select("*")
      .eq("slug", slug)
      .eq("token", token)
      .eq("used", false)
      .gt("expires_at", now)
      .single();

    if (error || !data) {
      navigate(`/go/${slug}`);
      return;
    }

    // 🔒 lock token (1x pakai)
    await supabase.from("step_token").update({ used: true }).eq("id", data.id);

    const { data: link } = await supabase
      .from("link")
      .select("destination")
      .eq("slug", slug)
      .single();

    setDestination(link.destination);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        {/* LOGO */}
        <img
          src="/logo2.png"
          alt="Logo"
          className="mx-auto mb-6 max-w-[270px] w-full"
        />

        <p className="text-center text-gray-400 mb-6">
          Klik tombol di bawah untuk membuka link tujuan
        </p>

        {/* BUTTON */}
        <button
          disabled={clicked}
          onClick={() => {
            setClicked(true);
            window.location.href = destination;
          }}
          className={`w-full py-3 rounded-lg font-semibold
    ${clicked ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"}`}
        >
          🚀 Buka Link Tujuan
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Terima kasih telah menunggu
        </p>
      </div>
    </div>
  );
}

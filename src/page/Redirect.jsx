import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";

export default function Redirect() {
  const { slug } = useParams();
  const [time, setTime] = useState(10);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    getLink();
  }, []);

  const getLink = async () => {
    const { data } = await supabase
      .from("link")
      .select("*")
      .eq("slug", slug)
      .single();

    if (data) {
      setUrl(data.destination);

      await supabase
        .from("link")
        .update({ views: data.views + 1 })
        .eq("id", data.id);
    }
  };

  // TIMER (JALAN TERUS SAMPAI 0)
  useEffect(() => {
    if (time === 0) return;

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  // REDIRECT / BUTTON
  useEffect(() => {
    if (time === 0 && url) {
      // window.location.href = url;
    }
  }, [time, url]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black text-center px-4">
      <h1 className="text-2xl font-bold mb-4">
        {time > 0 ? "Tunggu dulu cuy"  : "Silakan lanjutkan cuy"}
      </h1>

      {/* IKLAN */}
      <div className="my-6">
        <div id="adsterra"></div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => time === 0 && (window.location.href = url)}
        disabled={time !== 0}
        className={`mt-6 px-6 py-3 rounded-lg font-semibold text-white
    ${
      time === 0
        ? "bg-green-600 hover:bg-green-700 cursor-pointer"
        : "bg-gray-400 cursor-not-allowed"
    }`}
      >
        {time > 0 ? `Tunggu ${time} detik` : "Lanjutkan"}
      </button>

      <p className="text-gray-400 text-sm mt-4">Jangan tutup halaman ini</p>
    </div>
  );
}

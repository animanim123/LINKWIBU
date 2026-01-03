import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import supabase from "../supabase";
import Banner from "../iklan/banner.jsx";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function Step2() {
  const { slug, token } = useParams();
  const navigate = useNavigate();

  const [time, setTime] = useState(10);
  const [loading, setLoading] = useState(true);
  const [captchaOk, setCaptchaOk] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("step_token")
      .select("*")
      .eq("slug", slug)
      .eq("token", token)
      .eq("used", false)
      .gt("expires_at", now)
      .single();

    console.log("TOKEN:", data, error);

    if (!data) {
      navigate(`/go/${slug}`);
      return;
    }

    setLoading(false);
  };

  // timer
  useEffect(() => {
    if (time === 0) return;
    const t = setTimeout(() => setTime((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  const canContinue = time === 0 && captchaOk;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 text-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-2">
          ⏳ Tunggu Sebentar
        </h1>

        <p className="text-center text-gray-400 mb-4">
          {time > 0 ? `Tunggu ${time} detik` : "Silakan verifikasi"}
        </p>

        {/* IKLAN */}
        <div className="flex justify-center mb-6">
          <Banner />
        </div>

        {/* CAPTCHA */}
        <div className="flex justify-center mb-6">
          <ReCAPTCHA
            sitekey={SITE_KEY}
            theme="dark"
            onChange={() => setCaptchaOk(true)}
            onExpired={() => setCaptchaOk(false)}
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={!canContinue}
          onClick={() => navigate(`/go/${slug}/unlock/${token}`)}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              canContinue
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
        >
          Lanjutkan
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Jangan tutup halaman ini
        </p>
      </div>
    </div>
  );
}

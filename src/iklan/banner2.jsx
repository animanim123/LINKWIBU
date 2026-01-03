import { useEffect, useRef } from "react";

export default function Banner2() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // biar gak double load
    adRef.current.innerHTML = "";

    // config iklan
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      atOptions = {
    'key' : '78523b1e6abd627415d6a525fd39a475',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
    `;

    // script pemanggil iklan
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://encyclopediaskilled.com/78523b1e6abd627415d6a525fd39a475/invoke.js";
    invokeScript.async = true;

    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="flex justify-center my-4">
      <div
        ref={adRef}
        style={{ width: 160, height: 300 }}
        className="bg-slate-700 rounded-lg"
      />
    </div>
  );
}

import { useEffect, useRef } from "react";

export default function Banner() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    // biar gak double load
    adRef.current.innerHTML = "";

    // config iklan
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      atOptions = {
        'key' : '8fee54c943e07b6b69f3834af51eddf8',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    // script pemanggil iklan
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://encyclopediaskilled.com/8fee54c943e07b6b69f3834af51eddf8/invoke.js";
    invokeScript.async = true;

    adRef.current.appendChild(configScript);
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="flex justify-center my-4">
      <div
        ref={adRef}
        style={{ width: 300, height: 250 }}
        className="bg-slate-700 rounded-lg"
      />
    </div>
  );
}

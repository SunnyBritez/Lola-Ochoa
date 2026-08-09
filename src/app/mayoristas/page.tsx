"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function WholesalePage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (code.trim().toUpperCase() === "MAYORISTAS2026") {
      // Set a cookie that expires in 1 day
      document.cookie = "wholesale_mode=true; path=/; max-age=86400";
      router.push("/store");
      router.refresh(); // Force refresh to re-run server components
    } else {
      setError("Código incorrecto. Por favor intentá de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 selection:bg-[#c9b07c] selection:text-white">
      <div className="max-w-md w-full bg-white p-8 border border-gray-100 shadow-sm text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-[#FDFBF7] border border-[#c9b07c] rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-[#c9b07c]" />
        </div>
        
        <h1 className="text-2xl font-serif text-gray-900 mb-2">Portal Mayorista</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Ingresá el código de acceso exclusivo para clientes mayoristas de Lola Ochoa.
        </p>

        <div className="space-y-4">
          <div>
            <input 
              type="password" 
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full border border-gray-300 p-4 text-center tracking-[0.3em] focus:outline-none focus:border-[#c9b07c] transition-colors"
              placeholder="CÓDIGO SECRETO"
            />
            {error && <p className="text-red-500 text-xs mt-2 font-semibold">{error}</p>}
          </div>

          <button 
            onClick={handleLogin}
            className="w-full bg-[#1a1a1a] hover:bg-black text-white py-4 text-sm font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
          >
            Ingresar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          ¿Querés vender Lola Ochoa? <a href="#" className="underline hover:text-[#c9b07c]">Contactanos</a>
        </p>
      </div>
    </div>
  );
}

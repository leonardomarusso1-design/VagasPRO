"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data?.user || null);
      } catch {}
      setLoading(false);
    })();

    (async () => {
      try {
        const res = await fetch("/api/private/me", { cache: "no-store" });
        const data = await res.json();
        const p = data?.profile;
        setPlan(p?.plan === "pro" ? "PRO" : p?.plan === "basic" ? "BASIC" : null);
        setCredits(0);
      } catch {}
    })();
  }, []);

  const handleLogin = async () => {
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const base =
        process.env.NEXTAUTH_URL ||
        (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: base },
      });
    } catch {}
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("vagaspro_step");
      localStorage.removeItem("vagaspro_data");
      localStorage.removeItem("vagaspro_content");
      localStorage.removeItem("vagaspro_plan");
      localStorage.removeItem("vagaspro_bump");
      localStorage.removeItem("vagaspro_credits");
      window.location.reload();
    } catch {}
  };

  return (
    <div className="h-12 border-b border-white/10 bg-slate-900/70 backdrop-blur flex items-center justify-between px-4">
      <div
        className="font-bold text-white tracking-tight cursor-pointer select-none"
        onClick={() => {
          window.location.href = window.location.origin;
        }}
        aria-label="Voltar para a página inicial"
      >
        Vagas<span className="text-blue-500">PRO</span>
      </div>
      <div className="flex items-center gap-4">
        {!loading && (
          <div className="text-xs text-slate-300 hidden sm:block">
            Plano: <span className="font-bold">{plan === "PRO" ? "PRO" : plan === "BASIC" ? "Básico" : "Nenhum"}</span> • Créditos: <span className="font-bold">{credits}</span>
          </div>
        )}
        {loading ? (
          <span className="text-slate-400 text-sm">...</span>
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm truncate max-w-[180px]">{user.email || user.name}</span>
            <button
              onClick={() => {
                window.location.href = `${window.location.origin}/dashboard`;
              }}
              className="px-3 py-1.5 text-sm rounded-lg bg-slate-800 text-white hover:bg-slate-700"
            >
              Área do Cliente
            </button>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 text-sm flex items-center gap-1"
              aria-label="Sair"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500"
          >
            Entrar
          </button>
        )}
      </div>
    </div>
  );
}

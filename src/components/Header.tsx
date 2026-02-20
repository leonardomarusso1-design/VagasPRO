"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data?.user || null);
      } catch {}
      setLoading(false);
    })();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/google");
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
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
      <div className="font-bold text-white tracking-tight">
        Vagas<span className="text-blue-500">PRO</span>
      </div>
      <div>
        {loading ? (
          <span className="text-slate-400 text-sm">...</span>
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-sm truncate max-w-[180px]">{user.email || user.name}</span>
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

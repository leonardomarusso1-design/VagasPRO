import React, { useEffect, useState } from "react";
import { Loader2, Sparkles, CheckCircle2, Search, FileText, PenTool } from "lucide-react";

export const Analyzing = () => {
  const [stage, setStage] = useState(0);

  const stages = [
    { text: "Conectando à IA Generativa...", icon: Sparkles },
    { text: "Analisando perfil profissional...", icon: Search },
    { text: "Identificando palavras-chave ATS...", icon: FileText },
    { text: "Reescrevendo descrições com copy persuasiva...", icon: PenTool },
    { text: "Formatando documento final...", icon: CheckCircle2 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-500/30 blur-[40px] rounded-full animate-pulse-soft"></div>
        <div className="relative w-24 h-24 bg-slate-900 border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-8 animate-fade-in">
        Otimizando seu currículo...
      </h2>

      <div className="space-y-4 w-full max-w-md text-left">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === stage;
          const isDone = i < stage;
          const isPending = i > stage;

          return (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                isActive
                  ? "bg-blue-900/20 border-blue-500/50 scale-105 shadow-lg shadow-blue-900/20"
                  : isDone
                  ? "bg-emerald-900/10 border-emerald-500/20 opacity-50"
                  : "bg-slate-900/30 border-white/5 opacity-30"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : isDone
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {isDone ? <CheckCircle2 size={16} /> : <Icon size={16} />}
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-blue-200" : isDone ? "text-emerald-200" : "text-slate-500"
                }`}
              >
                {s.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

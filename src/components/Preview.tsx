import React from "react";
import { UserData, ResumeContent } from "@/types";
import { ResumeTemplate } from "@/components/ResumeTemplate";
import { Button } from "@/components/ui/Button";
import { Lock, Eye, CheckCircle2 } from "lucide-react";

interface PreviewProps {
  data: UserData;
  content: ResumeContent | null;
  onUnlock: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ data, content, onUnlock }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-8 relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in">
          <CheckCircle2 size={12} fill="currentColor" />
          Currículo Otimizado com Sucesso
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Seu novo currículo está <span className="text-blue-400">pronto</span>.
        </h1>
        <p className="text-slate-400">
          Nossa IA reescreveu suas experiências e otimizou para os robôs ATS.
          <br /> Desbloqueie agora para baixar a versão final em alta qualidade.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto perspective-1000 group">
        {/* Glow Effect behind resume */}
        <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
        
        <div className="relative bg-slate-900 rounded-xl shadow-2xl border border-white/10 overflow-hidden transform transition-transform duration-500 hover:scale-[1.01]">
          {/* Header Bar Mac-style */}
          <div className="h-10 bg-slate-800 border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <div className="ml-4 text-xs text-slate-500 font-mono">curriculo_otimizado_final.pdf</div>
          </div>

          <div className="relative h-[600px] overflow-hidden bg-slate-200/5">
            {/* The Resume (Blurred) */}
            <div className="scale-[0.6] origin-top md:scale-75 lg:scale-90 transform-gpu blur-[6px] opacity-80 transition-all duration-700 select-none pointer-events-none">
              <ResumeTemplate data={data} content={content} />
            </div>

            {/* Unlock Overlay */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-20">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40 mb-6 animate-pulse-soft">
                <Lock className="text-white" size={40} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                Visualização Bloqueada
              </h3>
              <p className="text-slate-300 max-w-md mb-8">
                Este é apenas um preview. Para baixar o PDF em alta resolução e remover a marca d'água, desbloqueie seu acesso.
              </p>

              <Button 
                onClick={onUnlock} 
                size="lg" 
                variant="gradient"
                className="text-lg px-10 py-6 shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
              >
                <Eye size={20} className="mr-2" />
                Desbloquear e Baixar
              </Button>
              
              <p className="mt-4 text-xs text-slate-500">
                Ambiente seguro. Acesso imediato após confirmação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

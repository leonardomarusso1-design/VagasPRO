import React, { useState } from "react";
import { UserData, ResumeContent, PlanType } from "@/types";
import { ResumeTemplate } from "@/components/ResumeTemplate";
import { Button } from "@/components/ui/Button";
import { Download, LogOut, Zap, LayoutTemplate, Lock, Menu, X, FileText } from "lucide-react";

interface DashboardProps {
  data: UserData;
  content: ResumeContent | null;
  plan: PlanType;
  hasModernAccess: boolean;
}

export default function Dashboard({ data, content, plan, hasModernAccess }: DashboardProps) {
  const [activeLayout, setActiveLayout] = useState<"classic" | "modern">(
    hasModernAccess ? "modern" : "classic"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair? Seus dados serão limpos deste navegador.")) {
      localStorage.removeItem("vagaspro_step");
      localStorage.removeItem("vagaspro_data");
      localStorage.removeItem("vagaspro_content");
      localStorage.removeItem("vagaspro_plan");
      localStorage.removeItem("vagaspro_bump");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900 border-r border-white/5 z-50 transition-transform duration-300
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FileText className="text-white" size={18} />
              </div>
              Vagas<span className="text-blue-500">PRO</span>
            </div>
            <button className="md:hidden text-slate-400" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="mb-8">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                  {data.photoUrl ? (
                    <img src={data.photoUrl} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400 font-bold">{data.fullName.charAt(0)}</span>
                  )}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-white text-sm truncate">{data.fullName}</h3>
                  <div className="flex items-center gap-1 text-xs">
                    {plan === PlanType.PRO ? (
                      <span className="text-yellow-400 flex items-center gap-1"><Zap size={10} fill="currentColor" /> PRO</span>
                    ) : (
                      <span className="text-slate-500">Básico</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Modelos</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveLayout("classic")}
                  className={`w-full text-left px-4 py-3 text-sm rounded-lg font-medium transition-all flex items-center gap-3 ${
                    activeLayout === "classic"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${activeLayout === "classic" ? "bg-white" : "bg-slate-600"}`} />
                  Clássico (P&B)
                </button>

                <button
                  onClick={() => hasModernAccess && setActiveLayout("modern")}
                  disabled={!hasModernAccess}
                  className={`w-full text-left px-4 py-3 text-sm rounded-lg font-medium transition-all flex items-center justify-between ${
                    activeLayout === "modern"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : !hasModernAccess
                      ? "text-slate-600 cursor-not-allowed opacity-50"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activeLayout === "modern" ? "bg-white" : "bg-slate-600"}`} />
                    Moderno
                  </div>
                  {!hasModernAccess && <Lock size={12} />}
                </button>
              </div>
            </div>
            
            {content && (
              <div>
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Análise IA</h3>
                 <div className="px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                   <div className="flex justify-between items-end mb-1">
                     <span className="text-emerald-400 text-sm font-bold">ATS Score</span>
                     <span className="text-emerald-400 text-xl font-bold">{content.atsScore}</span>
                   </div>
                   <div className="h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${content.atsScore}%` }} />
                   </div>
                 </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/5 space-y-3">
            <Button onClick={handlePrint} fullWidth variant="secondary" className="shadow-emerald-500/20">
              <Download size={16} className="mr-2" /> Baixar PDF
            </Button>
            <Button onClick={handleLogout} fullWidth variant="ghost" className="text-slate-500 hover:text-red-400 hover:bg-red-500/10">
              <LogOut size={16} className="mr-2" /> Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-slate-950 relative overflow-hidden flex flex-col h-screen">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-white/5 flex items-center justify-between px-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
          <div className="font-bold text-white">VagasPRO</div>
          <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2">
            <Menu size={24} />
          </button>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-grid relative">
           <div className="max-w-[210mm] mx-auto transition-transform duration-300 origin-top">
              <div className="shadow-2xl shadow-black/50">
                <ResumeTemplate data={data} content={content} layoutType={activeLayout} />
              </div>
           </div>
           <div className="h-20" /> {/* Spacer for bottom scroll */}
        </div>
      </main>
    </div>
  );
}

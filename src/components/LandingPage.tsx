import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, XCircle, FileText, Zap, ShieldCheck, Star, HelpCircle, ChevronDown, Check } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileText className="text-white" size={18} />
            </div>
            Vagas<span className="text-blue-500">PRO</span>
          </div>
          <Button variant="ghost" className="text-sm font-semibold hidden md:block" onClick={onStart}>
            Área do Cliente
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none opacity-50 mix-blend-screen" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8 animate-fade-in">
            <Zap size={12} fill="currentColor" />
            Nova Tecnologia IA 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 drop-shadow-sm">
            O seu currículo é <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">lixo</span> para os robôs.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            75% dos currículos são descartados automaticamente por sistemas ATS antes de um humano ler. <br className="hidden md:block"/>
            O VagasPRO usa Inteligência Artificial para reescrever sua história e <span className="text-blue-400 font-semibold">furar a bolha</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={onStart} variant="gradient" className="w-full sm:w-auto text-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
              Gerar Currículo Profissional <ArrowRight className="ml-2" size={20} />
            </Button>
            <p className="text-slate-500 text-sm mt-4 sm:mt-0 flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-500" /> +12.000 recolocados
            </p>
          </div>
        </div>
      </section>

      {/* Problem / Agitation */}
      <section className="py-24 bg-slate-900/30 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              Por que você <span className="text-red-500">não é chamado</span> para entrevistas?
            </h2>
            <div className="space-y-8">
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                  <XCircle className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Currículos Genéricos</h3>
                  <p className="text-slate-400 leading-relaxed">Modelos baixados da internet não destacam suas conquistas reais. Recrutadores sentem o cheiro de "copia e cola" de longe.</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                  <XCircle className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Invisível para o ATS</h3>
                  <p className="text-slate-400 leading-relaxed">Robôs buscam palavras-chave específicas. Se o seu PDF não tiver a estrutura correta, você nem existe no banco de dados.</p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20 group-hover:border-red-500/40 transition-colors">
                  <XCircle className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Formatação Quebrada</h3>
                  <p className="text-slate-400 leading-relaxed">Design excessivo confunde os leitores automáticos. Menos é mais, desde que seja estratégico.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-xl border border-white/10 shadow-2xl overflow-hidden bg-slate-900">
               <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-10 backdrop-blur-[2px]">
                 <span className="bg-red-500/20 text-red-500 border border-red-500/30 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider backdrop-blur-md">
                   Rejeitado pelo Robô
                 </span>
               </div>
               {/* Placeholder de currículo rejeitado */}
               <div className="p-8 opacity-40 grayscale blur-[1px]">
                 <div className="h-8 w-1/3 bg-slate-700 rounded mb-6"></div>
                 <div className="space-y-3">
                   <div className="h-4 w-full bg-slate-800 rounded"></div>
                   <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                   <div className="h-4 w-4/6 bg-slate-800 rounded"></div>
                 </div>
                 <div className="mt-8 grid grid-cols-2 gap-4">
                   <div className="h-24 bg-slate-800 rounded"></div>
                   <div className="h-24 bg-slate-800 rounded"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution / How it works */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck size={12} fill="currentColor" />
            Método Comprovado
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Como o VagasPRO <span className="text-emerald-400">vira o jogo</span>
          </h2>
          <p className="text-slate-400 text-lg">3 passos simples para transformar sua carreira em poucos minutos.</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Dados Brutos", desc: "Você preenche suas informações básicas, experiências e o que sabe fazer, sem se preocupar com texto bonito.", icon: FileText },
            { step: "02", title: "IA Generativa", desc: "Nossa IA analisa seu perfil, encontra as melhores palavras-chave e reescreve cada ponto para máxima persuasão.", icon: Zap },
            { step: "03", title: "Download ATS", desc: "Baixe seu currículo em PDF otimizado, pronto para passar pelos filtros e cair na mesa do recrutador.", icon: CheckCircle2 },
          ].map((item, i) => (
            <div key={i} className="relative group p-8 rounded-2xl border border-white/5 bg-slate-900/50 hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-slate-500 select-none group-hover:text-blue-500 transition-colors">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 bg-slate-900/50 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Invista no seu futuro</h2>
          <p className="text-slate-400">Menos que um café, mais retorno que uma pós-graduação inútil.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
          {/* Basic Plan */}
          <div className="rounded-2xl border border-white/10 bg-slate-950 p-8 flex flex-col relative hover:border-white/20 transition-colors">
            <h3 className="text-xl font-bold text-slate-400 mb-2">Plano Básico</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-sm text-slate-500">R$</span>
              <span className="text-4xl font-bold text-white">5,70</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-300">
                <Check size={18} className="text-slate-500" /> 1 Currículo Gerado
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check size={18} className="text-slate-500" /> Otimização ATS Básica
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check size={18} className="text-slate-500" /> Acesso único
              </li>
            </ul>
            <Button variant="outline" onClick={onStart} className="w-full">
              Começar Básico
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-2xl border border-blue-500/50 bg-slate-900/80 p-8 flex flex-col relative shadow-2xl shadow-blue-900/20 transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              Recomendado
            </div>
            <h3 className="text-xl font-bold text-blue-400 mb-2">Plano PRO</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm text-slate-500 line-through">R$ 56,00</span>
              <span className="text-5xl font-bold text-white">R$ 22,70</span>
            </div>
            <p className="text-emerald-400 text-sm font-medium mb-6">Economize 60% hoje</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-white font-medium">
                <div className="bg-blue-500/20 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div>
                10 Currículos Gerados
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <div className="bg-blue-500/20 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div>
                IA Avançada (GPT-4 Turbo)
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <div className="bg-blue-500/20 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div>
                Acesso Vitalício
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <div className="bg-blue-500/20 p-1 rounded-full"><Check size={14} className="text-blue-400" /></div>
                Prioridade no Suporte
              </li>
            </ul>
            <Button variant="gradient" size="lg" onClick={onStart} className="w-full shadow-blue-500/25">
              Quero o Plano PRO <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-white">Dúvidas Frequentes</h2>
          <div className="space-y-4">
            {[
              { q: "O currículo passa mesmo no ATS?", a: "Sim. Utilizamos a estrutura exata que softwares como Gupy, Kenoby e LinkedIn preferem. Sem colunas complexas, sem gráficos inúteis." },
              { q: "Posso editar depois?", a: "Sim! No plano PRO você tem acesso vitalício para gerar novas versões quando quiser." },
              { q: "Como funciona o pagamento?", a: "Pagamento único via PIX, processado de forma segura pelo Stripe. Sem assinaturas mensais escondidas." },
            ].map((item, i) => (
              <div key={i} className="border border-white/10 rounded-xl bg-slate-900/30 overflow-hidden">
                <button className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-900/50 transition-colors">
                  <span className="font-bold text-slate-200">{item.q}</span>
                  <ChevronDown className="text-slate-500" size={20} />
                </button>
                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-slate-950 text-center">
        <div className="flex items-center justify-center gap-2 font-bold text-xl tracking-tighter mb-6 opacity-50">
          <div className="w-6 h-6 bg-slate-700 rounded-md flex items-center justify-center">
            <FileText className="text-slate-950" size={14} />
          </div>
          Vagas<span className="text-slate-600">PRO</span>
        </div>
        <p className="text-slate-600 text-sm">
          © 2024 VagasPRO. Todos os direitos reservados. <br/>
          Feito com IA para vencer a IA.
        </p>
      </footer>
    </div>
  );
};

import React from "react";
import { Button } from "@/components/ui/Button";
import { PlanType } from "@/types";
import { Check, ShieldCheck, Zap, ArrowLeft, Star } from "lucide-react";

interface CheckoutProps {
  plan: PlanType;
  orderBumpActive: boolean;
  onToggleBump: () => void;
  onPayment: () => void;
  isProcessing: boolean;
  onBack: () => void;
  onPlanChange: (plan: PlanType) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  plan,
  orderBumpActive,
  onToggleBump,
  onPayment,
  isProcessing,
  onBack,
  onPlanChange,
}) => {
  const isPro = plan === PlanType.PRO;
  const basePrice = isPro ? 22.7 : 5.7;
  const bumpPrice = 2.7;
  const total = basePrice + (orderBumpActive ? bumpPrice : 0);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 relative z-10">
        {/* Left Column - Summary */}
        <div className="space-y-6">
          <button 
            onClick={onBack}
            className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} /> Voltar
          </button>

          {/* Plan Selector */}
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-xl flex gap-2">
            <button
              onClick={() => onPlanChange(PlanType.BASIC)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                !isPro ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              Plano Básico
            </button>
            <button
              onClick={() => onPlanChange(PlanType.PRO)}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                isPro ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              Plano PRO
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Finalizar Pedido</h1>
            <p className="text-slate-400">Você está a um passo de transformar sua carreira.</p>
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Resumo do Pedido</h3>
            
            <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/5">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${isPro ? "bg-blue-500/20 text-blue-400" : "bg-slate-700/50 text-slate-400"}`}>
                  {isPro ? <Zap size={24} /> : <Star size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">
                    {isPro ? "Plano VagasPRO Vitalício" : "Plano Básico (Uso Único)"}
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {isPro ? "Acesso ilimitado + IA Avançada" : "1 Currículo + Otimização ATS"}
                  </p>
                </div>
              </div>
              <div className="font-bold text-white text-lg">
                R$ {basePrice.toFixed(2).replace(".", ",")}
              </div>
            </div>

            {/* Order Bump */}
            {!isPro && (
              <div 
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer mb-6 ${
                  orderBumpActive 
                    ? "bg-blue-900/20 border-blue-500/50" 
                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                }`}
                onClick={onToggleBump}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                    orderBumpActive ? "bg-blue-500 border-blue-500" : "border-slate-600"
                  }`}>
                    {orderBumpActive && <Check size={14} className="text-white" />}
                  </div>
                  <div>
                    <div className="flex justify-between w-full">
                      <h4 className="font-bold text-white text-sm">
                        Adicionar acesso ao modelo "Moderno"?
                      </h4>
                      <span className="text-emerald-400 font-bold text-sm">+ R$ 2,70</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">
                      Destaque-se com um layout premium colorido e com foto. Aumenta em 40% a leitura por humanos.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center text-xl font-bold text-white pt-2">
              <span>Total a pagar</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
            <ShieldCheck size={14} className="text-emerald-500" />
            Pagamento seguro via Stripe. Acesso liberado imediatamente.
          </div>
        </div>

        {/* Right Column - Payment Method */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl h-fit">
          <h3 className="text-xl font-bold text-white mb-6">Pagamento</h3>
          
          <div className="space-y-4 mb-8">
            <div className="p-4 border border-blue-500/50 bg-blue-500/10 rounded-xl flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
                <span className="font-medium text-white">Cartão de Crédito / PIX</span>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 opacity-70 invert" />
            </div>
            
            <div className="p-4 border border-white/5 bg-slate-950/50 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                <span className="font-medium text-slate-400">PayPal (Indisponível)</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={onPayment} 
            fullWidth 
            size="lg" 
            variant="secondary"
            disabled={isProcessing}
            className="shadow-emerald-500/20 py-6 text-lg animate-pulse-soft"
          >
            {isProcessing ? "Processando..." : `Pagar R$ ${total.toFixed(2).replace(".", ",")} Agora`}
          </Button>
          
          <p className="text-center text-slate-500 text-xs mt-4">
            Ao clicar em pagar, você será redirecionado para o ambiente seguro do Stripe.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PlanType } from "@/types";
import { Check, ShieldCheck, Zap, ArrowLeft, Star, Copy, X } from "lucide-react";

interface CheckoutProps {
  plan: PlanType;
  orderBumpActive: boolean;
  onToggleBump: () => void;
  onBack: () => void;
  onPlanChange: (plan: PlanType) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  plan,
  orderBumpActive,
  onToggleBump,
  onBack,
  onPlanChange,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixOpen, setPixOpen] = useState(false);
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("pending");
  const isPro = plan === PlanType.PRO;
  const basePrice = isPro ? 22.7 : 5.7;
  const bumpPrice = 2.7;
  const total = basePrice + (orderBumpActive ? bumpPrice : 0);

  useEffect(() => {
    let timer: any;
    if (pixOpen && paymentId) {
      timer = setInterval(async () => {
        try {
          const res = await fetch(`/api/mp/status?payment_id=${paymentId}`);
          const data = await res.json();
          if (data?.status === "approved") {
            setStatus("approved");
            const params = new URLSearchParams({
              success: "true",
              plan: isPro ? "PRO" : "BASIC",
              bump: orderBumpActive ? "true" : "false",
            });
            window.location.href = `${window.location.origin}?${params.toString()}`;
          }
        } catch {}
      }, 3000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [pixOpen, paymentId, isPro, orderBumpActive]);

  const handlePayPix = async () => {
    try {
      setIsProcessing(true);
      const me = await fetch("/api/auth/me").then((r) => r.json()).catch(() => ({ user: null }));
      if (!me?.user) {
        const go = await fetch("/api/auth/google").then((r) => r.json()).catch(() => null);
        if (go?.url) window.location.href = go.url;
        setIsProcessing(false);
        return;
      }
      const res = await fetch("/api/mp/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: isPro ? "PRO" : "BASIC",
          hasBump: orderBumpActive,
          buyerEmail: me.user.email,
        }),
      });
      const data = await res.json();
      if ((data?.qr_base64 || data?.qr_code) && data?.payment_id) {
        if (data.qr_base64) setQrBase64(data.qr_base64);
        const code = data.qr_code || null;
        setPixCode(code);
        if (!data.qr_base64 && code) {
          setQrUrl(`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(code)}`);
        }
        setPaymentId(String(data.payment_id));
        setPixOpen(true);
      } else {
        alert("Falha ao gerar Pix. Tente novamente mais tarde.");
      }
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

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
            Pagamento seguro. Acesso liberado imediatamente.
          </div>
        </div>

        {/* Right Column - Payment Method */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl h-fit">
          <h3 className="text-xl font-bold text-white mb-6">Pagamento</h3>
          
          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-xl flex items-center justify-between cursor-default border border-emerald-500/50 bg-emerald-500/10">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <span className="font-medium text-white">Mercado Pago (Pix recomendado)</span>
              </div>
              <img src="https://http2.mlstatic.com/frontend-assets/mp-web-navigation/ui-library/svgs/mercadopago-logo.svg" alt="Mercado Pago" className="h-6 opacity-70 invert" />
            </div>
          </div>

          <Button 
            onClick={handlePayPix} 
            fullWidth 
            size="lg" 
            variant="secondary"
            disabled={isProcessing}
            className="shadow-emerald-500/20 py-6 text-lg animate-pulse-soft"
          >
            {isProcessing ? "Processando..." : `Pagar R$ ${total.toFixed(2).replace(".", ",")} Agora`}
          </Button>
          
          <p className="text-center text-slate-500 text-xs mt-4">Escaneie o QR Pix após clicar em pagar.</p>
        </div>
      </div>

      {pixOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md relative">
            <button className="absolute top-4 right-4 text-slate-400 hover:text-white" onClick={() => setPixOpen(false)}>
              <X size={18} />
            </button>
            <h3 className="text-white font-bold text-lg mb-4">Pague com Pix</h3>
            {qrBase64 ? (
              <img src={`data:image/png;base64,${qrBase64}`} alt="QR Pix" className="w-64 h-64 mx-auto rounded-lg bg-white" />
            ) : qrUrl ? (
              <img src={qrUrl} alt="QR Pix" className="w-64 h-64 mx-auto rounded-lg bg-white" />
            ) : (
              <div className="text-slate-400 text-sm text-center">Gerando QR...</div>
            )}
            {pixCode && (
              <button
                className="mt-4 w-full px-4 py-2 rounded-lg bg-slate-800 text-white flex items-center justify-center gap-2"
                onClick={() => navigator.clipboard.writeText(pixCode)}
              >
                <Copy size={14} /> Copiar código Pix
              </button>
            )}
            <div className="text-center text-slate-500 text-xs mt-2">
              Se o QR não aparecer, use “Copiar código Pix” e cole no app do seu banco.
            </div>
            <div className="text-center text-slate-400 text-xs mt-3">
              Status: {status === "approved" ? "Aprovado" : "Aguardando pagamento"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from "react";
import { Button } from "@/components/ui/Button";
import { X, Lock, ShieldCheck, Mail } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
  isProcessing: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, isProcessing }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden scale-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-800/50 p-6 text-center border-b border-white/5 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
            <Lock className="text-blue-400" size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-1">Crie sua conta</h2>
          <p className="text-slate-400 text-sm">
            Para salvar seu currículo e acessar a área de membros.
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <Button 
            onClick={onLogin} 
            disabled={isProcessing}
            fullWidth 
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 border-none shadow-lg font-bold flex items-center justify-center gap-3 py-4"
          >
            {isProcessing ? (
               "Redirecionando..."
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Entrar com Google
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Ou use seu email</span>
            </div>
          </div>

          <form className="space-y-4 opacity-50 pointer-events-none" title="Em breve">
            <input 
              type="email" 
              placeholder="seu@email.com" 
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              disabled
            />
            <Button disabled fullWidth variant="outline">
              <Mail size={16} className="mr-2" /> Continuar com Email
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 text-center border-t border-white/5">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
            <ShieldCheck size={12} className="text-emerald-500" />
            Seus dados estão protegidos e criptografados.
          </p>
        </div>
      </div>
    </div>
  );
};

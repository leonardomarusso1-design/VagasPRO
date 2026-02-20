"use client";

import React, { useState } from "react";
import { UserData, Experience, Education } from "@/types";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft, Plus, Trash2, Camera, Upload, Briefcase, GraduationCap, Award, Languages, CheckCircle2, Zap } from "lucide-react";

interface QuizProps {
  onComplete: (data: UserData) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    photoUrl: "",
    summary: "",
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    linkedin: "",
  });

  const handleNext = () => setStep((p) => p + 1);
  const handleBack = () => setStep((p) => p - 1);

  const handleChange = (field: keyof UserData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleChange("photoUrl", url);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      role: "",
      period: "",
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      year: "",
    };
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const inputClasses = "w-full p-3 bg-slate-950 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-slate-500 transition-all";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative z-10">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-800 w-full">
          <div
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          {step === 1 && (
            <div className="space-y-6 fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Quem é você?</h2>
                <p className="text-slate-400">Dados básicos para o recrutador te encontrar.</p>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden border-2 ${formData.photoUrl ? "border-blue-500" : "border-slate-700 bg-slate-800"}`}>
                  {formData.photoUrl ? (
                    <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-slate-500" size={32} />
                  )}
                </div>
                <label className="mt-3 cursor-pointer text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                  <Upload size={14} />
                  {formData.photoUrl ? "Trocar Foto" : "Adicionar Foto"}
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className={labelClasses}>Nome Completo</label>
                  <input type="text" className={inputClasses} placeholder="Ex: João Silva" value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Email</label>
                    <input type="email" className={inputClasses} placeholder="joao@email.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClasses}>Telefone</label>
                    <input type="text" className={inputClasses} placeholder="(11) 99999-9999" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Cidade e Estado</label>
                    <input type="text" className={inputClasses} placeholder="Ex: São Paulo, SP" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClasses}>LinkedIn (Opcional)</label>
                    <input type="text" className={inputClasses} placeholder="linkedin.com/in/joao" value={formData.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Experiência Profissional</h2>
                <p className="text-slate-400">Liste suas experiências mais relevantes.</p>
              </div>

              {formData.experiences.map((exp, index) => (
                <div key={exp.id} className="p-6 bg-slate-950/50 border border-white/10 rounded-xl relative group hover:border-blue-500/30 transition-all">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded">#{index + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Empresa" className={inputClasses} value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                        <input placeholder="Cargo" className={inputClasses} value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
                    </div>
                    <input placeholder="Período (Ex: Jan 2020 - Atual)" className={inputClasses} value={exp.period} onChange={(e) => updateExperience(exp.id, "period", e.target.value)} />
                    <textarea placeholder="Principais atividades e resultados..." className={`${inputClasses} h-24 resize-none`} value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} />
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addExperience} fullWidth className="border-dashed border-slate-700 hover:border-blue-500 text-slate-400 hover:text-blue-400 py-4">
                <Plus size={18} className="mr-2" /> Adicionar Experiência
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Formação Acadêmica</h2>
                <p className="text-slate-400">Seus estudos e certificações.</p>
              </div>

              {formData.education.map((edu, index) => (
                <div key={edu.id} className="p-6 bg-slate-950/50 border border-white/10 rounded-xl relative group hover:border-blue-500/30 transition-all">
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-slate-600 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Instituição" className={inputClasses} value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
                        <input placeholder="Grau / Curso" className={inputClasses} value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                    </div>
                    <input placeholder="Ano de Conclusão" className={inputClasses} value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} />
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addEducation} fullWidth className="border-dashed border-slate-700 hover:border-blue-500 text-slate-400 hover:text-blue-400 py-4">
                <Plus size={18} className="mr-2" /> Adicionar Formação
              </Button>
            </div>
          )}

          {step === 4 && (
             <div className="space-y-6 fade-in">
               <div className="text-center mb-8">
                 <h2 className="text-2xl font-bold text-white mb-2">Habilidades e Resumo</h2>
                 <p className="text-slate-400">O que você sabe fazer de melhor?</p>
               </div>

               <div>
                 <label className={labelClasses}>Resumo Profissional (Opcional - a IA pode gerar)</label>
                 <textarea 
                    className={`${inputClasses} h-32 resize-none`} 
                    placeholder="Conte um pouco sobre sua trajetória..." 
                    value={formData.summary} 
                    onChange={(e) => handleChange("summary", e.target.value)} 
                 />
               </div>

               <div>
                 <label className={labelClasses}>Principais Habilidades (separadas por vírgula)</label>
                 <input 
                    type="text" 
                    className={inputClasses} 
                    placeholder="Ex: Liderança, Excel Avançado, Python, Vendas" 
                    value={formData.skills.join(", ")} 
                    onChange={(e) => handleChange("skills", e.target.value.split(",").map(s => s.trim()))} 
                 />
                 <p className="text-xs text-slate-500 mt-2">Dica: Liste ferramentas e soft skills.</p>
               </div>
               
               <div>
                 <label className={labelClasses}>Idiomas (separados por vírgula)</label>
                 <input 
                    type="text" 
                    className={inputClasses} 
                    placeholder="Ex: Inglês Avançado, Espanhol Básico" 
                    value={formData.languages.join(", ")} 
                    onChange={(e) => handleChange("languages", e.target.value.split(",").map(s => s.trim()))} 
                 />
               </div>
             </div>
          )}
          
          {step === 5 && (
             <div className="space-y-8 fade-in text-center py-10">
               <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-soft">
                 <Briefcase size={40} className="text-blue-400" />
               </div>
               
               <div>
                 <h2 className="text-3xl font-bold text-white mb-4">Tudo pronto!</h2>
                 <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                   Nossa IA vai analisar seus dados, reescrever suas experiências e formatar um currículo perfeito para passar nos robôs ATS.
                 </p>
               </div>

               <div className="bg-slate-950/50 p-6 rounded-xl border border-white/10 max-w-sm mx-auto text-left space-y-3">
                 <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Otimização de Palavras-chave
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Formatação ATS Friendly
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Texto Persuasivo
                 </div>
               </div>
             </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-slate-900/80 backdrop-blur-md flex justify-between items-center">
          {step > 1 ? (
            <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-white">
              <ChevronLeft size={18} className="mr-2" />
              Voltar
            </Button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <Button onClick={handleNext} variant="primary" className="shadow-blue-500/20">
              Próximo
              <ChevronRight size={18} className="ml-2" />
            </Button>
          ) : (
            <Button onClick={() => onComplete(formData)} variant="secondary" size="lg" className="shadow-emerald-500/20 animate-pulse-soft">
              <Zap size={18} className="mr-2" />
              Gerar Currículo Agora
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};



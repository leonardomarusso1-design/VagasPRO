 import React from 'react';
 import { UserData, ResumeContent } from '@/types';
import { MapPin, Mail, Phone, Linkedin, Briefcase, GraduationCap, Award } from 'lucide-react';

interface ResumeTemplateProps {
  data: UserData;
  content: ResumeContent | null;
  blurred?: boolean;
  layoutType?: 'classic' | 'modern'; // Added prop
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ 
  data, 
  content, 
  blurred = false,
  layoutType = 'modern' // Default for preview before buying, but logic will override
}) => {
  const displaySummary = content?.optimizedSummary || data.summary;
  const displayExperiences = content?.optimizedExperiences || data.experiences;
  
  const isModern = layoutType === 'modern';

  // Colors
  const accentColor = isModern ? 'text-blue-600' : 'text-slate-900';
  const headerBorder = isModern ? 'border-blue-600' : 'border-slate-800';
  const sectionBorder = isModern ? 'border-slate-200' : 'border-slate-400';
  const expBorder = isModern ? 'border-blue-100' : 'border-slate-300';
  const badgeBg = isModern ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-700';

  return (
    <div className={`bg-white text-slate-800 w-full max-w-[210mm] min-h-[297mm] mx-auto p-8 md:p-12 shadow-2xl ${blurred ? 'blur-md select-none overflow-hidden' : ''} print:shadow-none print:w-full print:max-w-none print:p-0 print:m-0`}>
      {/* Header */}
      <header className={`border-b-4 ${headerBorder} pb-6 mb-8 flex justify-between items-start`}>
        <div className="flex gap-6 items-center">
          {isModern && data.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 print:w-20 print:h-20">
              <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <p className={`text-lg ${accentColor} font-bold uppercase tracking-wider mb-1`}>{displayExperiences[0]?.role || "Profissional"}</p>
            <h1 className="text-4xl font-extrabold uppercase tracking-wide text-slate-900 leading-none">{data.fullName || "Seu Nome"}</h1>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span>{data.location || "Cidade, UF"}</span>
            <MapPin size={16} />
          </div>
          <div className="flex items-center gap-2">
            <span>{data.email || "seu@email.com"}</span>
            <Mail size={16} />
          </div>
          <div className="flex items-center gap-2">
            <span>{data.phone || "(00) 00000-0000"}</span>
            <Phone size={16} />
          </div>
          {data.linkedin && (
            <div className="flex items-center gap-2">
              <span>{data.linkedin}</span>
              <Linkedin size={16} />
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
        {/* Main Content (Left/Center - 2 Cols) */}
        <div className="md:col-span-2 print:col-span-2 space-y-8">
          
          {/* Summary */}
          <section>
            <h3 className={`text-lg font-bold uppercase tracking-wider border-b-2 ${sectionBorder} mb-3 pb-1 text-slate-800`}>Resumo Profissional</h3>
            <p className="text-slate-700 leading-relaxed text-sm text-justify">
              {displaySummary}
            </p>
          </section>

          {/* Experience */}
          <section>
            <h3 className={`text-lg font-bold uppercase tracking-wider border-b-2 ${sectionBorder} mb-4 pb-1 text-slate-800 flex items-center gap-2`}>
              <Briefcase size={20} /> Experiência
            </h3>
            <div className="space-y-6">
              {displayExperiences.map((exp, idx) => (
                <div key={idx} className={`relative pl-4 border-l-2 ${expBorder}`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-900">{exp.role}</h4>
                    <span className={`text-xs font-semibold ${badgeBg} px-2 py-0.5 rounded`}>{exp.period}</span>
                  </div>
                  <h5 className="text-sm font-semibold text-slate-600 mb-2">{exp.company}</h5>
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar (Right - 1 Col) */}
        <div className="space-y-8">
          
          {/* Education */}
          <section>
            <h3 className={`text-lg font-bold uppercase tracking-wider border-b-2 ${sectionBorder} mb-4 pb-1 text-slate-800 flex items-center gap-2`}>
              <GraduationCap size={20} /> Formação
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                  <p className="text-sm text-slate-600">{edu.institution}</p>
                  <p className="text-xs text-slate-500 mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className={`text-lg font-bold uppercase tracking-wider border-b-2 ${sectionBorder} mb-4 pb-1 text-slate-800 flex items-center gap-2`}>
              <Award size={20} /> Habilidades
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-md border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h3 className={`text-lg font-bold uppercase tracking-wider border-b-2 ${sectionBorder} mb-4 pb-1 text-slate-800`}>Idiomas</h3>
              <ul className="space-y-2">
                {data.languages.map((lang, idx) => (
                  <li key={idx} className="text-sm text-slate-700 border-b border-dashed border-slate-100 pb-1">
                    {lang}
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

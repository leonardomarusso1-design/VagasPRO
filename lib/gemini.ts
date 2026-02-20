import { UserData, ResumeContent } from "@/types";

export const generateOptimizedResume = async (
  userData: UserData
): Promise<ResumeContent> => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          optimizedSummary: `Profissional experiente com foco em resultados na área de ${
            userData.experiences[0]?.role || "Tecnologia"
          }. Especialista em otimização de processos e atuação estratégica.`,
          optimizedExperiences: userData.experiences.map((exp) => ({
            ...exp,
            description: exp.description || "",
          })),
          atsScore: 88,
          keywordsFound: ["Experiência", "Competências", "Resultados"],
        });
      }, 1500);
    });
  }

  const prompt = `
Você é um recrutador sênior, especialista em ATS.

REGRAS CRÍTICAS:
- NÃO invente informações
- NÃO adicione métricas fictícias
- Apenas reescreva com linguagem profissional

Formato de resposta: JSON com chaves
{ "optimizedSummary": string, "atsScore": number, "keywordsFound": string[], "optimizedExperiences": Experience[] }

Dados:
Nome: ${userData.fullName}
Resumo: ${userData.summary}
Experiências: ${JSON.stringify(userData.experiences)}
Skills: ${userData.skills.join(", ")}
`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Resposta vazia da IA");
    return JSON.parse(text) as ResumeContent;
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      optimizedSummary:
        userData.summary || "Profissional dedicado com foco em excelência.",
      optimizedExperiences: userData.experiences,
      atsScore: 75,
      keywordsFound: ["Profissional", "Experiência"],
    };
  }
};

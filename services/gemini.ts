import { GoogleGenAI } from "@google/genai";
import { Strategy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEarningStrategy = async (
  skills: string,
  targetDaily: number
): Promise<Strategy> => {
  
  const prompt = `
    Agisci come un esperto consulente di carriera digitale per il mercato italiano.
    L'utente vuole guadagnare circa ${targetDaily}€ al giorno (o circa ${Math.round(targetDaily/24)}€ all'ora se h24, oppure ${Math.round(targetDaily/8)}€/h lavorativi) lavorando SOLO online dall'Italia.
    
    Abilità dell'utente: ${skills || "Nessuna specifica (generico)"}.

    Fornisci una strategia dettagliata, realistica e attuabile.
    Evita truffe, scommesse o metodi illegali.
    Concentrati su Freelancing, Gig Economy, Content Creation, Remote Working, Affiliate Marketing seri.
    Includi nomi di piattaforme reali accessibili dall'Italia (es. Fiverr, Upwork, AddLance, Vinted, Etsy, ecc).
    
    Struttura la risposta in Markdown. Usa titoli, liste puntate e grassetto per enfasi.
    Sii motivante ma pragmatico.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Use search to get current legit platforms
        systemInstruction: "Sei un esperto finanziario italiano specializzato in guadagni online. Rispondi in italiano.",
      }
    });

    const text = response.text || "Impossibile generare una strategia al momento.";
    
    // Extract grounding URLs if available
    const groundingUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
      .filter((item: any) => item !== null) || [];

    // Simple heuristic to determine difficulty based on text length or keywords (mock logic for UI richness)
    let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
    if (text.toLowerCase().includes('programmazione') || text.toLowerCase().includes('sviluppo')) difficulty = 'Hard';
    if (text.toLowerCase().includes('sondaggi') || text.toLowerCase().includes('micro')) difficulty = 'Easy';

    return {
      title: `Piano Personalizzato: Obiettivo ${targetDaily}€/giorno`,
      content: text,
      difficulty,
      estimatedTime: "Variabile",
      potentialEarnings: `${targetDaily}€+ / giorno`,
      groundingUrls
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Errore nella generazione della strategia. Riprova più tardi.");
  }
};
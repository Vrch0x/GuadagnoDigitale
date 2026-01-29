import { GoogleGenAI } from "@google/genai";
import { Strategy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEarningStrategy = async (
  skills: string,
  targetDaily: number
): Promise<Strategy> => {
  
  const isPassiveGoal = targetDaily >= 200; // Heuristic for high daily goals implying scale or passive

  const prompt = `
    Sei "VirtualArchitect", un consulente strategico d'élite per l'economia digitale italiana.
    
    OBIETTIVO UTENTE:
    Guadagnare circa ${targetDaily}€ al giorno.
    Se l'utente punta a cifre alte (es. 240€/giorno), considera che questo equivale a 10€/ora per 24 ore (Reddito Passivo/Automatico) OPPURE 30€/ora per una giornata lavorativa di 8 ore.
    
    COMPETENZE UTENTE:
    ${skills || "Non specificate (fornisci blueprint universale)"}.

    IL TUO COMPITO:
    Crea un "Blueprint Finanziario" dettagliato. 
    Struttura la risposta come un progetto architettonico:
    1. **Le Fondamenta**: Cosa serve per iniziare (P.IVA? Strumenti?).
    2. **La Struttura (Il Metodo)**: Spiega passo passo come raggiungere i ${targetDaily}€/giorno. Se l'obiettivo è 240€, suggerisci mix di lavoro attivo + passive income (affiliate, prodotti digitali, e-commerce, investimenti automatizzati).
    3. **I Materiali (Piattaforme)**: Fiverr, Upwork, Amazon KDP, Etsy, Trading (solo se serio), Blogging, ecc.
    4. **Analisi Rischi/Tasse**: Breve accenno alla tassazione italiana (Regime Forfettario).

    TONO DI VOCE:
    Professionale, Diretto, Visionario ma concreto. Usa formattazione Markdown avanzata.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "Sei VirtualArchitect. Rispondi in italiano con un layout strutturato e pulito.",
      }
    });

    const text = response.text || "Impossibile generare il blueprint al momento.";
    
    // Extract grounding URLs
    const groundingUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : null)
      .filter((item: any) => item !== null) || [];

    let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';
    if (targetDaily > 100) difficulty = 'Hard';
    if (text.toLowerCase().includes('investimenti') || text.toLowerCase().includes('business')) difficulty = 'Hard';

    return {
      title: `Blueprint VirtualArchitect: Target ${targetDaily}€`,
      content: text,
      difficulty,
      estimatedTime: "Variabile",
      potentialEarnings: `${targetDaily}€ / giorno`,
      groundingUrls
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Errore nei sistemi VirtualArchitect. Riprova più tardi.");
  }
};
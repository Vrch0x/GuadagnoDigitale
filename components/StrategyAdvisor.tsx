import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateEarningStrategy } from '../services/gemini';
import { Strategy } from '../types';
import { Sparkles, ArrowRight, Loader2, Link as LinkIcon, AlertTriangle, Cpu, Ruler } from 'lucide-react';

export const StrategyAdvisor: React.FC = () => {
  const [skills, setSkills] = useState('');
  const [target, setTarget] = useState(240);
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateEarningStrategy(skills, target);
      setStrategy(result);
    } catch (err) {
      setError("Errore nella generazione del blueprint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-bold text-white flex items-center justify-center gap-3">
          <Cpu className="w-8 h-8 text-emerald-500" />
          Virtual Architect <span className="text-slate-600">//</span> AI
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto font-light">
          Definisci i parametri. L'intelligenza artificiale progetterà il blueprint per raggiungere i {target}€ giornalieri.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 p-6 border border-slate-800 relative group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-900 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
             
             <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold">
                  Target Giornaliero (€)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 px-4 py-3 text-white focus:border-emerald-500 outline-none font-mono text-lg transition-colors"
                  />
                  <div className="absolute right-3 top-3 text-slate-600 font-mono">EUR</div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold">
                  Asset & Skillset
                </label>
                <textarea
                  placeholder="Es. Capitale iniziale 0€, So scrivere, Inglese B2..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full h-40 bg-slate-950 border border-slate-800 px-4 py-3 text-white focus:border-emerald-500 outline-none resize-none font-sans text-sm leading-relaxed transition-colors"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Elaborazione...
                  </>
                ) : (
                  <>
                    Genera Blueprint <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="p-4 bg-red-950/30 border border-red-900/50 text-red-400 text-sm flex items-center gap-3">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Blueprint Output */}
        <div className="lg:col-span-2">
          {strategy ? (
            <div className="bg-slate-900 border border-slate-800 min-h-[500px] relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col">
              {/* Header of Blueprint */}
              <div className="bg-slate-950/50 p-6 border-b border-slate-800 flex justify-between items-center">
                 <div>
                    <h3 className="text-xl font-display font-bold text-white tracking-tight">{strategy.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-emerald-500 text-xs font-mono uppercase tracking-wider">Status: Ottimizzato</p>
                    </div>
                 </div>
                 <Ruler className="text-slate-700 w-6 h-6" />
              </div>
              
              <div className="p-8 prose prose-invert prose-emerald max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-2xl prose-h2:text-lg prose-h2:text-emerald-400 prose-p:text-slate-300 prose-li:text-slate-300 font-sans text-sm leading-7 flex-grow">
                 <ReactMarkdown>
                   {strategy.content}
                 </ReactMarkdown>
              </div>

              {/* Footer of Blueprint */}
              {strategy.groundingUrls && strategy.groundingUrls.length > 0 && (
                <div className="bg-slate-950 p-6 border-t border-slate-800">
                   <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Risorse Validate</h4>
                   <ul className="flex flex-wrap gap-3">
                     {strategy.groundingUrls.map((url, i) => (
                       <li key={i}>
                         <a 
                          href={url.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs transition-colors"
                         >
                           <LinkIcon className="w-3 h-3" />
                           {url.title || "Link Esterno"}
                         </a>
                       </li>
                     ))}
                   </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full border border-dashed border-slate-800 bg-slate-900/30 flex flex-col items-center justify-center text-center p-12">
               <div className="w-16 h-16 border border-slate-700 rounded-full flex items-center justify-center mb-4">
                 <Ruler className="w-6 h-6 text-slate-600" />
               </div>
               <h3 className="text-white font-display text-lg mb-2">In attesa di parametri</h3>
               <p className="text-slate-500 text-sm max-w-xs">Inserisci il tuo target e le tue competenze nel pannello laterale per generare il progetto.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
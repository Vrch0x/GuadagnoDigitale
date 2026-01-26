import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateEarningStrategy } from '../services/gemini';
import { Strategy } from '../types';
import { Sparkles, ArrowRight, Loader2, Link as LinkIcon, AlertTriangle } from 'lucide-react';

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
      setError("Si è verificato un errore durante la generazione della strategia. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          AI Coach Finanziario
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Descrivi le tue competenze e lascia che l'IA crei un piano personalizzato per raggiungere i tuoi 10€/ora o 240€/giorno.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Obiettivo Giornaliero (€)
            </label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Le tue Competenze (Opzionale)
            </label>
            <textarea
              placeholder="Es. Scrittura, Video Editing, Traduzione, Programmazione, Nessuna in particolare..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Elaborazione Piano in corso...
              </>
            ) : (
              <>
                Genera Strategia <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-800 text-red-200 rounded-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Results Section */}
      {strategy && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-slate-800/80 p-6 border-b border-slate-700 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
               <h3 className="text-2xl font-bold text-white">{strategy.title}</h3>
               <p className="text-emerald-400 text-sm font-medium mt-1">Potenziale: {strategy.potentialEarnings}</p>
            </div>
            <div className="flex gap-2">
               <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                 strategy.difficulty === 'Easy' ? 'bg-green-900/30 text-green-300 border-green-700' :
                 strategy.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-300 border-yellow-700' :
                 'bg-red-900/30 text-red-300 border-red-700'
               }`}>
                 Difficoltà: {strategy.difficulty === 'Easy' ? 'Bassa' : strategy.difficulty === 'Medium' ? 'Media' : 'Alta'}
               </span>
            </div>
          </div>
          
          <div className="p-8 prose prose-invert prose-emerald max-w-none">
             <ReactMarkdown
               components={{
                 h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mt-6 mb-4 pb-2 border-b border-slate-700" {...props} />,
                 h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-emerald-400 mt-6 mb-3" {...props} />,
                 h3: ({node, ...props}) => <h3 className="text-lg font-medium text-white mt-4 mb-2" {...props} />,
                 strong: ({node, ...props}) => <strong className="text-emerald-300 font-semibold" {...props} />,
                 ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 text-slate-300" {...props} />,
                 li: ({node, ...props}) => <li className="pl-1" {...props} />,
                 p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
               }}
             >
               {strategy.content}
             </ReactMarkdown>
          </div>

          {/* Grounding Sources */}
          {strategy.groundingUrls && strategy.groundingUrls.length > 0 && (
            <div className="bg-slate-950/50 p-6 border-t border-slate-800">
               <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Fonti & Link Utili</h4>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                 {strategy.groundingUrls.map((url, i) => (
                   <li key={i}>
                     <a 
                      href={url.uri} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 hover:underline text-sm truncate transition-colors"
                     >
                       <LinkIcon className="w-3 h-3 flex-shrink-0" />
                       {url.title || url.uri}
                     </a>
                   </li>
                 ))}
               </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
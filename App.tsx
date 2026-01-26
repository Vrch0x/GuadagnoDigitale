import React, { useState } from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { StrategyAdvisor } from './components/StrategyAdvisor';
import { ResourceList } from './components/ResourceList';
import { ViewState } from './types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.CALCULATOR:
        return <Calculator />;
      case ViewState.STRATEGY:
        return <StrategyAdvisor />;
      case ViewState.RESOURCES:
        return <ResourceList />;
      case ViewState.HOME:
      default:
        return (
          <div className="max-w-4xl mx-auto text-center space-y-12 py-12 animate-in fade-in duration-700">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Strategie Online 2024
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
                Guadagna <span className="text-emerald-400">10€/ora</span><br />
                o <span className="text-emerald-400">240€/giorno</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                La guida definitiva per monetizzare le tue competenze online in Italia. 
                Niente trucchi, solo metodi reali supportati dall'Intelligenza Artificiale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div 
                onClick={() => setCurrentView(ViewState.STRATEGY)}
                className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="h-12 w-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Piano Personalizzato</h3>
                <p className="text-slate-400 mb-4">Usa l'AI per creare una strategia su misura per le tue skills.</p>
                <div className="flex items-center text-emerald-400 text-sm font-medium">
                  Inizia ora <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.CALCULATOR)}
                className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                 <div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Calcola Obiettivi</h3>
                <p className="text-slate-400 mb-4">Visualizza quante ore o progetti ti servono per raggiungere i 240€.</p>
                <div className="flex items-center text-blue-400 text-sm font-medium">
                  Simula <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.RESOURCES)}
                className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                 <div className="h-12 w-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Piattaforme Reali</h3>
                <p className="text-slate-400 mb-4">Lista curata dei migliori siti per trovare lavoro online in Italia.</p>
                <div className="flex items-center text-purple-400 text-sm font-medium">
                  Esplora <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            <div className="pt-8">
               <button 
                onClick={() => setCurrentView(ViewState.STRATEGY)}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-full shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105"
               >
                 Voglio Guadagnare 240€ al Giorno
               </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 font-sans selection:bg-emerald-500/30">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      
      {/* Background Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      <footer className="relative z-10 py-8 text-center text-slate-600 text-sm border-t border-slate-800/50 mt-12">
        <p>© 2024 Guadagno Digitale Italia. Disclaimer: I guadagni non sono garantiti. Questo strumento è solo a scopo informativo.</p>
      </footer>
    </div>
  );
}
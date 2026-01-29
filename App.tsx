import React, { useState } from 'react';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { StrategyAdvisor } from './components/StrategyAdvisor';
import { ResourceList } from './components/ResourceList';
import { ViewState } from './types';
import { ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

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
          <div className="max-w-6xl mx-auto text-center space-y-20 py-16 animate-in fade-in duration-700">
            {/* Hero */}
            <div className="space-y-8 relative">
               {/* Decorative Element */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
               
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full">
                <span className="flex h-2 w-2 relative">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Protocollo 24h Attivo</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight text-white leading-tight">
                Costruisci il tuo<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">Impero Digitale</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Obiettivo: <strong className="text-white font-medium">10€/ora per 24 ore</strong> (240€/giorno).<br/>
                La piattaforma VirtualArchitects utilizza l'AI per progettare la tua strategia finanziaria su misura.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                 <button 
                  onClick={() => setCurrentView(ViewState.STRATEGY)}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-display uppercase tracking-wider text-sm transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center gap-2"
                 >
                   Genera Blueprint <ArrowRight className="w-4 h-4" />
                 </button>
                 <button 
                  onClick={() => setCurrentView(ViewState.CALCULATOR)}
                  className="px-8 py-4 bg-transparent border border-slate-700 hover:border-white text-white font-bold font-display uppercase tracking-wider text-sm transition-all flex items-center gap-2"
                 >
                   Simula Reddito
                 </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800 border border-slate-800">
              <div 
                onClick={() => setCurrentView(ViewState.STRATEGY)}
                className="group cursor-pointer bg-[#020617] p-10 hover:bg-slate-900 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Layers className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Blueprint AI</h3>
                <p className="text-slate-500 text-sm leading-6 mb-6">Algoritmi generativi per creare piani d'azione dettagliati basati sulle tue skill attuali.</p>
                <div className="flex items-center text-emerald-500 text-xs font-bold uppercase tracking-widest">
                  Accesso <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.CALCULATOR)}
                className="group cursor-pointer bg-[#020617] p-10 hover:bg-slate-900 transition-colors relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Layers className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Simulatore</h3>
                <p className="text-slate-500 text-sm leading-6 mb-6">Calcola proiezioni di reddito passivo vs attivo. 10€/h x 24h = Libertà Finanziaria.</p>
                <div className="flex items-center text-blue-500 text-xs font-bold uppercase tracking-widest">
                  Configura <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div 
                onClick={() => setCurrentView(ViewState.RESOURCES)}
                className="group cursor-pointer bg-[#020617] p-10 hover:bg-slate-900 transition-colors relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Layers className="w-24 h-24 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Strumenti</h3>
                <p className="text-slate-500 text-sm leading-6 mb-6">Accesso diretto alle piattaforme di mercato verificate per l'ecosistema italiano.</p>
                <div className="flex items-center text-purple-500 text-xs font-bold uppercase tracking-widest">
                  Esplora <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0"></div>
      
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </main>

      <footer className="relative z-10 py-12 border-t border-slate-800 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                 <div className="w-6 h-6 bg-slate-900 border border-slate-700 flex items-center justify-center">
                  <span className="font-display font-bold text-emerald-500 text-xs">V</span>
                </div>
                <span className="font-display font-bold text-white text-lg">VirtualArchitects</span>
            </div>
            <p className="text-slate-600 text-xs uppercase tracking-widest">Designed by VirtualArchitects © 2024</p>
            <p className="text-slate-700 text-[10px] mt-2 max-w-md mx-auto">
                Disclaimer: Le proiezioni finanziarie sono stime basate su AI. Questo strumento non costituisce consulenza finanziaria legale o fiscale.
            </p>
        </div>
      </footer>
    </div>
  );
}
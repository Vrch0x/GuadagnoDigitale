import React from 'react';
import { ViewState } from '../types';
import { Wallet, Calculator, BrainCircuit, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Vision', icon: Wallet },
    { id: ViewState.CALCULATOR, label: 'Simulatore', icon: Calculator },
    { id: ViewState.STRATEGY, label: 'Blueprint AI', icon: BrainCircuit },
    { id: ViewState.RESOURCES, label: 'Strumenti', icon: LayoutGrid },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView(ViewState.HOME)}>
            <div className="w-10 h-10 bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-emerald-500 transition-colors">
              <span className="font-display font-bold text-emerald-500 text-xl">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-white leading-none tracking-tight">
                Virtual<span className="text-slate-500">Architects</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/80">Finance Division</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  currentView === item.id
                    ? 'text-emerald-400 bg-slate-900 border-b-2 border-emerald-500'
                    : 'text-slate-500 hover:text-white hover:bg-slate-900/50 border-b-2 border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setView(ViewState.STRATEGY)} className="text-emerald-400 font-display font-bold text-sm">
                START
             </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden flex justify-around border-t border-slate-800 bg-[#020617] py-3">
         {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg ${
                   currentView === item.id ? 'text-emerald-400' : 'text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
              </button>
            ))}
      </div>
    </header>
  );
};
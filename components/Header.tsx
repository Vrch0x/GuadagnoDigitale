import React from 'react';
import { ViewState } from '../types';
import { Wallet, Calculator, BrainCircuit, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Home', icon: Wallet },
    { id: ViewState.CALCULATOR, label: 'Calcolatore', icon: Calculator },
    { id: ViewState.STRATEGY, label: 'AI Coach', icon: BrainCircuit },
    { id: ViewState.RESOURCES, label: 'Risorse', icon: LayoutGrid },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Guadagno<span className="text-white">Digitale</span>
            </span>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button - simplified for this demo */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setView(ViewState.STRATEGY)} className="text-emerald-400 font-semibold text-sm">
                Inizia Ora
             </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Bar (Bottom fixed usually, but here simple top sub-nav for simplicity in demo) */}
      <div className="md:hidden flex justify-around border-t border-slate-800 bg-slate-900 py-2">
         {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg ${
                   currentView === item.id ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
      </div>
    </header>
  );
};
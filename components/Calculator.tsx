import React, { useState, useEffect } from 'react';
import { Euro, Clock, Calendar, TrendingUp } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(10);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(20);

  const dailyTotal = hourlyRate * hoursPerDay;
  const monthlyTotal = dailyTotal * daysPerMonth;
  const yearlyTotal = monthlyTotal * 12;

  // Target checker
  const isTargetMet = dailyTotal >= 240;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Simulatore di Guadagno</h2>
        <p className="text-slate-400">Imposta la tua tariffa e le ore di lavoro per vedere il potenziale.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Euro className="w-4 h-4 text-emerald-400" /> Tariffa Oraria (€)
              </label>
              <span className="text-emerald-400 font-mono font-bold text-xl">{hourlyRate}€</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>5€</span>
              <span>100€</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Ore al Giorno
              </label>
              <span className="text-blue-400 font-mono font-bold text-xl">{hoursPerDay}h</span>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              step="0.5"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" /> Giorni al Mese
              </label>
              <span className="text-purple-400 font-mono font-bold text-xl">{daysPerMonth}gg</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className={`p-6 rounded-2xl border transition-all duration-300 ${isTargetMet ? 'bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]' : 'bg-slate-800/50 border-slate-700'}`}>
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Guadagno Giornaliero</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{dailyTotal.toLocaleString('it-IT')}€</span>
              {isTargetMet && <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-medium">Target Raggiunto!</span>}
            </div>
            <p className="text-sm text-slate-500 mt-2">
              {dailyTotal >= 240 
                ? "Ottimo! Hai raggiunto l'obiettivo di 240€ al giorno." 
                : `Ti mancano ${(240 - dailyTotal).toLocaleString('it-IT')}€ per arrivare a 240€.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-xs font-medium text-slate-400 uppercase mb-1">Mensile</h3>
              <p className="text-2xl font-bold text-slate-200">{monthlyTotal.toLocaleString('it-IT')}€</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-xs font-medium text-slate-400 uppercase mb-1">Annuale</h3>
              <p className="text-2xl font-bold text-slate-200">{yearlyTotal.toLocaleString('it-IT')}€</p>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-sm text-slate-400 flex gap-3">
             <TrendingUp className="w-5 h-5 text-yellow-500 flex-shrink-0" />
             <p>
               Per guadagnare 10€/ora netti, considera di chiedere almeno 15-18€ lordi per coprire le tasse e spese in Italia (P. IVA, INPS, etc).
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
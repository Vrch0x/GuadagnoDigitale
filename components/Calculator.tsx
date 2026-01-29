import React, { useState } from 'react';
import { Euro, Clock, Calendar, TrendingUp, Zap, Moon } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(10);
  const [hoursPerDay, setHoursPerDay] = useState<number>(24);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(30);
  const [showNet, setShowNet] = useState(false);

  // Calculate Gross
  const dailyGross = hourlyRate * hoursPerDay;
  const monthlyGross = dailyGross * daysPerMonth;
  const yearlyGross = monthlyGross * 12;

  // Simple Flat Tax Estimation (Forfettario ~5-15% + INPS ~26%, roughly 30-35% total burden for estimation)
  const taxRate = 0.35; 
  const dailyNet = showNet ? dailyGross * (1 - taxRate) : dailyGross;
  const monthlyNet = showNet ? monthlyGross * (1 - taxRate) : monthlyGross;
  const yearlyNet = showNet ? yearlyGross * (1 - taxRate) : yearlyGross;

  // Target checker (240€/day)
  const target = 240;
  const progress = Math.min((dailyNet / target) * 100, 100);

  const setPreset = (type: 'active' | 'passive') => {
    if (type === 'passive') {
      // 10€/h for 24h = 240€
      setHourlyRate(10);
      setHoursPerDay(24);
      setDaysPerMonth(30);
    } else {
      // 30€/h for 8h = 240€
      setHourlyRate(30);
      setHoursPerDay(8);
      setDaysPerMonth(20);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-display font-bold text-white">Simulatore Finanziario</h2>
        <p className="text-slate-400 font-light">Progetta il tuo flusso di reddito. Attivo o Passivo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-8 bg-slate-900/80 p-8 rounded-none border border-slate-800 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setPreset('passive')}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium border transition-all ${hoursPerDay > 16 ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
              <Moon className="w-4 h-4" /> 24h Passivo (10€/h)
            </button>
            <button 
              onClick={() => setPreset('active')}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium border transition-all ${hoursPerDay <= 16 ? 'border-blue-500 bg-blue-500/10 text-blue-400' : 'border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
              <Zap className="w-4 h-4" /> 8h Attivo (30€/h)
            </button>
          </div>

          {/* Sliders */}
          <div className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                  <Euro className="w-3 h-3 text-emerald-500" /> Tariffa Oraria
                </label>
                <div className="bg-slate-950 px-3 py-1 border border-slate-700 font-mono text-emerald-400 font-bold">{hourlyRate} €</div>
              </div>
              <input
                type="range" min="1" max="100" step="1" value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                  <Clock className="w-3 h-3 text-blue-500" /> Ore Operative / Giorno
                </label>
                <div className="bg-slate-950 px-3 py-1 border border-slate-700 font-mono text-blue-400 font-bold">{hoursPerDay} h</div>
              </div>
              <input
                type="range" min="1" max="24" step="1" value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                  <Calendar className="w-3 h-3 text-purple-500" /> Giorni / Mese
                </label>
                <div className="bg-slate-950 px-3 py-1 border border-slate-700 font-mono text-purple-400 font-bold">{daysPerMonth} gg</div>
              </div>
              <input
                type="range" min="1" max="30" step="1" value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 relative overflow-hidden">
             {/* Decorative lines */}
             <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-emerald-500/20 -mt-2 -mr-2"></div>
             <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-emerald-500/20 -mb-2 -ml-2"></div>

             <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-xs font-display font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Proiezione Giornaliera</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold text-white tracking-tight">{Math.floor(dailyNet).toLocaleString('it-IT')}</span>
                    <span className="text-xl text-emerald-500 font-light">.{(dailyNet % 1).toFixed(2).substring(2)}€</span>
                  </div>
               </div>
               <button 
                onClick={() => setShowNet(!showNet)}
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 border transition-colors ${showNet ? 'border-emerald-500 text-emerald-400' : 'border-slate-700 text-slate-500 hover:text-slate-300'}`}
               >
                 {showNet ? 'Netto (Stima)' : 'Lordo'}
               </button>
             </div>

             {/* Progress Bar for 240€ goal */}
             <div className="space-y-2 mb-6">
               <div className="flex justify-between text-xs text-slate-500 font-mono">
                 <span>0€</span>
                 <span>Target: 240€</span>
               </div>
               <div className="h-2 w-full bg-slate-800 overflow-hidden">
                 <div 
                  className={`h-full transition-all duration-500 ease-out ${dailyNet >= 240 ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-900 to-emerald-500'}`}
                  style={{ width: `${progress}%` }}
                 ></div>
               </div>
               {dailyNet >= 240 && (
                 <p className="text-xs text-emerald-400 mt-2 flex items-center gap-2">
                   <Zap className="w-3 h-3" /> Obiettivo raggiunto. Architettura finanziaria solida.
                 </p>
               )}
             </div>

             <div className="grid grid-cols-2 gap-px bg-slate-800 border border-slate-800">
                <div className="bg-slate-900 p-4">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Mensile</div>
                  <div className="text-xl font-display font-bold text-slate-200">{Math.floor(monthlyNet).toLocaleString('it-IT')}€</div>
                </div>
                <div className="bg-slate-900 p-4">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Annuale</div>
                  <div className="text-xl font-display font-bold text-slate-200">{Math.floor(yearlyNet).toLocaleString('it-IT')}€</div>
                </div>
             </div>
          </div>
          
          <div className="p-4 bg-slate-900/50 border-l-2 border-yellow-500 text-xs text-slate-400 leading-relaxed font-mono">
             <TrendingUp className="w-4 h-4 text-yellow-500 mb-2 inline-block mr-2" />
             NOTA: Le stime "Nette" calcolano una deduzione forfettaria del 35% (Tasse + INPS). 
             Per raggiungere 10€/ora netti reali, punta a una tariffa lorda di almeno 15-16€.
          </div>
        </div>
      </div>
    </div>
  );
};
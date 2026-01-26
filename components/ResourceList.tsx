import React from 'react';
import { ExternalLink, Briefcase, PenTool, Code, DollarSign } from 'lucide-react';
import { Resource } from '../types';

export const ResourceList: React.FC = () => {
  const resources: Resource[] = [
    {
      name: 'Fiverr',
      description: 'Piattaforma globale per vendere servizi (Gigs) a partire da 5$.',
      url: 'https://it.fiverr.com/',
      category: 'Micro-jobs',
      icon: 'Briefcase'
    },
    {
      name: 'Upwork',
      description: 'Il più grande marketplace per freelance professionisti.',
      url: 'https://www.upwork.com/',
      category: 'Freelance',
      icon: 'Code'
    },
    {
      name: 'AddLance',
      description: 'Piattaforma italiana per trovare lavori freelance.',
      url: 'https://www.addlance.com/',
      category: 'Freelance',
      icon: 'Briefcase'
    },
    {
      name: 'Vinted',
      description: 'Vendi vestiti e oggetti usati senza commissioni.',
      url: 'https://www.vinted.it/',
      category: 'Micro-jobs',
      icon: 'DollarSign'
    },
    {
      name: 'Etsy',
      description: 'Vendi prodotti artigianali o digitali (printables).',
      url: 'https://www.etsy.com/it/',
      category: 'Content',
      icon: 'PenTool'
    },
    {
      name: 'Melascrivi',
      description: 'Marketplace italiano per content writer e copywriter.',
      url: 'https://www.melascrivi.com/',
      category: 'Content',
      icon: 'PenTool'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Piattaforme Consigliate</h2>
        <p className="text-slate-400">Siti verificati e affidabili per iniziare a guadagnare oggi stesso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-slate-900 rounded-lg group-hover:text-emerald-400 transition-colors text-slate-400">
                    {resource.category === 'Freelance' && <Briefcase className="w-5 h-5" />}
                    {resource.category === 'Tech' && <Code className="w-5 h-5" />}
                    {resource.category === 'Content' && <PenTool className="w-5 h-5" />}
                    {resource.category === 'Micro-jobs' && <DollarSign className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-lg text-slate-100 group-hover:text-white">{resource.name}</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
            </div>
            <p className="text-slate-400 text-sm mb-3">{resource.description}</p>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-slate-900 rounded border border-slate-700 text-slate-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30">
              {resource.category}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
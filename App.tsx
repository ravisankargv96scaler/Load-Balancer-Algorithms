
import React, { useState } from 'react';
import { AlgorithmTab } from './types';
import { Introduction } from './tabs/Introduction';
import { RoundRobin } from './tabs/RoundRobin';
import { WeightedRoundRobin } from './tabs/WeightedRoundRobin';
import { IPHash } from './tabs/IPHash';
import { LeastConnections } from './tabs/LeastConnections';
import { Comparison } from './tabs/Comparison';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AlgorithmTab>(AlgorithmTab.INTRO);

  const renderContent = () => {
    switch (activeTab) {
      case AlgorithmTab.INTRO: return <Introduction />;
      case AlgorithmTab.ROUND_ROBIN: return <RoundRobin />;
      case AlgorithmTab.WEIGHTED_RR: return <WeightedRoundRobin />;
      case AlgorithmTab.IP_HASH: return <IPHash />;
      case AlgorithmTab.LEAST_CONN: return <LeastConnections />;
      case AlgorithmTab.SUMMARY: return <Comparison />;
      default: return <Introduction />;
    }
  };

  const tabs = [
    { id: AlgorithmTab.INTRO, label: '1. Basics', icon: '📖' },
    { id: AlgorithmTab.ROUND_ROBIN, label: '2. Round Robin', icon: '♻️' },
    { id: AlgorithmTab.WEIGHTED_RR, label: '3. Weighted RR', icon: '⚖️' },
    { id: AlgorithmTab.IP_HASH, label: '4. IP Hash', icon: '🔗' },
    { id: AlgorithmTab.LEAST_CONN, label: '5. Least Conn', icon: '⚡' },
    { id: AlgorithmTab.SUMMARY, label: '6. Summary', icon: '📊' },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter">LoadBalance <span className="text-emerald-400">Master</span></h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest -mt-1">System Design Interactive Guide</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
             <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-1 rounded font-bold border border-emerald-500/20">v2.0 STABLE</span>
             <a href="https://github.com" target="_blank" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
             </a>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="max-w-6xl mx-auto mt-10 px-6 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <nav className="lg:col-span-1 space-y-2">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-4 mb-4">Navigation</div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 group ${
                activeTab === tab.id 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent hover:border-slate-800'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{tab.icon}</span>
              <span className="font-bold">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <section className="lg:col-span-3 min-h-[600px] bg-slate-950/50 backdrop-blur-sm rounded-3xl border border-slate-900/50 p-8 shadow-inner shadow-white/5">
          {renderContent()}
        </section>
      </main>

      {/* Footer / Mobile Nav could be here but keeping it clean */}
      <footer className="mt-20 border-t border-slate-900 py-10 px-6 text-center text-slate-600">
        <p className="text-sm">Created for System Design Students & Infrastructure Engineers.</p>
        <p className="text-xs mt-2 mono">"Scalability is the art of handling more with less."</p>
      </footer>
    </div>
  );
};

export default App;

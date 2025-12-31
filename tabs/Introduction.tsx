
import React, { useState } from 'react';

export const Introduction: React.FC = () => {
  const [mode, setMode] = useState<'static' | 'dynamic'>('static');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-emerald-400">The "Brain" of the Load Balancer</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Algorithms decide which backend server gets which request. Think of the Load Balancer as a traffic cop. 
          The complexity of their "decision logic" determines if they are <span className="text-white font-bold">Static</span> or <span className="text-white font-bold">Dynamic</span>.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-4 bg-slate-900 p-2 rounded-full border border-slate-800">
          <button 
            onClick={() => setMode('static')}
            className={`px-8 py-2 rounded-full transition-all font-bold ${mode === 'static' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Static
          </button>
          <button 
            onClick={() => setMode('dynamic')}
            className={`px-8 py-2 rounded-full transition-all font-bold ${mode === 'dynamic' ? 'bg-blue-500 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Dynamic
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          <div className={`p-8 rounded-2xl border transition-all duration-500 ${mode === 'static' ? 'border-emerald-500 bg-emerald-500/5 ring-4 ring-emerald-500/10' : 'border-slate-800 grayscale opacity-50'}`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Static Algorithms</h3>
            </div>
            <p className="text-slate-400 mb-6">
              Requests are distributed based on fixed rules. The Load Balancer <strong>doesn't know or care</strong> about the current load or health of the servers.
            </p>
            <div className="bg-slate-950 p-6 rounded-xl flex items-center justify-center h-48 relative overflow-hidden">
               {/* Static Robot Visual */}
               <div className="text-center">
                  <div className="text-4xl mb-2 animate-bounce">🤖</div>
                  <div className="mono text-xs text-emerald-400">WHILE(TRUE) {`{ NEXT_SERVER(); }`}</div>
                  <div className="flex space-x-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className={`p-8 rounded-2xl border transition-all duration-500 ${mode === 'dynamic' ? 'border-blue-500 bg-blue-500/5 ring-4 ring-blue-500/10' : 'border-slate-800 grayscale opacity-50'}`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Dynamic Algorithms</h3>
            </div>
            <p className="text-slate-400 mb-6">
              The Load Balancer actively checks server health, current active connections, and latency before deciding. It <strong>adjusts in real-time</strong>.
            </p>
            <div className="bg-slate-950 p-6 rounded-xl flex items-center justify-center h-48 relative overflow-hidden">
               {/* Dynamic Robot Visual */}
               <div className="text-center relative">
                  <div className="text-4xl mb-2">👁️‍🗨️🤖</div>
                  <div className="flex space-x-4 mt-4">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-2 bg-slate-800 rounded-full relative overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-red-500 h-[80%] animate-pulse"></div>
                      </div>
                      <span className="text-[8px] mt-1 text-slate-500">CPU</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-2 bg-slate-800 rounded-full relative overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-emerald-500 h-[20%]"></div>
                      </div>
                      <span className="text-[8px] mt-1 text-slate-500">RAM</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-2 bg-slate-800 rounded-full relative overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-blue-500 h-[45%]"></div>
                      </div>
                      <span className="text-[8px] mt-1 text-slate-500">LAT</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

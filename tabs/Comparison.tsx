
import React, { useState } from 'react';

const COMPARISON_DATA = [
  {
    id: 'round-robin',
    name: 'Round Robin',
    type: 'Static',
    useCase: 'Simple sites with identical servers.',
    speed: 'High',
    complexity: 'Low'
  },
  {
    id: 'weighted-rr',
    name: 'Weighted RR',
    type: 'Static',
    useCase: 'Mixing powerful & weak hardware.',
    speed: 'High',
    complexity: 'Medium'
  },
  {
    id: 'ip-hash',
    name: 'IP Hash',
    type: 'Static',
    useCase: 'E-commerce shopping cart / Sticky sessions.',
    speed: 'Medium',
    complexity: 'Medium'
  },
  {
    id: 'least-conn',
    name: 'Least Connections',
    type: 'Dynamic',
    useCase: 'Database queries, video streaming.',
    speed: 'Medium',
    complexity: 'High'
  }
];

export const Comparison: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Cheat Sheet & Summary</h2>
        <p className="text-slate-400">Picking the right tool for the job.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left">
          <thead className="bg-slate-950 border-b border-slate-800">
            <tr>
              <th className="p-5 font-bold text-slate-400 uppercase text-xs tracking-widest">Algorithm</th>
              <th className="p-5 font-bold text-slate-400 uppercase text-xs tracking-widest">Type</th>
              <th className="p-5 font-bold text-slate-400 uppercase text-xs tracking-widest">Best Use Case</th>
              <th className="p-5 font-bold text-slate-400 uppercase text-xs tracking-widest text-center">Implementation Complexity</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((algo) => (
              <tr 
                key={algo.id}
                onMouseEnter={() => setHoveredId(algo.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`border-b border-slate-800/50 transition-all cursor-default ${
                  hoveredId === algo.id ? 'bg-indigo-500/10' : ''
                }`}
              >
                <td className="p-5">
                  <span className="font-bold text-white text-lg">{algo.name}</span>
                </td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    algo.type === 'Dynamic' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {algo.type}
                  </span>
                </td>
                <td className="p-5">
                  <p className="text-slate-400 text-sm max-w-xs">{algo.useCase}</p>
                </td>
                <td className="p-5 text-center">
                   <div className="flex justify-center space-x-1">
                      {[1,2,3].map(i => (
                        <div key={i} className={`h-2 w-4 rounded-sm ${
                          (algo.complexity === 'Low' && i <= 1) || 
                          (algo.complexity === 'Medium' && i <= 2) || 
                          (algo.complexity === 'High' && i <= 3) 
                          ? 'bg-indigo-500' : 'bg-slate-800'
                        }`}></div>
                      ))}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h4 className="font-bold text-white mb-3">When to pick Static?</h4>
          <p className="text-sm text-slate-500">
            Choose Static algorithms when your tasks are small, fast, and similar in nature (e.g., serving static images or simple HTML pages). They offer the lowest latency for the load balancer itself.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h4 className="font-bold text-white mb-3">When to pick Dynamic?</h4>
          <p className="text-sm text-slate-500">
            Choose Dynamic algorithms when tasks vary in complexity (e.g., some database queries take 10ms, others take 2s). This prevents "head-of-line blocking" where one server gets overwhelmed by heavy tasks.
          </p>
        </div>
      </div>
    </div>
  );
};

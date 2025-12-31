
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ServerNode } from '../components/ServerNode';

export const WeightedRoundRobin: React.FC = () => {
  const [weights, setWeights] = useState<number[]>([3, 1, 1]);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async () => {
    setIsSimulating(true);
    setCounts([0, 0, 0]);
    
    let currentCounts = [0, 0, 0];
    const totalRequests = 20;
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    for (let i = 0; i < totalRequests; i++) {
      // Find which server's turn it is based on weights
      // Simple implementation: repeat each server 'weight' times
      let selectedIdx = 0;
      let cumulative = 0;
      const normalizedI = i % totalWeight;
      
      for(let j=0; j<weights.length; j++) {
        cumulative += weights[j];
        if(normalizedI < cumulative) {
          selectedIdx = j;
          break;
        }
      }

      currentCounts[selectedIdx]++;
      setCounts([...currentCounts]);
      await new Promise(r => setTimeout(r, 100));
    }
    setIsSimulating(false);
  };

  const chartData = [
    { name: 'Server A', value: counts[0], color: '#34d399' },
    { name: 'Server B', value: counts[1], color: '#3b82f6' },
    { name: 'Server C', value: counts[2], color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Weighted Round Robin</h2>
        <p className="text-slate-400">Assign higher weights to more powerful servers so they handle more traffic.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {['A', 'B', 'C'].map((name, i) => (
          <div key={name} className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
             <div className="mb-4">
               <ServerNode 
                name={`Server ${name}`} 
                isActive={false} 
                label="Weight" 
                value={weights[i]}
                colorClass={i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-amber-500'}
              />
             </div>
             <div className="flex items-center space-x-2 w-full mt-2">
                <input 
                  type="range" min="1" max="10" value={weights[i]} 
                  onChange={(e) => {
                    const newWeights = [...weights];
                    newWeights[i] = parseInt(e.target.value);
                    setWeights(newWeights);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="mono font-bold text-slate-300 w-8 text-center">{weights[i]}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <button 
          onClick={runSimulation}
          disabled={isSimulating}
          className={`px-12 py-4 rounded-xl font-bold text-lg shadow-xl transition-all ${
            isSimulating ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 active:scale-95'
          }`}
        >
          {isSimulating ? 'Simulating...' : 'Run Simulation (20 Requests)'}
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
        <h3 className="text-lg font-bold mb-6 text-center text-slate-400 uppercase tracking-widest">Final Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                cursor={{ fill: '#1e293b' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

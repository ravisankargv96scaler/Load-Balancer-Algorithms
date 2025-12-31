
import React, { useState, useEffect } from 'react';
import { ServerNode } from '../components/ServerNode';

export const RoundRobin: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [packets, setPackets] = useState<{ id: number; target: number }[]>([]);
  const [counter, setCounter] = useState(0);

  const sendRequest = () => {
    const nextIdx = (currentIndex + 1) % 3;
    setCurrentIndex(nextIdx);
    const newId = Date.now();
    setPackets(prev => [...prev, { id: newId, target: nextIdx }]);
    setCounter(prev => prev + 1);

    // Remove packet after animation
    setTimeout(() => {
      setPackets(prev => prev.filter(p => p.id !== newId));
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Round Robin (The Basic)</h2>
        <p className="text-slate-400">Cycles through servers sequentially: A &rarr; B &rarr; C &rarr; A...</p>
      </div>

      <div className="flex flex-col items-center justify-center py-12 space-y-24 bg-slate-900/20 rounded-3xl relative overflow-hidden">
        {/* Load Balancer Input */}
        <div className="relative z-10">
          <button 
            onClick={sendRequest}
            className="group relative flex flex-col items-center focus:outline-none"
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all">
               <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="mt-4 font-bold mono text-sm tracking-tighter text-emerald-400 uppercase">Send Request #{counter}</span>
          </button>
        </div>

        {/* Animation Zone */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          {packets.map(p => (
            <div 
              key={p.id}
              className="absolute w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] z-20 packet-animation"
              style={{
                left: 'calc(50% - 8px)',
                top: 'calc(50% - 130px)',
                '--tw-translate-x': `${(p.target - 1) * 200}px`
              } as any}
            ></div>
          ))}
        </div>

        {/* Backend Servers */}
        <div className="flex justify-center space-x-12 md:space-x-32 relative z-10">
          <ServerNode name="Server A" isActive={currentIndex === 0} />
          <ServerNode name="Server B" isActive={currentIndex === 1} />
          <ServerNode name="Server C" isActive={currentIndex === 2} />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h4 className="font-bold mb-2 text-slate-300">Why use it?</h4>
        <ul className="text-slate-400 text-sm space-y-2 list-disc pl-5">
          <li>Simple to implement and low overhead.</li>
          <li>Ideal when all servers have identical hardware specifications.</li>
          <li>Works well when tasks are roughly the same size/duration.</li>
        </ul>
      </div>
    </div>
  );
};

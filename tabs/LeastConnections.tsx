
import React, { useState, useEffect } from 'react';
import { ServerNode } from '../components/ServerNode';

export const LeastConnections: React.FC = () => {
  const [servers, setServers] = useState([
    { id: 0, name: 'Server A', connections: 12 },
    { id: 1, name: 'Server B', connections: 4 },
    { id: 2, name: 'Server C', connections: 18 },
  ]);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const addNewRequest = () => {
    // Find server with least connections
    const least = [...servers].sort((a, b) => a.connections - b.connections)[0];
    
    setAnimatingId(least.id);
    
    setTimeout(() => {
      setServers(prev => prev.map(s => 
        s.id === least.id ? { ...s, connections: s.connections + 1 } : s
      ));
      setAnimatingId(null);
    }, 600);
  };

  const finishTask = (id: number) => {
    setServers(prev => prev.map(s => 
      s.id === id ? { ...s, connections: Math.max(0, s.connections - 1) } : s
    ));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Least Connections</h2>
        <p className="text-slate-400">Routes traffic to the server currently processing the fewest active tasks. Highly dynamic.</p>
      </div>

      <div className="flex justify-center mb-12">
        <button 
          onClick={addNewRequest}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl flex items-center space-x-3 transition-all active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Incoming Request</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {servers.map(server => (
          <div key={server.id} className="flex flex-col space-y-4">
            <ServerNode 
              name={server.name} 
              isActive={animatingId === server.id} 
              label="Active Conn"
              value={server.connections}
              colorClass="bg-blue-500"
            />
            <button 
              onClick={() => finishTask(server.id)}
              className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-red-400 transition-colors bg-slate-900 border border-slate-800 py-2 rounded-lg"
            >
              Finish Task (Complete)
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-900/10 border border-blue-500/20 p-8 rounded-2xl">
        <h3 className="font-bold text-blue-400 mb-4 uppercase text-sm">How it works</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          The Load Balancer maintains a table of active connections to each backend server. When a request arrives, it simply checks the table and picks the entry with the lowest number.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl">
            <div className="text-white font-bold mb-1">Pros</div>
            <p className="text-xs text-slate-500">Very effective for long-lived connections (like streaming or databases) where task durations vary significantly.</p>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl">
            <div className="text-white font-bold mb-1">Cons</div>
            <p className="text-xs text-slate-500">More complex to monitor; requires the Load Balancer to track connection states continuously.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

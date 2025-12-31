
import React, { useState } from 'react';
import { ServerNode } from '../components/ServerNode';

export const IPHash: React.FC = () => {
  const [activeClient, setActiveClient] = useState<number | null>(null);
  const [hashResult, setHashResult] = useState<string | null>(null);
  const [targetServer, setTargetServer] = useState<number | null>(null);
  const [packets, setPackets] = useState<{ id: number; color: string; target: number }[]>([]);

  const clients = [
    { id: 1, ip: '192.168.1.5', color: 'bg-blue-400', serverIdx: 0 },
    { id: 2, ip: '10.0.0.9', color: 'bg-orange-400', serverIdx: 2 },
  ];

  const simulateRequest = (clientId: number) => {
    const client = clients.find(c => c.id === clientId)!;
    setActiveClient(clientId);
    setTargetServer(client.serverIdx);
    setHashResult(`Hash("${client.ip}") % 3 = ${client.serverIdx}`);

    const newPacketId = Date.now();
    setPackets(prev => [...prev, { id: newPacketId, color: client.color, target: client.serverIdx }]);

    setTimeout(() => {
      setPackets(prev => prev.filter(p => p.id !== newPacketId));
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">IP Hashing (Sticky Sessions)</h2>
        <p className="text-slate-400">Uses the client's IP to calculate a hash, ensuring the same client always reaches the same server.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-center space-y-4">
          <h3 className="font-bold text-slate-300 mb-2 uppercase text-xs tracking-widest">Select Client</h3>
          {clients.map(client => (
            <button
              key={client.id}
              onClick={() => simulateRequest(client.id)}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                activeClient === client.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${client.color}`}></div>
                <div className="text-left">
                  <div className="font-bold text-white">Client {client.id}</div>
                  <div className="mono text-xs text-slate-500">{client.ip}</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ))}

          {hashResult && (
            <div className="mt-8 p-4 bg-slate-950 border border-indigo-500/30 rounded-lg text-center">
              <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">Hash Logic</div>
              <div className="mono text-lg font-bold text-white tracking-tighter">{hashResult}</div>
            </div>
          )}
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl flex flex-col items-center space-y-12 relative overflow-hidden">
           {/* Visual simulation zone */}
           <div className="h-64 w-full relative flex items-center justify-center">
              {packets.map(p => (
                <div 
                  key={p.id}
                  className={`absolute w-5 h-5 rounded-full shadow-lg packet-animation ${p.color}`}
                  style={{
                    top: '20px',
                    left: 'calc(50% - 10px)',
                    '--tw-translate-x': `${(p.target - 1) * 110}px`
                  } as any}
                ></div>
              ))}
              
              <div className="flex space-x-4 mt-auto">
                 <ServerNode name="Srv A" isActive={targetServer === 0} value="IP Range 1" label="Assigned" />
                 <ServerNode name="Srv B" isActive={targetServer === 1} value="IP Range 2" label="Assigned" />
                 <ServerNode name="Srv C" isActive={targetServer === 2} value="IP Range 3" label="Assigned" />
              </div>
           </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-xl">
        <h4 className="font-bold text-amber-500 mb-2 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Crucial for State
        </h4>
        <p className="text-slate-400 text-sm">
          If your application stores user data (like a shopping cart) in memory on the server, you <strong>must</strong> use IP Hashing or Session Affinity to ensure the user doesn't lose their data by jumping between servers.
        </p>
      </div>
    </div>
  );
};


import React from 'react';

interface ServerNodeProps {
  name: string;
  isActive: boolean;
  colorClass?: string;
  label?: string;
  value?: string | number;
  icon?: React.ReactNode;
}

export const ServerNode: React.FC<ServerNodeProps> = ({ 
  name, 
  isActive, 
  colorClass = 'bg-emerald-500', 
  label, 
  value,
  icon
}) => {
  return (
    <div className={`relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-300 ${
      isActive ? `border-emerald-400 scale-105 shadow-[0_0_20px_rgba(52,211,153,0.3)]` : 'border-slate-800 bg-slate-900/50'
    }`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${isActive ? colorClass : 'bg-slate-800'}`}>
        {icon || (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        )}
      </div>
      <h3 className="text-sm font-bold mono uppercase tracking-wider text-slate-400">{name}</h3>
      
      {(label || value !== undefined) && (
        <div className="mt-4 flex flex-col items-center">
          <span className="text-[10px] text-slate-500 uppercase font-semibold">{label}</span>
          <span className="text-xl font-bold text-white mono">{value}</span>
        </div>
      )}

      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
      )}
    </div>
  );
};

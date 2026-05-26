import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  '[*] INITIALIZING SECURE INTERFACE CONSOLE v4.2.0-RELEASE...',
  '[*] ESTABLISHING COMPLIANCE HANDSHAKE WITH PORTAL...',
  '[+] COMPLIANCE: SECURE // ENCRYPTION: AES-GCM-256',
  '[*] RESOLVING SENDER GEOMETRY DATA...',
  '[+] GEO_IP: 104.21.32.11 // LOCATION: Vadodara, Gujarat, IN',
  '[*] AUDITING FIREWALL INTEGRITY PACKETS...',
  '[+] NET_SEC: ACTIVE // PORT_443: LISTENING // PORT_80: BLOCKED',
  '[*] DECRYPTING CYBERSECURITY DOSSIERS...',
  '[+] DOSSIER HASH: SHA256[0x8F9A5D6B2C4D...]',
  '[*] STAGING ARSENAL AND TECHNICAL MODULES...',
  '[+] CORE SECURITY STACKS LOADED SUCCESSFULLY.',
  '[*] ESTABLISHING SECURE PORTFOLIO SESSION TUNNEL...',
  '[+] PROTOCOL STACK: OBSIDIAN_PROTOCOL v1.2',
  '[*] AUTHORIZING VISITOR ACCESS...',
  '[+] ENTRY ACCESS GRANTED. WELCOME SENDER.'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // Staggered log printing
  useEffect(() => {
    if (logIndex < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
        setLogIndex(prev => prev + 1);
        setProgress(Math.round(((logIndex + 1) / BOOT_LOGS.length) * 100));
      }, Math.max(100, Math.random() * 220));
      return () => clearTimeout(timeout);
    } else {
      const endTimeout = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(endTimeout);
    }
  }, [logIndex, onComplete]);

  return (
    <motion.div
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: 'easeInOut' } 
      }}
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col justify-between p-6 sm:p-12 font-mono select-none overflow-hidden"
    >
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-[0.15] pointer-events-none" />
      <div className="absolute inset-0 dot-matrix opacity-[0.2] pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="flex justify-between items-center text-[10px] text-cyan-500/50 relative z-10">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          SYSTEM_BOOT_CONSOLE // NODE: VADODARA_IN
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          INITIALIZATION_STAGE
        </span>
      </div>

      {/* Center Console Content */}
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1 justify-center py-8 relative z-10">
        {/* Terminal Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative p-3 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
            <Shield className="w-10 h-10 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 rounded-2xl blur-md bg-cyan-500/10" />
          </div>
          <div>
            <h1 className="font-cyber font-black text-2xl tracking-widest text-white leading-none">
              OBSIDIAN PROTOCOL
            </h1>
            <p className="text-[10px] text-slate-500 tracking-wider mt-1.5">
              RESTRICTED AREA // DIGITAL INTEL PORTFOLIO OF HARSH RATHORE
            </p>
          </div>
        </div>

        {/* Boot Terminal Box */}
        <div 
          className="w-full rounded-2xl p-5 sm:p-6 overflow-hidden flex flex-col h-[280px] sm:h-[320px] text-left"
          style={{
            background: 'rgba(3,5,15,0.85)',
            border: '1px solid rgba(6,182,212,0.12)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          }}
        >
          {/* Box Header Decorator */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-800/40 text-[9px] text-slate-500">
            <span>SECURE_BOOT // BOOT_STREAM</span>
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
            </div>
          </div>

          {/* Scrolling log text */}
          <div className="flex-1 overflow-y-auto space-y-2 text-xs text-slate-300 pr-2 scrollbar-none">
            {logs.map((log, idx) => {
              let colorClass = 'text-slate-400';
              if (log.startsWith('[+]')) {
                colorClass = 'text-cyan-400 font-bold';
              } else if (log.includes('ACCESS GRANTED') || log.includes('WELCOME')) {
                colorClass = 'text-emerald-400 font-bold';
              }
              return (
                <div key={idx} className={`${colorClass} flex items-start gap-2`}>
                  <span className="text-cyan-700/60 select-none">{(idx + 1).toString().padStart(2, '0')}</span>
                  <span>{log}</span>
                </div>
              );
            })}
            {logIndex < BOOT_LOGS.length && (
              <div className="text-cyan-400 animate-pulse flex items-center gap-1">
                <span className="text-cyan-700/60 select-none">{(logIndex + 1).toString().padStart(2, '0')}</span>
                <span>📡 Connecting...</span>
                <span className="w-1.5 h-3 bg-cyan-400 inline-block align-middle" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col gap-3">
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          <span>INITIALIZATION_RATIO: {progress}%</span>
          <span className="text-cyan-400">EST_TIME: {((BOOT_LOGS.length - logIndex) * 0.15).toFixed(1)}s</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-900">
          <motion.div
            className="h-full rounded-full relative"
            style={{
              background: 'linear-gradient(90deg, #06b6d4 0%, #3b82f6 50%, #a855f7 100%)',
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          >
            {/* Glossy light effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          </motion.div>
        </div>
        
        {/* Footer legalities */}
        <div className="flex justify-between items-center text-[8px] text-slate-600 mt-2">
          <span>PARUL_UNIVERSITY // DEPARTMENT_OF_CYBER_SECURITY</span>
          <span>© {new Date().getFullYear()} HARSH RATHORE // PRIVATE IP ONLY</span>
        </div>
      </div>
    </motion.div>
  );
};

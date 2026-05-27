import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Terminal, X, Lock, CheckCircle } from 'lucide-react';

const TEXT_SEC_DECRYPT = 'SEC_DECRYPT // SYMMETRIC_DECRYPTOR';
const TEXT_DECRYPTED_ARCHIVE = 'DECRYPTED_ARCHIVE // VERIFIED';
const TEXT_DECRYPTING_CREDENTIAL = 'DECRYPTING_CREDENTIAL...';
const TEXT_TARGET = 'TARGET: ';
const TEXT_DECRYPTING_BLOCKS = '⌛ Decrypting blocks...';
const TEXT_DECRYPT_RATIO = 'DECRYPT_RATIO: ';
const TEXT_KEY = 'KEY: AES_GCM_256';
const TEXT_CREDENTIAL_RECORD_DECRYPTED = 'CREDENTIAL_RECORD_DECRYPTED';
const TEXT_CREDENTIAL_NAME = 'CREDENTIAL NAME';
const TEXT_ISSUER = 'ISSUER';
const TEXT_DATE_ISSUED = 'DATE ISSUED';
const TEXT_VERIFIED_SHA_CORRELATION = 'VERIFIED SHA256 CORRELATION';
const TEXT_SHA_PREFIX = 'SHA256[0x';
const TEXT_SHA_SUFFIX = '_COMPLIANT_SSL]';
const TEXT_DOWNLOAD_CERTIFICATE = 'DOWNLOAD CERTIFICATE';
const TEXT_CLOSE = 'CLOSE';

interface DecryptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  certName: string;
  certOrg: string;
  certDate: string;
  certLevel: string;
  certUrl: string;
}

export const DecryptionModal: React.FC<DecryptionModalProps> = ({
  isOpen,
  onClose,
  certName,
  certOrg,
  certDate,
  certLevel,
  certUrl
}) => {
  const [progress, setProgress] = useState(0);
  const [decryptionLogs, setDecryptionLogs] = useState<string[]>([]);
  const [stage, setStage] = useState<'decrypting' | 'completed'>('decrypting');

  const decryptionSteps = [
    '[*] CONNECTING TO ENCRYPTED CREDENTIAL DATABASE...',
    '[*] INITIATING DECRYPTION PROTOCOL [AES-256-GCM]...',
    '[*] VERIFYING ISSUER DIGITAL SIGNATURES...',
    '[*] CORRELATING METADATA INTEGRITY CHECKS...',
    '[*] SECURE CERTIFICATE DECRYPTION SUCCESSFUL!'
  ];

  useEffect(() => {
    if (!isOpen) return;

    setProgress(0);
    setStage('decrypting');
    setDecryptionLogs([]);

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < decryptionSteps.length) {
        setDecryptionLogs(prev => [...prev, decryptionSteps[stepIdx]]);
        setProgress(Math.round(((stepIdx + 1) / decryptionSteps.length) * 100));
        stepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStage('completed');
        }, 400);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 25 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl rounded-2xl overflow-hidden glass-panel border shadow-2xl flex flex-col min-h-[380px]"
          style={{
            borderColor: stage === 'decrypting' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(6, 182, 212, 0.3)',
            boxShadow: stage === 'decrypting' 
              ? '0 0 35px rgba(168, 85, 247, 0.12)' 
              : '0 0 35px rgba(6, 182, 212, 0.15)',
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60 font-mono text-[10px]"
          >
            <div className="flex items-center gap-2">
              <Terminal className={`w-4 h-4 ${stage === 'decrypting' ? 'text-purple-400 animate-pulse' : 'text-cyan-400'}`} />
              <span className="text-slate-400 tracking-wider">
                {stage === 'decrypting' ? TEXT_SEC_DECRYPT : TEXT_DECRYPTED_ARCHIVE}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-900 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main content area */}
          <div className="flex-1 p-6 font-mono flex flex-col justify-center min-h-[250px] bg-[#030510]/95 select-none text-left">
            <AnimatePresence mode="wait">
              {stage === 'decrypting' ? (
                // 1. Loading Decryption Sequence
                <motion.div
                  key="decrypting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <Lock className="w-8 h-8 text-purple-400 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-widest uppercase">
                        {TEXT_DECRYPTING_CREDENTIAL}
                      </h4>
                      <p className="text-[9px] text-slate-500 mt-1 uppercase">
                        {TEXT_TARGET}{certName.replace(/ /g, '_')}
                      </p>
                    </div>
                  </div>

                  {/* Terminal Log Console */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-[11px] leading-relaxed h-[130px] overflow-y-auto space-y-1.5 scrollbar-none">
                    {decryptionLogs.map((log, idx) => (
                      <div key={idx} className={log.startsWith('[+]') ? 'text-purple-400' : 'text-slate-400'}>
                        {log}
                      </div>
                    ))}
                    {decryptionLogs.length < decryptionSteps.length && (
                      <div className="text-purple-500 animate-pulse flex items-center gap-1">
                        <span>{TEXT_DECRYPTING_BLOCKS}</span>
                        <span className="w-1 h-3 bg-purple-500 inline-block align-middle" />
                      </div>
                    )}
                  </div>

                  {/* Progress ratio indicator */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-widest">
                      <span>{TEXT_DECRYPT_RATIO}{progress}%</span>
                      <span>{TEXT_KEY}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-900">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-150"
                        style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(168,85,247,0.5)' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                // 2. Decryption Completed - Show Document preview
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white tracking-widest uppercase">
                      {TEXT_CREDENTIAL_RECORD_DECRYPTED}
                    </h4>
                  </div>

                  {/* Certificate Document Card */}
                  <div 
                    className="p-5 sm:p-6 rounded-xl relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(168,85,247,0.03) 100%)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                    }}
                  >
                    {/* Retro Grid Background */}
                    <div className="absolute inset-0 cyber-grid opacity-[0.05] pointer-events-none" />

                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest">{TEXT_CREDENTIAL_NAME}</span>
                          <h3 className="font-cyber font-black text-base text-white tracking-wide mt-1 leading-tight">
                            {certName}
                          </h3>
                        </div>
                        <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[8px] font-bold">
                          {certLevel}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800/40">
                        <div>
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest">{TEXT_ISSUER}</span>
                          <p className="text-[11px] text-slate-300 font-bold mt-0.5">{certOrg}</p>
                        </div>
                        <div>
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest">{TEXT_DATE_ISSUED}</span>
                          <p className="text-[11px] text-slate-300 font-bold mt-0.5">{certDate}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/40">
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest">{TEXT_VERIFIED_SHA_CORRELATION}</span>
                        <p className="text-[9px] text-slate-500 font-mono break-all mt-0.5">
                          {TEXT_SHA_PREFIX}{((certName.length + 12) * 5191).toString(16).toUpperCase()}{TEXT_SHA_SUFFIX}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={certUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                      style={{
                        boxShadow: '0 0 15px rgba(6,182,212,0.25)',
                      }}
                    >
                      <Download className="w-4 h-4" />
                      {TEXT_DOWNLOAD_CERTIFICATE}
                    </a>
                    <button
                      onClick={onClose}
                      className="px-4 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-white/4 font-mono text-xs transition-all"
                    >
                      {TEXT_CLOSE}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

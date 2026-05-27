import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, ArrowRight, CornerDownLeft, Shield, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDiagnostics: () => void;
}

interface CommandItem {
  command: string;
  description: string;
  category: 'Navigation' | 'System' | 'Utilities';
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onRunDiagnostics }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command database
  const commands: CommandItem[] = [
    {
      command: '/goto home',
      description: 'Scroll to the top hero section',
      category: 'Navigation',
      action: () => scrollToSection('home')
    },
    {
      command: '/goto about',
      description: 'Scroll to the classified about dossier',
      category: 'Navigation',
      action: () => scrollToSection('about')
    },
    {
      command: '/goto skills',
      description: 'Scroll to technical skills arsenal',
      category: 'Navigation',
      action: () => scrollToSection('skills')
    },
    {
      command: '/goto experience',
      description: 'Scroll to professional history logs',
      category: 'Navigation',
      action: () => scrollToSection('experience')
    },
    {
      command: '/goto certs',
      description: 'Scroll to credentials and certifications',
      category: 'Navigation',
      action: () => scrollToSection('certifications')
    },
    {
      command: '/goto projects',
      description: 'Scroll to security project reports',
      category: 'Navigation',
      action: () => scrollToSection('projects')
    },
    {
      command: '/goto achievements',
      description: 'Scroll to achievements and bootcamp history',
      category: 'Navigation',
      action: () => scrollToSection('achievements')
    },
    {
      command: '/goto contact',
      description: 'Scroll to email communication channel',
      category: 'Navigation',
      action: () => scrollToSection('contact')
    },
    {
      command: '/theme toggle',
      description: `Switch interface to ${theme === 'dark' ? 'LIGHT_MODE' : 'DARK_MODE'}`,
      category: 'System',
      action: () => toggleTheme()
    },
    {
      command: '/system diagnostics',
      description: 'Trigger full security scan sequences',
      category: 'System',
      action: () => {
        onRunDiagnostics();
        scrollToSection('home');
      }
    },
    {
      command: '/download resume',
      description: 'Fetch official PDF resume file',
      category: 'Utilities',
      action: () => {
        const link = document.createElement('a');
        link.href = '/Resume.pdf';
        link.download = 'Harsh_Rathore_Resume.pdf';
        link.click();
      }
    }
  ];

  // Filtering based on search
  const filteredCommands = commands.filter(item =>
    item.command.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation & Event listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // Close first if open, handled below
        // If closed, trigger open
        if (!isOpen) {
          onClose(); // Reset state
          // Toggle
          const btn = document.getElementById('cmd-palette-btn');
          if (btn) btn.click();
        }
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, theme]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Sync scroll positioning of active list item
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const activeEl = listEl.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#020617]/85 backdrop-blur-[12px]"
            onClick={onClose}
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden glass-panel border shadow-2xl flex flex-col max-h-[450px]"
            style={{
              borderColor: 'rgba(6, 182, 212, 0.25)',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.12)',
            }}
          >
            {/* Top scanning animation line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />

            {/* Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800/60 bg-slate-950/40">
              <Search className="w-5 h-5 text-cyan-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or keyword... (e.g. /goto, /theme)"
                className="flex-1 bg-transparent font-mono text-sm text-white placeholder-slate-600 outline-none border-none"
              />
              <span className="font-mono text-[9px] text-slate-500 bg-slate-950 border border-slate-800/50 px-2 py-1 rounded">
                ESC TO EXIT
              </span>
            </div>

            {/* Suggestions & List */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-4 cyber-scrollbar bg-[#030612]/95 select-none">
              {filteredCommands.length > 0 ? (
                // Grouping by Category
                ['Navigation', 'System', 'Utilities'].map(cat => {
                  const catCommands = filteredCommands.filter(c => c.category === cat);
                  if (catCommands.length === 0) return null;

                  return (
                    <div key={cat} className="space-y-1.5">
                      <h4 className="font-mono text-[9px] font-bold text-slate-600 tracking-widest uppercase px-3">
                        {cat} COMMANDS
                      </h4>
                      <div className="space-y-1">
                        {catCommands.map(item => {
                          const globalIdx = filteredCommands.indexOf(item);
                          const isActive = globalIdx === selectedIndex;

                          return (
                            <button
                              key={item.command}
                              data-active={isActive}
                              onClick={() => {
                                item.action();
                                onClose();
                              }}
                              className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between font-mono text-xs ${
                                isActive
                                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                                  : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Terminal className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                                <div className="flex flex-col">
                                  <span className={isActive ? 'text-white font-bold' : 'text-slate-300'}>
                                    {item.command}
                                  </span>
                                  <span className="text-[10px] text-slate-500 mt-0.5">
                                    {item.description}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5">
                                {isActive ? (
                                  <span className="flex items-center gap-1 text-[9px] text-cyan-500/80 bg-cyan-950/50 border border-cyan-500/20 px-1.5 py-0.5 rounded">
                                    EXECUTE
                                    <CornerDownLeft className="w-2.5 h-2.5" />
                                  </span>
                                ) : (
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-500 space-y-2">
                  <HelpCircle className="w-8 h-8 text-slate-700 mx-auto" />
                  <p className="font-mono text-xs">NO COMMANDS MATCHED YOUR SEARCH</p>
                  <p className="text-[10px] text-slate-600">Try searching for keywords like "/goto" or "/theme"</p>
                </div>
              )}
            </div>

            {/* Bottom Status bar */}
            <div className="px-5 py-2.5 border-t border-slate-800/60 bg-slate-950/50 font-mono text-[9px] text-slate-500 flex justify-between items-center">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-cyan-500/60" />
                CONSOLE_MODE: PRIVILEGED
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ArrowRight className="w-2.5 h-2.5" />
                  ↑↓ NAVIGATE
                </span>
                <span className="flex items-center gap-1">
                  <ArrowRight className="w-2.5 h-2.5" />
                  ENTER EXECUTE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

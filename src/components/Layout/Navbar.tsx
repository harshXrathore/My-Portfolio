import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Zap, Search, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onOpenPalette: () => void;
}

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certs' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievement' },
    { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenPalette }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleTabClick = (tabId: string) => {
        setIsOpen(false);
        const target = document.getElementById(tabId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveTab(tabId);
        }
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-[calc(100%-2rem)] top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${
                scrolled ? 'shadow-2xl shadow-cyan-950/30' : ''
            }`}
            style={{
                background: theme === 'dark' ? 'rgba(4, 7, 18, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderTop: theme === 'dark' ? '1px solid rgba(6,182,212,0.15)' : '1px solid rgba(14,165,233,0.2)',
                borderLeft: theme === 'dark' ? '1px solid rgba(6,182,212,0.1)' : '1px solid rgba(14,165,233,0.15)',
                borderRight: theme === 'dark' ? '1px solid rgba(6,182,212,0.08)' : '1px solid rgba(14,165,233,0.12)',
                borderBottom: theme === 'dark' ? '1px solid rgba(6,182,212,0.06)' : '1px solid rgba(14,165,233,0.08)',
            }}
        >
            <div className="max-w-7xl mx-auto px-5">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo */}
                    <button onClick={() => handleTabClick('home')} className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-9 h-9">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors" />
                            <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-md group-hover:bg-cyan-500/20 transition-colors animate-pulse" />
                            <Shield className="relative w-4.5 h-4.5 text-cyan-400 z-10" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-cyber font-black text-sm tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                                HARSH.R
                            </span>
                            <span className="font-mono text-[9px] text-cyan-500/70 tracking-wider flex items-center gap-1 mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                                SEC_OPS // ONLINE
                            </span>
                        </div>
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                        {navItems.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`relative py-1.5 px-3.5 font-mono text-[12px] tracking-wide transition-all duration-300 rounded-lg ${
                                    activeTab === item.id
                                        ? 'text-white'
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="activeNavBg"
                                        className="absolute inset-0 rounded-lg"
                                        style={{
                                            background: theme === 'dark' 
                                              ? 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.1) 100%)' 
                                              : 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(99,102,241,0.08) 100%)',
                                            border: theme === 'dark' ? '1px solid rgba(6,182,212,0.25)' : '1px solid rgba(14,165,233,0.3)',
                                            boxShadow: '0 0 12px rgba(6,182,212,0.1)',
                                        }}
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                    />
                                )}
                                <span className="relative flex items-center gap-1.5">
                                    <span className="text-[9px] text-cyan-600/60 font-mono">{String(idx + 1).padStart(2, '0')}.</span>
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Right utilities & signals */}
                    <div className="hidden md:flex items-center gap-4 pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                        {/* Search Palette Button */}
                        <button
                            id="cmd-palette-btn"
                            onClick={onOpenPalette}
                            className="p-2 rounded-xl border border-transparent hover:border-cyan-500/25 hover:bg-cyan-500/5 text-slate-400 hover:text-cyan-400 transition-all duration-200 flex items-center gap-2 group/btn"
                            title="Command Palette (Ctrl+K)"
                        >
                            <Search className="w-4 h-4 group-hover/btn:scale-105 transition-transform" />
                            <span className="font-mono text-[9px] bg-slate-950 border border-slate-900 px-1 py-0.5 rounded text-slate-500 opacity-60">
                                ⌘K
                              </span>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl border border-transparent hover:border-cyan-500/25 hover:bg-cyan-500/5 text-slate-400 hover:text-cyan-400 transition-all duration-300"
                            title={`Switch to ${theme === 'dark' ? 'Light Theme' : 'Dark Theme'}`}
                        >
                            {theme === 'dark' ? (
                                <Moon className="w-4 h-4 text-cyan-400 animate-pulse" />
                            ) : (
                                <Sun className="w-4 h-4 text-amber-500" />
                            )}
                        </button>

                        {/* Right Telemetry Signal */}
                        <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] text-slate-500">
                            <Zap className="w-3 h-3 text-cyan-500/70" />
                            <span className="text-emerald-400/80">12ms</span>
                            <span className="text-slate-600">|</span>
                            <span>CEH v13</span>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-2">
                        {/* Search mobile */}
                        <button
                            onClick={onOpenPalette}
                            className="p-2 rounded-xl border border-slate-800 text-slate-400"
                            aria-label="Open command palette"
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        {/* Theme mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl border border-slate-800 text-slate-400"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Moon className="w-4 h-4 text-cyan-400" />
                            ) : (
                                <Sun className="w-4 h-4 text-amber-500" />
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all duration-300"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <X className="w-4.5 h-4.5" />
                                    </motion.span>
                                ) : (
                                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <Menu className="w-4.5 h-4.5" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden rounded-b-2xl"
                        style={{ borderTop: theme === 'dark' ? '1px solid rgba(6,182,212,0.1)' : '1px solid rgba(14,165,233,0.15)' }}
                    >
                        <div 
                          className="flex flex-col gap-1 p-4" 
                          style={{ background: theme === 'dark' ? 'rgba(3,5,15,0.96)' : 'rgba(248,250,252,0.96)' }}
                        >
                            {navItems.map((item, idx) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.04 }}
                                    onClick={() => handleTabClick(item.id)}
                                    className={`w-full text-left py-2.5 px-4 rounded-xl font-mono text-sm transition-all duration-200 flex items-center gap-3 ${
                                        activeTab === item.id
                                            ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/5 text-cyan-400 border border-cyan-500/20'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/4 border border-transparent'
                                    }`}
                                >
                                    <span className="text-[10px] text-cyan-600/50 w-5">{String(idx + 1).padStart(2, '0')}.</span>
                                    {item.label}
                                    {activeTab === item.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;

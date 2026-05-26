import React, { useState, useEffect } from 'react';
import { Shield, Mail, ArrowRight, Download, Linkedin, Github, Terminal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
// @ts-ignore
import profile from '../../components/image/profile.png';
import { stats } from '../../utils/data';

const Hero: React.FC = () => {
    const [activeTerminalTab, setActiveTerminalTab] = useState<'info' | 'network' | 'diagnostic'>('info');
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
    const [pingLogs, setPingLogs] = useState<string[]>([]);
    const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
    const [scanLogs, setScanLogs] = useState<string[]>([]);

    // Typewriter state
    const [titleIdx, setTitleIdx] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    
    const titles = ['Ethical Hacker', 'SecOps Specialist', 'Penetration Tester', 'Security Researcher'];

    useEffect(() => {
        let timer: any;
        const fullText = titles[titleIdx];
        
        const handleType = () => {
            if (!isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                if (currentText.length === fullText.length) {
                    timer = setTimeout(() => setIsDeleting(true), 1500);
                } else {
                    timer = setTimeout(handleType, 80);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                if (currentText.length === 0) {
                    setIsDeleting(false);
                    setTitleIdx((titleIdx + 1) % titles.length);
                } else {
                    timer = setTimeout(handleType, 40);
                }
            }
        };
        
        timer = setTimeout(handleType, 100);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, titleIdx]);

    // Command palette system diagnostics trigger
    useEffect(() => {
        const handleDiagnostics = () => {
            setActiveTerminalTab('diagnostic');
            // run diagnostic scan
            setScanState('scanning');
            setScanLogs(['[!] INITIALIZING PORTFOLIO DIAGNOSTIC SEQUENCE', '[*] TARGET: LOCALHOST // SECURITY_CORE', '[*] LOADING ATTACK VECTORS DB v4.1.2...']);
            
            const steps = [
                { check: '[*] Checking SQL Injection vectors...', result: '[ SECURE ]', color: 'emerald' },
                { check: '[*] Checking Cross-Site Scripting filters...', result: '[ SECURE ]', color: 'emerald' },
                { check: '[*] Checking IDOR vulnerabilities...', result: '[ PATCHED ]', color: 'amber' },
                { check: '[*] Checking CSRF tokens & CORS headers...', result: '[ NOMINAL ]', color: 'emerald' },
                { check: '[*] Checking SSRF attack surface...', result: '[ SECURE ]', color: 'emerald' },
                { check: '[*] Checking cryptographic implementation...', result: '[ STRONG: AES-256 ]', color: 'emerald' },
            ];
            
            let idx = 0;
            const iv = setInterval(() => {
                if (idx < steps.length) {
                    setScanLogs(p => [...p, `${steps[idx].check} ${steps[idx].result}`]);
                    idx++;
                } else {
                    setScanLogs(p => [...p, '', '[+] ALL CORE SYSTEMS VALIDATED. SECURITY RATING: A+', 'visitor@harsh-rathore:~$']);
                    setScanState('complete');
                    clearInterval(iv);
                }
            }, 550);
        };
        
        window.addEventListener('run-diagnostics', handleDiagnostics);
        return () => window.removeEventListener('run-diagnostics', handleDiagnostics);
    }, []);

    // 1. System Info Terminal
    useEffect(() => {
        if (activeTerminalTab !== 'info') return;
        const infoLines = [
            '╔══════════════════════════════════════════╗',
            '║      SECURITY PROFILE FETCHED            ║',
            '╚══════════════════════════════════════════╝',
            '',
            '  NAME:    Harsh Rathore',
            '  ROLE:    Cybersecurity Professional',
            '  CERT:    Certified Ethical Hacker (CEHv13)',
            '  EDU:     B.Tech CSE — Cyber Security',
            '  SPECS:   Pentesting · Web Security · Threat Hunting',
            '  STATUS:  ✓ Seeking Cybersecurity Internships',
            '',
            '  visitor@harsh-rathore:~$',
        ];
        setTerminalOutput([]);
        let i = 0;
        const iv = setInterval(() => {
            if (i < infoLines.length) { setTerminalOutput(p => [...p, infoLines[i]]); i++; }
            else clearInterval(iv);
        }, 120);
        return () => clearInterval(iv);
    }, [activeTerminalTab]);

    // 2. Network Ping
    useEffect(() => {
        if (activeTerminalTab !== 'network') return;
        setPingLogs([
            'visitor@harsh-rathore:~$ ping -c 5 security.harsh-rathore.dev',
            'PING security.harsh-rathore.dev (104.21.32.11) 56(84) bytes of data.',
        ]);
        let seq = 1;
        const iv = setInterval(() => {
            if (seq <= 5) {
                const t = (8 + Math.random() * 5).toFixed(1);
                setPingLogs(p => [...p, `64 bytes from 104.21.32.11: icmp_seq=${seq} ttl=56 time=${t} ms`]);
                seq++;
            } else {
                setPingLogs(p => [...p,
                    '--- security.harsh-rathore.dev ping statistics ---',
                    '5 packets transmitted, 5 received, 0% packet loss, time 4004ms',
                    'rtt min/avg/max = 8.1/10.4/13.2 ms',
                    'visitor@harsh-rathore:~$',
                ]);
                clearInterval(iv);
            }
        }, 750);
        return () => clearInterval(iv);
    }, [activeTerminalTab]);

    // 3. Vulnerability Diagnostics
    const runDiagnostics = () => {
        setScanState('scanning');
        setScanLogs(['[!] INITIALIZING PORTFOLIO DIAGNOSTIC SEQUENCE', '[*] TARGET: LOCALHOST // SECURITY_CORE', '[*] LOADING ATTACK VECTORS DB v4.1.2...']);
        const steps = [
            { check: '[*] Checking SQL Injection vectors...', result: '[ SECURE ]', color: 'emerald' },
            { check: '[*] Checking Cross-Site Scripting filters...', result: '[ SECURE ]', color: 'emerald' },
            { check: '[*] Checking IDOR vulnerabilities...', result: '[ PATCHED ]', color: 'amber' },
            { check: '[*] Checking CSRF tokens & CORS headers...', result: '[ NOMINAL ]', color: 'emerald' },
            { check: '[*] Checking SSRF attack surface...', result: '[ SECURE ]', color: 'emerald' },
            { check: '[*] Checking cryptographic implementation...', result: '[ STRONG: AES-256 ]', color: 'emerald' },
        ];
        let idx = 0;
        const iv = setInterval(() => {
            if (idx < steps.length) {
                setScanLogs(p => [...p, `${steps[idx].check} ${steps[idx].result}`]);
                idx++;
            } else {
                setScanLogs(p => [...p, '', '[+] ALL CORE SYSTEMS VALIDATED. SECURITY RATING: A+', 'visitor@harsh-rathore:~$']);
                setScanState('complete');
                clearInterval(iv);
            }
        }, 550);
    };

    useEffect(() => {
        if (activeTerminalTab === 'diagnostic' && scanState === 'idle') runDiagnostics();
    }, [activeTerminalTab]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-20"
        >
            {/* ── Hero Header ── */}
            <header className="relative min-h-[calc(100vh-140px)] flex items-center justify-center">
                <div className="w-full max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* Text Column */}
                        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">

                            {/* Status badge */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
                                style={{ background: 'rgba(6,182,212,0.06)', borderColor: 'rgba(6,182,212,0.2)' }}
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                <span className="font-mono text-[11px] font-semibold text-cyan-400 uppercase tracking-widest">
                                    Systems Active — Open to Internships
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-cyan-400" />
                                    <span className="font-mono text-cyan-500/70 text-xs tracking-[0.3em] uppercase">SECURE_SHELL v1.0</span>
                                </div>

                                <h1 className="leading-none">
                                    <span className="block font-mono text-slate-500 text-sm tracking-[0.4em] uppercase mb-3">Greetings, I am</span>
                                    <span
                                        className="block font-cyber font-black text-5xl sm:text-6xl md:text-7xl tracking-tight"
                                        style={{
                                            background: 'linear-gradient(135deg, #67e8f9 0%, #38bdf8 30%, #818cf8 60%, #c084fc 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            filter: 'drop-shadow(0 0 25px rgba(6,182,212,0.25))',
                                        }}
                                    >
                                        HARSH RATHORE
                                    </span>
                                </h1>

                                <div className="h-8 flex items-center">
                                    <p className="font-cyber text-xl sm:text-2xl tracking-wider text-slate-300 flex items-center gap-2">
                                        [<span className="text-cyan-400 font-bold">{currentText}</span><span className="w-1.5 h-5 bg-cyan-400 animate-pulse inline-block" />]
                                    </p>
                                </div>

                                <p className="text-slate-400 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
                                    Pursuing B.Tech CSE in <span className="text-cyan-400 font-medium font-mono">Cyber Security</span>. Dedicated to discovering vulnerabilities, securing network boundaries, and solving complex web-application security equations.
                                </p>
                            </div>

                            {/* CTA buttons */}
                            <div className="flex flex-wrap gap-4">
                                <motion.a
                                    href="mailto:harshrathore2110@gmail.com"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group relative px-6 py-3.5 rounded-xl font-mono text-sm font-bold tracking-wider overflow-hidden flex items-center gap-2 text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #0891b2, #3b82f6)',
                                        boxShadow: '0 0 25px rgba(6,182,212,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                                        border: '1px solid rgba(6,182,212,0.3)',
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/5 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    <Mail className="w-4 h-4" />
                                    INITIALIZE_CONN
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.a>

                                <motion.a
                                    href="/Resume.pdf"
                                    download="Harsh_Rathore_Resume.pdf"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group px-6 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wider text-cyan-400 flex items-center gap-2 transition-all duration-300"
                                    style={{
                                        background: 'rgba(6,182,212,0.04)',
                                        border: '1px solid rgba(6,182,212,0.25)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.1)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.5)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(6,182,212,0.1)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.04)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.25)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                    }}
                                >
                                    <Download className="w-4 h-4" />
                                    DOWNLOAD_RESUME
                                </motion.a>
                            </div>

                            {/* Social links */}
                            <div className="flex items-center gap-4">
                                <div className="gradient-line flex-1 max-w-16" />
                                <a
                                    href="https://www.linkedin.com/in/harsh-rathore-1baa82291/"
                                    target="_blank" rel="noopener noreferrer"
                                    className="group p-3 rounded-xl border border-slate-800 hover:border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/5 transition-all duration-300 hover:scale-110"
                                    style={{ background: 'rgba(255,255,255,0.02)' }}
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://github.com/harshXrathore"
                                    target="_blank" rel="noopener noreferrer"
                                    className="group p-3 rounded-xl border border-slate-800 hover:border-purple-500/40 text-purple-400 hover:bg-purple-500/5 transition-all duration-300 hover:scale-110"
                                    style={{ background: 'rgba(255,255,255,0.02)' }}
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Profile Image Column */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="relative"
                            >
                                {/* HUD corners */}
                                <div className="relative p-6">
                                    <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-400/70 rounded-tl" />
                                    <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-400/70 rounded-tr" />
                                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-purple-500/70 rounded-bl" />
                                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-500/70 rounded-br" />

                                     {/* SVG Rotating Radar Dashboard */}
                                     <div className="absolute inset-2 pointer-events-none select-none">
                                         <svg className="w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 200 200">
                                             {/* Outer Dial Track */}
                                             <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="3, 3" />
                                             {/* Inner Rotating Ring */}
                                             <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1" strokeDasharray="20, 10, 5, 10" className="animate-[spin_15s_linear_infinite_reverse]" style={{ transformOrigin: 'center' }} />
                                             {/* Radar Ticks */}
                                             {Array.from({ length: 12 }).map((_, i) => {
                                                 const angle = (i * 30 * Math.PI) / 180;
                                                 const x1 = 100 + 85 * Math.cos(angle);
                                                 const y1 = 100 + 85 * Math.sin(angle);
                                                 const x2 = 100 + 90 * Math.cos(angle);
                                                 const y2 = 100 + 90 * Math.sin(angle);
                                                 return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" />;
                                             })}
                                             {/* Compass directions */}
                                             <text x="100" y="24" fill="rgba(6, 182, 212, 0.7)" fontSize="6" fontFamily="monospace" textAnchor="middle">000°</text>
                                             <text x="176" y="102" fill="rgba(6, 182, 212, 0.7)" fontSize="6" fontFamily="monospace" textAnchor="middle">090°</text>
                                             <text x="100" y="182" fill="rgba(6, 182, 212, 0.7)" fontSize="6" fontFamily="monospace" textAnchor="middle">180°</text>
                                             <text x="24" y="102" fill="rgba(6, 182, 212, 0.7)" fontSize="6" fontFamily="monospace" textAnchor="middle">270°</text>
                                         </svg>
                                     </div>
                                     {/* Radar sweep overlay */}
                                     <div className="absolute inset-6 rounded-full border border-cyan-500/20 animate-radar-sweep pointer-events-none">
                                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-1/2 origin-bottom"
                                             style={{ background: 'linear-gradient(to top, rgba(6,182,212,0.8), transparent)' }} />
                                     </div>
                                     <div className="absolute inset-10 rounded-full border border-purple-500/10 pointer-events-none animate-pulse" style={{ animationDuration: '3s' }} />

                                    {/* Profile image */}
                                    <div
                                        className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden p-0.5"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(6,182,212,0.5), rgba(59,130,246,0.3), rgba(168,85,247,0.4))',
                                            boxShadow: '0 0 40px rgba(6,182,212,0.2), 0 0 80px rgba(6,182,212,0.1)',
                                        }}
                                    >
                                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
                                            <img
                                                src={profile}
                                                alt="Harsh Rathore"
                                                className="w-full h-full rounded-full object-cover"
                                                style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                                            />
                                        </div>
                                        {/* Scanline overlay */}
                                        <div className="absolute inset-0 rounded-full pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.05) 50%, transparent 100%)',
                                                backgroundSize: '100% 8px',
                                                animation: 'scanline 6s linear infinite',
                                            }} />
                                    </div>

                                    {/* Floating badges */}
                                    <motion.div
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute -bottom-2 -left-4 px-3 py-1.5 rounded-xl font-mono text-[10px] text-emerald-400 font-bold"
                                        style={{ background: 'rgba(3,5,15,0.9)', border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 0 12px rgba(16,185,129,0.15)' }}
                                    >
                                        ✓ CEH v13
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [0, 6, 0] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                        className="absolute -top-2 -right-4 px-3 py-1.5 rounded-xl font-mono text-[10px] text-purple-400 font-bold"
                                        style={{ background: 'rgba(3,5,15,0.9)', border: '1px solid rgba(168,85,247,0.3)', boxShadow: '0 0 12px rgba(168,85,247,0.15)' }}
                                    >
                                        ⚡ CCNA
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Scroll hint */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
                >
                    <span className="font-mono text-[9px] text-cyan-500 tracking-widest">SCROLL</span>
                    <ChevronRight className="w-4 h-4 text-cyan-500 rotate-90" />
                </motion.div>
            </header>

            {/* ── Terminal Dashboard ── */}
            <section className="grid lg:grid-cols-12 gap-6 items-start">

                {/* Terminal panel */}
                <div className="lg:col-span-8 rounded-2xl overflow-hidden"
                    style={{
                        background: 'rgba(3,5,15,0.85)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(6,182,212,0.15)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(6,182,212,0.05)',
                    }}
                >
                    {/* Terminal title bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b"
                        style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(6,182,212,0.1)' }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer" />
                            </div>
                            <Terminal className="w-3.5 h-3.5 text-slate-500 ml-2" />
                            <span className="font-mono text-[11px] text-slate-500">root@sec-core: ~/dashboard</span>
                        </div>

                        <div className="flex gap-1">
                            {(['info', 'network', 'diagnostic'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => { setActiveTerminalTab(tab); if (tab === 'diagnostic') setScanState('idle'); }}
                                    className={`px-3 py-1 font-mono text-[10px] rounded-md transition-all duration-200 ${
                                        activeTerminalTab === tab
                                            ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/25'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/4'
                                    }`}
                                >
                                    {tab === 'info' ? 'info.sh' : tab === 'network' ? 'network.cfg' : 'diag.log'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Terminal body */}
                    <div className="p-5 font-mono text-sm min-h-[260px] h-[260px] overflow-y-auto cyber-scrollbar select-text text-left bg-transparent">
                        {activeTerminalTab === 'info' && (
                            <div key="info" className="flicker-on-load">
                                {terminalOutput.map((line, i) => {
                                    if (!line || typeof line !== 'string') return null;
                                    let cls = 'text-cyan-300/80';
                                    if (line.startsWith('╔') || line.startsWith('╚') || line.startsWith('║')) cls = 'text-cyan-500/50';
                                    if (line.includes('visitor@')) cls = 'text-emerald-400';
                                    if (line.includes('✓')) cls = 'text-emerald-400';
                                    return <div key={i} className={cls}>{line}</div>;
                                })}
                                <span className="text-cyan-400 animate-pulse">▊</span>
                            </div>
                        )}

                        {activeTerminalTab === 'network' && (
                            <div key="network" className="flicker-on-load">
                                {pingLogs.map((line, i) => {
                                    if (!line || typeof line !== 'string') return null;
                                    let cls = 'text-slate-400';
                                    if (line.startsWith('visitor@')) cls = 'text-emerald-400';
                                    if (line.includes('bytes from')) cls = 'text-cyan-300';
                                    if (line.includes('statistics')) cls = 'text-slate-500';
                                    return <div key={i} className={cls}>{line}</div>;
                                })}
                                {pingLogs.length > 2 && !(pingLogs[pingLogs.length - 1] && pingLogs[pingLogs.length - 1].startsWith('visitor')) && (
                                    <span className="text-cyan-400 animate-pulse">▊</span>
                                )}
                            </div>
                        )}

                        {activeTerminalTab === 'diagnostic' && (
                            <div key="diagnostic" className="flicker-on-load">
                                {scanLogs.map((line, i) => {
                                    if (!line || typeof line !== 'string') return null;
                                    let cls = 'text-slate-400';
                                    if (line.includes('[!]')) cls = 'text-rose-400 font-semibold';
                                    if (line.includes('[*]')) cls = 'text-slate-400';
                                    if (line.includes('[ SECURE ]') || line.includes('NOMINAL')) cls = 'text-emerald-400 font-semibold';
                                    if (line.includes('PATCHED')) cls = 'text-amber-400 font-semibold';
                                    if (line.includes('STRONG')) cls = 'text-blue-400 font-semibold';
                                    if (line.includes('[+] ALL')) cls = 'text-cyan-400 font-bold';
                                    if (line.startsWith('visitor')) cls = 'text-emerald-400';
                                    return <div key={i} className={cls}>{line}</div>;
                                })}
                                {scanState === 'scanning' && (
                                    <div className="flex items-center gap-2 mt-2 text-cyan-400">
                                        <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full" />
                                        Scanning core security protocols...
                                    </div>
                                )}
                                {scanState === 'complete' && (
                                    <button
                                        onClick={() => { setScanState('idle'); runDiagnostics(); }}
                                        className="mt-3 px-3 py-1.5 bg-cyan-500/8 hover:bg-cyan-500/15 border border-cyan-400/20 hover:border-cyan-400/40 rounded-lg text-[11px] text-cyan-400 font-mono transition-all"
                                    >
                                        ↺ RE-RUN DIAGNOSTIC
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats grid */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="group relative p-5 rounded-2xl overflow-hidden transition-all duration-300 cursor-default hover:scale-[1.03]"
                                style={{
                                    background: 'rgba(5,8,20,0.8)',
                                    border: '1px solid rgba(6,182,212,0.1)',
                                    backdropFilter: 'blur(16px)',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.35)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(6,182,212,0.1)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.1)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl transition-transform group-hover:scale-150"
                                    style={{ background: 'rgba(6,182,212,0.06)' }} />

                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-xl"
                                        style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)' }}>
                                        <Icon className="w-4.5 h-4.5 text-cyan-400" />
                                    </div>
                                    <span className="font-mono text-[8px] text-slate-600 tracking-wider">SYS_{idx + 1}</span>
                                </div>
                                <div className="font-cyber text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">{stat.value}</div>
                                <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </motion.div>
    );
};

export default Hero;

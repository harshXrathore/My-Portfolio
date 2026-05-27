import React from 'react';
import { Shield, Lock, Search, Code, Fingerprint, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { ActivityMatrix } from './ActivityMatrix';

const TEXT = {
    identityClearance: 'Identity Clearance',
    classifiedDossier: 'CLASSIFIED_DOSSIER',
    dossierId: 'ID: HR-2110-SEC // PARUL_ACADEMY // CLEARANCE LEVEL 3',
    systemMetadata: 'SYSTEM_METADATA',
    selectProfileQuery: "> SELECT * FROM profiles.security_engineers WHERE id = 'harsh_rathore';",
    bioPursuing: 'I am currently pursuing my',
    bioDegree: 'Bachelor of Technology in Computer Science',
    bioDetails1: 'with a specialized focus in Cyber Security at Parul Institute of Engineering and Technology. My technical objective is clear: analyze, secure, and defend complex networks and applications.',
    bioEquipped: 'Equipped with credentials as a',
    bioCeh: 'Certified Ethical Hacker (CEHv13)',
    bioDetails2: ', I combine theory with aggressive hands-on application to run thorough security assessments. I approach software and hardware architectures with an adversarial mindset — identifying potential attack paths before unauthorized actors do.',
    bioExpertise: 'My expertise spans web vulnerabilities (OWASP Top 10), traffic analysis with',
    wireshark: 'Wireshark',
    tcpDump: 'TCPDump',
    pythonBash: 'Python & Bash',
    bioDetails3: ' & ',
    bioDetails4: ', script automation with ',
    bioDetails5: ', and endpoint analysis.',
    modulePrefix: 'MODULE_0',
    diagnosticGauges: 'DIAGNOSTIC_GAUGES',
};

const specialties = [
    { icon: Lock, title: 'Security Audits', desc: 'Pre-emptive assessments to expose, catalog, and remediate architectural vulnerabilities before deployment.' },
    { icon: Search, title: 'OSINT & Recon', desc: 'Advanced search techniques to map attack surfaces, expose footprints, and enumerate digital assets.' },
    { icon: Code, title: 'Payload Scripting', desc: 'Developing custom payloads, automation scripts, and proof-of-concept exploits to stress-test defenses.' },
];

const metadata = [
    { label: 'Subject', value: 'HARSH RATHORE', color: 'text-cyan-400' },
    { label: 'Cognizance', value: 'CYBER_SECURITY', color: 'text-white' },
    { label: 'Credential', value: 'CEH_v13', color: 'text-rose-400' },
    { label: 'Institution', value: 'Parul University', color: 'text-white' },
    { label: 'Station', value: 'Vadodara, IND', color: 'text-slate-300' },
    { label: 'Integrity', value: 'SECURED ✓', color: 'text-emerald-400' },
];

const About: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-14"
        >
            {/* Section header */}
            <div className="text-center space-y-3">
                <div className="section-tag">
                    <Fingerprint className="w-3 h-3" />
                    {TEXT.identityClearance}
                </div>
                <h2 className="text-4xl sm:text-5xl font-cyber font-black tracking-widest"
                    style={{
                        background: 'linear-gradient(135deg, #67e8f9, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                    {TEXT.classifiedDossier}
                </h2>
                <p className="font-mono text-[11px] text-slate-500 tracking-widest">
                    {TEXT.dossierId}
                </p>
            </div>

            {/* Main dossier panel */}
            <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                    background: 'rgba(4,7,18,0.75)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(6,182,212,0.12)',
                    boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
            >
                {/* Top gradient bar */}
                <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.5), rgba(168,85,247,0.3), transparent)' }} />

                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(6,182,212,0.04)' }} />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(168,85,247,0.03)' }} />

                <div className="p-8 md:p-10 grid lg:grid-cols-12 gap-8 items-start">


                    {/* Metadata sidebar */}
                    <div className="lg:col-span-4 space-y-4">
                        <div
                            className="p-5 rounded-2xl font-mono text-xs space-y-3"
                            style={{ background: 'rgba(2,6,23,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <div className="flex items-center gap-2 pb-3 mb-1 border-b border-slate-800/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-slate-500 uppercase tracking-widest text-[9px]">{TEXT.systemMetadata}</span>
                            </div>
                            {metadata.map((m, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-slate-600">{m.label}:</span>
                                    <span className={`${m.color} font-semibold text-right`}>{m.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Interactive Security Status Gauges */}
                        <div
                            className="p-5 rounded-2xl space-y-4"
                            style={{ background: 'rgba(2,6,23,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60 font-mono text-[9px] text-slate-500">
                                <div className="led-cyan inline-block" />
                                <span className="uppercase tracking-widest">{TEXT.diagnosticGauges}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { value: 98, label: 'INTEG', color: '#22d3ee', glow: 'rgba(6,182,212,0.3)' },
                                    { value: 87, label: 'DEF', color: '#a855f7', glow: 'rgba(168,85,247,0.3)' },
                                    { value: 95, label: 'CEH', color: '#f43f5e', glow: 'rgba(244,63,94,0.3)' }
                                ].map((gauge, i) => {
                                    const radius = 18;
                                    const circumference = 2 * Math.PI * radius;
                                    const offset = circumference - (gauge.value / 100) * circumference;
                                    return (
                                        <div key={i} className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/40 border border-slate-900">
                                            <div className="relative w-12 h-12">
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                                                    {/* Background track */}
                                                    <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" strokeDasharray="1.5, 1.5" />
                                                    {/* Gauge path */}
                                                    <motion.circle
                                                        cx="24" cy="24" r={radius} fill="none"
                                                        stroke={gauge.color} strokeWidth="2.5"
                                                        strokeDasharray={circumference}
                                                        initial={{ strokeDashoffset: circumference }}
                                                        animate={{ strokeDashoffset: offset }}
                                                        transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
                                                        style={{ filter: `drop-shadow(0 0 3px ${gauge.glow})` }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] font-bold text-white">
                                                    {gauge.value}%
                                                </div>
                                            </div>
                                            <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest mt-1.5">{gauge.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        {/* Quick facts */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: GraduationCap, label: 'B.Tech CSE', sub: 'Cyber Security' },
                                { icon: Briefcase, label: 'CEH v13', sub: 'EC-Council' },
                                { icon: MapPin, label: 'Vadodara', sub: 'Gujarat, India' },
                                { icon: Shield, label: '9+ Certs', sub: 'Verified' },
                            ].map((fact, i) => {
                                const Icon = fact.icon;
                                return (
                                    <div key={i} className="p-3 rounded-xl flex flex-col gap-1.5 transition-colors"
                                        style={{ background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.1)' }}>
                                        <Icon className="w-4 h-4 text-cyan-400" />
                                        <span className="font-mono text-[10px] text-white font-semibold">{fact.label}</span>
                                        <span className="font-mono text-[9px] text-slate-500">{fact.sub}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Biography */}
                    <div className="lg:col-span-8 space-y-6 text-left">
                        <div className="flex items-center gap-3 p-3 rounded-xl"
                            style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.1)' }}>
                            <div className="w-1 h-full rounded-full self-stretch" style={{ background: 'linear-gradient(to bottom, #06b6d4, #818cf8)', minHeight: '1rem' }} />
                            <p className="font-mono text-xs text-cyan-400/80">
                                {TEXT.selectProfileQuery}
                            </p>
                        </div>

                        <div className="space-y-5 text-slate-300 text-base leading-relaxed font-sans">
                            <p>
                                {TEXT.bioPursuing}{' '}
                                <span className="text-cyan-400 font-semibold font-mono">{TEXT.bioDegree}</span>{' '}
                                {TEXT.bioDetails1}
                            </p>
                            <p>
                                {TEXT.bioEquipped}{' '}
                                <span className="text-blue-400 font-semibold font-mono">{TEXT.bioCeh}</span>
                                {TEXT.bioDetails2}
                            </p>
                            <p>
                                {TEXT.bioExpertise}{' '}
                                <span className="text-purple-400 font-mono">{TEXT.wireshark}</span>
                                {TEXT.bioDetails3}
                                <span className="text-purple-400 font-mono">{TEXT.tcpDump}</span>
                                {TEXT.bioDetails4}
                                <span className="text-purple-400 font-mono">{TEXT.pythonBash}</span>
                                {TEXT.bioDetails5}
                            </p>
                        </div>

                        {/* Tech stack tags */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {['Burp Suite', 'Metasploit', 'Wireshark', 'Nmap', 'Kali Linux', 'Python', 'OWASP', 'CTF'].map(tag => (
                                <span key={tag} className="px-3 py-1 font-mono text-[11px] rounded-lg text-cyan-400/80 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                                    style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Activity Matrix Monitor */}
            <ActivityMatrix />

            {/* Specialty cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {specialties.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + idx * 0.1 }}
                            className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                            style={{
                                background: 'rgba(4,7,18,0.7)',
                                border: '1px solid rgba(6,182,212,0.1)',
                                backdropFilter: 'blur(16px)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.4), 0 0 20px rgba(6,182,212,0.08)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.1)';
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                            }}
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

                            {/* Card header decoration */}
                            <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-800/60 font-mono text-[9px] text-slate-600">
                                <span>{TEXT.modulePrefix}{idx + 1}</span>
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 transition-colors" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                </div>
                            </div>

                            <div className="p-2.5 rounded-xl mb-5 w-fit"
                                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)' }}>
                                <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-lg font-cyber font-bold mb-2.5 text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-sans">{item.desc}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default About;

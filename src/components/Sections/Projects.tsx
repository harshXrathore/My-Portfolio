import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ExternalLink, FolderOpen } from 'lucide-react';
import { projects } from '../../utils/data';

const statusConfigs = [
    { label: 'COMPLETED // SIGNED_OFF', color: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
    { label: 'ACTIVE_PLAYROOM', color: '#22d3ee', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.25)' },
    { label: 'REPORT_DISPATCHED', color: '#34d399', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
];

const threatConfigs = [
    { label: 'HIGH — OWASP TOP 10', color: '#f87171' },
    { label: 'MULTI_VECTOR', color: '#fb923c' },
    { label: 'MODERATE — CVSS', color: '#fbbf24' },
];

const Projects: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-14"
        >
            {/* Section header */}
            <div className="text-center space-y-3">
                <div className="section-tag">
                    <FolderOpen className="w-3 h-3" />
                    Security Projects
                </div>
                <h2
                    className="text-4xl sm:text-5xl font-cyber font-black tracking-widest"
                    style={{
                        background: 'linear-gradient(135deg, #67e8f9, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    DIAGNOSTIC_REPORTS
                </h2>
                <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
                    Comprehensive penetration logs & auditing archives
                </p>
            </div>

            {/* Project cards */}
            <div className="space-y-6">
                {projects.map((project, idx) => {
                    const Icon = project.icon || Shield;
                    const status = statusConfigs[idx] || statusConfigs[0];
                    const threat = threatConfigs[idx] || threatConfigs[2];
                    const reportHash = `REP-2025-${idx * 217 + 104}`;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.12 }}
                            className="group relative rounded-2xl overflow-hidden transition-all duration-300 card-border-gradient"
                            style={{
                                background: 'rgba(4,7,18,0.75)',
                                backdropFilter: 'blur(16px)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(6,182,212,0.07)';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Left accent bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: 'linear-gradient(to bottom, #06b6d4, #818cf8)' }} />

                            {/* Hover gradient */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: 'radial-gradient(circle at 0% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)' }} />

                            <div className="p-6 sm:p-8">
                                {/* Dossier header */}
                                <div className="flex flex-wrap justify-between items-center pb-4 mb-6 border-b border-slate-800/50 font-mono text-[9px] sm:text-[10px] text-slate-600 gap-2">
                                    <span>REF: {reportHash}</span>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <span className="flex items-center gap-1.5">
                                            THREAT_LEVEL: 
                                            <span className="flex gap-0.5">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span 
                                                        key={i} 
                                                        className="w-2.5 h-1.5 rounded-sm transition-all duration-300" 
                                                        style={{ 
                                                            backgroundColor: i < (idx === 0 ? 4 : idx === 1 ? 5 : 3) 
                                                                ? threat.color 
                                                                : 'rgba(255,255,255,0.05)',
                                                            boxShadow: i < (idx === 0 ? 4 : idx === 1 ? 5 : 3) 
                                                                ? `0 0 5px ${threat.color}` 
                                                                : 'none'
                                                        }} 
                                                    />
                                                ))}
                                            </span>
                                        </span>
                                        <span className="text-slate-700">|</span>
                                        <span className="px-2.5 py-1 rounded-md font-bold text-[9px]"
                                            style={{ background: status.bg, border: `1px solid ${status.border}`, color: status.color }}>
                                            {status.label}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    {/* Icon box */}
                                    <div className="flex-shrink-0 p-4 rounded-xl transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            background: 'rgba(6,182,212,0.06)',
                                            border: '1px solid rgba(6,182,212,0.15)',
                                        }}>
                                        <Icon className="w-10 h-10 text-cyan-400" />
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h3 className="text-2xl font-cyber font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 font-mono text-[10px] rounded-lg text-cyan-400/80 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                                                    style={{
                                                        background: 'rgba(6,182,212,0.05)',
                                                        border: '1px solid rgba(6,182,212,0.12)',
                                                    }}
                                                    onMouseEnter={e => {
                                                        (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.1)';
                                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.05)';
                                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.12)';
                                                    }}
                                                >
                                                    @{tag.toLowerCase().replace(/ /g, '_')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* External link indicator */}
                                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink className="w-5 h-5 text-cyan-400/50" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Projects;

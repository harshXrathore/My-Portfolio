import React from 'react';
import { ChevronRight, Activity, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { experience } from '../../utils/data';

const TEXT_WORK_HISTORY = 'Work History';
const TEXT_SECURITY_LOGS = 'SECURITY_LOGS';
const TEXT_SUBTITLE = 'Historical records of penetration & security compliance operations';
const TEXT_RECORD_PREFIX = 'RECORD_ID_#';
const TEXT_RECORD_SUFFIX = ' // LEVEL_SECURE';

const Experience: React.FC = () => {
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
                    <Briefcase className="w-3 h-3" />
                    {TEXT_WORK_HISTORY}
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
                    {TEXT_SECURITY_LOGS}
                </h2>
                <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
                    {TEXT_SUBTITLE}
                </p>
            </div>

            {/* Timeline */}
            <div className="relative ml-4 md:ml-10 pl-8 md:pl-12 space-y-14 py-2"
                style={{ borderLeft: '1px solid rgba(6,182,212,0.15)' }}
            >
                {/* Glow line accent */}
                <div className="absolute top-0 left-0 h-1/3 w-px"
                    style={{ background: 'linear-gradient(to bottom, rgba(6,182,212,0.5), transparent)' }} />

                {experience.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="relative group"
                    >
                        {/* Timeline node */}
                        <div className="absolute -left-[39px] md:-left-[55px] top-2 flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full transition-all duration-300"
                            style={{
                                background: 'rgba(2,6,23,0.9)',
                                border: '2px solid rgba(6,182,212,0.3)',
                                boxShadow: '0 0 0 4px rgba(6,182,212,0.04)',
                            }}
                        >
                            <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400 animate-pulse" />

                            {/* Node glow on hover */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ boxShadow: '0 0 12px rgba(6,182,212,0.5)', border: '2px solid rgba(6,182,212,0.6)' }} />
                        </div>

                        {/* Log card */}
                        <div
                            className="relative rounded-2xl overflow-hidden transition-all duration-400"
                            style={{
                                background: 'rgba(4,7,18,0.75)',
                                border: '1px solid rgba(6,182,212,0.1)',
                                backdropFilter: 'blur(16px)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.25)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 25px rgba(6,182,212,0.06)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.1)';
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                            }}
                        >
                            {/* Top gradient accent */}
                            <div className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.4), rgba(168,85,247,0.2), transparent)' }} />

                            <div className="p-6 md:p-8">
                                {/* Card header */}
                                <div className="flex flex-wrap justify-between items-center gap-3 pb-5 mb-6 border-b border-slate-800/50 font-mono text-[9px] text-slate-600">
                                    <span>{TEXT_RECORD_PREFIX}{100 - idx}{TEXT_RECORD_SUFFIX}</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2.5 py-1 rounded-md text-cyan-400 font-semibold"
                                            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
                                            {exp.period}
                                        </span>
                                        {exp.duration && (
                                            <span className="px-2.5 py-1 rounded-md text-emerald-400 font-semibold"
                                                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                                                {exp.duration}
                                            </span>
                                        )}
                                        <span className="px-2.5 py-1 rounded-md text-purple-400 font-semibold"
                                            style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
                                            {exp.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Role & Company */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-cyber font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                                        {exp.role}
                                    </h3>
                                    <p className="font-mono text-sm text-slate-400 flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-cyan-500" />
                                        {exp.company}
                                    </p>
                                </div>

                                {/* Bullet points */}
                                <div className="space-y-3 select-text text-left">
                                    {exp.points.map((point, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.15 + i * 0.07 }}
                                            className="flex items-start gap-3 group/item"
                                        >
                                            <div className="mt-1.5 flex-shrink-0 p-0.5 rounded transition-colors"
                                                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
                                                <ChevronRight className="w-3 h-3 text-cyan-400" />
                                            </div>
                                            <span className="text-slate-300 text-sm md:text-base leading-relaxed font-sans group-hover/item:text-slate-200 transition-colors">
                                                {point}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* End marker */}
                <div className="absolute -left-[5px] bottom-0 w-2.5 h-2.5 rounded-full"
                    style={{ background: 'rgba(6,182,212,0.3)', border: '1px solid rgba(6,182,212,0.4)' }} />
            </div>
        </motion.div>
    );
};

export default Experience;

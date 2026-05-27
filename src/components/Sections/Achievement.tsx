import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield } from 'lucide-react';
import { achievements } from '../../utils/data';

const Achievement: React.FC = () => {
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
                    <Award className="w-3 h-3" />
                    Milestones & Training
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
                    ACHIEVEMENTS
                </h2>
                <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
                    Security certifications, bootcamps, and competitive performance
                </p>
            </div>

            {/* Achievement cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {achievements.map((item, idx) => {
                    const Icon = item.icon || Shield;
                    const reportHash = `ACH-2025-${idx * 142 + 509}`;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.12 }}
                            className="group relative rounded-2xl overflow-hidden transition-all duration-300 card-border-gradient flex flex-col justify-between"
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

                            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                                <div>
                                    {/* Header */}
                                    <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-800/50 font-mono text-[9px] text-slate-600">
                                        <span>ID: {reportHash}</span>
                                        <span className="text-cyan-500/80 font-bold uppercase">VERIFIED ✓</span>
                                    </div>

                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                                            style={{
                                                background: 'rgba(6,182,212,0.06)',
                                                border: '1px solid rgba(6,182,212,0.15)',
                                            }}>
                                            <Icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h3 className="text-lg font-cyber font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-300 text-sm leading-relaxed font-sans mb-4">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/20">
                                    {item.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-0.5 font-mono text-[9px] rounded text-cyan-400/70"
                                            style={{
                                                background: 'rgba(6,182,212,0.05)',
                                                border: '1px solid rgba(6,182,212,0.12)',
                                            }}
                                        >
                                            @{tag.toLowerCase().replace(/ /g, '_')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Achievement;

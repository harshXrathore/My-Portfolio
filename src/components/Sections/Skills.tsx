import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../utils/data';
import { Cpu } from 'lucide-react';

const Skills: React.FC = () => {
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
                    <Cpu className="w-3 h-3" />
                    Arsenal & Capabilities
                </div>
                <h2 className="text-4xl sm:text-5xl font-cyber font-black tracking-widest"
                    style={{
                        background: 'linear-gradient(135deg, #67e8f9, #38bdf8, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                    TECHNICAL_ARSENAL
                </h2>
                <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
                    Diagnosing weaponry level & threat capabilities
                </p>
            </div>

            {/* Skill cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skillSet, idx) => {
                    const Icon = skillSet.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-6 rounded-2xl overflow-hidden transition-all duration-300"
                            style={{
                                background: 'rgba(4,7,18,0.75)',
                                border: '1px solid rgba(6,182,212,0.1)',
                                backdropFilter: 'blur(16px)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 25px rgba(6,182,212,0.07)';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.1)';
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Hover glow backdrop */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: 'radial-gradient(circle at 0% 0%, rgba(6,182,212,0.06) 0%, transparent 60%)' }} />

                            {/* Card terminal header */}
                            <div className="flex justify-between items-center pb-4 mb-5 border-b border-slate-800/50 font-mono text-[10px] text-slate-600">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    SYSTEM_MODULE_0{idx + 1}
                                </span>
                                <span className="text-cyan-500/60">CAPACITY: {skillSet.level}%</span>
                            </div>

                            {/* Header */}
                            <div className="flex items-center gap-5 mb-6">
                                {/* SVG Speedometer Gauge around Icon */}
                                <div className="relative flex-shrink-0 w-16 h-16">
                                    <svg className="w-full h-full -rotate-[225deg]" viewBox="0 0 64 64">
                                        {/* Background Track (270 deg) */}
                                        <circle
                                            cx="32" cy="32" r="26" fill="none"
                                            stroke="rgba(255,255,255,0.04)" strokeWidth="3.5"
                                            strokeDasharray="122.5" strokeDashoffset="40.8"
                                            strokeLinecap="round"
                                        />
                                        {/* Active Gauge Path (270 deg limit) */}
                                        <motion.circle
                                            cx="32" cy="32" r="26" fill="none"
                                            stroke={idx % 2 === 0 ? '#06b6d4' : '#a855f7'} strokeWidth="3.5"
                                            strokeDasharray="122.5"
                                            initial={{ strokeDashoffset: 122.5 }}
                                            animate={{ strokeDashoffset: 122.5 - (skillSet.level / 100) * 122.5 * 0.75 }}
                                            transition={{ duration: 1.5, delay: idx * 0.15 }}
                                            strokeLinecap="round"
                                            style={{
                                                filter: `drop-shadow(0 0 5px ${idx % 2 === 0 ? 'rgba(6,182,212,0.4)' : 'rgba(168,85,247,0.4)'})`
                                            }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    {/* Mini blinking status LED at the bottom right */}
                                    <div className={`absolute bottom-0.5 right-0.5 ${idx % 2 === 0 ? 'led-cyan' : 'led-purple'}`} />
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-cyber text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            {skillSet.category}
                                        </h3>
                                        <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                                            [SECURE]
                                        </span>
                                    </div>
                                    <p className="font-mono text-[10px] text-slate-500 mt-1">
                                        CAPACITY_INDEX: <span className={idx % 2 === 0 ? 'text-cyan-400 font-bold' : 'text-purple-400 font-bold'}>{skillSet.level}%</span>
                                    </p>
                                </div>
                            </div>


                            {/* Animated progress bar */}
                            <div className="space-y-2 mb-6">
                                <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skillSet.level}%` }}
                                        transition={{ duration: 1.4, delay: 0.3 + idx * 0.15, ease: 'easeOut' }}
                                        className="h-full rounded-full relative overflow-hidden"
                                        style={{
                                            background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #818cf8)',
                                            boxShadow: '0 0 8px rgba(6,182,212,0.4)',
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Skill badges */}
                            <div className="flex flex-wrap gap-2">
                                {skillSet.items.map((skill, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + idx * 0.1 + i * 0.04 }}
                                        className="px-3 py-1.5 font-mono text-[11px] rounded-lg text-slate-300 hover:text-cyan-400 transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.06)';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.2)';
                                            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 8px rgba(6,182,212,0.08)';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                        }}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Skills;

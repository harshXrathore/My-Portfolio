import React, { useState } from 'react';
import { Download, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { certifications } from '../../utils/data';
import { DecryptionModal } from './DecryptionModal';

const TEXT_SECTION_TAG = 'Verified Credentials';
const TEXT_CREDENTIALS_DB = 'CREDENTIALS_DB';
const TEXT_SUBTITLE = 'Verified encrypted academic & professional credentials';
const TEXT_HASH_LABEL = 'HASH: ';
const TEXT_ISSUED_LABEL = 'ISSUED: ';
const TEXT_VIEW_BTN = 'VIEW';

const getLevelConfig = (level: string) => {
    const lvl = level.toLowerCase();
    if (lvl === 'professional' || lvl === 'advanced') {
        return {
            badgeBg: 'rgba(244,63,94,0.08)',
            badgeBorder: 'rgba(244,63,94,0.25)',
            badgeText: '#f87171',
            accentColor: 'rgba(244,63,94,0.06)',
            accentBorder: 'rgba(244,63,94,0.15)',
            iconColor: '#f87171',
            glowColor: 'rgba(244,63,94,0.08)',
        };
    } else if (lvl === 'simulation' || lvl === 'workshop') {
        return {
            badgeBg: 'rgba(16,185,129,0.08)',
            badgeBorder: 'rgba(16,185,129,0.25)',
            badgeText: '#34d399',
            accentColor: 'rgba(16,185,129,0.06)',
            accentBorder: 'rgba(16,185,129,0.15)',
            iconColor: '#34d399',
            glowColor: 'rgba(16,185,129,0.08)',
        };
    }
    return {
        badgeBg: 'rgba(6,182,212,0.08)',
        badgeBorder: 'rgba(6,182,212,0.25)',
        badgeText: '#22d3ee',
        accentColor: 'rgba(6,182,212,0.06)',
        accentBorder: 'rgba(6,182,212,0.15)',
        iconColor: '#22d3ee',
        glowColor: 'rgba(6,182,212,0.08)',
    };
};

const Certifications: React.FC = () => {
    const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

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
                    {TEXT_SECTION_TAG}
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
                    {TEXT_CREDENTIALS_DB}
                </h2>
                <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
                    {TEXT_SUBTITLE}
                </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {certifications.map((cert, idx) => {
                    const Icon = cert.icon || ShieldCheck;
                    const config = getLevelConfig(cert.level);
                    const hashKey = `0x${((idx + 7) * 419).toString(16).toUpperCase()}`;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.92, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: idx * 0.07 }}
                            className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 card-border-gradient"
                            style={{
                                background: 'rgba(4,7,18,0.8)',
                                backdropFilter: 'blur(16px)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px ${config.glowColor}`;
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Top accent line */}
                            <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${config.badgeText}40, transparent)` }} />

                            {/* Ambient glow */}
                            <div className="absolute top-0 right-0 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                style={{ background: config.glowColor }} />

                            <div className="p-5 flex flex-col flex-1">
                                {/* Card header */}
                                <div className="flex justify-between items-center pb-3.5 mb-4 border-b border-slate-800/50 font-mono text-[9px] text-slate-600">
                                    <span className="flex items-center gap-1.5">
                                        {TEXT_HASH_LABEL}{hashKey}
                                        <span className={cert.level.toLowerCase() === 'professional' || cert.level.toLowerCase() === 'advanced' ? 'led-purple' : cert.level.toLowerCase() === 'simulation' || cert.level.toLowerCase() === 'workshop' ? 'led-green' : 'led-cyan'} />
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md text-[8px] font-bold uppercase"
                                        style={{ background: config.badgeBg, border: `1px solid ${config.badgeBorder}`, color: config.badgeText }}>
                                        {cert.level}
                                    </span>
                                </div>

                                {/* Icon & Name */}
                                <div className="flex items-start gap-3.5 mb-4 flex-1">
                                    <div className="p-2.5 rounded-xl flex-shrink-0 mt-0.5"
                                        style={{ background: config.accentColor, border: `1px solid ${config.accentBorder}` }}>
                                        <Icon className="w-5 h-5" style={{ color: config.iconColor }} />
                                    </div>
                                    <div>
                                        <h3 className="font-cyber font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight text-sm mb-1.5">
                                            {cert.name}
                                        </h3>
                                        <p className="font-mono text-[10px] text-slate-500">{cert.org}</p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="pt-4 mt-auto border-t border-slate-800/50 flex items-center justify-between">
                                    <span className="font-mono text-[9px] text-slate-600 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full" style={{ background: config.iconColor }} />
                                        {TEXT_ISSUED_LABEL}{cert.issued}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedCert(cert);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] transition-all duration-200 hover:scale-105 cursor-pointer"
                                        style={{
                                            background: 'rgba(6,182,212,0.06)',
                                            border: '1px solid rgba(6,182,212,0.15)',
                                            color: '#22d3ee',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.12)';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.35)';
                                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(6,182,212,0.1)';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(6,182,212,0.06)';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.15)';
                                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                        }}
                                    >
                                        <Download className="w-3 h-3" />
                                        {TEXT_VIEW_BTN}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Simulated Decryption Modal for Certifications */}
            {selectedCert && (
                <DecryptionModal
                    isOpen={!!selectedCert}
                    onClose={() => setSelectedCert(null)}
                    certName={selectedCert.name}
                    certOrg={selectedCert.org}
                    certDate={selectedCert.issued}
                    certLevel={selectedCert.level}
                    certUrl={selectedCert.credentialUrl}
                />
            )}
        </motion.div>
    );
};

export default Certifications;

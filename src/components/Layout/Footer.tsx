import React from 'react';
import { Mail, Linkedin, Github, Shield, Wifi, Lock } from 'lucide-react';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-24">
            {/* Top gradient border */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.3), rgba(168,85,247,0.2), transparent)' }} />

            <div
                className="relative"
                style={{
                    background: 'rgba(3,5,15,0.8)',
                    backdropFilter: 'blur(20px)',
                }}
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute bottom-0 left-1/4 w-80 h-40 rounded-full blur-[80px]"
                        style={{ background: 'rgba(6,182,212,0.04)' }} />
                    <div className="absolute bottom-0 right-1/4 w-60 h-40 rounded-full blur-[80px]"
                        style={{ background: 'rgba(168,85,247,0.03)' }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 relative">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">

                        {/* Brand */}
                        <div className="flex flex-col items-center md:items-start gap-3">
                            <div className="flex items-center gap-3">
                                <div className="relative p-2 rounded-xl"
                                    style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
                                    <Shield className="w-5 h-5 text-cyan-400" />
                                    <div className="absolute inset-0 rounded-xl blur-md animate-pulse"
                                        style={{ background: 'rgba(6,182,212,0.1)' }} />
                                </div>
                                <div>
                                    <h3 className="font-cyber font-black text-lg tracking-widest"
                                        style={{
                                            background: 'linear-gradient(135deg, #67e8f9, #818cf8)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}>
                                        HARSH RATHORE
                                    </h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                        <p className="font-mono text-[10px] text-slate-500">SECURE_TUNNEL: ONLINE</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm font-sans max-w-xs text-center md:text-left leading-relaxed">
                                Ready to accept cybersecurity collaborations & opportunities
                            </p>
                        </div>

                        {/* Social links */}
                        <div className="flex gap-3">
                            {[
                                { href: 'mailto:harshrathore2110@gmail.com', icon: Mail, label: 'Email', color: 'rgba(6,182,212,' },
                                { href: 'https://www.linkedin.com/in/harsh-rathore-1baa82291/', icon: Linkedin, label: 'LinkedIn', color: 'rgba(6,182,212,' },
                                { href: 'https://github.com/harshXrathore', icon: Github, label: 'GitHub', color: 'rgba(168,85,247,' },
                            ].map((link, i) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={i}
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                        className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
                                        style={{
                                            background: `${link.color}0.05)`,
                                            border: `1px solid ${link.color}0.15)`,
                                            color: `${link.color}0.8)`,
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.background = `${link.color}0.12)`;
                                            el.style.borderColor = `${link.color}0.4)`;
                                            el.style.boxShadow = `0 0 15px ${link.color}0.15)`;
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.background = `${link.color}0.05)`;
                                            el.style.borderColor = `${link.color}0.15)`;
                                            el.style.boxShadow = 'none';
                                        }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom telemetry bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/50 font-mono text-[9px] text-slate-600">
                        <div className="flex flex-wrap items-center gap-5">
                            <span className="flex items-center gap-1.5">
                                <Wifi className="w-3 h-3 text-cyan-500/60" />
                                SEC_NET: WPA3_ENTERPRISE
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Lock className="w-3 h-3 text-emerald-500/60" />
                                FIREWALL: ENGAGED
                            </span>
                            <span className="text-slate-700">SHA256: 0x8F9A...2C4D</span>
                        </div>
                        <p className="text-slate-700">
                            © {year} Harsh Rathore. Built with secure coding standards.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

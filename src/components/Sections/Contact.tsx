import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, Loader2, Lock, MessageSquare, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { sendEmail } from '../../services/emailService';

const contactCards = [
    {
        icon: Mail,
        label: 'Email Endpoint',
        value: 'harshrathore2110@gmail.com',
        href: 'mailto:harshrathore2110@gmail.com',
        tag: 'ADDR_TYPE: MAIL',
        color: 'rgba(6,182,212,',
    },
    {
        icon: Phone,
        label: 'Phone Link',
        value: '+91-9973575302',
        href: 'tel:+919973575302',
        tag: 'ADDR_TYPE: TEL',
        color: 'rgba(168,85,247,',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Vadodara, Gujarat, IN',
        href: null,
        tag: 'ADDR_TYPE: GEO',
        color: 'rgba(16,185,129,',
    },
];

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', bypass_key: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [transmittingState, setTransmittingState] = useState<'idle' | 'encrypting' | 'routing' | 'done'>('idle');

    // 1. Client-Side Spam Rate-Limiter (Max 3 submissions per 10 minutes)
    const checkRateLimit = (): boolean => {
        const key = 'secure_transmissions_logs';
        const now = Date.now();
        const limitWindow = 10 * 60 * 1000; // 10 minutes in ms

        try {
            const rawLogs = localStorage.getItem(key);
            const logs: number[] = rawLogs ? JSON.parse(rawLogs) : [];
            
            // Keep logs from the last 10 minutes only
            const recentLogs = logs.filter(timestamp => now - timestamp < limitWindow);
            
            if (recentLogs.length >= 3) {
                return false;
            }
            
            return true;
        } catch {
            return true; // Graceful fallback if localStorage fails
        }
    };

    const logTransmissionSuccess = () => {
        const key = 'secure_transmissions_logs';
        const now = Date.now();
        try {
            const rawLogs = localStorage.getItem(key);
            const logs: number[] = rawLogs ? JSON.parse(rawLogs) : [];
            logs.push(now);
            localStorage.setItem(key, JSON.stringify(logs));
        } catch (e) {
            console.error('Failed to update rate limit registry:', e);
        }
    };

    // 2. Real-time validation checker
    const validateField = (fieldName: string, value: string) => {
        let errorMsg = '';
        const trimmedVal = value.trim();

        if (fieldName === 'name') {
            if (!trimmedVal) {
                errorMsg = 'SENDER_IDENTITY is required. Please supply your name.';
            }
        } else if (fieldName === 'email') {
            if (!trimmedVal) {
                errorMsg = 'RETURN_PATH is required. Supply your email address.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedVal)) {
                errorMsg = 'INVALID_PROTOCOL: Format does not match return email schema.';
            }
        } else if (fieldName === 'message') {
            if (!trimmedVal) {
                errorMsg = 'TRANSMISSION_PAYLOAD cannot be empty.';
            } else if (trimmedVal.length < 10) {
                errorMsg = 'PAYLOAD_UNDERFLOW: Message is too short. Minimum 10 characters.';
            }
        }

        setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (touched[name]) {
            validateField(name, value);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    // 3. Form Submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Trigger validation on all fields
        const tempErrors: FormErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'SENDER_IDENTITY is required. Please supply your name.';
        if (!formData.email.trim()) {
            tempErrors.email = 'RETURN_PATH is required. Supply your email address.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            tempErrors.email = 'INVALID_PROTOCOL: Format does not match return email schema.';
        }
        if (!formData.message.trim()) {
            tempErrors.message = 'TRANSMISSION_PAYLOAD cannot be empty.';
        } else if (formData.message.trim().length < 10) {
            tempErrors.message = 'PAYLOAD_UNDERFLOW: Message is too short. Minimum 10 characters.';
        }

        setErrors(tempErrors);
        setTouched({ name: true, email: true, subject: true, message: true });

        // If there are errors, halt submission
        if (Object.values(tempErrors).some(msg => !!msg)) {
            toast.error('PAYLOAD VALIDATION FAILED: Correct formatting errors before routing.', { icon: '⚠️' });
            return;
        }

        // Check Rate Limit (Anti-Spam)
        if (!checkRateLimit()) {
            toast.error('SESSION THROTTLED: Too many packets sent. Please wait before transmitting again.', { duration: 6000, icon: '🛑' });
            return;
        }

        setIsSubmitting(true);

        // 4. Honeypot check (Spam Protection)
        if (formData.bypass_key) {
            // Silently mock success to trap spambots
            setTransmittingState('encrypting');
            await new Promise(r => setTimeout(r, 600));
            setTransmittingState('routing');
            await new Promise(r => setTimeout(r, 600));
            setTransmittingState('done');
            await new Promise(r => setTimeout(r, 300));
            
            toast.success('Packet transmitted to secure router.', { duration: 5000, icon: '📡' });
            setFormData({ name: '', email: '', subject: '', message: '', bypass_key: '' });
            setErrors({});
            setTouched({});
            setIsSubmitting(false);
            setTransmittingState('idle');
            return;
        }

        // 5. Normal transmission path
        try {
            // Hacking simulation load sequence for premium UX
            setTransmittingState('encrypting');
            await new Promise(r => setTimeout(r, 700));
            
            setTransmittingState('routing');
            
            // Dispatch payload asynchronously to EmailJS service
            await sendEmail({
                from_name: formData.name.trim(),
                from_email: formData.email.trim(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
            });

            setTransmittingState('done');
            await new Promise(r => setTimeout(r, 450));

            toast.success('TRANSMISSION SUCCESSFUL: Secured tunnel routed message to destination.', { duration: 5000, icon: '📡' });
            logTransmissionSuccess();
            setFormData({ name: '', email: '', subject: '', message: '', bypass_key: '' });
            setErrors({});
            setTouched({});
        } catch (error: any) {
            console.error('EmailJS routing failed:', error);
            const errorMsg = error?.message || 'Check terminal network logs.';
            toast.error(`TRANSMISSION FAILURE: Routing compromised. (${errorMsg})`, { duration: 6000, icon: '💥' });
        } finally {
            setIsSubmitting(false);
            setTransmittingState('idle');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto space-y-14 select-text text-left"
        >
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'rgba(4,7,18,0.95)',
                        color: '#e2e8f0',
                        border: '1px solid rgba(6,182,212,0.25)',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '12px',
                        backdropFilter: 'blur(20px)',
                    },
                }}
            />

            {/* Section header */}
            <div className="text-center space-y-3">
                <div className="section-tag">
                    <MessageSquare className="w-3 h-3" />
                    Get in Touch
                </div>
                <h2
                    className="text-4xl sm:text-5xl font-cyber font-black tracking-widest text-shimmer"
                >
                    TRANSMISSION_CONDUIT
                </h2>
                <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase">
                    Establishing encrypted session tunnels to secure endpoints
                </p>
            </div>

            {/* Contact cards */}
            <div className="grid md:grid-cols-3 gap-5">
                {contactCards.map((card, i) => {
                    const Icon = card.icon;
                    const Wrapper = card.href ? 'a' : 'div';
                    const props = card.href ? { href: card.href } : {};

                    return (
                        <Wrapper
                            key={i}
                            {...props}
                            className="group relative p-5 rounded-2xl flex flex-col gap-4 overflow-hidden transition-all duration-300 cursor-pointer"
                            style={{
                                background: 'rgba(4,7,18,0.75)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                backdropFilter: 'blur(16px)',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = `${card.color}0.25)`;
                                el.style.boxShadow = `0 15px 30px -8px rgba(0,0,0,0.5), 0 0 15px ${card.color}0.08)`;
                                el.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = 'rgba(255,255,255,0.06)';
                                el.style.boxShadow = 'none';
                                el.style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Icon & label */}
                            <div className="flex items-center justify-between">
                                <div className="p-2.5 rounded-xl"
                                    style={{ background: `${card.color}0.08)`, border: `1px solid ${card.color}0.2)` }}>
                                    <Icon className="w-5 h-5" style={{ color: `${card.color}0.9)` }} />
                                </div>
                                <span className="font-mono text-[8px] text-slate-600">{card.tag}</span>
                            </div>

                            <div>
                                <h3 className="font-cyber font-bold text-white text-sm mb-1 group-hover:text-cyan-400 transition-colors">{card.label}</h3>
                                <p className="font-mono text-xs text-slate-400 break-all">{card.value}</p>
                            </div>
                        </Wrapper>
                    );
                })}
            </div>

            {/* Transmission form */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl overflow-hidden"
                style={{
                    background: 'rgba(4,7,18,0.8)',
                    border: '1px solid rgba(6,182,212,0.15)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)',
                }}
            >
                {/* Form title bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="flex items-center gap-2.5">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        </div>
                        <Lock className="w-3.5 h-3.5 text-cyan-400/60 ml-2" />
                        <span className="font-mono text-[11px] text-slate-500">TRANSMIT_CONSOLE // AUTH_SESSION</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[9px] text-emerald-400/70">ENCRYPTED</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" noValidate>
                    {/* Anti-Spam Honeypot Field */}
                    <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden', opacity: 0 }} aria-hidden="true">
                        <label htmlFor="bypass_key">Security Bypass Cryptographic Signature</label>
                        <input
                            id="bypass_key"
                            type="text"
                            name="bypass_key"
                            value={formData.bypass_key}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    {/* Name + Email row */}
                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { name: 'name', label: 'SENDER_NAME', placeholder: 'Your name', type: 'text', required: true },
                            { name: 'email', label: 'SENDER_EMAIL', placeholder: 'your@email.com', type: 'email', required: true },
                        ].map(field => {
                            const hasError = touched[field.name] && !!(errors as any)[field.name];
                            const isValid = touched[field.name] && !(errors as any)[field.name] && !!(formData as any)[field.name];
                            
                            return (
                                <div key={field.name} className="space-y-1.5">
                                    <label htmlFor={field.name} className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                                        {field.label} {field.required && <span className="text-cyan-500">*</span>}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            name={field.name}
                                            value={(formData as any)[field.name]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            disabled={isSubmitting}
                                            aria-invalid={hasError ? 'true' : 'false'}
                                            aria-describedby={hasError ? `${field.name}-error` : undefined}
                                            className="w-full px-4 py-3 pr-10 rounded-xl font-mono text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 border disabled:opacity-50"
                                            style={{
                                                background: 'rgba(2,6,23,0.6)',
                                                borderColor: hasError 
                                                    ? 'rgba(244,63,94,0.45)' 
                                                    : isValid 
                                                        ? 'rgba(16,185,129,0.35)' 
                                                        : 'rgba(255,255,255,0.07)',
                                                boxShadow: hasError 
                                                    ? '0 0 10px rgba(244,63,94,0.1)' 
                                                    : isValid 
                                                        ? '0 0 10px rgba(16,185,129,0.05)' 
                                                        : 'none',
                                            }}
                                            onFocus={e => {
                                                if (!hasError && !isValid) {
                                                    e.target.style.borderColor = 'rgba(6,182,212,0.4)';
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.05)';
                                                    e.target.style.background = 'rgba(6,182,212,0.03)';
                                                }
                                            }}
                                        />
                                        {/* Status indicator icons */}
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                                            {hasError && <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />}
                                            {isValid && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                        </div>
                                    </div>
                                    {hasError && (
                                        <p id={`${field.name}-error`} className="text-rose-400 font-mono text-[9px] tracking-wider mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                            {(errors as any)[field.name]}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                        <label htmlFor="subject" className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest">MESSAGE_SUBJECT</label>
                        <input
                            id="subject"
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject / topic of the message"
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-xl font-mono text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 border disabled:opacity-50"
                            style={{ 
                                background: 'rgba(2,6,23,0.6)', 
                                border: '1px solid rgba(255,255,255,0.07)' 
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = 'rgba(6,182,212,0.4)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.05)';
                                e.target.style.background = 'rgba(6,182,212,0.03)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.07)';
                                e.target.style.boxShadow = 'none';
                                e.target.style.background = 'rgba(2,6,23,0.6)';
                            }}
                        />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                        <label htmlFor="message" className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                            PACKET_BODY <span className="text-cyan-500">*</span>
                        </label>
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your message... (min 10 characters)"
                                rows={5}
                                required
                                disabled={isSubmitting}
                                aria-invalid={touched.message && !!errors.message ? 'true' : 'false'}
                                aria-describedby={touched.message && !!errors.message ? 'message-error' : undefined}
                                className="w-full px-4 py-3 pr-10 rounded-xl font-mono text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 resize-none border disabled:opacity-50"
                                style={{
                                    background: 'rgba(2,6,23,0.6)',
                                    borderColor: touched.message && !!errors.message 
                                        ? 'rgba(244,63,94,0.45)' 
                                        : touched.message && !errors.message && !!formData.message 
                                            ? 'rgba(16,185,129,0.35)' 
                                            : 'rgba(255,255,255,0.07)',
                                    boxShadow: touched.message && !!errors.message 
                                        ? '0 0 10px rgba(244,63,94,0.1)' 
                                        : touched.message && !errors.message && !!formData.message 
                                            ? '0 0 10px rgba(16,185,129,0.05)' 
                                            : 'none',
                                }}
                                onFocus={e => {
                                    if (!(touched.message && !!errors.message) && !(touched.message && !errors.message && !!formData.message)) {
                                        e.target.style.borderColor = 'rgba(6,182,212,0.4)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.05)';
                                        e.target.style.background = 'rgba(6,182,212,0.03)';
                                    }
                                }}
                            />
                            {/* Validation indicators */}
                            <div className="absolute right-3.5 top-5 flex items-center pointer-events-none">
                                {touched.message && !!errors.message && <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />}
                                {touched.message && !errors.message && !!formData.message && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            </div>
                        </div>
                        {touched.message && !!errors.message && (
                            <p id="message-error" className="text-rose-400 font-mono text-[9px] tracking-wider mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                {errors.message}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting || Object.values(errors).some(msg => !!msg)}
                        whileHover={!isSubmitting ? { scale: 1.015 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.985 } : {}}
                        className="group relative w-full px-6 py-4 rounded-xl font-mono text-sm font-bold tracking-wider flex items-center justify-center gap-2.5 overflow-hidden transition-opacity disabled:opacity-50 cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, #0891b2 0%, #2563eb 50%, #7c3aed 100%)',
                            border: '1px solid rgba(6,182,212,0.3)',
                            boxShadow: '0 0 25px rgba(6,182,212,0.2)',
                        }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        {isSubmitting ? (
                            <span className="relative flex items-center gap-2.5 text-cyan-100">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {transmittingState === 'encrypting' && 'ENCRYPTING PAYLOAD...'}
                                {transmittingState === 'routing' && 'DISPATCHING TO ROUTER...'}
                                {transmittingState === 'done' && 'TRANSMISSION ROUTED'}
                            </span>
                        ) : (
                            <span className="relative flex items-center gap-2.5 text-white">
                                <Send className="w-4 h-4" />
                                TRANSMIT_DATA_STREAM
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Contact;

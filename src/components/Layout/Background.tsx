import React, { useEffect, useRef, useState } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Matrix rain canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
        const fontSize = 13;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array.from({ length: columns }, () => Math.random() * -50);

        const draw = () => {
            ctx.fillStyle = 'rgba(2, 6, 23, 0.065)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < drops.length; i++) {
                const opacity = Math.random() * 0.18 + 0.04;
                const isHead = drops[i] > 0 && Math.random() > 0.92;

                if (isHead) {
                    ctx.fillStyle = `rgba(200, 240, 255, ${opacity * 3})`;
                } else {
                    const colorRoll = Math.random();
                    if (colorRoll > 0.95) {
                        ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.8})`; // purple accent
                    } else if (colorRoll > 0.90) {
                        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`; // blue accent
                    } else {
                        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`; // cyan main
                    }
                }

                ctx.font = `${isHead ? 'bold ' : ''}${fontSize}px monospace`;
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = -Math.random() * 20;
                }
                drops[i] += 0.5;
            }
        };

        const interval = setInterval(draw, 45);
        window.addEventListener('resize', resize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // Floating particles
    useEffect(() => {
        const canvas = particleCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const colors = [
            'rgba(6, 182, 212,',
            'rgba(59, 130, 246,',
            'rgba(168, 85, 247,',
            'rgba(16, 185, 129,',
        ];

        const particles: Particle[] = Array.from({ length: 40 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${p.opacity})`;
                ctx.fill();
            });
        };

        const interval = setInterval(draw, 30);
        window.addEventListener('resize', resize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(6,182,212,0.03) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.03) 0%, transparent 60%), #020617' }}>
            {/* Structural cyber grid */}
            <div className="absolute inset-0 cyber-grid opacity-[0.35]" />

            {/* Matrix rain */}
            <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />

            {/* Floating particles */}
            <canvas ref={particleCanvasRef} className="absolute inset-0" />

            {/* Mouse-tracked radial glow */}
            <div
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                    background: `radial-gradient(circle 500px at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 182, 212, 0.07) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 100%)`
                }}
            />

            {/* Ambient gradient blooms */}
            <div className="absolute inset-0">
                <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full mix-blend-screen filter blur-[140px] animate-pulse" style={{ animationDuration: '7s' }} />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full mix-blend-screen filter blur-[160px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
                <div className="absolute top-[50%] left-[40%] w-[400px] h-[400px] bg-blue-500/4 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDuration: '11s', animationDelay: '4s' }} />
            </div>

            {/* Top edge glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            {/* Scanlines */}
            <div className="absolute inset-0 scanlines opacity-[0.025]" />
        </div>
    );
};

export default Background;

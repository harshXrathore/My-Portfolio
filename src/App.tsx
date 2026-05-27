import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Background from './components/Layout/Background';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import Certifications from './components/Sections/Certifications';
import Projects from './components/Sections/Projects';
import Achievement from './components/Sections/Achievement';
import Contact from './components/Sections/Contact';
import { LoadingScreen } from './components/Layout/LoadingScreen';
import { CursorGlow } from './components/Layout/CursorGlow';
import { CommandPalette } from './components/Layout/CommandPalette';
import { ThemeProvider } from './context/ThemeContext';

interface ScrollSpyProps {
  setActiveTab: (tab: string) => void;
}

const ScrollSpy: React.FC<ScrollSpyProps> = ({ setActiveTab }) => {
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'certifications', 'projects', 'achievements', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveTab]);

  return null;
};

function CyberSecurityPortfolio() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Handle diagnostic trigger from Command Palette
  const triggerDiagnostics = () => {
    window.dispatchEvent(new CustomEvent('run-diagnostics'));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 overflow-hidden font-sans selection:bg-cyan-500/30 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Scroll Spy to update Navbar active indicator */}
            <ScrollSpy setActiveTab={setActiveTab} />

            {/* Background elements */}
            <Background />

            {/* Glowing Scroll Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 z-[9997] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 box-glow-cyan"
              style={{ scaleX: scrollYProgress }}
            />

            {/* Custom Coordinates Cursor Telemetry HUD */}
            <CursorGlow />

            {/* Keyboard Command Palette modal */}
            <CommandPalette 
              isOpen={isPaletteOpen} 
              onClose={() => setIsPaletteOpen(false)} 
              onRunDiagnostics={triggerDiagnostics}
            />

            <div className="relative z-10">
              <Navbar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onOpenPalette={() => setIsPaletteOpen(true)}
              />

              <main className="max-w-7xl mx-auto px-6 py-20 min-h-screen pt-32 space-y-36">
                <section id="home" className="scroll-mt-36">
                  <Hero />
                </section>

                <motion.section
                  id="about"
                  className="scroll-mt-36"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <About />
                </motion.section>

                <motion.section
                  id="skills"
                  className="scroll-mt-36"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Skills />
                </motion.section>

                <motion.section
                  id="experience"
                  className="scroll-mt-36"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Experience />
                </motion.section>

                <motion.section
                  id="certifications"
                  className="scroll-mt-36"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Certifications />
                </motion.section>

                <motion.section
                  id="projects"
                  className="scroll-mt-36"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Projects />
                </motion.section>

                <motion.section
                  id="achievements"
                  className="scroll-mt-36"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Achievement />
                </motion.section>

                <motion.section
                  id="contact"
                  className="scroll-mt-36"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Contact />
                </motion.section>
              </main>

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Webkit custom scrollbars mapping */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617; 
        }
        ::-webkit-scrollbar-thumb {
          background: #0891b2; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #06b6d4; 
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #0891b2 #020617;
        }

        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CyberSecurityPortfolio />
    </ThemeProvider>
  );
}
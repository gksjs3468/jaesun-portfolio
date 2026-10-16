import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ContactModal } from './components/modals/ContactModal';
import { HeroSection } from './components/home/HeroSection';
import { CareerGlance } from './components/home/CareerGlance';
import { SkillsSection } from './components/home/SkillsSection';
import { StrengthsSection } from './components/home/StrengthsSection';
import { ProjectsSection } from './components/home/ProjectsSection';
import { PrinciplesSection } from './components/home/PrinciplesSection';
import { AICompetencySection } from './components/home/AICompetencySection';
import { QASection } from './components/home/QASection';
import { MesCaseStudy } from './components/case-studies/MesCaseStudy';
import { AgentCaseStudy } from './components/case-studies/AgentCaseStudy';
import { PopTabletDemo } from './components/pop/PopTabletDemo';

type ViewMode = 'main' | 'mes' | 'agent' | 'pop-demo';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('main');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Sync with URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#case-study-mes') {
        setCurrentView('mes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#case-study-agent') {
        setCurrentView('agent');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#pop-demo') {
        setCurrentView('pop-demo');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('main');
        if (hash && hash !== '#') {
          const el = document.querySelector(hash);
          if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: ViewMode, sectionId?: string) => {
    setCurrentView(view);
    if (view === 'mes') {
      window.location.hash = '#case-study-mes';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'agent') {
      window.location.hash = '#case-study-agent';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'pop-demo') {
      window.location.hash = '#pop-demo';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId === 'top') {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (sectionId) {
        window.location.hash = `#${sectionId}`;
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.hash = '';
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-body)] selection:bg-[var(--accent)] selection:text-white ambient-bg-dots">
      {/* Sophisticated Ambient Glow Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {/* Top-Left Rose Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.07] dark:opacity-[0.13] blur-[140px] will-change-transform" />
        {/* Mid-Right Subtle Indigo/Slate Glow */}
        <div className="absolute top-[40%] -right-40 w-[550px] h-[550px] rounded-full bg-blue-600 opacity-[0.04] dark:opacity-[0.08] blur-[150px] will-change-transform" />
        {/* Bottom-Left Warm Accent Glow */}
        <div className="absolute bottom-[10%] -left-32 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.05] dark:opacity-[0.10] blur-[140px] will-change-transform" />
      </div>

      {/* Smart Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main View Transition Container */}
      <div className="relative flex-1 z-10">
        <AnimatePresence mode="wait">
          {currentView === 'main' && (
            <motion.div
              key="main-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="pt-16 sm:pt-20"
            >
              <HeroSection onOpenContact={() => setIsContactOpen(true)} />

              <main className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-14 space-y-20 sm:space-y-28 w-full">
                <CareerGlance onNavigate={handleNavigate} />
                <SkillsSection />
                <StrengthsSection />
                <ProjectsSection onNavigate={handleNavigate} />
                <PrinciplesSection />
                <AICompetencySection />
                <QASection />
              </main>
            </motion.div>
          )}

          {currentView === 'pop-demo' && (
            <motion.div
              key="pop-demo-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <PopTabletDemo onBack={() => handleNavigate('main', 'career-glance')} />
            </motion.div>
          )}

          {currentView === 'mes' && (
            <motion.div
              key="mes-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <MesCaseStudy onBack={() => handleNavigate('main', 'projects')} />
            </motion.div>
          )}

          {currentView === 'agent' && (
            <motion.div
              key="agent-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <AgentCaseStudy onBack={() => handleNavigate('main', 'projects')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Contact Interactive Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;

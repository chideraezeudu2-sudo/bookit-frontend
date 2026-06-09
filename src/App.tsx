import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import SuccessPage from './components/SuccessPage';
import { ActivePage, SignupFormData } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<ActivePage>('landing');
  const [signupData, setSignupData] = useState<SignupFormData | null>(null);

  // Scroll to top when view shifts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeView]);

  const handleSignupSuccess = (data: SignupFormData) => {
    setSignupData(data);
    setActiveView('success');
  };

  const handleRestartDemo = () => {
    setSignupData(null);
    setActiveView('landing');
  };

  const handleSectionScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0c0a08] flex flex-col justify-between font-sans selection:bg-lime-signal selection:text-obsidian">
      
      {/* Sticky Top Header */}
      <Header 
        activePage={activeView} 
        onNavigate={setActiveView} 
        onSectionScroll={handleSectionScroll} 
      />

      {/* Main Switchboard */}
      <main className="flex-1 w-full">
        {activeView === 'landing' && (
          <div className="animate-fade-in">
            <LandingPage onNavigate={setActiveView} />
          </div>
        )}

        {activeView === 'signup' && (
          <div className="animate-fade-in bg-[#f4f2f0]">
            <SignupPage 
              onSuccess={handleSignupSuccess} 
              onNavigate={setActiveView} 
            />
          </div>
        )}

        {activeView === 'success' && (
          <div className="animate-fade-in bg-[#f4f2f0]">
            <SuccessPage 
              data={signupData} 
              onRestart={handleRestartDemo} 
            />
          </div>
        )}
      </main>

      {/* Shared Footer block */}
      {activeView === 'landing' && (
        <footer className="bg-obsidian border-t border-zinc-850 text-white py-12 px-6" id="footer-shared">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            {/* Left */}
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-display font-medium text-lg text-white">bookit</span>
              </div>
              <p className="text-zinc-500 text-xs">
                Autopilot SMS booking assistant for businesses. Miss a call, never lose a lead again.
              </p>
            </div>

            {/* Center */}
            <div className="text-zinc-500 text-xs font-mono">
              © 2026 Bookit Inc. All rights reserved. Built with pride for business.
            </div>

            {/* Right */}
            <div className="flex justify-center md:justify-end gap-6 text-xs text-zinc-400 font-mono">
              <a href="#how-it-works" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#pricing" className="hover:text-white transition-colors">Terms of Service</a>
            </div>

          </div>
        </footer>
      )}

    </div>
  );
}

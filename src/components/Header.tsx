import React, { useState } from 'react';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onSectionScroll: (sectionId: string) => void;
}

export default function Header({ activePage, onNavigate, onSectionScroll }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (activePage !== 'landing') {
      onNavigate('landing');
      // Wait for navigation state to update, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0a08]/90 backdrop-blur-md border-b border-zinc-800 text-white shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 cursor-pointer group"
          id="hdr-logo"
        >
          <span className="font-display font-semibold tracking-tight text-lg text-white">
            Bookit
          </span>
        </div>

        {/* Navigation Links - Center */}
        {activePage !== 'signup' && activePage !== 'success' && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans" id="hdr-nav">
            <button 
              onClick={() => handleScrollTo('how-it-works')}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleScrollTo('features')}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollTo('reviews')}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
            >
              Reviews
            </button>
            <button 
              onClick={() => handleScrollTo('pricing')}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left font-medium"
            >
              Pricing
            </button>
          </nav>
        )}

        {/* CTA Button - Right */}
        <div className="flex items-center gap-4" id="hdr-actions">
          {activePage !== 'signup' && activePage !== 'success' ? (
            <button 
              onClick={() => onNavigate('signup')}
              className="hidden sm:flex bg-white/10 backdrop-blur-md border border-white/20 text-white font-display font-bold text-xs tracking-wide uppercase px-4 py-2.5 rounded-xs items-center gap-1.5 hover:bg-white/20 active:scale-98 transition-all cursor-pointer shadow-[0_4px_12px_rgba(255,255,255,0.03)]"
            >
              <span>Activate Bookit →</span>
            </button>
          ) : activePage === 'signup' ? (
            <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2 bg-zinc-905 border border-zinc-800 px-3 py-1.5 rounded-sm">
              <Shield className="h-3 w-3 text-white" />
              <span>SSL Secure Onboarding</span>
            </div>
          ) : (
            <div className="text-[11px] font-mono text-white flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
              <span>Account Active</span>
            </div>
          )}

          {/* Mobile hamburger menu */}
          {activePage !== 'signup' && activePage !== 'success' && (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && activePage !== 'signup' && activePage !== 'success' && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-850 py-4 px-6 space-y-4 font-sans animate-fade-in" id="mobile-menu">
          <div className="flex flex-col gap-4 text-sm">
            <button 
              onClick={() => handleScrollTo('how-it-works')}
              className="text-zinc-400 hover:text-white py-2 text-left"
            >
              How It Works
            </button>
            <button 
              onClick={() => handleScrollTo('features')}
              className="text-zinc-400 hover:text-white py-2 text-left"
            >
              Features
            </button>
            <button 
              onClick={() => handleScrollTo('reviews')}
              className="text-zinc-400 hover:text-white py-2 text-left"
            >
              Reviews
            </button>
            <button 
              onClick={() => handleScrollTo('pricing')}
              className="text-zinc-450 hover:text-white py-2 text-left"
            >
              Pricing
            </button>
          </div>
          <div className="pt-4 border-t border-zinc-800">
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('signup'); }}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-display font-semibold text-center py-3 rounded-xs flex items-center justify-center gap-2 hover:bg-white/20"
            >
              <span>Activate Bookit — $550/mo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

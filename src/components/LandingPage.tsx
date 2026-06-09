import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, MessageSquare, Check, ArrowRight, Clock, Star, Play, X, Shield, 
  CheckCircle2, AlertOctagon, TrendingUp, Sparkles, MessageCircle, RefreshCw, 
  Award, ShieldCheck, ChevronRight, ChevronLeft, Volume2
} from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import { ActivePage } from '../types';

interface LandingPageProps {
  onNavigate: (page: ActivePage) => void;
}

interface SMSSnippetProps {
  sender: 'bot' | 'prospect';
  text: string;
  time?: string;
}

function IMessageWindow({ contactName, avatarInitial, children }: { contactName: string; avatarInitial: string; children: React.ReactNode }) {
  const systemFonts = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "SF Compact Text", "Helvetica Neue", Helvetica, Arial, sans-serif';
  return (
    <div 
      className="w-full bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden flex flex-col"
      style={{ fontFamily: systemFonts }}
    >
      {/* iOS status bar mockup */}
      <div className="bg-[#f6f6f6] px-4 pt-2.5 pb-1 flex justify-between items-center text-[10px] text-black font-semibold tracking-tight">
        <div>9:41</div>
        <div className="flex items-center gap-1">
          <span className="text-[9px]">LTE</span>
          <div className="w-5 h-2.5 border border-black rounded-[4px] relative p-px flex items-center">
            <div className="bg-black h-1.5 w-[85%] rounded-[1.5px]"></div>
          </div>
        </div>
      </div>

      {/* iOS iMessage Header */}
      <div className="bg-[#f6f6f6] px-3.5 py-1.5 flex items-center justify-between border-b border-stone-200/60">
        {/* Left Back Button */}
        <div className="flex items-center text-[#007aff] cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="text-xs font-semibold ml-0.5">2</span>
        </div>

        {/* Center Name */}
        <div className="flex flex-col items-center">
          <div className="w-6.5 h-6.5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center font-bold text-[10px] shadow-xs uppercase tracking-wide">
            {avatarInitial}
          </div>
          <span className="text-[10px] font-bold text-neutral-850 mt-1 leading-none">{contactName}</span>
          <span className="text-[8px] text-stone-400 font-medium tracking-tight mt-0.5">iMessage</span>
        </div>

        {/* Right Info Icon */}
        <div className="text-[#007aff] cursor-pointer pl-4">
          <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.085 1.085l-.04.04m-1.085 2c0 .621.504 1.125 1.125 1.125h.041a1.125 1.125 0 001.125-1.125V11m-6 3a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        </div>
      </div>

      {/* Messages Stream area */}
      <div className="p-3.5 bg-white flex-1 space-y-2 flex flex-col justify-end min-h-[170px]">
        <div className="text-center text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-2">
          iMessage
        </div>
        {children}
      </div>

      {/* Real layout for the input bar */}
      <div className="bg-white p-2.5 border-t border-stone-150 flex items-center gap-2">
        <div className="text-stone-400 cursor-pointer">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <div className="flex-1 bg-[#f0f0f2] border border-stone-200/50 rounded-full px-3 py-1 flex items-center justify-between text-stone-400">
          <span className="text-[11px] text-stone-400 font-sans pl-1">iMessage</span>
          <svg className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3-3.75h6M12 11.25a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SMSSnippet({ sender, text, time = "10:02 PM" }: SMSSnippetProps) {
  const isBot = sender === 'bot';
  const systemFonts = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif';
  return (
    <div 
      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} w-full my-1`}
      style={{ fontFamily: systemFonts }}
    >
      <div className={`max-w-[78%] px-3 py-1.5 text-[11.5px] leading-snug tracking-tight ${
        isBot 
          ? 'bg-[#e9e9eb] text-black rounded-[16px] rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[4px]' 
          : 'bg-[#007aff] text-white rounded-[16px] rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[4px]'
      }`}>
        {text}
      </div>
      <span className="text-[8px] text-stone-400 font-sans mt-0.5 px-1.5 tracking-tight">
        {time} {isBot ? '• Delivered' : ''}
      </span>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-stone-200 py-4.5 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-2 hover:text-neutral-950 transition-colors cursor-pointer group"
      >
        <span className="font-display font-semibold text-sm sm:text-base text-neutral-900 group-hover:text-[#007aff] transition-colors">
          {question}
        </span>
        <span className="text-stone-400 text-lg transition-transform duration-200 ml-4 shrink-0 font-mono">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pt-2 pb-1 text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoCaptionsIndex, setVideoCaptionsIndex] = useState<number>(0);
  const videoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Steps data for Section 3
  const steps = [
    {
      id: 0,
      number: "1",
      title: "Your active background autopilot",
      body: "When you miss a call or are asleep at night, Bookit immediately intercept-texts. It qualifies the customer and locks them in your schedule.",
      badge: "Background Active",
      phoneMode: "incoming_call" as const,
    },
    {
      id: 1,
      number: "2",
      title: "Bookit texts them back in seconds",
      body: "Your assistant — you pick the name — texts the customer back automatically. Asks what they need, where they are, and how urgent it is.",
      badge: "Instant contact",
      phoneMode: "sms_chat" as const,
    },
    {
      id: 2,
      number: "3",
      title: "They pick a time and book",
      body: "Bookit sends them your custom scheduling link. They pick an open slot that fits. No phone tag.",
      badge: "Smart matching",
      phoneMode: "booking_scheduler" as const,
    },
    {
      id: 3,
      number: "4",
      title: "You get a text with the details",
      body: "That's it. You get a text with the customer's name, problem, and appointment time. Show up and get paid.",
      badge: "Locked in",
      phoneMode: "Auto-synced",
      phoneModeReal: "contractor_alert" as const,
    }
  ];

  // Video Simulated Captions
  const videoCaptions = [
    "Hey! Plumber Mike here, and I founded Bookit after missing my 500th call...",
    "When you're on a hot roof or in a tight basement, you can't pick up.",
    "But clients want speed. If we don't answer, they hang up and search for the next guy.",
    "With Bookit, the instant they call and get voicemail, they receive an immediate text...",
    "Within 90 seconds, they book their burst pipe directly on our schedule. 100% automated.",
    "It takes under 2 minutes to activate. No complex setups. No training. Try it out!",
  ];

  // Handler to play simulated onboard video
  const startVideoSimulation = () => {
    setVideoPlaying(true);
    setVideoCaptionsIndex(0);
    // Clear any previous interval
    if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
    
    videoIntervalRef.current = setInterval(() => {
      setVideoCaptionsIndex(prev => {
        if (prev >= videoCaptions.length - 1) {
          return 0; // Loop or trigger reset
        }
        return prev + 1;
      });
    }, 4500);
  };

  const stopVideoSimulation = () => {
    setVideoPlaying(false);
    if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
  };

  useEffect(() => {
    return () => {
      if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative bg-white font-sans text-[#0c0a08]" id="landing-root">
      
      {/* Scroll Progress Bar at very top */}
      <div 
        className="fixed top-0 left-0 h-1 bg-neutral-800 z-[60] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-bar"
      />

      {/* SECTION 1 — HERO (Dark dawn backdrop transition) */}
      <section className="bg-[#0c0a08] text-white pt-20 pb-24 md:py-32 relative overflow-hidden flex items-center shadow-lg" id="section-hero">
        {/* Visual premium atmospheric dawn layout lights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(86,131,210,0.18)_0%,rgba(12,10,8,0)_65%)] pointer-events-none" />
        <div className="absolute top-12 left-[10%] w-32 h-32 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Frame */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badge signal */}
              <div className="inline-flex items-center gap-1 bg-zinc-900/80 border border-zinc-805 px-3 py-1.5 rounded-sm">
                <Sparkles className="h-3 w-3 text-[#007aff]" />
                <span className="text-xs font-mono text-zinc-300 ml-1 font-semibold uppercase tracking-wider">
                  Early access now open
                </span>
              </div>

              {/* Lausanne display styling for tradespeople: Huge text, tight line-height */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium leading-[1.05] tracking-tight max-w-xl text-neutral-50">
                Miss a call. <br className="hidden sm:inline"/>
                <span className="text-white font-bold underline decoration-[#007aff] decoration-3">Bookit texts them back.</span> <br/>
                Job booked.
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg max-w-lg leading-relaxed font-sans">
                Your AI assistant texts back every missed call, qualifies the lead, and books the job into your calendar. While you're busy working.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => onNavigate('signup')}
                  className="bg-white/10 backdrop-blur-md border border-white/25 text-white font-display font-semibold text-center px-8 py-4 px-6 py-4 rounded-lg active:scale-98 transition-all hover:bg-white/20 hover:border-white/40 cursor-pointer flex items-center justify-center gap-2 group text-base shadow-[0_4px_24px_rgba(255,255,255,0.03)]"
                >
                  <span>Activate Bookit — $550/month</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="text-zinc-500 text-xs sm:text-sm font-mono flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-emerald-500 font-bold" /> No contracts
                </span>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-emerald-500 font-bold" /> No setup calls
                </span>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-emerald-500 font-bold" /> We handle all the backend
                </span>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-emerald-500 font-bold" /> Setup takes 2 minutes
                </span>
              </div>

            </div>

            {/* Right Side Phone visual mockup of real SMS conversation */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative">
                <PhoneMockup mode="sms_chat" />
              </div>
            </div>

          </div>

          {/* Subtle downward scroll indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-zinc-500 cursor-pointer animate-pulse" 
               onClick={() => document.getElementById('section-problem')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="text-[10px] uppercase font-mono tracking-widest">Scroll Story</span>
            <div className="w-1 h-3 bg-zinc-700 rounded-full"></div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM (No buttons. Just let the words land) */}
      <section className="bg-white py-24 border-y border-zinc-100 relative" id="section-problem">
        <div className="absolute inset-0 bg-radial-gradient-bottom opacity-20" />
        <div className="max-w-[800px] mx-auto px-6 text-center space-y-8">
          
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-50 border border-red-200">
            <AlertOctagon className="h-5 w-5 text-red-600" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight max-w-2xl mx-auto text-neutral-900">
            You're losing jobs every day. Not because you're bad at what you do. <span className="text-red-600 font-semibold underline decoration-wavy decoration-1">Because you're busy doing it.</span>
          </h2>

          <div className="h-px w-24 bg-zinc-200 mx-auto" />

          <div className="space-y-6 text-zinc-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-sans">
            <p>
              You're high up on a roof or crawling in a dusty basement. Your phone rings. You physically cannot answer.
            </p>
            <p className="text-neutral-900 font-medium">
              That customer doesn't leave a voicemail. They simply hang up and call the next trade on Google. This time, he answers.
            </p>
            <p>
              The average missed call in residential services is worth <span className="text-neutral-900 font-bold font-mono px-1 bg-stone-100/80 border border-stone-200 rounded-sm">$1,200 to $4,000</span> in raw ticket profit. 
            </p>
            <p className="text-rose-700 font-mono font-bold text-sm tracking-tight flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
              How many leads did you let slip last week alone?
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS (Desktop alternating, mobile stacking, linked state) */}
      <section className="bg-[#f4f2f0] py-24" id="how-it-works">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-zinc-500 font-semibold bg-stone-200/50 px-3 py-1 rounded-sm border border-stone-300/30">
              Zero Headache Tech
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-neutral-900">
              Here is exactly how it works.
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
              No tech knowledge needed. If you can read a standard text, you can secure more profit with Bookit.
            </p>
          </div>

          {/* Desktop Matrix - Left/Right Sync Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Steps text stack (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              {steps.map((st, i) => {
                const isSelected = activeStep === i;
                return (
                  <div 
                    key={st.id}
                    onClick={() => setActiveStep(i)}
                    className={`p-6 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-white border-zinc-300 shadow-sm' 
                        : 'bg-transparent border-transparent hover:bg-white/40'
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold shrink-0 ${
                        isSelected ? 'bg-neutral-900 text-white' : 'bg-stone-300 text-stone-600'
                      }`}>
                        {st.number}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-semibold text-lg text-neutral-950">{st.title}</h4>
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm font-semibold tracking-wide ${
                            isSelected ? 'bg-neutral-950 text-white' : 'bg-stone-300/40 text-stone-600'
                          }`}>
                            {st.badge}
                          </span>
                        </div>
                        <p className="text-zinc-600 text-sm leading-relaxed">{st.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sync Phone Mockup box on the Right (5 cols on desktop) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-zinc-200/80 rounded-[48px] -z-10 blur-xl pointer-events-none" />
                <PhoneMockup 
                  mode={steps[activeStep].phoneMode === 'Auto-synced' ? 'contractor_alert' : steps[activeStep].phoneMode as any} 
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ALTERNATING FEATURE SHOWCASE */}
      <section className="bg-white py-24 border-b border-zinc-100" id="feature-showcase">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-24">
          
          <div className="text-center max-w-xl mx-auto space-y-2.5">
            <span className="text-xs uppercase tracking-widest font-mono text-[#007aff] font-bold">
              Real-world conversations
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-neutral-950">
              Your custom assistant works exactly like an elite office admin.
            </h2>
          </div>

          {/* Row 1 — Left Text, Right Bubbles */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-zinc-400">🔥 CONVERSATION 01</span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-950">
                Instantly captures missed-call leads before they call the competitor
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
                Bookit triggers an immediate text response within 2.5 seconds of a missed call. Prospects find out they are valued, stopping their search in its tracks.
              </p>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center">
              <IMessageWindow contactName="Mike's Plumbing" avatarInitial="MP">
                <SMSSnippet sender="prospect" text="Hey, tried calling to get an estimate on a sewer pipe leak?" time="9:15 PM" />
                <SMSSnippet sender="bot" text="Hi! This is Bookit from Mike's Plumbing. Sorry I missed your call, I was busy on a job. I can help you get booked in a second! What area/ZIP are you located in?" time="9:15 PM" />
              </IMessageWindow>
            </div>
          </div>

          {/* Row 2 — Right Text, Left Bubbles */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 md:order-2 space-y-4">
              <span className="text-xs font-mono font-bold text-zinc-400">⚙️ CONVERSATION 02</span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-950">
                Qualifies lead detail and filters out tyre-kickers
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
                It gathers the ZIP code, service requirement, and specific task description conversationally, so you only spend your drive time on fully-validated prospects.
              </p>
            </div>
            <div className="md:col-span-6 md:order-1 flex flex-col justify-center">
              <IMessageWindow contactName="Mike's Plumbing" avatarInitial="MP">
                <SMSSnippet sender="prospect" text="I am in west Austin, 78703." time="9:16 PM" />
                <SMSSnippet sender="bot" text="Perfect! We have plumbers in 78703 tomorrow. Are you ready to book an inspection slot, or did you want standard pricing estimates first?" time="9:16 PM" />
                <SMSSnippet sender="prospect" text="Ready to book. I need someone to look at our kitchen sink disposal." time="9:17 PM" />
              </IMessageWindow>
            </div>
          </div>

          {/* Row 3 — Left Text, Right Bubbles */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-zinc-400">📅 CONVERSATION 03</span>
              <h3 className="text-xl sm:text-2xl font-display font-medium text-neutral-950">
                Picks dispatch slots directly based on your open hours
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-sans">
                Bookit serves dynamic options straight from your active working hours. It selects open dispatch intervals and closes high-value contracts directly via text command.
              </p>
            </div>
            <div className="md:col-span-6 flex flex-col justify-center">
              <IMessageWindow contactName="Mike's Plumbing" avatarInitial="MP">
                <SMSSnippet sender="bot" text="Excellent. For a sink disposal repair we have tomorrow between 8am-10am or 2pm-4pm available. Which one works best?" time="9:18 PM" />
                <SMSSnippet sender="prospect" text="Let's do 2pm tomorrow" time="9:18 PM" />
                <SMSSnippet sender="bot" text="Perfect! You are booked. Mike will arrive tomorrow between 2pm-4pm. We sent a calendar invite summary to your phone. Let me know if you need to reschedule!" time="9:19 PM" />
              </IMessageWindow>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4 — ONBOARDING VIDEO */}
      <section className="bg-white py-24 border-b border-zinc-100" id="section-video">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          
          <div className="space-y-3 mb-10">
            <span className="text-xs uppercase tracking-widest font-mono text-zinc-500 font-semibold">
              Video Walkthrough
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-neutral-900">
              See how it works in 2 minutes
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
              Watch our founder walk you through setting up Bookit and how it protects your inbound calls.
            </p>
          </div>

          {/* Interactive Player Mockup */}
          <div className="relative bg-zinc-950 aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl max-w-3xl mx-auto group">
            {!videoPlaying ? (
              // Thumbnail state
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white text-left select-none">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20 z-0" />
                
                {/* Founder tag */}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="bg-neutral-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                    FOUNDER DEMO
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Duration: 2:10 mins</span>
                </div>

                {/* Big play button centered */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button 
                    onClick={startVideoSimulation}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] cursor-pointer hover:bg-white/20 active:border-white/40"
                  >
                    <Play className="h-8 w-8 fill-white ml-1 text-white" />
                  </button>
                </div>

                {/* Bottom title info */}
                <div className="relative z-10 space-y-1">
                  <h4 className="font-display font-semibold text-lg text-white">"Forward calls. Collect cash. No maintenance."</h4>
                  <p className="text-xs text-zinc-400 font-sans">Casual explanation by Michael R., Plumbing Co. Owner & Founder of Bookit</p>
                </div>
              </div>
            ) : (
              // Playing simulated state
              <div className="absolute inset-0 bg-zinc-950 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white flex items-center gap-1 font-semibold">
                      <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse mr-1"></span>
                      PLAYING SIMULATION
                    </span>
                  </div>
                  <button 
                    onClick={stopVideoSimulation}
                    className="p-1 rounded-full bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-zinc-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Displaying interactive slides portraying Michael R */}
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="h-12 w-12 bg-neutral-900 border border-zinc-800 rounded-full ring-2 ring-white/20 flex items-center justify-center font-bold">
                    MR
                  </div>
                  <div className="max-w-md bg-zinc-900 p-4 rounded-lg border border-zinc-800 shadow-md">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono text-left mb-1">Speaker Subtitles</p>
                    <p className="text-sm font-semibold text-zinc-100 text-left min-h-[48px]">
                      "{videoCaptions[videoCaptionsIndex]}"
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {videoCaptions.map((_, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setVideoCaptionsIndex(idx)}
                        className={`w-8 h-1 z-10 cursor-pointer rounded-xs transition-all ${idx === videoCaptionsIndex ? 'bg-white' : 'bg-zinc-800'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom timeline controls */}
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-2 border-t border-zinc-900">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-300">0:{videoCaptionsIndex * 15} / 2:10</span>
                    <span className="text-[10px] bg-zinc-900 px-2 rounded-sm text-zinc-400">1080p</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-300">
                    <Volume2 className="h-3.5 w-3.5 inline text-zinc-300" />
                    <span>Real-world audio preview</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 space-y-4">
            <p className="text-zinc-600 font-sans text-sm">Ready to see how fast it transforms your intake?</p>
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-[#0c0a08] hover:bg-neutral-800 text-white font-display font-semibold px-6 py-3.5 rounded-lg text-sm cursor-pointer inline-flex items-center gap-2 shadow-md active:scale-98 transition-all hover:scale-101"
            >
              <span>Activate Bookit Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5 — FEATURE SHOWCASE */}
      <section className="bg-[#f4f2f0] py-24 border-b border-stone-200" id="features">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-zinc-500 font-semibold bg-stone-200/50 px-3 py-1 rounded-sm border border-stone-300/30">
              Feature Arsenal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-neutral-900">
              Everything Bookit does for you
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
              Behind our simple system is an autopilot lead machine engineered specifically for physical field services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  01
                </div>
                <h4 className="font-display font-bold text-base text-neutral-900">Texts missed calls instantly</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Responds within 30 seconds of an unanswered call, so leads never have a window to phone your competitor.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>SPEED LIMIT: &lt;30s</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  02
                </div>
                <h4 className="font-display font-bold text-base text-neutral-900">Qualifies every single lead</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Smart conversational paths verify details like target location, specific issue, and urgency before offering slots.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>FILTER STYLE: ACTIVE</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  03
                </div>
                <h4 className="font-display font-bold text-base text-neutral-900">Secures on-calendar spots</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Customer selects from your actual availability based on your working hours. Completely eliminates back-and-forth call tag.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>AVAILABILITY: YOUR HOURS</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  04
                </div>
                <h4 className="font-display font-bold text-base text-neutral-900">Schedules and Confirms</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Instantly sends text confirmation with automatic calendar event invitations to both buyer and technician.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>ALERT: INSTANT SMS</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  05
                </div>
                <h4 className="font-display font-bold text-base text-neutral-900">Auto day-before reminders</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Bookit texts the client automatically 24 hours prior. Dramatically slashes high-loss no-shows and driving waste.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>REMINDER: 24H BEFORE</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  06
                </div>
                <h4 className="font-display font-bold text-base text-neutral-900">Autopilot Local Reviews</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Hours after the work is done, Bookit texts them with a direct Google Business Link to stack positive reviews.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>LINK STYLE: DEEP URL</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

            {/* Feature 7 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  07
                </div>
                <h4 className="font-display font-bold text-base text-neutral-900">Custom assistant name</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Give your assistant a personalized name related to your trade. Clients feel they are interacting with an experienced office manager.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>AI RECEPTIONIST BRAND</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

            {/* Feature 8 */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between hover:border-zinc-400 transition-colors">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-sm bg-neutral-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  08
                </div>
                <h4 className="font-display font-bold text-[11px] text-white bg-[#0c0a08] px-2 py-0.5 rounded-sm max-w-max font-mono mb-1">Text-control capability</h4>
                <h4 className="font-display font-bold text-base text-neutral-900">Text your assistant anytime</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-sans">
                  Direct control. Simply text "Sarah, block off Friday afternoon for family time" and Bookit secures those slots instantly.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>INPUT TYPE: PLAIN SMS</span>
                <span className="text-[#007aff] font-bold">LIVE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6 — TESTIMONIALS (Auto-scrolling testimonial card strip) */}
      <section className="bg-[#0c0a08] py-24 text-white overflow-hidden relative" id="reviews">
        <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-black via-black/40 to-transparent z-10 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-zinc-400 font-bold">
              Success Reports From Private Beta
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white">
              Contractors are waking up to booked jobs
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto">
              Real results of trade firms that stopped losing missed call leads to competitors.
            </p>
          </div>
        </div>

        {/* Testimonials Strip */}
        <div className="w-full py-4 overflow-x-auto no-scrollbar flex gap-6 px-10">
          
          {/* Card 1 */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl min-w-[280px] sm:min-w-[340px] max-w-[340px] space-y-4 shrink-0 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                "I missed a call Tuesday night while having dinner. By morning the customer was already scheduled for Thursday. Secure leak order secured and I didn't perform a single manual task."
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
              <div>
                <h5 className="font-bold text-xs text-white">Mike R.</h5>
                <span className="text-[10px] text-zinc-500 font-mono">Owner, Texas Plumbers</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-sm font-mono font-bold">PLUMBING</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl min-w-[280px] sm:min-w-[340px] max-w-[340px] space-y-4 shrink-0 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                "Literally set Bookit up on my iPad in like 2 minutes at the back of my truck. Captured my very first residential roofing checkout booking the exact same week."
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
              <div>
                <h5 className="font-bold text-xs text-white">Dave K.</h5>
                <span className="text-[10px] text-zinc-500 font-mono">Owner, YardEnvy</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-sm font-mono font-bold">ROOFING</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl min-w-[280px] sm:min-w-[340px] max-w-[340px] space-y-4 shrink-0 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                "Honestly I was extremely skeptical about AI. Now, seeing how the assistant filters callers and routes bookings automatically, I don't know how I ever ran my HVAC company without it."
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
              <div>
                <h5 className="font-bold text-xs text-white">Carlos M.</h5>
                <span className="text-[10px] text-zinc-500 font-mono">President, Sunshine HVAC</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-sm font-mono font-bold">HVAC</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl min-w-[280px] sm:min-w-[340px] max-w-[340px] space-y-4 shrink-0 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                "My electrical dispatch has become zero headache. Instead of typing texts back or negotiating hours, Bookit handles everything while I'm hands-deep in breaker boxes."
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
              <div>
                <h5 className="font-bold text-xs text-white">Austin J.</h5>
                <span className="text-[10px] text-zinc-500 font-mono">Owner, Volt Masters</span>
              </div>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-sm font-mono font-bold">ELECTRICAL</span>
            </div>
          </div>

        </div>

        <div className="text-center pt-10 text-xs text-zinc-500 font-mono">
          ▲ SCROLL HORIZONTALLY TO READ ALL TESTIMONIALS ▲
        </div>
      </section>

      {/* SETUP FEES DETAILS SECTION */}
      <section className="bg-white py-24 border-b border-zinc-100" id="setup-justification">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-[#007aff] font-bold bg-[#007aff]/5 px-3 py-1 rounded-full border border-[#007aff]/10">
              MEMBERSHIP ALIGNMENT & VALUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-neutral-950">
              Why we charge a one-time $500 monthly fee
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Bookit is a premium, fully managed background autopilot that saves hundreds of manual calling and dispatching hours. Here is how that flat monthly rate is distributed to guarantee zero operations friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Out-of-the-box Bento Widget 1: Network & Dedicated Carrier Line */}
            <div className="bg-gradient-to-b from-stone-50 to-white p-6 rounded-2xl border border-stone-200/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#007aff] bg-[#007aff]/5 px-2.5 py-1 rounded border border-[#007aff]/10">
                    MODULE 01 — NETWORK
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-neutral-900 group-hover:text-[#007aff] transition-colors">
                  Custom SMS Routing Line
                </h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
                  We provision and license a dedicated professional SMS telephone line in your local area code, hosted on high-priority delivery routes complying with all A2P 10DLC regulations.
                </p>
              </div>

              {/* Dynamic Mini Console Visualizer */}
              <div className="mt-6 pt-5 border-t border-stone-200/60 font-mono text-[9px] text-zinc-500 space-y-1.5">
                <div className="flex justify-between items-center bg-stone-100 p-1.5 rounded border border-stone-200/30">
                  <span>Carrier Registry:</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-wide">A2P VERIFIED</span>
                </div>
                <div className="flex justify-between items-center text-[8.5px]">
                  <span>Avg Delivery Speed:</span>
                  <span className="text-neutral-800 font-bold">0.82 Seconds</span>
                </div>
                <div className="flex justify-between items-center text-[8.5px]">
                  <span>Failover Route:</span>
                  <span className="text-neutral-800 font-bold">Active Tier-1</span>
                </div>
              </div>
            </div>

            {/* Out-of-the-box Bento Widget 2: AI Processing & Node pipelines */}
            <div className="bg-gradient-to-b from-stone-50 to-white p-6 rounded-2xl border border-stone-200/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#007aff] bg-[#007aff]/5 px-2.5 py-1 rounded border border-[#007aff]/10">
                    MODULE 02 — PIPELINE
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold">99.9% UPTIME</span>
                </div>
                <h4 className="font-display font-bold text-sm text-neutral-900 group-hover:text-[#007aff] transition-colors">
                  Personalized Bot Token
                </h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
                  We deploy your custom-trained Bookit AI instance inside isolation containers with its own designated API request tokens and calendar-synced synchronization pipelines.
                </p>
              </div>

              {/* Dynamic Workflow Node Pipeline Visualizer */}
              <div className="mt-6 pt-5 border-t border-stone-200/60 font-mono text-[9px] text-zinc-500 space-y-2">
                <div className="flex justify-between items-center bg-stone-100 p-1.5 rounded border border-stone-200/30">
                  <span>Workflow Token:</span>
                  <span className="text-[#007aff] font-bold">ACTIVE_CONTAINER</span>
                </div>
                <div className="flex items-center justify-between bg-stone-50 border border-stone-200/60 p-2 rounded gap-1 text-[8px] uppercase tracking-wide text-zinc-400">
                  <span className="text-neutral-900 font-bold font-sans">Call Missed</span>
                  <span>➔</span>
                  <span className="text-neutral-900 font-bold font-sans">Lead Qualified</span>
                  <span>➔</span>
                  <span className="text-[#007aff] font-bold font-sans font-black">Booked</span>
                </div>
              </div>
            </div>

            {/* Out-of-the-box Bento Widget 3: Setup Speed & Compliance Guarantee */}
            <div className="bg-gradient-to-b from-stone-50 to-white p-6 rounded-2xl border border-stone-200/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#007aff] bg-[#007aff]/5 px-2.5 py-1 rounded border border-[#007aff]/10">
                    MODULE 03 — GUARANTEE
                  </span>
                  <span className="text-zinc-500 font-bold text-[9px] bg-stone-100 border border-stone-250 px-2 py-0.5 rounded">INSTANT</span>
                </div>
                <h4 className="font-display font-bold text-sm text-neutral-900 group-hover:text-[#007aff] transition-colors">
                  Flawless 5-minute Onboarding
                </h4>
                <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
                  We do 100% of the complex server setup behind the scenes. Your system is configured, tested, and live with cell forwarding in less than 5 minutes total. Guaranteed.
                </p>
              </div>

              {/* Dynamic Speed Progress & Verification checkmark list */}
              <div className="mt-6 pt-5 border-t border-stone-200/60 font-mono text-[9px] text-zinc-500 space-y-2">
                <div className="flex justify-between items-center bg-stone-100 p-1.5 rounded border border-stone-200/30">
                  <span>Automated Setup Speed:</span>
                  <span className="text-neutral-900 font-bold">4m 42s Avg</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden flex">
                  <div className="bg-gradient-to-r from-[#007aff] to-emerald-500 h-full w-full"></div>
                </div>
                <div className="flex justify-between text-[8px] text-zinc-400 font-sans font-bold">
                  <span>Calendar ✔</span>
                  <span>Carrier SMS ✔</span>
                  <span>Autopilot LIVE ✔</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7 — PRICING (One single centered card modeled after clean Ramp style) */}
      <section className="bg-[#f4f2f0] py-24" id="pricing">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-neutral-900">
              One price. No hidden fees. No contracts.
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We handle 100% of the backend setup for you, configuring your live calendars, routing your custom SMS line, and deploying your high-speed Bookit Bot as well as complying with all National SMS rules and a one-time setup fee helps cover all that so your autopilot is 100% flawless, secure, and live in under 5 minutes.
            </p>
          </div>

          {/* Pricing container card */}
          <div className="max-w-md mx-auto bg-white rounded-xl border border-stone-300 shadow-xl overflow-hidden relative" id="pricing-box">
            
            {/* Top decorative black outline */}
            <div className="h-2 bg-neutral-950 w-full" />
            
            <div className="p-8 space-y-6">
              
              <div className="text-center space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#007aff] font-bold bg-[#007aff]/5 px-3 py-1 rounded-full border border-[#007aff]/10 inline-block">
                  FLAT ACCESS
                </span>
                <div className="flex flex-col items-center justify-center py-2">
                  <span className="text-6xl font-display font-black text-neutral-900 tracking-tight">$550</span>
                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-1 font-bold">/ month</span>
                </div>
                <div className="text-[10px] text-neutral-800 font-mono font-bold tracking-wider uppercase bg-stone-100 py-1.5 px-3 rounded border border-stone-200">
                  $50 SETUP FEE • NO CONTRACTS • CANCEL ANYTIME
                </div>
              </div>

              <hr className="border-stone-100" />

              {/* List of checkout items */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-700" id="pricing-features">
                {[
                  "Texts back every single missed call instantly",
                  "Automated conversational lead qualification",
                  "Secure unique booking links & dispatch slots",
                  "Confirmation texts with automatic calendar invite links",
                  "Day-before client reminders automatically",
                  "Review requests texts post-appointment",
                  "Select a custom name for your assistant",
                  "Full-stack booking landing page simulator included",
                  "Full control via simple text message inputs",
                  "Text your assistant anytime to cancel, reschedule, or get a refund",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="rounded-full bg-neutral-900/10 p-0.5 mt-0.5 text-neutral-900 shrink-0">
                      <Check className="h-3.5 w-3.5 font-bold stroke-[3]" />
                    </div>
                    <span className="text-neutral-800 font-sans font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <hr className="border-stone-100" />

              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('signup')}
                  className="w-full bg-[#0c0a08] hover:bg-neutral-800 text-white font-display font-bold py-4 rounded-lg text-center cursor-pointer active:scale-98 transition-all hover:scale-101 shadow-md"
                >
                  Activate Bookit Now →
                </button>

                <p className="text-[10px] text-zinc-550 font-mono font-medium text-center leading-normal">
                  🔐 Fast Stripe Setup • Safe Connection • Instantly Active 
                </p>
              </div>

            </div>
          </div>

          <div className="text-center mt-8 max-w-lg mx-auto">
            <div className="text-xs sm:text-sm font-display font-bold italic tracking-wide text-neutral-900 bg-stone-100 border border-stone-250 py-4 px-6 rounded-lg shadow-sm">
              💡 ONE SINGLE BOOKED JOB COVERS THE ENTIRE MONTHLY COST. THE REST IS PURE PROFIT.
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white py-24 border-b border-zinc-100" id="landing-faq">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs uppercase tracking-widest font-mono text-[#007aff] font-bold">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-neutral-950">
              Frequently Asked Questions.
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm">
              Everything you need to know about Bookit, pricing, and operations.
            </p>
          </div>

          <div className="space-y-1">
            <FAQItem 
              question="What exactly does the $500 monthly fee cover?" 
              answer="The monthly flat fee covers the full continuous operation of your background autopilot, including your dedicated local SMS routing carrier line, isolated secure database container, high-priority AI inference cycles, and calendar routing synchronization. There are zero extra per-call fees or commissions. Every dollar earned is 100% yours." 
            />
            <FAQItem 
              question="How do I change my settings or pause/cancel my subscription?" 
              answer="We believe in maximum control. You don't need to log into any complex dashboards. Just send a text message directly to your Bookit number. Text 'CANCEL' at any time to immediately end your subscription, or 'REFUND' to request a pro-rated refund on your current billing period." 
            />
            <FAQItem 
              question="Does Bookit interfere with my normal telephone routing?" 
              answer="No, not at all. Bookit utilizes conditional call forwarding (also known as busy/no-answer forwarding). When your line is busy or you choose not to answer, your carrier automatically routes just that single call to Bookit to be captured. If you answer your phone normally, Bookit never intervenes, and nothing changes." 
            />
            <FAQItem 
              question="Do I need to install any apps on my phone?" 
              answer="Zero apps to install. Bookit runs entirely in our lightning-fast high-speed server clouds. You configure it in 30 seconds by simply dialing your carrier activation code once. Afterwards, all alerts, analytics, settings, and cancellations happen directly through standard text messages." 
            />
          </div>

        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="bg-[#0c0a08] text-white py-24 relative overflow-hidden text-center" id="section-final-cta">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.05)_0%,rgba(12,10,8,0)_50%)] pointer-events-none" />
        <div className="max-w-xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white leading-tight">
            Your next missed call is already on its way.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-sm mx-auto">
            Will your team let them phone the other guy, or will Bookit lock in the appointment automatically?
          </p>

          <div className="pt-4">
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-white/10 backdrop-blur-md border border-white/25 text-white font-display font-semibold px-8 py-4.5 rounded-lg text-base tracking-wide active:scale-98 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer shadow-lg hover:scale-101"
            >
              Activate Bookit Now →
            </button>
          </div>

          <p className="text-zinc-500 text-[11px] font-mono leading-none">
            Takes 2 minutes to set up • No calls • Cancel anytime
          </p>
        </div>
      </section>

    </div>
  );
}

import React, { useState } from 'react';
import { 
  Check, Play, X, Smartphone, PhoneForwarded, MessageSquare, Copy, 
  HelpCircle, Volume2, Calendar, Clock, AlertCircle, RefreshCw, Send, CheckCircle2
} from 'lucide-react';
import { SignupFormData } from '../types';
import PhoneMockup from './PhoneMockup';

interface SuccessPageProps {
  data: SignupFormData | null;
  onRestart: () => void;
}

export default function SuccessPage({ data, onRestart }: SuccessPageProps) {
  // Fallbacks if form was empty
  const businessName = data?.businessName || "Mike's Plumbing";
  const assistantName = "your assistant";
  const messageStyle = data?.messageStyle || "Professional";
  const mobileNumber = data?.mobileNumber || "+1 (512) 555-0199";

  const [activeTab, setActiveTab] = useState<'att' | 'verizon' | 'tmobile'>('att');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [testCallActive, setTestCallActive] = useState<boolean>(false);

  // For the simulated step-by-step checklist
  const [checks, setChecks] = useState({
    billing: true,
    provision: true,
    forward: false,
    welcomeSms: false,
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const carrierCodes = {
    att: {
      title: "AT&T / Cricket Wireless",
      activation: "*61*15128080192#",
      instruction: "Dial this exact code on your mobile phone to forward only missed (unanswered) calls to Bookit.",
      deactivation: "##61#"
    },
    verizon: {
      title: "Verizon / Spectrum",
      activation: "*7115128080192",
      instruction: "Dial this on your mobile and press Call. Your phone will beep twice and hang up. Conditional forwarding is live.",
      deactivation: "*73"
    },
    tmobile: {
      title: "T-Mobile / MetroPCS",
      activation: "*61*15128080192**30#",
      instruction: "Dial this to forward missed calls after 30 seconds of ringing. Press call, wait for confirmation message.",
      deactivation: "##61#"
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2f0] py-12 px-4 sm:px-6 font-sans text-neutral-900" id="success-root">
      
      {/* Brand header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 border-b pb-4 border-stone-250">
        <div className="flex items-center gap-2">
          <span className="font-display font-medium text-lg">bookit</span>
        </div>
        <button 
          onClick={onRestart}
          className="text-xs bg-white hover:bg-stone-50 border px-3 py-1.5 rounded-sm font-mono text-zinc-500 hover:text-neutral-950 transition-colors"
        >
          🔄 Restart Demo Simulator 
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ONBOARDING & GUIDES */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Banner */}
          <div className="bg-[#0c0a08] text-white p-6 rounded-xl border border-zinc-800 space-y-2 relative overflow-hidden shadow-xl">
            <div className="absolute top-4 right-4 bg-lime-signal text-obsidian text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs uppercase tracking-wide">
              Active Autopilot
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              You're live. 🎉
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Bookit is actively monitoring your line. Check your phone — your setup text is already on its way to <span className="font-mono text-white font-semibold">{mobileNumber}</span>.
            </p>
          </div>

          {/* CHECKLIST STATE PANEL */}
          <div className="bg-white p-6 rounded-xl border border-stone-300 shadow-sm space-y-4">
            <h3 className="font-display font-semibold text-base">Your Activation Checklist</h3>
            <div className="space-y-3 font-sans text-xs">
              
              <div className="flex items-center justify-between p-2.5 rounded-md bg-stone-50 border border-stone-200">
                <div className="flex items-start gap-2.5">
                  <div className="h-5 w-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="font-bold">Connected Payment & Billing</span>
                    <p className="text-zinc-500 text-[10px]">Securely processed $550/mo flat flat-rate on Stripe.</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold text-zinc-400">DONE</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-md bg-stone-50 border border-stone-200">
                <div className="flex items-start gap-2.5">
                  <div className="h-5 w-5 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="font-bold">Provision Dedicated SMS Hotline</span>
                    <p className="text-zinc-500 text-[10px]">Active connection: <strong className="font-mono text-[9px] text-zinc-700 font-semibold">+1 (512) 808-0192</strong></p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold text-zinc-400">DONE</span>
              </div>

              <div 
                onClick={() => setChecks(prev => ({ ...prev, forward: !prev.forward }))}
                className="flex items-center justify-between p-2.5 rounded-md cursor-pointer border transition-all hover:bg-stone-50 bg-white"
              >
                <div className="flex items-start gap-2.5">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                    checks.forward ? 'bg-emerald-100 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-700 animate-pulse'
                  }`}>
                    {checks.forward ? <Check className="h-3 w-3 stroke-[3]" /> : <PhoneForwarded className="h-3 w-3" />}
                  </div>
                  <div>
                    <span className="font-bold">Forward missed calls to Bookit</span>
                    <p className="text-zinc-500 text-[10px]">Dial your carrier automatic routing code below on your mobile.</p>
                  </div>
                </div>
                <button className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm ${
                  checks.forward ? 'bg-emerald-50 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {checks.forward ? 'COMPLETED' : 'TODO'}
                </button>
              </div>

              <div 
                onClick={() => setChecks(prev => ({ ...prev, welcomeSms: !prev.welcomeSms }))}
                className="flex items-center justify-between p-2.5 rounded-md cursor-pointer border transition-all hover:bg-stone-50 bg-white"
              >
                <div className="flex items-start gap-2.5">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                    checks.welcomeSms ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 border text-zinc-500'
                  }`}>
                    {checks.welcomeSms ? <Check className="h-3 w-3 stroke-[3]" /> : <MessageSquare className="h-3 w-3" />}
                  </div>
                  <div>
                    <span className="font-bold">Acknowledge initial Welcome text</span>
                    <p className="text-zinc-500 text-[10px]">Simulates receiving onboarding greeting from your new line.</p>
                  </div>
                </div>
                <button className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm ${
                  checks.welcomeSms ? 'bg-emerald-50 text-emerald-800' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {checks.welcomeSms ? 'CONFIRMED' : 'TO SECURE'}
                </button>
              </div>

            </div>
          </div>

          {/* FOUNDER REQUIRED ONBOARDING VIDEO */}
          <div className="bg-white p-6 rounded-xl border border-stone-300 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <span className="bg-red-500 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm">REQUIRED PLAY</span>
              <h3 className="font-display font-medium text-sm text-neutral-900">Watch this first — 2 minutes</h3>
            </div>

            {!videoPlaying ? (
              <div className="relative aspect-[16/9] bg-zinc-950 rounded-lg overflow-hidden border border-zinc-805 group max-w-lg mx-auto">
                <div className="absolute inset-0 bg-black/45 z-10 flex items-center justify-center">
                  <button 
                    onClick={() => setVideoPlaying(true)}
                    className="h-14 w-14 rounded-full bg-lime-signal text-obsidian flex items-center justify-center shadow-lg hover:scale-105 cursor-pointer"
                  >
                    <Play className="h-6 w-6 ml-0.5 fill-obsidian text-obsidian" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-4 right-4 z-20 text-white text-left">
                  <h4 className="font-display font-semibold text-xs">"How to properly test and forward your missed calls"</h4>
                  <p className="text-[10px] text-zinc-400 font-sans">Walkthrough with Michael R., Founder of Bookit</p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-[16/9] bg-zinc-950 rounded-lg p-4 text-white flex flex-col justify-between">
                <div className="flex justify-between items-center pb-1 border-b border-zinc-800">
                  <span className="text-[10px] text-lime-signal font-mono font-bold">FOUNDER BRIEF</span>
                  <button onClick={() => setVideoPlaying(false)} className="text-zinc-500 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center text-center py-2">
                  <Volume2 className="h-10 w-10 text-lime-signal animate-pulse" />
                  <p className="text-xs max-w-sm mt-3 italic font-mono text-zinc-300">
                    "Awesome, you're officially live. The only thing you need to do is dial the forwarding code. Once typed, Bookit filters and secures all unanswered call leads silently."
                  </p>
                </div>

                <div className="mt-2 text-center text-[9px] text-zinc-500">
                  Simulated audio track • 2:10 duration • Playing in high-fidelity
                </div>
              </div>
            )}

            <p className="text-[11px] text-zinc-500 text-center font-sans font-medium">
              "That's it. Dial the code, then go back to your day. Bookit handles everything else."
            </p>
          </div>

          {/* DYNAMIC FORWARDING CODE INSTRUCTION BOX */}
          <div className="bg-white p-6 rounded-xl border border-stone-300 shadow-sm space-y-4">
            
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-sm">Step 3 Guide: Call Forwarding</h3>
              <p className="text-zinc-500 text-xs">
                Select your mobile carrier to see your personalized 2-second call-routing dialing code.
              </p>
            </div>

            {/* Tabs selector */}
            <div className="flex gap-1 bg-[#f4f2f0] p-1 rounded-sm border">
              {(['att', 'verizon', 'tmobile'] as const).map(tabKey => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`flex-1 py-2 rounded-xs font-mono text-[10px] uppercase font-bold text-center transition-all cursor-pointer ${
                    activeTab === tabKey 
                      ? 'bg-neutral-900 text-lime-signal font-bold shadow-xs' 
                      : 'text-stone-500 hover:text-neutral-900'
                  }`}
                >
                  {tabKey === 'att' ? 'AT&T' : tabKey === 'verizon' ? 'Verizon' : 'T-Mobile'}
                </button>
              ))}
            </div>

            {/* Code instructions show */}
            <div className="bg-[#f4f2f0] p-4 rounded-lg border border-stone-250 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs">{carrierCodes[activeTab].title} Activation:</span>
                <span className="text-[9px] bg-lime-500/10 text-lime-800 px-1.5 font-mono font-bold">READY</span>
              </div>

              {/* Huge code display with copy */}
              <div className="flex bg-neutral-950 text-white rounded-md p-3.5 items-center justify-between font-mono text-sm sm:text-base select-all border border-zinc-800">
                <span className="text-lime-signal font-bold font-mono">{carrierCodes[activeTab].activation}</span>
                <button 
                  onClick={() => handleCopyCode(carrierCodes[activeTab].activation)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-xs px-2.5 py-1 rounded-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedCode === carrierCodes[activeTab].activation ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <p className="text-[11px] text-zinc-650 leading-relaxed font-sans text-neutral-600 font-medium">
                {carrierCodes[activeTab].instruction}
              </p>
              
              <div className="pt-2 border-t text-[10px] text-zinc-500 font-mono">
                Deactivate anytime by dialing: <span className="text-zinc-700 font-bold">{carrierCodes[activeTab].deactivation}</span>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-amber-800 leading-normal">
                <strong>Important:</strong> Conditional forwarding only sends calls to Bookit if you <strong>fail to pick up</strong> or are <strong>already busy on a call</strong>. Your normal calls will still ring on your phone exactly as they do now.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-300 shadow-sm space-y-3">
              <h3 className="font-display font-semibold text-sm">Managing your subscription</h3>
              <div className="space-y-2 text-xs text-zinc-600 font-sans">
                <div className="flex gap-2 items-start">
                  <span className="font-mono font-bold text-neutral-900 bg-stone-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">CANCEL</span>
                  <p>Text the word <strong>CANCEL</strong> to your Bookit number at any time to stop your subscription. No calls, no forms.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="font-mono font-bold text-neutral-900 bg-stone-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">REFUND</span>
                  <p>Text the word <strong>REFUND</strong> to request a pro-rated refund on your current billing period. The $50 setup fee is non-refundable.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: AI RECEPTIONIST METRIC PREVIEW & INTERACTIVE TESTING PLAYGROUND */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SECURE SPEC PREVIEW CARD */}
          <div className="bg-white p-5 rounded-xl border border-stone-300 shadow-sm space-y-4">
            <h3 className="font-display font-medium text-xs text-zinc-400 uppercase tracking-widest block font-mono">Receptionist Profile</h3>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b pb-1.5 border-stone-100">
                <span className="text-zinc-500 font-sans">Business Name:</span>
                <span className="font-bold font-mono text-right">{businessName}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5 border-stone-100">
                <span className="text-zinc-500 font-sans">Service Field:</span>
                <span className="font-bold text-zinc-700 font-mono">{data?.serviceType || 'Plumbing'}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5 border-stone-100">
                <span className="text-zinc-500 font-sans">Assistant Name:</span>
                <span className="font-bold text-zinc-500 font-mono italic">Set via SMS after payment</span>
              </div>
              <div className="flex justify-between border-b pb-1.5 border-stone-100">
                <span className="text-zinc-500 font-sans">Greeting Tone:</span>
                <span className="font-bold text-zinc-700 font-mono">{messageStyle}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5 border-stone-100">
                <span className="text-zinc-500 font-sans">SMS Hotline Line:</span>
                <span className="font-bold text-neutral-950 font-mono text-zoom">+1 (512) 808-0192</span>
              </div>
            </div>

            <div className="p-3 bg-[#f4f2f0] rounded-lg border border-stone-250">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold block font-mono">Greeting Preview:</span>
              <p className="text-[10px] text-neutral-800 italic leading-snug mt-1 font-mono">
                {messageStyle === 'Friendly' && `Hey! ${assistantName} here from ${businessName} 👋 What's going on?`}
                {messageStyle === 'Direct' && `${businessName}. What do you need?`}
                {messageStyle === 'Professional' && `Hi, this is ${assistantName} from ${businessName}. How can help you today?`}
              </p>
            </div>
          </div>

          {/* DYNAMIC HANDSET SIMULATOR */}
          <div className="space-y-2 flex flex-col items-center">
            
            <div className="text-center">
              <span className="bg-lime-signal text-obsidian text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm">
                PLAYGROUND SANDBOX
              </span>
              <h4 className="font-display font-medium text-sm mt-1 mb-2">Test calling your receptionist online!</h4>
            </div>

            <div className="bg-[#0c0a08] p-4 rounded-xl border border-zinc-800 text-center w-full space-y-3">
              <p className="text-xs text-zinc-400">
                Simulate a missed call from a prospect to see Bookit's interactive booking process live!
              </p>

              {!testCallActive ? (
                <button
                  onClick={() => setTestCallActive(true)}
                  className="w-full bg-lime-signal text-[#0c0a08] hover:brightness-115 text-xs font-display font-bold py-3 rounded-xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-98"
                >
                  <Send className="h-3 w-3" />
                  <span>Simulate a Missed Prospect Call</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="text-[10px] text-zinc-500 font-mono">Prospect test call active</span>
                    <button 
                      onClick={() => setTestCallActive(false)} 
                      className="text-[10px] text-red-500 underline"
                    >
                      Exit Sandbox
                    </button>
                  </div>
                  
                  {/* Phone rendering */}
                  <div className="flex justify-center scale-95 origin-top">
                    <PhoneMockup 
                      mode="sms_chat" 
                      assistantName={assistantName} 
                      businessName={businessName} 
                      messageStyle={messageStyle}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

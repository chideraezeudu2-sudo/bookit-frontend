import React, { useState } from 'react';
import { 
  ArrowRight, Shield, Calendar, Clock, CreditCard, ChevronDown, Check,
  Lock, Sparkles, Building2, User2, Smartphone, Briefcase, HelpCircle, ArrowLeft, MessageSquare
} from 'lucide-react';
import { SignupFormData, ServiceType } from '../types';

interface SignupPageProps {
  onSuccess: (data: SignupFormData) => void;
  onNavigate: (page: 'landing' | 'signup' | 'success') => void;
}

const SERVICES: ServiceType[] = [
  'Plumbing', 'Roofing', 'HVAC', 'Landscaping', 
  'Electrical', 'General Contracting', 'Dental', 'Other'
];

export default function SignupPage({ onSuccess, onNavigate }: SignupPageProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('Plumbing');
  
  // Custom states
  const [workingDays, setWorkingDays] = useState<Record<string, boolean>>({
    Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false
  });
  const [workStartTime, setWorkStartTime] = useState('08:00');
  const [workEndTime, setWorkEndTime] = useState('17:00');
  const [messageStyle, setMessageStyle] = useState<'Professional' | 'Friendly' | 'Direct'>('Professional');

  // Step 2 payment state
  const [payingState, setPayingState] = useState<'idle' | 'processing' | 'done'>('idle');
  const [payingStatusMessage, setPayingStatusMessage] = useState('');

  // Form validations
  const isFormValid = fullName.trim() !== '' && businessName.trim() !== '' && mobileNumber.trim().length >= 8;

  const toggleDay = (day: string) => {
    setWorkingDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setStep(2);
  };

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayingState('processing');
    setPayingStatusMessage('Connecting to Bookit...');

    try {
      const selectedDays = Object.entries(workingDays)
        .filter(([_, active]) => active)
        .map(([day]) => day.toLowerCase());

      // Store form data in sessionStorage for after payment
      sessionStorage.setItem('bookit_signup_data', JSON.stringify({
        business_name: businessName,
        owner_name: fullName,
        phone: mobileNumber,
        service_type: serviceType,
        working_days: selectedDays,
        start_time: workStartTime,
        end_time: workEndTime,
        message_style: messageStyle.toLowerCase(),
      }));

      // Step 1: Create Stripe checkout session
      const response = await fetch(`${(import.meta as any).env.VITE_API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessName,
          email: mobileNumber + '@bookit.internal', // Using phone as email placeholder
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session. Please try again.');
      }

      setPayingStatusMessage('Redirecting to secure payment...');
      
      // Redirect to Stripe checkout
      window.location.href = data.url;

    } catch (err: any) {
      setPayingState('idle');
      alert(`Something went wrong: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2f0] flex flex-col justify-between font-sans text-neutral-900" id="signup-root">
      
      {/* Top minimalistic Navbar: Only Logo */}
      <div className="bg-[#0c0a08] py-4 border-b border-zinc-800 text-white">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="font-display font-semibold tracking-tight text-lg text-white">Bookit</span>
          </div>
          <button 
            onClick={() => onNavigate('landing')}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Landing
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="max-w-xl w-full bg-white rounded-xl border border-stone-250 shadow-lg overflow-hidden relative">
          
          {/* Top Line Indicator */}
          <div className="h-1 bg-neutral-900 w-full" />

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Page Header */}
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900">
                Let's get you set up.
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm font-medium">
                Takes under 2 minutes. No sales calls. No manual onboarding.
              </p>
            </div>

            {/* Custom Onboarding Progress indicators */}
            <div className="grid grid-cols-2 gap-2 text-center" id="signup-steps">
              <div className={`pb-2 border-b-2 font-mono text-[11px] font-bold tracking-tight uppercase ${
                step === 1 ? 'border-neutral-900 text-neutral-900' : 'border-stone-200 text-stone-400'
              }`}>
                Step 1: Your Details
              </div>
              <div className={`pb-2 border-b-2 font-mono text-[11px] font-bold tracking-tight uppercase ${
                step === 2 ? 'border-neutral-900 text-neutral-900' : 'border-stone-200 text-stone-400'
              }`}>
                Step 2: Secure Payment
              </div>
            </div>

            {/* STEP 1: FORM */}
            {step === 1 && (
              <form onSubmit={handleContinueToPayment} className="space-y-4">
                
                {/* 1. Name */}
                <div className="space-y-1.5" id="field-name">
                  <label className="text-[11px] font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5 tracking-wider">
                    <User2 className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Your Full Name</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Mike Roberts"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#faf9f8] border border-stone-250 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all duration-200 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15 font-sans focus-visible:outline-none"
                  />
                </div>

                {/* 2. Business Name */}
                <div className="space-y-1.5" id="field-business">
                  <label className="text-[11px] font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5 tracking-wider">
                    <Building2 className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Business Name</span>
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Mike's Professional Plumbing"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-[#faf9f8] border border-stone-250 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all duration-200 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15 font-sans focus-visible:outline-none"
                  />
                </div>

                {/* 3. Mobile Number */}
                <div className="space-y-1.5" id="field-phone">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5 tracking-wider">
                      <Smartphone className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Your Mobile Number</span>
                    </label>
                    <span className="text-[10px] text-zinc-400 font-mono font-bold bg-stone-100 px-1.5 py-0.5 rounded">Helper contact</span>
                  </div>
                  <input 
                    type="tel"
                    required
                    placeholder="+1 (512) 555-0199"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-[#faf9f8] border border-stone-250 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all duration-200 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15 font-mono focus-visible:outline-none"
                  />
                  <p className="text-[10px] text-zinc-500 leading-normal">
                    ℹ️ This is where Bookit will dispatch customer summaries and alerts to you.
                  </p>
                </div>

                {/* 4. Assistant Name (Note info callout instead of input) */}
                <div className="bg-[#007aff]/5 border border-[#007aff]/15 rounded-lg px-4 py-3 flex items-start gap-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#007aff] mt-0.5 shrink-0" />
                  <p className="text-[11px] text-[#007aff] font-mono font-semibold leading-relaxed">
                    After payment, we'll text you to choose a name for your AI assistant. Takes 30 seconds.
                  </p>
                </div>

                {/* 5. Service Type Dropdown */}
                <div className="space-y-1.5" id="field-service">
                  <label className="text-[11px] font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5 tracking-wider">
                    <Briefcase className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Service Type / Trade</span>
                  </label>
                  <div className="relative">
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as ServiceType)}
                      className="w-full bg-[#faf9f8] border border-stone-250 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all duration-200 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15 font-sans appearance-none cursor-pointer focus-visible:outline-none"
                    >
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-3 h-4 w-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                {/* 6. Working Days Grid */}
                <div className="space-y-1.5" id="field-working-days">
                  <label className="text-[11px] font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5 tracking-wider">
                    <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Working Days Allowed</span>
                  </label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
                      const isActive = workingDays[day];
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`py-2 rounded-lg font-mono text-[10px] uppercase font-bold border transition-all duration-150 ${
                            isActive 
                              ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm' 
                              : 'bg-white text-stone-600 border-zinc-250 hover:bg-stone-50'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Working Times (Pickers) */}
                <div className="grid grid-cols-2 gap-4" id="field-hours">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5 tracking-wider">
                      <Clock className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Start Time</span>
                    </label>
                    <input 
                      type="time"
                      value={workStartTime}
                      onChange={(e) => setWorkStartTime(e.target.value)}
                      className="w-full bg-[#faf9f8] border border-stone-250 rounded-lg p-2.5 text-xs outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15 font-mono cursor-pointer transition-all focus-visible:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-neutral-800 uppercase flex items-center gap-1.5 tracking-wider">
                      <Clock className="h-3.5 w-3.5 text-zinc-400" />
                      <span>End Time</span>
                    </label>
                    <input 
                      type="time"
                      value={workEndTime}
                      onChange={(e) => setWorkEndTime(e.target.value)}
                      className="w-full bg-[#faf9f8] border border-stone-250 rounded-lg p-2.5 text-xs outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15 font-mono cursor-pointer transition-all focus-visible:outline-none"
                    />
                  </div>
                </div>

                {/* 8. Message Style selection clickable cards */}
                <div className="space-y-2 pt-2" id="field-style">
                  <label className="text-[11px] font-mono font-bold text-zinc-500 uppercase flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-zinc-400" />
                    <span>Greeting Message Style</span>
                  </label>
                  
                  <div className="grid grid-cols-1 gap-2">
                    
                    {/* Professional card style */}
                    <div 
                      onClick={() => setMessageStyle('Professional')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        messageStyle === 'Professional' 
                          ? 'border-neutral-900 bg-neutral-900/5 shadow-inner' 
                          : 'border-zinc-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs">Professional Style</span>
                        {messageStyle === 'Professional' && <Check className="h-3.5 w-3.5 text-neutral-950 font-bold" />}
                      </div>
                      <p className="text-[11px] text-zinc-650 italic font-medium leading-relaxed font-mono text-zinc-600">
                        "Hi, this is [Your Assistant] from {businessName || 'your business'}. How can we help you today?"
                      </p>
                    </div>

                    {/* Friendly card style */}
                    <div 
                      onClick={() => setMessageStyle('Friendly')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        messageStyle === 'Friendly' 
                          ? 'border-neutral-900 bg-neutral-900/5 shadow-inner' 
                          : 'border-zinc-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs">Friendly Style 👋</span>
                        {messageStyle === 'Friendly' && <Check className="h-3.5 w-3.5 text-neutral-950 font-bold" />}
                      </div>
                      <p className="text-[11px] text-zinc-650 italic font-medium leading-relaxed font-mono text-zinc-600">
                        "Hey! [Your Assistant] here from {businessName || 'your business'} 👋 What's going on?"
                      </p>
                    </div>

                    {/* Direct card style */}
                    <div 
                      onClick={() => setMessageStyle('Direct')}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        messageStyle === 'Direct' 
                          ? 'border-neutral-900 bg-neutral-900/5 shadow-inner' 
                          : 'border-zinc-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs">Direct / Quick Style</span>
                        {messageStyle === 'Direct' && <Check className="h-3.5 w-3.5 text-neutral-950 font-bold" />}
                      </div>
                      <p className="text-[11px] text-zinc-650 italic font-medium leading-relaxed font-mono text-zinc-600">
                        "{businessName || 'your business'}. What do you need repaired?"
                      </p>
                    </div>

                  </div>
                </div>

                {/* Step 1 Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-3.5 rounded-sm font-display font-semibold text-center flex items-center justify-center gap-2 tracking-wide text-sm transition-all ${
                      isFormValid 
                        ? 'bg-neutral-900 text-white cursor-pointer hover:bg-neutral-800 active:scale-98 shadow-md' 
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[10px] text-zinc-4c0 text-center font-mono text-zinc-400 mt-2">
                    🛒 Secure payment via Stripe setup • No contracts • Cancel anytime
                  </p>
                </div>

              </form>
            )}

            {/* STEP 2: PAYMENT OVERLAY */}
            {step === 2 && payingState === 'idle' && (
              <form onSubmit={handleProceedToPayment} className="space-y-4">

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] font-mono text-zinc-400 hover:text-neutral-950 flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to details
                </button>

                <div className="bg-[#f4f2f0] p-4 rounded-lg border border-stone-300 space-y-2.5 text-xs">
                  <div className="flex justify-between font-semibold text-neutral-900">
                    <span>Bookit Monthly Subscription</span>
                    <span className="font-mono">$550.00</span>
                  </div>
                  <div className="flex justify-between text-zinc-650 font-mono text-[10px]">
                    <span>One-time setup & provisioning fee</span>
                    <span className="text-neutral-900 font-bold">$50.00</span>
                  </div>
                  <hr className="border-stone-250" />
                  <div className="flex justify-between font-bold text-neutral-950 text-sm">
                    <span>Total Due Today</span>
                    <span className="font-mono">$600.00</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 leading-normal italic">
                    The $50 setup fee is non-refundable. Monthly subscription ($550/mo) renews automatically. Cancel anytime by texting your assistant.
                  </p>
                </div>

                <div className="bg-white border border-stone-200 rounded-lg p-3.5 space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Business:</span>
                    <span className="font-bold text-neutral-900">{businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Phone:</span>
                    <span className="font-bold text-neutral-900">{mobileNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Service:</span>
                    <span className="font-bold text-neutral-900">{serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Style:</span>
                    <span className="font-bold text-neutral-900">{messageStyle}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-display font-semibold py-4 rounded-lg text-center flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 transition-all"
                  >
                    <Lock className="h-3.5 w-3.5 text-white" />
                    <span>Proceed to Secure Payment →</span>
                  </button>
                  <p className="text-[9.5px] text-zinc-400 text-center leading-normal font-mono pt-2">
                    🔒 You will be redirected to Stripe's secure checkout page
                  </p>
                </div>

              </form>
            )}

            {/* PROCESSING LOADER STATE */}
            {payingState === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-neutral-900 border-t-zinc-200 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-bold">
                    <Shield className="h-6 w-6 text-zinc-900 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1 max-w-xs mt-2">
                  <span className="font-display font-bold text-sm tracking-tight text-neutral-900 block uppercase">SECURE PROVISIONING</span>
                  <p className="text-zinc-600 text-xs font-mono select-none h-8 animate-pulse text-center">
                    {payingStatusMessage}
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center py-6 text-[11px] text-zinc-500 font-mono bg-white border-t border-stone-200">
        © 2026 Bookit • Secure Connection Guaranteed
      </div>

    </div>
  );
}

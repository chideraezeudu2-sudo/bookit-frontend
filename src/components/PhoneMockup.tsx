import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Clock, Send, CheckCheck, MapPin, Calendar, Check, AlertTriangle, Play, MessageSquare, Camera, Flashlight } from 'lucide-react';

interface PhoneMockupProps {
  mode: 'incoming_call' | 'sms_chat' | 'booking_scheduler' | 'contractor_alert';
  assistantName?: string;
  businessName?: string;
  messageStyle?: 'Professional' | 'Friendly' | 'Direct';
}

export default function PhoneMockup({ 
  mode, 
  assistantName = "Sarah", 
  businessName = "Mike's Plumbing", 
  messageStyle = "Professional" 
}: PhoneMockupProps) {
  
  // States for SMS chat simulator
  const [messages, setMessages] = useState<{ sender: 'customer' | 'assistant', text: string, time: string }[]>([]);
  const [currentTyping, setCurrentTyping] = useState<boolean>(false);
  const [chatStep, setChatStep] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // States for interactive booking scheduler
  const [selectedDay, setSelectedDay] = useState<string>('Tomorrow');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'confirmed'>('idle');

  // Load initial conversation for SMS chat based on style
  const getInitialAssistantMessage = () => {
    switch (messageStyle) {
      case 'Friendly':
        return `Hey! ${assistantName} here from ${businessName} 👋 What's going on?`;
      case 'Direct':
        return `${businessName}. What do you need?`;
      case 'Professional':
      default:
        return `Hi, this is ${assistantName} from ${businessName}. How can I help you today?`;
    }
  };

  useEffect(() => {
    if (mode === 'sms_chat') {
      // Re-initialize conversations
      setMessages([
        { sender: 'customer', text: "Hey, I've got a burst pipe in my laundry room. Need help fast", time: "2:14 PM" },
        { sender: 'assistant', text: getInitialAssistantMessage(), time: "2:14 PM" }
      ]);
      setChatStep(0);
    }
  }, [mode, messageStyle, assistantName, businessName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentTyping]);

  // Simulate next steps of real-time SMS
  const handleNextSMSStep = () => {
    if (chatStep === 0) {
      setCurrentTyping(true);
      setChatStep(1);
      setTimeout(() => {
        setCurrentTyping(false);
        setMessages(prev => [
          ...prev,
          { sender: 'customer', text: "I'm located in Heights area. Water is everywhere, pretty urgent!", time: "2:15 PM" }
        ]);
        
        // Assistant replies after customer texts
        setTimeout(() => {
          setCurrentTyping(true);
          setTimeout(() => {
            setCurrentTyping(false);
            setMessages(prev => [
              ...prev,
              { sender: 'assistant', text: `Got it. I can help you with that emergency leak. Here is our direct booking link to instantly reserve our next technician: bookit.link/mikes-plumbing?service=burst-pipe`, time: "2:15 PM" }
            ]);
            setChatStep(2);
          }, 1500);
        }, 1000);
      }, 1200);
    } else if (chatStep === 2) {
      setCurrentTyping(true);
      setChatStep(3);
      setTimeout(() => {
        setCurrentTyping(false);
        setMessages(prev => [
          ...prev,
          { sender: 'customer', text: "Awesome, just booked for 4:00 PM today! Thanks!", time: "2:16 PM" }
        ]);

        setTimeout(() => {
          setCurrentTyping(true);
          setTimeout(() => {
            setCurrentTyping(false);
            setMessages(prev => [
              ...prev,
              { sender: 'assistant', text: `Perfect! Confirmation sent. Technician Carl is dispatched. See you at 4:00 PM!`, time: "2:16 PM" }
            ]);
            setChatStep(4);
          }, 1200);
        }, 1000);
      }, 1200);
    }
  };

  const handleResetChat = () => {
    setMessages([
      { sender: 'customer', text: "Hey, I've got a burst pipe in my laundry room. Need help fast", time: "2:14 PM" },
      { sender: 'assistant', text: getInitialAssistantMessage(), time: "2:14 PM" }
    ]);
    setChatStep(0);
  };

  const executeBooking = () => {
    if (!selectedTime) return;
    setBookingStatus('booking');
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 1200);
  };

  return (
    <div className="w-[280px] sm:w-[320px] aspect-[9/18] bg-obsidian rounded-[36px] shadow-2xl overflow-hidden relative border-8 border-charcoal iphone-bezel flex flex-col select-none text-xs">
      
      {/* Top Dynamic Island Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-between px-2">
        <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full"></div>
        <div className="w-8 h-1 bg-[#222] rounded-full"></div>
      </div>

      {/* Internal Phone Header Status Bar */}
      <div className={`${
        mode === 'contractor_alert' || mode === 'incoming_call'
          ? 'absolute top-0 left-0 right-0 bg-transparent text-white/90' 
          : 'bg-[#1a1919] text-zinc-400'
      } pt-6 pb-2 px-6 flex justify-between text-[10px] font-mono z-20`}>
        <div>{mode === 'contractor_alert' ? '9:41' : '2:14 PM'}</div>
        <div className="flex gap-1 items-center">
          <span>5G</span>
          <div className="w-4 h-2 border border-current rounded-xs relative p-px flex items-center">
            <div className="bg-current h-full w-[80%]"></div>
          </div>
        </div>
      </div>

      {/* RENDER MODES */}
      <div className="flex-1 bg-zinc-950 flex flex-col relative overflow-hidden">
        
        {/* MODE 1: INCOMING CALL */}
        {mode === 'incoming_call' && (
          <div className="flex-1 flex flex-col justify-between p-3.5 text-white font-sans relative overflow-hidden bg-[#091a1e] select-none">
            
            {/* Ambient Background Gradient Circles to emulate fluid gradient image */}
            <div className="absolute top-[-40px] right-[-40px] w-52 h-52 bg-[#004e64]/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute top-[80px] left-[-30px] w-48 h-48 bg-[#25a18e]/20 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute bottom-[-10px] right-[-20px] w-44 h-44 bg-teal-950/40 rounded-full blur-[80px] pointer-events-none" />

            {/* Top iOS Clock & Calendar Overlay */}
            <div className="text-center pt-8 z-10 relative">
              <span className="text-[11px] font-sans font-medium tracking-wide text-white/80 uppercase">
                Tuesday, Apr 1
              </span>
              <h1 className="text-5xl font-sans font-light tracking-tight text-white leading-none mt-1 select-none opacity-95">
                9:41
              </h1>
            </div>

            {/* Notifications Stacking Area (flowing from bottom like modern iOS) */}
            <div className="z-10 relative space-y-2 mt-auto mb-6 px-0.5 max-h-[240px] overflow-y-auto no-scrollbar">
              
              {/* Notification 1: Bookit New Lead */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[22px] p-3.5 shadow-lg flex gap-3 w-full text-left transition-transform hover:scale-[1.01] select-none">
                {/* Avatar Icon with Green Messages badge overlay like real iOS */}
                <div className="relative shrink-0 mt-0.5 select-none">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004e64] to-[#25a18e] border border-white/20 flex items-center justify-center text-white font-display text-xs font-black shadow-md uppercase tracking-wider">
                    B
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#34c759] rounded-full border border-[#091a1e] flex items-center justify-center shadow-md">
                    <MessageSquare className="h-2.5 w-2.5 text-white fill-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white/95 text-xs truncate tracking-tight">Bookit</span>
                    <span className="text-[10px] text-white/50 font-mono">now</span>
                  </div>
                  <div className="font-bold text-white text-[11px] mt-0.5 leading-snug">New Lead Booked 🎉</div>
                  <p className="text-white/80 text-[10.5px] leading-snug font-sans mt-0.5">
                    Dave K. has been automatically qualified and booked for <span className="font-semibold text-emerald-300">Tomorrow at 4:30 PM</span>. Syncing to calendar...
                  </p>
                </div>
              </div>

              {/* Notification 2: Bookit Schedule Sync for Overnight leads */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[22px] p-3.5 shadow-lg flex gap-3 w-full text-left transition-transform hover:scale-[1.01] select-none">
                {/* Avatar Icon with Green Messages badge overlay like real iOS */}
                <div className="relative shrink-0 mt-0.5 select-none">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004e64] to-[#25a18e] border border-white/20 flex items-center justify-center text-white font-display text-xs font-black shadow-md uppercase tracking-wider">
                    B
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#34c759] rounded-full border border-[#091a1e] flex items-center justify-center shadow-md">
                    <MessageSquare className="h-2.5 w-2.5 text-white fill-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white/95 text-xs truncate tracking-tight">Bookit</span>
                    <span className="text-[10px] text-white/50 font-mono font-medium">2m ago</span>
                  </div>
                  <div className="font-bold text-white text-[11px] mt-0.5 leading-snug">Last Night's Dispatch Sync 🌙</div>
                  <p className="text-white/80 text-[10.5px] leading-snug font-sans mt-0.5">
                    2 bookings secured overnight: Dave K. (Roofing - 4:30 PM), Ashley R. (Roof Repair - 11:30 AM). Active on hands-free autopilot.
                  </p>
                </div>
              </div>

              {/* Notification 3: Backend Setup complete */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[22px] p-3.5 shadow-lg flex gap-3 w-full text-left transition-transform hover:scale-[1.01] opacity-90 select-none">
                <div className="relative shrink-0 mt-0.5 select-none">
                  <div className="w-10 h-10 rounded-full bg-neutral-800/80 border border-white/20 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    <Check className="h-4.5 w-4.5 text-emerald-400 stroke-[2.5]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#007aff] rounded-full border border-[#091a1e] flex items-center justify-center shadow-md">
                    <Calendar className="h-2 w-2 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white/95 text-xs truncate tracking-tight">System Autopilot</span>
                    <span className="text-[10px] text-white/50 font-mono font-medium">8m ago</span>
                  </div>
                  <div className="font-bold text-white text-[11px] mt-0.5 leading-snug">Backend Active • 5-Min Setup</div>
                  <p className="text-white/80 text-[10.5px] leading-snug font-sans mt-0.5">
                    Calendar synchronizations active, high-priority SMS routes open, API tokens verified. Ready for missed calls.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Lockscreen Quick Actions (Flashlight & Camera) */}
            <div className="z-10 relative flex justify-between items-center px-4 pb-1 mt-auto">
              {/* Flashlight Touch Area */}
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 cursor-not-allowed hover:bg-white/20 active:scale-95 transition-all">
                <Flashlight className="h-4.5 w-4.5" />
              </div>

              {/* Camera Touch Area */}
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 cursor-not-allowed hover:bg-white/20 active:scale-95 transition-all">
                <Camera className="h-4.5 w-4.5" />
              </div>
            </div>

          </div>
        )}

        {/* MODE 2: SMS CHAT SIMULATOR (iOS iMessage Style) */}
        {mode === 'sms_chat' && (
          <div className="flex-1 flex flex-col h-full bg-white text-neutral-900 font-sans">
            {/* Contact Info Header resembling real iOS iMessage header */}
            <div className="bg-[#f6f6f6] py-2.5 px-3 flex items-center justify-between border-b border-zinc-200">
              <span className="text-[#007aff] text-xs font-semibold cursor-pointer">‹ Messages</span>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-stone-300 flex items-center justify-center font-bold text-neutral-700 text-[9px] uppercase">
                  {assistantName[0]}
                </div>
                <div className="font-semibold text-neutral-900 text-[10px] tracking-tight mt-0.5">{assistantName}</div>
              </div>
              <span className="text-[#007aff] text-xs font-semibold cursor-not-allowed opacity-50">Details</span>
            </div>

            {/* Bubble Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5 no-scrollbar bg-white">
              <div className="text-center my-1">
                <span className="text-[9px] text-zinc-400 font-sans font-medium">
                  iMessage • Today 2:14 PM
                </span>
              </div>

              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col max-w-[85%] ${m.sender === 'customer' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div 
                    className={`py-2 px-3.5 rounded-2xl text-[11.5px] leading-snug relative ${
                      m.sender === 'customer' 
                        ? 'bg-[#007aff] text-white rounded-tr-xs' 
                        : 'bg-[#e9e9eb] text-black rounded-tl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[8px] text-zinc-400 mt-0.5 font-sans px-1 flex items-center gap-0.5">
                    {m.time}
                    {m.sender === 'assistant' && <CheckCheck className="h-2.5 w-2.5 text-[#007aff] inline" />}
                  </span>
                </div>
              ))}

              {currentTyping && (
                <div className="mr-auto flex items-center bg-[#e9e9eb] text-zinc-550 py-2.5 px-3 rounded-2xl rounded-tl-xs max-w-[50%]">
                  <span className="flex gap-1 py-0.5">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              )}
            </div>

            {/* Interactive Control Overlay - Glassmorphic / water glass design as requested */}
            <div className="bg-[#f6f6f6] p-2 border-t border-zinc-200">
              {chatStep === 0 && (
                <button 
                  onClick={handleNextSMSStep}
                  className="w-full bg-neutral-900/10 backdrop-blur-md border border-neutral-900/15 text-neutral-900 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-neutral-900/20 active:scale-98 transition-all font-sans text-xs"
                >
                  <Send className="h-3 w-3" />
                  <span>Customer replies details</span>
                </button>
              )}
              {chatStep === 1 && (
                <div className="text-center py-2 text-[10px] text-zinc-500 font-sans italic animate-pulse">
                  {assistantName} is typing instant reply...
                </div>
              )}
              {chatStep === 2 && (
                <button 
                  onClick={handleNextSMSStep}
                  className="w-full bg-neutral-900/10 backdrop-blur-md border border-neutral-900/15 text-neutral-900 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer hover:bg-neutral-900/20 active:scale-98 transition-all font-sans text-xs"
                >
                  <Calendar className="h-3 w-3" />
                  <span>Customer taps link & books slot</span>
                </button>
              )}
              {chatStep === 3 && (
                <div className="text-center py-2 text-[10px] text-zinc-500 font-sans italic animate-pulse">
                  Confirming with GCal...
                </div>
              )}
              {chatStep === 4 && (
                <button 
                  onClick={handleResetChat}
                  className="w-full bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-800 font-semibold py-2 rounded-lg text-[10px] cursor-pointer active:scale-98 transition-all"
                >
                  Reset Live Conversation Demo
                </button>
              )}
            </div>
          </div>
        )}

        {/* MODE 3: BOOKING SCHEDULER */}
        {mode === 'booking_scheduler' && (
          <div className="flex-1 flex flex-col bg-stone-50 text-zinc-800 font-sans p-4.5">
            <div className="text-center pb-3 border-b border-stone-200">
              <span className="text-[10px] bg-neutral-900 text-white font-mono font-bold px-2.5 py-0.5 rounded-full inline-block">
                Secure Booking Window
              </span>
              <h4 className="text-sm font-bold text-neutral-900 mt-1.5 tracking-tight">{businessName}</h4>
              <p className="text-stone-500 text-[10px]">Pick your preferred appointment slot</p>
            </div>

            {bookingStatus === 'idle' && (
              <div className="flex-1 flex flex-col justify-between pt-4">
                <div className="space-y-4">
                  
                  {/* Premium Day Selection Widget */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-mono block mb-1.5">Select Date:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Today', dayNum: '01', dayName: 'Tue' },
                        { label: 'Tomorrow', dayNum: '02', dayName: 'Wed' },
                        { label: 'Thursday', dayNum: '03', dayName: 'Thu' }
                      ].map(d => (
                        <button
                          key={d.label}
                          onClick={() => setSelectedDay(d.label)}
                          className={`py-2 px-1 rounded-xl text-center border transition-all flex flex-col items-center justify-center ${
                            selectedDay === d.label 
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]' 
                              : 'bg-white text-stone-700 border-zinc-200 hover:bg-zinc-50'
                          }`}
                        >
                          <span className={`text-[9px] uppercase font-bold tracking-wider ${selectedDay === d.label ? 'text-zinc-400' : 'text-zinc-400'}`}>{d.dayName}</span>
                          <span className="text-[14px] font-black leading-none my-0.5">{d.dayNum}</span>
                          <span className="text-[8px] font-medium opacity-80">{d.label === 'Today' || d.label === 'Tomorrow' ? d.label : 'Apr'}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modern Time Selector */}
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-mono block mb-1.5">Available Slots:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {['9:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'].map(t => {
                        const isSelected = selectedTime === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`py-2.5 px-2 rounded-lg text-center font-mono text-[11px] border transition-all duration-150 flex items-center justify-center gap-1.5 ${
                              isSelected 
                                ? 'bg-neutral-900 text-white border-neutral-950 font-bold shadow-inner scale-[1.01]' 
                                : 'bg-white text-stone-800 border-zinc-200 hover:bg-stone-100/70'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-450 bg-emerald-400' : 'bg-zinc-300'}`}></span>
                            <span>{t}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[9px] text-zinc-500 mt-2.5 flex items-center gap-1 leading-normal italic font-medium">
                      <Clock className="h-3 w-3 text-emerald-500 inline" /> 
                      High volume day. Reserve soon to secure dispatch.
                    </p>
                  </div>
                </div>

                <button
                  onClick={executeBooking}
                  disabled={!selectedTime}
                  className={`w-full py-3 rounded-lg font-bold tracking-wide text-xs transition-all ${
                    selectedTime 
                      ? 'bg-neutral-905 bg-neutral-900 text-white hover:bg-neutral-850 active:scale-98 cursor-pointer shadow-md' 
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Appointment Securely
                </button>
              </div>
            )}

            {bookingStatus === 'booking' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-4 border-neutral-900 border-t-zinc-250 animate-spin"></div>
                </div>
                <div className="text-center">
                  <span className="font-bold text-neutral-900 block text-xs">Securing Dispatch</span>
                  <span className="text-stone-500 text-[10px]">Updating central calendar...</span>
                </div>
              </div>
            )}

            {bookingStatus === 'confirmed' && (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-4 bg-stone-100/50 rounded-xl border border-stone-200 my-2">
                <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center mb-2.5">
                  <Check className="h-5 w-5 text-white font-bold" />
                </div>
                <h5 className="font-bold text-neutral-900 text-sm">Job Booked!</h5>
                <p className="text-stone-600 text-[10px] mt-1 leading-relaxed">
                  Confirmation sent to plumber & customer.
                </p>
                <div className="bg-white border border-stone-100 p-2.5 rounded-md mt-3 w-full text-left font-mono text-[9px] text-stone-700 block">
                  <div className="font-bold border-b pb-1 mb-1 text-zinc-900 flex justify-between">
                    <span>JOB ORDER</span>
                    <span className="text-zinc-900 font-bold">CONFIRMED</span>
                  </div>
                  <div>📅 {selectedDay} @ {selectedTime}</div>
                  <div>📍 Heights District</div>
                  <div>⚠️ Emergency Leak Repair</div>
                </div>
                <button
                  onClick={() => { setSelectedTime(''); setBookingStatus('idle'); }}
                  className="mt-3 text-[10px] text-zinc-500 underline font-mono cursor-pointer"
                >
                  Book another test
                </button>
              </div>
            )}
          </div>
        )}

        {/* MODE 4: CONTRACTOR ALERT */}
        {mode === 'contractor_alert' && (
          <div className="flex-1 flex flex-col justify-between p-3.5 text-white font-sans relative overflow-hidden bg-[#091a1e] select-none">
            
            {/* Ambient Background Gradient Circles to emulate fluid gradient image */}
            <div className="absolute top-[-40px] right-[-40px] w-52 h-52 bg-[#004e64]/30 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute top-[80px] left-[-30px] w-48 h-48 bg-[#25a18e]/20 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute bottom-[-10px] right-[-20px] w-44 h-44 bg-teal-950/40 rounded-full blur-[80px] pointer-events-none" />

            {/* Top iOS Clock & Calendar Overlay */}
            <div className="text-center pt-8 z-10 relative">
              <span className="text-[11px] font-sans font-medium tracking-wide text-white/80 uppercase">
                Tuesday, Apr 1
              </span>
              <h1 className="text-5xl font-sans font-light tracking-tight text-white leading-none mt-1 select-none opacity-95">
                9:41
              </h1>
            </div>

            {/* Notifications Stacking Area (flowing from bottom like modern iOS) */}
            <div className="z-10 relative space-y-2 mt-auto mb-6 px-0.5 max-h-[240px] overflow-y-auto no-scrollbar">
              
              {/* Notification 1: Bookit New Lead */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[22px] p-3.5 shadow-lg flex gap-3 w-full text-left transition-transform hover:scale-[1.01] select-none">
                {/* Avatar Icon with Green Messages badge overlay like real iOS */}
                <div className="relative shrink-0 mt-0.5 select-none">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004e64] to-[#25a18e] border border-white/20 flex items-center justify-center text-white font-display text-xs font-black shadow-md uppercase tracking-wider">
                    B
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#34c759] rounded-full border border-[#091a1e] flex items-center justify-center shadow-md">
                    <MessageSquare className="h-2.5 w-2.5 text-white fill-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white/95 text-xs truncate tracking-tight">Bookit</span>
                    <span className="text-[10px] text-white/50 font-mono">now</span>
                  </div>
                  <div className="font-bold text-white text-[11px] mt-0.5 leading-snug">New Lead Booked 🎉</div>
                  <p className="text-white/80 text-[10.5px] leading-snug font-sans mt-0.5">
                    Dave K. has been automatically qualified and booked for <span className="font-semibold text-emerald-300">Tomorrow at 4:30 PM</span>. Syncing to calendar...
                  </p>
                </div>
              </div>

              {/* Notification 2: Bookit Schedule Sync */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[22px] p-3.5 shadow-lg flex gap-3 w-full text-left transition-transform hover:scale-[1.01] select-none">
                {/* Avatar Icon with Green Messages badge overlay like real iOS */}
                <div className="relative shrink-0 mt-0.5 select-none">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004e64] to-[#25a18e] border border-white/20 flex items-center justify-center text-white font-display text-xs font-black shadow-md uppercase tracking-wider">
                    B
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#34c759] rounded-full border border-[#091a1e] flex items-center justify-center shadow-md">
                    <MessageSquare className="h-2.5 w-2.5 text-white fill-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white/95 text-xs truncate tracking-tight">Bookit</span>
                    <span className="text-[10px] text-white/50 font-mono font-medium">2m ago</span>
                  </div>
                  <div className="font-bold text-white text-[11px] mt-0.5 leading-snug">Last Night's Dispatch Sync 🌙</div>
                  <p className="text-white/80 text-[10.5px] leading-snug font-sans mt-0.5">
                    2 bookings secured overnight: Dave K. (Roofing - 4:30 PM), Ashley R. (Roof Repair - 11:30 AM). Active on hands-free autopilot.
                  </p>
                </div>
              </div>

              {/* Notification 3: Backend Setup complete */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[22px] p-3.5 shadow-lg flex gap-3 w-full text-left transition-transform hover:scale-[1.01] opacity-90 select-none">
                <div className="relative shrink-0 mt-0.5 select-none">
                  <div className="w-10 h-10 rounded-full bg-neutral-800/80 border border-white/20 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    <Check className="h-4.5 w-4.5 text-emerald-400 stroke-[2.5]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-[#007aff] rounded-full border border-[#091a1e] flex items-center justify-center shadow-md">
                    <Calendar className="h-2 w-2 text-white" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white/95 text-xs truncate tracking-tight">System Autopilot</span>
                    <span className="text-[10px] text-white/50 font-mono font-medium">8m ago</span>
                  </div>
                  <div className="font-bold text-white text-[11px] mt-0.5 leading-snug">Backend Active • 5-Min Setup</div>
                  <p className="text-white/80 text-[10.5px] leading-snug font-sans mt-0.5">
                    Calendar synchronizations active, high-priority SMS routes open, API tokens verified. Ready for missed calls.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Lockscreen Quick Actions (Flashlight & Camera) */}
            <div className="z-10 relative flex justify-between items-center px-4 pb-1 mt-auto">
              {/* Flashlight Touch Area */}
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 cursor-not-allowed hover:bg-white/20 active:scale-95 transition-all">
                <Flashlight className="h-4.5 w-4.5" />
              </div>

              {/* Camera Touch Area */}
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 cursor-not-allowed hover:bg-white/20 active:scale-95 transition-all">
                <Camera className="h-4.5 w-4.5" />
              </div>
            </div>

          </div>
        )}

      </div>
      
      {/* Bottom Home Indicator Bar */}
      <div className="bg-black py-2.5 flex justify-center z-20">
        <div className="w-24 h-1 bg-zinc-600 rounded-full"></div>
      </div>

    </div>
  );
}

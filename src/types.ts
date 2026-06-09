export type ServiceType = 
  | 'Plumbing' 
  | 'Roofing' 
  | 'HVAC' 
  | 'Landscaping' 
  | 'Electrical' 
  | 'General Contracting' 
  | 'Dental'
  | 'Other';

export interface SignupFormData {
  fullName: string;
  businessName: string;
  mobileNumber: string;
  serviceType: ServiceType;
  workingDays: Record<string, boolean>;
  workStartTime: string;
  workEndTime: string;
  messageStyle: 'Professional' | 'Friendly' | 'Direct';
}

export interface SMSReply {
  id: string;
  sender: 'customer' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isSimulatedTyping?: boolean;
}

export type ActivePage = 'landing' | 'signup' | 'success';

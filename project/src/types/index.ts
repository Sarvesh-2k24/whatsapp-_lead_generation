export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  status: 'new' | 'contacted' | 'qualified' | 'cold' | 'followup' | 'opted_out';
  leadScore: number;
  lastContact?: Date;
  nextFollowup?: Date;
  tags: string[];
  conversationId?: string;
  source: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  type: 'sent' | 'received';
  timestamp: Date;
  isAutomated: boolean;
  messageType: 'text' | 'template' | 'media';
}

export interface Conversation {
  id: string;
  contactId: string;
  status: 'active' | 'paused' | 'completed' | 'failed';
  currentFlow?: string;
  currentStep?: number;
  messages: Message[];
  leadScore: number;
  qualificationData: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationFlow {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
  isActive: boolean;
  category: string;
}

export interface FlowStep {
  id: string;
  type: 'message' | 'question' | 'condition' | 'action';
  content: string;
  options?: string[];
  conditions?: FlowCondition[];
  nextStep?: string;
  delay?: number; // in minutes
}

export interface FlowCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
  value: string | number;
  nextStep: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  flowId: string;
  targetContacts: string[];
  status: 'draft' | 'running' | 'paused' | 'completed';
  schedule?: {
    startDate: Date;
    endDate?: Date;
    frequency: 'immediate' | 'daily' | 'weekly';
  };
  metrics: {
    sent: number;
    delivered: number;
    replied: number;
    qualified: number;
  };
  createdAt: Date;
}

export interface Analytics {
  totalContacts: number;
  totalConversations: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgLeadScore: number;
  activeFlows: number;
  dailyMetrics: {
    date: string;
    contacts: number;
    conversations: number;
    qualified: number;
  }[];
}
import { Contact, Conversation, ConversationFlow, Campaign, Analytics, Message } from '../types';
import { addDays, subDays, format } from 'date-fns';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1-555-0123',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp Solutions',
    status: 'qualified',
    leadScore: 85,
    lastContact: subDays(new Date(), 2),
    nextFollowup: addDays(new Date(), 1),
    tags: ['high-value', 'enterprise', 'decision-maker'],
    conversationId: 'conv-1',
    source: 'LinkedIn',
    createdAt: subDays(new Date(), 5)
  },
  {
    id: '2',
    name: 'Michael Chen',
    phone: '+1-555-0124',
    email: 'mike@startupco.io',
    company: 'StartupCo',
    status: 'followup',
    leadScore: 72,
    lastContact: subDays(new Date(), 1),
    nextFollowup: new Date(),
    tags: ['startup', 'budget-conscious'],
    conversationId: 'conv-2',
    source: 'Website',
    createdAt: subDays(new Date(), 3)
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    phone: '+1-555-0125',
    email: 'emily@designstudio.com',
    company: 'Creative Design Studio',
    status: 'new',
    leadScore: 45,
    tags: ['creative', 'small-business'],
    source: 'Referral',
    createdAt: subDays(new Date(), 1)
  },
  {
    id: '4',
    name: 'David Park',
    phone: '+1-555-0126',
    email: 'david@enterprise.com',
    company: 'Enterprise Corp',
    status: 'cold',
    leadScore: 28,
    lastContact: subDays(new Date(), 7),
    tags: ['enterprise', 'unresponsive'],
    conversationId: 'conv-3',
    source: 'Cold Outreach',
    createdAt: subDays(new Date(), 10)
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    phone: '+1-555-0127',
    email: 'lisa@consultancy.com',
    company: 'Thompson Consultancy',
    status: 'contacted',
    leadScore: 67,
    lastContact: new Date(),
    tags: ['consultant', 'interested'],
    conversationId: 'conv-4',
    source: 'Event',
    createdAt: new Date()
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    content: 'Hi Sarah! I noticed you\'re interested in automation solutions for TechCorp. I\'d love to show you how our platform can save you 20+ hours per week. Are you available for a quick 15-minute demo this week?',
    type: 'sent',
    timestamp: subDays(new Date(), 2),
    isAutomated: true,
    messageType: 'template'
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    content: 'That sounds interesting! I\'m definitely looking for ways to streamline our processes. What kind of automation do you specialize in?',
    type: 'received',
    timestamp: subDays(new Date(), 2),
    isAutomated: false,
    messageType: 'text'
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    content: 'Great question! We focus on WhatsApp automation for lead generation and customer engagement. Our clients typically see 3x increase in qualified leads. What\'s your current monthly lead volume?',
    type: 'sent',
    timestamp: subDays(new Date(), 2),
    isAutomated: true,
    messageType: 'text'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    contactId: '1',
    status: 'active',
    currentFlow: 'lead-qualification',
    currentStep: 2,
    messages: mockMessages,
    leadScore: 85,
    qualificationData: {
      budget: 'enterprise',
      timeline: 'immediate',
      authority: 'decision-maker'
    },
    createdAt: subDays(new Date(), 5),
    updatedAt: subDays(new Date(), 2)
  }
];

export const mockFlows: ConversationFlow[] = [
  {
    id: 'lead-qualification',
    name: 'Lead Qualification Flow',
    description: 'Qualify leads based on budget, authority, need, and timeline',
    category: 'Sales',
    isActive: true,
    steps: [
      {
        id: 'step-1',
        type: 'message',
        content: 'Hi {{name}}! Thanks for your interest in our automation solutions. I\'d love to learn more about your business needs.',
        nextStep: 'step-2',
        delay: 2
      },
      {
        id: 'step-2',
        type: 'question',
        content: 'What\'s your current monthly lead volume?',
        options: ['0-100', '100-500', '500-1000', '1000+'],
        nextStep: 'step-3'
      },
      {
        id: 'step-3',
        type: 'question',
        content: 'What\'s your budget range for automation tools?',
        options: ['Under $500', '$500-$2000', '$2000-$5000', '$5000+'],
        nextStep: 'step-4'
      }
    ]
  },
  {
    id: 'follow-up-sequence',
    name: 'Follow-up Sequence',
    description: 'Automated follow-up for unresponsive leads',
    category: 'Nurturing',
    isActive: true,
    steps: [
      {
        id: 'followup-1',
        type: 'message',
        content: 'Hi {{name}}, just following up on our automation discussion. Have you had a chance to consider how this could benefit {{company}}?',
        nextStep: 'followup-2',
        delay: 1440 // 24 hours
      }
    ]
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Q4 Lead Generation Campaign',
    description: 'Target enterprise clients for end-of-year budget allocation',
    flowId: 'lead-qualification',
    targetContacts: ['1', '2', '4'],
    status: 'running',
    schedule: {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 30),
      frequency: 'daily'
    },
    metrics: {
      sent: 150,
      delivered: 145,
      replied: 48,
      qualified: 12
    },
    createdAt: subDays(new Date(), 7)
  },
  {
    id: 'camp-2',
    name: 'Startup Outreach',
    description: 'Focused campaign for startup segment',
    flowId: 'lead-qualification',
    targetContacts: ['2', '3'],
    status: 'completed',
    metrics: {
      sent: 75,
      delivered: 72,
      replied: 25,
      qualified: 8
    },
    createdAt: subDays(new Date(), 14)
  }
];

export const mockAnalytics: Analytics = {
  totalContacts: 1247,
  totalConversations: 892,
  qualifiedLeads: 184,
  conversionRate: 20.6,
  avgLeadScore: 58.3,
  activeFlows: 3,
  dailyMetrics: Array.from({ length: 7 }, (_, i) => ({
    date: format(subDays(new Date(), 6 - i), 'MMM dd'),
    contacts: Math.floor(Math.random() * 50) + 20,
    conversations: Math.floor(Math.random() * 30) + 15,
    qualified: Math.floor(Math.random() * 10) + 3
  }))
};
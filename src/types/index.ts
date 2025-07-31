export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  required: boolean;
}

export interface InterviewResponse {
  questionId: string;
  answer: string;
  notes?: string;
  timestamp: Date;
}

export interface Interview {
  id: string;
  type: 'stakeholder' | 'end-user';
  participantName: string;
  participantRole: string;
  date: Date;
  responses: InterviewResponse[];
  status: 'planned' | 'in-progress' | 'completed';
}

export interface ProcessStep {
  id: string;
  name: string;
  description: string;
  category: 'acquisition' | 'delivery' | 'support';
  isTimeSink: boolean;
  isQualityRisk: boolean;
  timeSpent?: number; // timer per uke
  employeesInvolved?: number;
  tools?: string[];
}

export interface AIOpportunity {
  id: string;
  title: string;
  description: string;
  impact: number; // 1-5 skala
  effort: number; // 1-5 skala
  processStepId: string;
  estimatedTimeSaved: number; // timer per uke
  estimatedCostSaving: number; // NOK per år
  implementation: string;
  status: 'identified' | 'validated' | 'approved' | 'in-progress' | 'completed';
}

export interface ROICalculation {
  opportunityId: string;
  implementationCost: number;
  annualCostSaving: number;
  revenueUplift: number;
  simpleROI: number;
  paybackPeriod: number; // måneder
}

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: Date;
  interviews: Interview[];
  processSteps: ProcessStep[];
  opportunities: AIOpportunity[];
  roiCalculations: ROICalculation[];
  status: 'planning' | 'discovery' | 'analysis' | 'presentation' | 'completed';
}

export interface PresentationSlide {
  id: string;
  title: string;
  type: 'scope' | 'matrix' | 'roadmap' | 'deep-dive' | 'roi' | 'custom';
  content: any;
  order: number;
}
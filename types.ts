export interface Strategy {
  title: string;
  content: string; // Markdown content
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  potentialEarnings: string;
  groundingUrls?: Array<{uri: string, title: string}>;
}

export enum ViewState {
  HOME = 'HOME',
  CALCULATOR = 'CALCULATOR',
  STRATEGY = 'STRATEGY',
  RESOURCES = 'RESOURCES'
}

export interface Resource {
  name: string;
  description: string;
  url: string;
  category: 'Freelance' | 'Micro-jobs' | 'Content' | 'Tech';
  icon: string;
}
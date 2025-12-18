
export enum AgeGroup {
  Toddler = 'Toddler',
  Kid = 'Kid',
  Teen = 'Teen',
  Parent = 'Parent'
}

export interface Profile {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  avatar: string;
  color: string;
}

export interface DailyContent {
  id: string;
  type: 'prompt' | 'question' | 'activity';
  title: string;
  description: string;
  emoji: string;
  accentColor: string;
  ageGroups: AgeGroup[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type View = 'today' | 'profiles' | 'library';

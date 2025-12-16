export interface BookContext {
  title: string;
  author?: string;
  contentSnippet?: string; // For uploaded files
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  explanation: string;
}

export interface ResearchData {
  summary: string;
  sources: Array<{
    title: string;
    uri: string;
  }>;
}

export interface DailyLesson {
  day: number;
  concepts: Concept[];
  isCompleted: boolean;
}

export enum AppState {
  HERO,
  SETUP,
  DASHBOARD,
}
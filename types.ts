export interface ProjectSection {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  icon: string;
}

export interface RubricCriteria {
  category: string;
  description: string;
  excellent: string;
  good: string;
  needsImprovement: string;
  scoreWeight: number;
}

export enum AppTab {
  GUIDELINES = 'guidelines',
  RUBRIC = 'rubric',
}

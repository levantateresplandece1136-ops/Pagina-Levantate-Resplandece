export interface Excerpt {
  title: string;
  content: string;
}

export interface EBook {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  pages: number;
  readTime: string;
  description: string;
  tableOfContents: string[];
  excerpt: Excerpt;
  downloadCount: number;
  isPopular?: boolean;
}

export interface DiagnosticQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    score: number;
    feedback: string;
  }[];
}

export interface Diagnostic {
  id: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  badge: string;
  iconName: string;
  questions: DiagnosticQuestion[];
  interpretations: {
    minScore: number;
    maxScore: number;
    title: string;
    pastoralCounsel: string;
    actionSteps: string[];
    recommendedBookId: string;
  }[];
}

export interface CounselingRequest {
  fullName: string;
  email: string;
  ageGroup: string;
  area: string;
  urgency: string;
  message: string;
}

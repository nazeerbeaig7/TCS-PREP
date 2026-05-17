export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  section: 'quant' | 'reasoning' | 'verbal' | 'coding';
  explanation?: string;
}

export interface CodingProblem {
  id: number;
  title: string;
  problemStatement: string;
  example: string;
  constraints?: string;
  solution: {
    c?: string;
    cpp?: string;
    java?: string;
    python?: string;
  };
  explanation: string;
}

export type QuestionStatus = 'not-visited' | 'answered' | 'marked' | 'not-answered';

export interface UserAnswer {
  questionId: number;
  selectedOption: string | null;
  status: QuestionStatus;
}

export interface SectionConfig {
  key: string;
  name: string;
  icon: string;
  questionCount: number;
  duration: number;
}

export interface TestResult {
  id: string;
  date: string;
  mode: 'exam' | 'practice';
  section: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  score: number;
  accuracy: number;
  timeTaken: number;
  answers: UserAnswer[];
  questions: Question[];
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastTestDate: string | null;
}

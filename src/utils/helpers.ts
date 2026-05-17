import { Question, UserAnswer, TestResult, StreakData } from '../types';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function shuffleOptions(question: Question): Question {
  return {
    ...question,
    options: shuffleArray(question.options),
  };
}

export function getRandomQuestions(questions: Question[], section: string, count: number): Question[] {
  const filtered = questions.filter(q => q.section === section);
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, count).map(shuffleOptions);
}

export function getFullTestQuestions(questions: Question[]): Question[] {
  const sections = ['quant', 'reasoning', 'verbal', 'coding'] as const;
  const result: Question[] = [];
  sections.forEach(section => {
    const sectionQuestions = getRandomQuestions(questions, section, 15);
    result.push(...sectionQuestions);
  });
  return result;
}

export function calculateResult(
  questions: Question[],
  answers: UserAnswer[],
  timeTaken: number,
  mode: 'exam' | 'practice',
  section: string
): TestResult {
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  questions.forEach((q, index) => {
    const answer = answers[index];
    if (!answer || !answer.selectedOption) {
      unanswered++;
    } else if (answer.selectedOption === q.answer) {
      correct++;
    } else {
      wrong++;
    }
  });

  const totalQuestions = questions.length;
  const score = correct * 1 - wrong * 0.33;
  const accuracy = totalQuestions > 0 ? (correct / totalQuestions) * 100 : 0;

  return {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    mode,
    section,
    totalQuestions,
    correct,
    wrong,
    unanswered,
    score: Math.round(score * 100) / 100,
    accuracy: Math.round(accuracy * 10) / 10,
    timeTaken,
    answers,
    questions,
  };
}

export function updateStreak(streak: StreakData): StreakData {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (streak.lastTestDate === today) {
    return streak;
  }

  if (streak.lastTestDate === yesterday) {
    const newCurrent = streak.currentStreak + 1;
    return {
      currentStreak: newCurrent,
      longestStreak: Math.max(newCurrent, streak.longestStreak),
      lastTestDate: today,
    };
  }

  return {
    currentStreak: 1,
    longestStreak: Math.max(1, streak.longestStreak),
    lastTestDate: today,
  };
}

export function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getWrongQuestions(questions: Question[], answers: UserAnswer[]): Question[] {
  return questions.filter((q, i) => {
    const answer = answers[i];
    return answer && answer.selectedOption && answer.selectedOption !== q.answer;
  });
}

export function playBeep() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
  } catch {
    // Audio not supported
  }
}

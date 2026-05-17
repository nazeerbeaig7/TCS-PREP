import { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import ExamInterface from './components/ExamInterface';
import ResultPage from './components/ResultPage';
import HistoryPage from './components/HistoryPage';
import TopicsPage from './components/TopicsPage';
import CodingPage from './components/CodingPage';
import { questions as allQuestions } from './data/questions';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  getFullTestQuestions,
  getRandomQuestions,
  calculateResult,
  updateStreak,
  getWrongQuestions,
  shuffleArray,
} from './utils/helpers';
import { Question, UserAnswer, TestResult, StreakData } from './types';

type View = 'landing' | 'exam' | 'result' | 'history' | 'topics' | 'coding';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('nqt-dark-mode', false);
  const [results, setResults] = useLocalStorage<TestResult[]>('nqt-results', []);
  const [streak, setStreak] = useLocalStorage<StreakData>('nqt-streak', {
    currentStreak: 0,
    longestStreak: 0,
    lastTestDate: null,
  });

  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [activeMode, setActiveMode] = useState<'exam' | 'practice'>('exam');
  const [activeSection, setActiveSection] = useState('all');
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);

  const hasWrongQuestions = results.some(r =>
    r.questions.some((q, i) => r.answers[i]?.selectedOption && r.answers[i].selectedOption !== q.answer)
  );

  const startExam = useCallback(() => {
    const testQuestions = getFullTestQuestions(allQuestions);
    setActiveQuestions(testQuestions);
    setActiveMode('exam');
    setActiveSection('all');
    setView('exam');
  }, []);

  const startPractice = useCallback((section: string) => {
    const sectionQuestions = getRandomQuestions(allQuestions, section, 15);
    setActiveQuestions(sectionQuestions);
    setActiveMode('practice');
    setActiveSection(section);
    setView('exam');
  }, []);

  const startRetryWrong = useCallback(() => {
    const wrongQs: Question[] = [];
    results.forEach(r => {
      const wrong = getWrongQuestions(r.questions, r.answers);
      wrongQs.push(...wrong);
    });
    const unique = Array.from(new Map(wrongQs.map(q => [q.id, q])).values());
    if (unique.length === 0) return;
    setActiveQuestions(shuffleArray(unique).slice(0, 30));
    setActiveMode('practice');
    setActiveSection('retry');
    setView('exam');
  }, [results]);

  const handleSubmit = useCallback((answers: UserAnswer[], timeTaken: number) => {
    const result = calculateResult(activeQuestions, answers, timeTaken, activeMode, activeSection);
    setCurrentResult(result);
    setResults(prev => [...prev, result]);
    setStreak(prev => updateStreak(prev));
    setView('result');
  }, [activeQuestions, activeMode, activeSection, setResults, setStreak]);

  const retryTest = useCallback(() => {
    if (activeMode === 'exam') {
      startExam();
    } else if (activeSection === 'retry') {
      startRetryWrong();
    } else {
      startPractice(activeSection);
    }
  }, [activeMode, activeSection, startExam, startPractice, startRetryWrong]);

  const viewResult = useCallback((result: TestResult) => {
    setCurrentResult(result);
    setView('result');
  }, []);

  const clearHistory = useCallback(() => {
    setResults([]);
  }, [setResults]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      {view === 'landing' && (
        <LandingPage
          onStartExam={startExam}
          onStartPractice={startPractice}
          onRetryWrong={startRetryWrong}
          onShowResults={() => setView('history')}
          onShowTopics={() => setView('topics')}
          onShowCoding={() => setView('coding')}
          streak={streak}
          results={results}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(prev => !prev)}
          hasWrongQuestions={hasWrongQuestions}
        />
      )}
      {view === 'exam' && (
        <ExamInterface
          questions={activeQuestions}
          mode={activeMode}
          onSubmit={handleSubmit}
          section={activeSection}
          darkMode={darkMode}
        />
      )}
      {view === 'result' && currentResult && (
        <ResultPage
          result={currentResult}
          onGoHome={() => setView('landing')}
          onRetry={retryTest}
          darkMode={darkMode}
        />
      )}
      {view === 'history' && (
        <HistoryPage
          results={results}
          onGoHome={() => setView('landing')}
          onViewResult={viewResult}
          onClearHistory={clearHistory}
          darkMode={darkMode}
        />
      )}
      {view === 'topics' && (
        <TopicsPage
          onGoHome={() => setView('landing')}
          darkMode={darkMode}
        />
      )}
      {view === 'coding' && (
        <CodingPage
          onGoHome={() => setView('landing')}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

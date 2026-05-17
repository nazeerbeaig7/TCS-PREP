import { useState } from 'react';
import { Calculator, Brain, BookOpen, Code, Play, Trophy, Flame, Sun, Moon, BookMarked, Code2 } from 'lucide-react';
import { StreakData, TestResult } from '../types';

interface LandingPageProps {
  onStartExam: () => void;
  onStartPractice: (section: string) => void;
  onRetryWrong: () => void;
  onShowResults: () => void;
  streak: StreakData;
  results: TestResult[];
  darkMode: boolean;
  onToggleDark: () => void;
  hasWrongQuestions: boolean;
  onShowTopics: () => void;
  onShowCoding: () => void;
}

const sections = [
  { key: 'quant', name: 'Quantitative Aptitude', icon: Calculator, color: 'from-blue-500 to-blue-600', questions: 15 },
  { key: 'reasoning', name: 'Reasoning', icon: Brain, color: 'from-emerald-500 to-emerald-600', questions: 15 },
  { key: 'verbal', name: 'Verbal Ability', icon: BookOpen, color: 'from-amber-500 to-amber-600', questions: 15 },
  { key: 'coding', name: 'Coding Fundamentals', icon: Code, color: 'from-rose-500 to-rose-600', questions: 15 },
];

export default function LandingPage({
  onStartExam,
  onStartPractice,
  onRetryWrong,
  onShowResults,
  streak,
  results,
  darkMode,
  onToggleDark,
  hasWrongQuestions,
  onShowTopics,
  onShowCoding,
}: LandingPageProps) {
  const [showPractice, setShowPractice] = useState(false);

  const lastResult = results.length > 0 ? results[results.length - 1] : null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900'}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-lg">NQT Prep</span>
        </div>
        <button
          onClick={onToggleDark}
          className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-sm'}`}
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-6">
            <Flame className="w-4 h-4" />
            {streak.currentStreak > 0 ? `${streak.currentStreak} day streak` : 'Start your streak'}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            NQT Prep <span className="text-blue-500">Simulator</span>
          </h1>
          <p className={`text-lg max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Practice like the real TCS NQT exam. Timed tests, section-wise practice, and detailed performance analytics.
          </p>
        </div>

        {/* Quick Stats */}
        {results.length > 0 && (
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 ${darkMode ? 'text-white' : ''}`}>
            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-sm'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tests Taken</p>
              <p className="text-2xl font-bold">{results.length}</p>
            </div>
            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-sm'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Accuracy</p>
              <p className="text-2xl font-bold">{Math.round(results.reduce((a, r) => a + r.accuracy, 0) / results.length)}%</p>
            </div>
            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-sm'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Best Score</p>
              <p className="text-2xl font-bold">{Math.max(...results.map(r => r.score))}</p>
            </div>
            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-sm'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Longest Streak</p>
              <p className="text-2xl font-bold">{streak.longestStreak} days</p>
            </div>
          </div>
        )}

        {/* Exam Mode */}
        <div className={`rounded-2xl p-8 mb-8 border transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Exam Mode</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Full 60-question test with 90-minute timer, just like the real exam
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
              90 min
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {sections.map(s => (
              <div key={s.key} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <s.icon className="w-4 h-4" />
                <span>{s.questions} Qs</span>
              </div>
            ))}
          </div>
          <button
            onClick={onStartExam}
            className="flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-5 h-5" />
            Start Full Test
          </button>
        </div>

        {/* Study Center */}
        <div className={`rounded-2xl p-8 mb-8 border transition-colors cursor-pointer group hover:border-blue-500/50 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`} onClick={onShowTopics}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20`}>
                <BookMarked className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Study Center</h2>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Review important formulae, tips, and key concepts for each topic
                </p>
              </div>
            </div>
            <button
              className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all group-hover:scale-[1.05]"
            >
              Open Library
            </button>
          </div>
        </div>

        {/* Coding Round */}
        <div className={`rounded-2xl p-8 mb-8 border transition-colors cursor-pointer group hover:border-blue-500/50 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`} onClick={onShowCoding}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20`}>
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Coding Round</h2>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Previous year TCS NQT coding questions with step-by-step logic and solutions
                </p>
              </div>
            </div>
            <button
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all group-hover:scale-[1.05]"
            >
              Start Coding
            </button>
          </div>
        </div>

        {/* Practice Mode */}
        <div className={`rounded-2xl p-8 mb-8 border transition-colors ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Practice Mode</h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Focus on one section at a time with no time pressure
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
              No timer
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sections.map(s => (
              <button
                key={s.key}
                onClick={() => onStartPractice(s.key)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.01] active:scale-[0.99] ${darkMode ? 'border-gray-800 hover:border-gray-700 bg-gray-800/50' : 'border-gray-200 hover:border-gray-300 bg-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.questions} questions</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {hasWrongQuestions && (
            <button
              onClick={onRetryWrong}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] bg-amber-500 hover:bg-amber-600 text-white"
            >
              Retry Wrong Questions
            </button>
          )}
          {results.length > 0 && (
            <button
              onClick={onShowResults}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm'}`}
            >
              <Trophy className="w-5 h-5" />
              View History
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

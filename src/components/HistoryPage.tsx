import { ArrowLeft, Trophy, Target, Clock, Trash2 } from 'lucide-react';
import { TestResult } from '../types';
import { formatTime } from '../utils/helpers';

interface HistoryPageProps {
  results: TestResult[];
  onGoHome: () => void;
  onViewResult: (result: TestResult) => void;
  onClearHistory: () => void;
  darkMode: boolean;
}

const sectionNames: Record<string, string> = {
  quant: 'Quantitative Aptitude',
  reasoning: 'Reasoning',
  verbal: 'Verbal Ability',
  coding: 'Coding Fundamentals',
  all: 'Full Test',
};

export default function HistoryPage({ results, onGoHome, onViewResult, onClearHistory, darkMode }: HistoryPageProps) {
  const sortedResults = [...results].reverse();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onGoHome}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 shadow-sm'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          {results.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-6">Test History</h1>

        {results.length === 0 ? (
          <div className={`rounded-2xl p-12 text-center border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No tests taken yet</p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Complete a test to see your history here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedResults.map(result => (
              <button
                key={result.id}
                onClick={() => onViewResult(result)}
                className={`w-full text-left rounded-xl p-5 border transition-all hover:scale-[1.01] ${darkMode ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      result.mode === 'exam' ? 'bg-blue-500/20 text-blue-500' : 'bg-emerald-500/20 text-emerald-500'
                    }`}>
                      {result.mode === 'exam' ? 'Exam' : 'Practice'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                      {sectionNames[result.section] || result.section}
                    </span>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {new Date(result.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="font-bold">{result.accuracy}%</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>accuracy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold">{result.correct}/{result.totalQuestions}</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>correct</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="font-bold">{formatTime(result.timeTaken)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

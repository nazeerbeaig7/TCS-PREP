import { CheckCircle, XCircle, MinusCircle, ArrowLeft, RotateCcw, Trophy, Target, Clock, BarChart3 } from 'lucide-react';
import { TestResult, Question } from '../types';
import { formatTime } from '../utils/helpers';

interface ResultPageProps {
  result: TestResult;
  onGoHome: () => void;
  onRetry: () => void;
  darkMode: boolean;
}

export default function ResultPage({ result, onGoHome, onRetry, darkMode }: ResultPageProps) {
  const { correct, wrong, unanswered, totalQuestions, score, accuracy, timeTaken, questions, answers } = result;

  // Section-wise breakdown
  const sections = ['quant', 'reasoning', 'verbal', 'coding'] as const;
  const sectionNames: Record<string, string> = {
    quant: 'Quantitative Aptitude',
    reasoning: 'Reasoning',
    verbal: 'Verbal Ability',
    coding: 'Coding Fundamentals',
  };

  const sectionStats = sections.map(section => {
    const sectionQuestions = questions.filter(q => q.section === section);
    const sectionIndices = questions.map((q, i) => q.section === section ? i : -1).filter(i => i >= 0);
    const sectionCorrect = sectionIndices.filter(i => answers[i]?.selectedOption === questions[i]?.answer).length;
    const sectionTotal = sectionQuestions.length;
    const sectionAccuracy = sectionTotal > 0 ? Math.round((sectionCorrect / sectionTotal) * 100) : 0;
    return { section, name: sectionNames[section], correct: sectionCorrect, total: sectionTotal, accuracy: sectionAccuracy };
  }).filter(s => s.total > 0);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onGoHome}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 shadow-sm'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
        </div>

        {/* Score Card */}
        <div className={`rounded-2xl p-8 mb-6 text-center border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{score.toFixed(1)} <span className="text-lg font-normal text-gray-500">/ {totalQuestions}</span></h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Score</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-xl p-4 text-center border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{correct}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Correct</p>
          </div>
          <div className={`rounded-xl p-4 text-center border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{wrong}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wrong</p>
          </div>
          <div className={`rounded-xl p-4 text-center border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <MinusCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-2xl font-bold">{unanswered}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Unanswered</p>
          </div>
          <div className={`rounded-xl p-4 text-center border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{accuracy}%</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Accuracy</p>
          </div>
        </div>

        {/* Time Taken */}
        <div className={`rounded-xl p-4 mb-6 flex items-center gap-3 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <Clock className="w-5 h-5 text-blue-500" />
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Time Taken:</span>
          <span className="font-bold">{formatTime(timeTaken)}</span>
        </div>

        {/* Section-wise Performance */}
        {sectionStats.length > 1 && (
          <div className={`rounded-2xl p-6 mb-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold">Section-wise Performance</h2>
            </div>
            <div className="space-y-4">
              {sectionStats.map(s => (
                <div key={s.section}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.correct}/{s.total} ({s.accuracy}%)</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${s.accuracy >= 70 ? 'bg-emerald-500' : s.accuracy >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${s.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Review */}
        <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <h2 className="text-lg font-bold mb-4">Question Review</h2>
          <div className="space-y-4">
            {questions.map((q: Question, i: number) => {
              const answer = answers[i];
              const isCorrect = answer?.selectedOption === q.answer;
              const isUnanswered = !answer?.selectedOption;

              return (
                <div key={i} className={`rounded-xl p-4 border ${
                  isUnanswered
                    ? darkMode ? 'border-gray-800' : 'border-gray-200'
                    : isCorrect
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-red-500/30 bg-red-500/5'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      isUnanswered
                        ? darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'
                        : isCorrect
                          ? 'bg-emerald-500 text-white'
                          : 'bg-red-500 text-white'
                    }`}>
                      {isUnanswered ? '-' : isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{i + 1}. {q.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {q.options.map((opt, oi) => (
                          <div
                            key={oi}
                            className={`text-sm px-3 py-1.5 rounded-lg ${
                              opt === q.answer
                                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium'
                                : opt === answer?.selectedOption && opt !== q.answer
                                  ? 'bg-red-500/20 text-red-600 dark:text-red-400 line-through'
                                  : darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                          >
                            {String.fromCharCode(65 + oi)}. {opt}
                          </div>
                        ))}
                      </div>
                      {q.explanation && (
                        <div className={`mt-3 p-3 rounded-lg text-sm border ${
                          darkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-blue-50 border-blue-100 text-blue-700'
                        }`}>
                          <span className="font-bold mr-2">Explanation:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

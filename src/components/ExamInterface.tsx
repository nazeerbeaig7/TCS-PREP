import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Flag, Send, AlertTriangle, Clock } from 'lucide-react';
import { Question, UserAnswer, QuestionStatus } from '../types';
import { useTimer } from '../hooks/useLocalStorage';
import { formatTime, playBeep } from '../utils/helpers';

interface ExamInterfaceProps {
  questions: Question[];
  mode: 'exam' | 'practice';
  onSubmit: (answers: UserAnswer[], timeTaken: number) => void;
  section: string;
  darkMode: boolean;
}

const sectionNames: Record<string, string> = {
  quant: 'Quantitative Aptitude',
  reasoning: 'Reasoning',
  verbal: 'Verbal Ability',
  coding: 'Coding Fundamentals',
  all: 'Full Test',
};

export default function ExamInterface({ questions, mode, onSubmit, section, darkMode }: ExamInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>(
    questions.map(() => ({ questionId: 0, selectedOption: null, status: 'not-visited' as QuestionStatus }))
  );
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [beepPlayed, setBeepPlayed] = useState(false);

  const totalTime = mode === 'exam' ? 90 * 60 : 0;
  const startTime = useState(Date.now())[0];

  const handleExpire = useCallback(() => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    onSubmit(answers, timeTaken);
  }, [answers, startTime, onSubmit]);

  const timer = useTimer(totalTime, handleExpire);

  useEffect(() => {
    if (mode === 'exam') {
      timer.start();
    }
  }, [mode]);

  useEffect(() => {
    if (timer.isCritical && !beepPlayed) {
      playBeep();
      setBeepPlayed(true);
    }
  }, [timer.isCritical, beepPlayed]);

  useEffect(() => {
    if (mode === 'exam') {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [mode]);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex];

  const updateAnswer = (index: number, updates: Partial<UserAnswer>) => {
    setAnswers(prev => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const selectOption = (option: string) => {
    updateAnswer(currentIndex, {
      questionId: currentQuestion.id,
      selectedOption: option,
      status: 'answered',
    });
  };

  const goToQuestion = (index: number) => {
    if (answers[currentIndex].status === 'not-visited') {
      updateAnswer(currentIndex, { status: 'not-answered' });
    }
    setCurrentIndex(index);
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      if (answers[currentIndex].status === 'not-visited') {
        updateAnswer(currentIndex, { status: 'not-answered' });
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      if (answers[currentIndex].status === 'not-visited') {
        updateAnswer(currentIndex, { status: 'not-answered' });
      }
      setCurrentIndex(prev => prev - 1);
    }
  };

  const markForReview = () => {
    updateAnswer(currentIndex, { status: 'marked' });
  };

  const handleSubmit = () => {
    const timeTaken = mode === 'exam' ? totalTime - timer.seconds : Math.round((Date.now() - startTime) / 1000);
    onSubmit(answers, timeTaken);
  };

  const getStatusColor = (status: QuestionStatus, dark: boolean) => {
    switch (status) {
      case 'answered': return 'bg-emerald-500 text-white';
      case 'marked': return 'bg-amber-500 text-white';
      case 'not-answered': return dark ? 'bg-red-500/80 text-white' : 'bg-red-500 text-white';
      default: return dark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600';
    }
  };

  const answeredCount = answers.filter(a => a.status === 'answered').length;
  const markedCount = answers.filter(a => a.status === 'marked').length;
  const notVisitedCount = answers.filter(a => a.status === 'not-visited').length;
  const notAnsweredCount = answers.filter(a => a.status === 'not-answered').length;

  // Group questions by section for full test
  const sectionGroups = section === 'all'
    ? ['quant', 'reasoning', 'verbal', 'coding'].map(s => ({
        name: sectionNames[s],
        questions: questions.map((q, i) => ({ q, i })).filter(({ q }) => q.section === s),
      }))
    : [{ name: sectionNames[section], questions: questions.map((q, i) => ({ q, i })) }];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Top Bar */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-lg">{sectionNames[section] || section}</h1>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mode === 'exam' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {mode === 'exam' ? 'Exam Mode' : 'Practice Mode'}
          </span>
        </div>
        {mode === 'exam' && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${
            timer.isCritical ? 'bg-red-500 text-white animate-pulse' :
            timer.isLow ? 'bg-amber-500/20 text-amber-500' :
            darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
          }`}>
            <Clock className="w-5 h-5" />
            {formatTime(timer.seconds)}
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Question Grid */}
        <div className={`w-64 flex-shrink-0 overflow-y-auto border-r p-4 hidden md:block ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          {/* Legend */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Not Visited ({notVisitedCount})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded bg-amber-500" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Marked ({markedCount})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Not Answered ({notAnsweredCount})</span>
            </div>
          </div>

          {/* Question Grid */}
          {sectionGroups.map(group => (
            <div key={group.name} className="mb-4">
              {sectionGroups.length > 1 && (
                <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{group.name}</p>
              )}
              <div className="grid grid-cols-5 gap-1.5">
                {group.questions.map(({ i }) => (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                      i === currentIndex
                        ? 'ring-2 ring-blue-500 ring-offset-1 ' + getStatusColor(answers[i].status, darkMode)
                        : getStatusColor(answers[i].status, darkMode)
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Panel */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currentQuestion.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-500' :
                  currentQuestion.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                  {currentQuestion.topic}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className={`rounded-xl p-6 mb-6 ${darkMode ? 'bg-gray-900' : 'bg-white shadow-sm'}`}>
              <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => selectOption(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    currentAnswer?.selectedOption === option
                      ? 'border-blue-500 bg-blue-500/10'
                      : darkMode
                        ? 'border-gray-800 hover:border-gray-700 bg-gray-900'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    currentAnswer?.selectedOption === option
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : darkMode
                        ? 'border-gray-700 text-gray-400'
                        : 'border-gray-300 text-gray-500'
                  }`}>
                    {String.fromCharCode(65 + optIndex)}
                  </div>
                  <span className="text-base">{option}</span>
                </button>
              ))}
            </div>

            {/* Clear Selection */}
            {currentAnswer?.selectedOption && (
              <button
                onClick={() => updateAnswer(currentIndex, { selectedOption: null, status: 'not-answered' })}
                className={`text-sm mb-6 underline ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                Clear Selection
              </button>
            )}

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-30 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={markForReview}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                    currentAnswer?.status === 'marked'
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/30'
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  Mark for Review
                </button>
              </div>

              <div className="flex items-center gap-2">
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubmitConfirm(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Question Nav */}
      <div className={`md:hidden border-t p-3 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => goToQuestion(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold flex-shrink-0 transition-all ${
                i === currentIndex
                  ? 'ring-2 ring-blue-500 ' + getStatusColor(answers[i].status, darkMode)
                  : getStatusColor(answers[i].status, darkMode)
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl p-6 max-w-md w-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold">Submit Test?</h3>
            </div>
            <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              You have answered {answeredCount} out of {questions.length} questions.
            </p>
            {notAnsweredCount + notVisitedCount > 0 && (
              <p className="text-amber-500 text-sm mb-4">
                {notAnsweredCount + notVisitedCount} questions are still unanswered.
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className={`flex-1 py-2.5 rounded-xl font-medium ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl font-medium bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

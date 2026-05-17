import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Code2, Terminal, Copy, Check, ChevronRight, Lightbulb, Play, Loader2, SplitSquareHorizontal } from 'lucide-react';
import { codingProblems } from '../data/coding';
import { CodingProblem } from '../types';

interface CodingPageProps {
  onGoHome: () => void;
  darkMode: boolean;
}

export default function CodingPage({ onGoHome, darkMode }: CodingPageProps) {
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem | null>(null);
  const [selectedLang, setSelectedLang] = useState<'c' | 'python'>('c');
  const [copied, setCopied] = useState(false);
  
  // Practice Mode States
  const [isPracticeMode, setIsPracticeMode] = useState(true);
  const [userCode, setUserCode] = useState<Record<string, string>>({ c: '', python: '' });
  const [isCompiling, setIsCompiling] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (selectedProblem) {
      setUserCode({
        c: '// Write your C code here...\n#include<stdio.h>\n\nint main() {\n    \n    return 0;\n}',
        python: '# Write your Python code here...\n\ndef solve():\n    pass\n\nif __name__ == "__main__":\n    solve()'
      });
      setIsPracticeMode(true);
    }
  }, [selectedProblem]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = userCode[selectedLang].substring(0, start) + '    ' + userCode[selectedLang].substring(end);
      setUserCode(prev => ({ ...prev, [selectedLang]: newCode }));
      
      // Move cursor after tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleRunCode = () => {
    setIsCompiling(true);
    // Simulate compilation delay for NQT realism
    setTimeout(() => {
      setIsCompiling(false);
      setIsPracticeMode(false); // Switch to comparison view
    }, 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-slate-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={selectedProblem ? () => setSelectedProblem(null) : onGoHome}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 shadow-sm'}`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{selectedProblem ? selectedProblem.title : 'Coding Practice Simulator'}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedProblem ? 'TCS iON NQT Environment Simulator' : 'Practice previous year TCS NQT coding questions'}
              </p>
            </div>
          </div>
          
          {selectedProblem && (
            <div className={`px-4 py-2 rounded-lg font-bold text-sm ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white shadow-sm text-gray-700'}`}>
              Time Limit: 15:00 Mins
            </div>
          )}
        </div>

        {selectedProblem ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left: Problem Statement (4 columns) */}
            <div className="lg:col-span-4 space-y-6 h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-4 text-blue-500">
                  <Terminal className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Problem Statement</h2>
                </div>
                <p className="leading-relaxed mb-6 text-sm">{selectedProblem.problemStatement}</p>
                
                {selectedProblem.constraints && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-500 mb-2">CONSTRAINTS</h3>
                    <code className={`px-3 py-2 rounded-lg text-sm block ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                      {selectedProblem.constraints}
                    </code>
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase">Example</h3>
                  <pre className={`p-4 rounded-xl font-mono text-sm overflow-x-auto ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {selectedProblem.example}
                  </pre>
                </div>
              </div>

              {!isPracticeMode && (
                <div className={`rounded-2xl p-6 border animate-in fade-in ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex items-center gap-2 mb-4 text-amber-500">
                    <Lightbulb className="w-5 h-5" />
                    <h2 className="text-lg font-bold">TCS Logic & Trick</h2>
                  </div>
                  <div className={`p-4 rounded-xl border ${darkMode ? 'bg-amber-500/10 border-amber-500/20 text-amber-200' : 'bg-amber-50 border-amber-100 text-amber-800'}`}>
                    <p className="text-sm italic">"{selectedProblem.explanation}"</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Code Editor & Solutions (8 columns) */}
            <div className="lg:col-span-8 flex flex-col h-[80vh]">
              {/* Toolbar */}
              <div className={`flex items-center justify-between p-3 rounded-t-2xl border-t border-x ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-center gap-4">
                  <div className="flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
                    <button
                      onClick={() => setSelectedLang('c')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${selectedLang === 'c' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-500'}`}
                    >
                      C Language
                    </button>
                    <button
                      onClick={() => setSelectedLang('python')}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${selectedLang === 'python' ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-500'}`}
                    >
                      Python
                    </button>
                  </div>

                  <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

                  <button
                    onClick={() => setIsPracticeMode(!isPracticeMode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isPracticeMode 
                        ? 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800' 
                        : 'text-blue-500 bg-blue-500/10'
                    }`}
                  >
                    <SplitSquareHorizontal className="w-4 h-4" />
                    {isPracticeMode ? 'View Solution' : 'Back to Editor'}
                  </button>
                </div>

                {isPracticeMode ? (
                  <button
                    onClick={handleRunCode}
                    disabled={isCompiling}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-70"
                  >
                    {isCompiling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    {isCompiling ? 'Compiling...' : 'Run & Submit'}
                  </button>
                ) : (
                  <button
                    onClick={() => copyToClipboard(selectedProblem.solution[selectedLang] || '')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Expected Code'}
                  </button>
                )}
              </div>

              {/* IDE Area */}
              <div className={`flex-1 flex flex-col border-b border-x rounded-b-2xl overflow-hidden relative ${darkMode ? 'bg-[#1e1e1e] border-gray-800' : 'bg-[#1e1e1e] border-gray-200'}`}>
                {/* File Header */}
                <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#404040] flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-400 ml-2 font-mono">
                    {isPracticeMode ? `main.${selectedLang === 'python' ? 'py' : 'c'}` : `solution_compare.${selectedLang === 'python' ? 'py' : 'c'}`}
                  </span>
                </div>

                {/* Editor Content */}
                {isPracticeMode ? (
                  <textarea
                    ref={textareaRef}
                    value={userCode[selectedLang]}
                    onChange={(e) => setUserCode(prev => ({ ...prev, [selectedLang]: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    className="flex-1 w-full bg-transparent text-blue-300 p-6 font-mono text-sm leading-relaxed outline-none resize-none"
                    placeholder="Type your code here..."
                  />
                ) : (
                  <div className="flex-1 flex overflow-hidden">
                    {/* User's Submitted Code */}
                    <div className="w-1/2 border-r border-[#404040] flex flex-col">
                      <div className="bg-[#2d2d2d] py-1 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                        Your Submission
                      </div>
                      <pre className="flex-1 p-6 text-gray-400 font-mono text-sm overflow-auto opacity-70">
                        <code>{userCode[selectedLang]}</code>
                      </pre>
                    </div>
                    {/* Expected Solution */}
                    <div className="w-1/2 flex flex-col bg-[#1a1a1a]">
                      <div className="bg-emerald-500/10 py-1 px-4 text-xs font-bold text-emerald-500 uppercase tracking-wider text-center border-b border-emerald-500/20">
                        Expected Solution
                      </div>
                      <pre className="flex-1 p-6 text-emerald-400 font-mono text-sm overflow-auto">
                        <code>{selectedProblem.solution[selectedLang]}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Simulated Output Console (Only shows after running) */}
                {!isPracticeMode && (
                  <div className="h-48 border-t border-[#404040] bg-[#141414] flex flex-col">
                    <div className="px-4 py-2 border-b border-[#404040] text-xs font-bold text-gray-500">
                      COMPILER OUTPUT
                    </div>
                    <div className="p-4 font-mono text-sm overflow-y-auto">
                      <div className="text-gray-400">Status: <span className="text-emerald-500 font-bold">Successfully Compiled</span></div>
                      <div className="text-gray-400 mt-2">Running hidden test cases...</div>
                      <div className="flex items-center gap-2 mt-2 text-emerald-500">
                        <Check className="w-4 h-4" /> Test Case 1: Passed (0.012s)
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-emerald-500">
                        <Check className="w-4 h-4" /> Test Case 2: Passed (0.015s)
                      </div>
                      <div className="mt-4 text-amber-500 text-xs italic">
                        Note: This is a self-evaluation simulator. Compare your logic with the expected solution above to check if you missed any edge cases!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {codingProblems.map((problem) => (
              <button
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className={`text-left p-6 rounded-2xl border transition-all group ${
                  darkMode 
                    ? 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:bg-gray-800 shadow-xl shadow-black/20' 
                    : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    darkMode ? 'bg-gray-800 group-hover:bg-blue-500/20' : 'bg-blue-50 group-hover:bg-blue-100'
                  }`}>
                    <Code2 className="w-6 h-6 text-blue-500" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">{problem.title}</h3>
                <p className={`text-sm line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {problem.problemStatement}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>TCS PREVIOUS YEAR</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500`}>SIMULATOR IDE</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

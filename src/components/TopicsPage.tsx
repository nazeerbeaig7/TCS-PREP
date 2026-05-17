import { useState } from 'react';
import { ArrowLeft, BookOpen, Lightbulb, ChevronRight, Search, Code, Brain, Calculator, MessageSquare, Filter } from 'lucide-react';
import { topicsData, TopicInfo } from '../data/topics';
import { questions } from '../data/questions';
import { Question } from '../types';

interface TopicsPageProps {
  onGoHome: () => void;
  darkMode: boolean;
}

type CategoryFilter = 'all' | 'quant' | 'reasoning' | 'verbal' | 'coding';

export default function TopicsPage({ onGoHome, darkMode }: TopicsPageProps) {
  const [selectedTopic, setSelectedTopic] = useState<TopicInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredTopics = topicsData.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getTopicQuestions = (topicName: string): Question[] => {
    const tName = topicName.toLowerCase();
    return questions.filter(q => {
      const qTopic = q.topic.toLowerCase();
      // Fuzzy matching to link questions.ts topics with topics.ts names
      if (tName.includes('profit') && qTopic.includes('profit')) return true;
      if (tName.includes('time and work') && qTopic.includes('work')) return true;
      if (tName.includes('speed') && qTopic.includes('distance')) return true;
      if (tName.includes('percent') && qTopic.includes('percent')) return true;
      if (tName.includes('mensuration') && (qTopic.includes('mensuration') || qTopic.includes('geometry'))) return true;
      if (tName.includes('interest') && qTopic.includes('interest')) return true;
      if (tName.includes('grammar') && qTopic.includes('grammar')) return true;
      if (tName.includes('meaning') && (qTopic.includes('synonym') || qTopic.includes('antonym'))) return true;
      if (tName.includes('sentence completion') && (qTopic.includes('blank') || qTopic.includes('completion'))) return true;
      if (tName.includes('error') && qTopic.includes('error')) return true;
      
      return qTopic === tName;
    }).slice(0, 5);
  };

  const categories = [
    { id: 'all', name: 'All Topics', icon: <Filter className="w-4 h-4" /> },
    { id: 'quant', name: 'Quantitative Aptitude', icon: <Calculator className="w-4 h-4" /> },
    { id: 'reasoning', name: 'Reasoning', icon: <Brain className="w-4 h-4" /> },
    { id: 'verbal', name: 'Verbal English', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'coding', name: 'Coding', icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={selectedTopic ? () => setSelectedTopic(null) : onGoHome}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 shadow-sm'}`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{selectedTopic ? selectedTopic.name : 'Study Center'}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedTopic ? 'Important formulae and expected questions' : 'Master every topic for TCS NQT'}
              </p>
            </div>
          </div>

          {!selectedTopic && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-xl w-full md:w-64 border transition-all ${
                  darkMode ? 'bg-gray-900 border-gray-800 focus:border-blue-500' : 'bg-white border-gray-200 focus:border-blue-500 shadow-sm'
                }`}
              />
            </div>
          )}
        </div>

        {selectedTopic ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Formulae & Tips Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-4 text-blue-500">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Important Formulae</h2>
                </div>
                <ul className="space-y-3">
                  {selectedTopic.formulae.map((f, i) => (
                    <li key={i} className={`p-3 rounded-lg border flex items-start gap-3 ${
                      darkMode ? 'bg-gray-800/50 border-gray-800' : 'bg-blue-50/50 border-blue-100'
                    }`}>
                      <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-2xl p-6 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-4 text-amber-500">
                  <Lightbulb className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Smart Tips & Tricks</h2>
                </div>
                <ul className="space-y-3">
                  {selectedTopic.tips.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-blue-500" />
                Expected Questions
              </h2>
              {getTopicQuestions(selectedTopic.name).length > 0 ? (
                getTopicQuestions(selectedTopic.name).map((q, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <p className="font-medium text-sm mb-3 line-clamp-2">{q.question}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        q.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-500' :
                        q.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="text-xs font-bold text-blue-500">Ans: {q.answer}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-sm p-4 rounded-xl border border-dashed ${darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
                  Expected questions are being updated for this topic.
                </div>
              )}
              <button 
                onClick={onGoHome}
                className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
              >
                Practice Full Section
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in">
            {/* Category Filter */}
            <div className={`flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : darkMode
                        ? 'bg-gray-900 border border-gray-800 hover:bg-gray-800'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Topics Grid */}
            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`text-left p-6 rounded-2xl border transition-all group ${
                      darkMode 
                        ? 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/20' 
                        : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        darkMode ? 'bg-gray-800 group-hover:bg-blue-500/20' : 'bg-blue-50 group-hover:bg-blue-100'
                      }`}>
                        {topic.category === 'quant' && <Calculator className="w-6 h-6 text-blue-500" />}
                        {topic.category === 'reasoning' && <Brain className="w-6 h-6 text-purple-500" />}
                        {topic.category === 'verbal' && <MessageSquare className="w-6 h-6 text-emerald-500" />}
                        {topic.category === 'coding' && <Code className="w-6 h-6 text-amber-500" />}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors">{topic.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                        {topic.formulae.length} Formulae
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${darkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-50 text-amber-600'}`}>
                        {topic.tips.length} Tips
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className={`text-center py-20 rounded-2xl border border-dashed ${darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-bold mb-2">No topics found</h3>
                <p>Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

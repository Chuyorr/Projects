import React, { useState } from 'react';
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from './constants';
import { AppTab } from './types';
import ProjectGuidelines from './components/ProjectGuidelines';
import RubricView from './components/RubricView';
import AiAssistant from './components/AiAssistant';
import { Book, FileText, Sparkles, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.GUIDELINES);
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="h-full bg-slate-50 flex flex-col relative">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 flex-none z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-academic-600 p-2 rounded-lg shadow-lg shadow-academic-500/30">
                <Book className="text-white w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight font-serif">{PROJECT_TITLE}</h1>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">Final Project Portal</p>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab(AppTab.GUIDELINES)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === AppTab.GUIDELINES
                  ? 'bg-white text-academic-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Guidelines</span>
            </button>
            <button
              onClick={() => setActiveTab(AppTab.RUBRIC)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === AppTab.RUBRIC
                  ? 'bg-white text-academic-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <Book size={16} />
              <span className="hidden sm:inline">Rubric</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Scroll Wrapper */}
      <div className="flex-1 w-full relative overflow-y-auto z-0">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="animate-fadeIn">
            {activeTab === AppTab.GUIDELINES && <ProjectGuidelines />}
            {activeTab === AppTab.RUBRIC && <RubricView />}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 flex-none z-40">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} English Teacher Training Program. 
            </p>
        </div>
      </footer>

      {/* AI Assistant FAB and Modal */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        {isAiOpen && (
          <div className="w-[90vw] sm:w-[400px] h-[500px] sm:h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-fadeIn mb-2 pointer-events-auto">
            <div className="bg-academic-600 p-3 flex justify-between items-center text-white flex-none">
                <div className="flex items-center gap-2 font-medium">
                    <Sparkles size={18}/>
                    <span>AI Assistant</span>
                </div>
                <button 
                  onClick={() => setIsAiOpen(false)} 
                  className="hover:bg-academic-700 p-1 rounded-full transition-colors"
                >
                    <X size={18}/>
                </button>
            </div>
            <div className="flex-1 overflow-hidden">
                <AiAssistant />
            </div>
          </div>
        )}
        
        <button
          onClick={() => setIsAiOpen(!isAiOpen)}
          className={`pointer-events-auto p-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 font-bold ${
            isAiOpen 
              ? 'bg-slate-700 text-white hover:bg-slate-800' 
              : 'bg-academic-600 text-white hover:bg-academic-700 hover:scale-105'
          }`}
        >
            {isAiOpen ? <X size={24}/> : <Sparkles size={24}/>}
            {!isAiOpen && <span className="pr-1 hidden sm:inline">Ask AI</span>}
        </button>
      </div>
    </div>
  );
};

export default App;
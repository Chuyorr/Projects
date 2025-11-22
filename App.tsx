import React, { useState } from 'react';
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from './constants';
import { AppTab } from './types';
import ProjectGuidelines from './components/ProjectGuidelines';
import RubricView from './components/RubricView';
import AiAssistant from './components/AiAssistant';
import { Book, FileText, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.GUIDELINES);
  const isAssistant = activeTab === AppTab.ASSISTANT;

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 flex-none z-50 shadow-sm">
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
            <button
              onClick={() => setActiveTab(AppTab.ASSISTANT)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === AppTab.ASSISTANT
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              <Cpu size={16} />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Scroll Wrapper */}
      <div className={`flex-1 w-full relative ${isAssistant ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full ${isAssistant ? 'h-full' : ''}`}>
          <div className={`animate-fadeIn ${isAssistant ? 'h-full' : ''}`}>
            {activeTab === AppTab.GUIDELINES && <ProjectGuidelines />}
            {activeTab === AppTab.RUBRIC && <RubricView />}
            {activeTab === AppTab.ASSISTANT && <AiAssistant />}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 flex-none">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} English Teacher Training Program. 
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
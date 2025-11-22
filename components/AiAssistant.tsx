import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse, analyzeText } from '../services/gemini';
import { ChatMessage } from '../types';
import { Send, Sparkles, RefreshCw, PenTool, Bot, User } from 'lucide-react';

const AiAssistant: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'chat' | 'analyze'>('chat');
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', content: "Hello! I'm your Teaching Assistant. I can help you brainstorm ideas for your survival guide, or you can switch to 'Writing Analyzer' to check your paragraphs for grammatical inversion and structure." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Analyze State
  const [textToAnalyze, setTextToAnalyze] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeMode]);

  const handleSendChat = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateChatResponse(
        messages.map(m => ({ role: m.role, content: m.content })),
        input
      );
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', content: responseText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: "Sorry, I had trouble connecting. Please try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!textToAnalyze.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeText(textToAnalyze);
      setAnalysisResult(result);
    } catch (error) {
        setAnalysisResult("Error analyzing text.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveMode('chat')}
          className={`flex-1 py-4 flex justify-center items-center gap-2 font-medium text-sm transition-colors ${activeMode === 'chat' ? 'bg-white text-academic-700 border-b-2 border-academic-500' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
        >
          <Sparkles size={18} />
          Brainstorming Chat
        </button>
        <button
          onClick={() => setActiveMode('analyze')}
          className={`flex-1 py-4 flex justify-center items-center gap-2 font-medium text-sm transition-colors ${activeMode === 'analyze' ? 'bg-white text-academic-700 border-b-2 border-academic-500' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
        >
          <PenTool size={18} />
          Structure & Grammar Check
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* CHAT MODE */}
        {activeMode === 'chat' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-academic-600 text-white rounded-br-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm'}`}>
                     <div className="flex items-center gap-2 mb-1 opacity-70 text-xs font-bold uppercase tracking-wide">
                        {msg.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                        {msg.role === 'user' ? 'You' : 'Assistant'}
                     </div>
                     <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                     </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendChat();
                    }
                  }}
                  placeholder="Ask for an icebreaker or clarify 'inversion'..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-academic-500/20 focus:border-academic-500 resize-none text-sm h-[60px]"
                />
                <button
                  onClick={handleSendChat}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 p-2 bg-academic-600 text-white rounded-lg hover:bg-academic-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ANALYZE MODE */}
        {activeMode === 'analyze' && (
          <div className="h-full flex flex-col overflow-y-auto p-6 bg-slate-50/50">
            <div className="space-y-6 max-w-3xl mx-auto w-full">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <label className="block text-sm font-bold text-slate-700 mb-3">Paste your draft paragraph here:</label>
                    <textarea 
                        className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-academic-500/20 focus:border-academic-500 outline-none resize-none font-serif text-slate-700 leading-relaxed"
                        placeholder="Rarely have I encountered a class so eager to learn..."
                        value={textToAnalyze}
                        onChange={(e) => setTextToAnalyze(e.target.value)}
                    ></textarea>
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !textToAnalyze}
                            className="flex items-center gap-2 bg-academic-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-academic-700 disabled:opacity-50 transition-all shadow-sm hover:shadow"
                        >
                            {isAnalyzing ? <RefreshCw size={18} className="animate-spin"/> : <Sparkles size={18}/>}
                            Check against Rubric
                        </button>
                    </div>
                </div>

                {analysisResult && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 animate-fadeIn">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Bot size={20} className="text-academic-600"/>
                            Feedback
                        </h3>
                        <div className="prose prose-slate max-w-none text-sm leading-relaxed bg-indigo-50/50 p-4 rounded-lg border border-indigo-50">
                             <pre className="whitespace-pre-wrap font-sans">{analysisResult}</pre>
                        </div>
                    </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
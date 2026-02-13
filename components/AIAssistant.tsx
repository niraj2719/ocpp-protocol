
import React, { useState, useRef, useEffect } from 'react';
import { askProtocolQuestion } from '../services/gemini';
import { OCPP_DATA } from '../data';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Hello! I'm your OCPP 1.6 Expert. Ask me anything about message flows, smart charging, or configuration keys." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const context = JSON.stringify(OCPP_DATA.operations.map(o => ({ title: o.title, desc: o.description })));
    const response = await askProtocolQuestion(userText, context);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 md:w-96 flex flex-col h-[500px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-purple-800 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-robot"></i>
              </div>
              <span className="font-semibold">OCPP Expert Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  m.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl shadow-sm rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about OCPP..."
              className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-purple-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-900 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-purple-800 text-white w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
        >
          <i className="fas fa-comment-dots text-xl"></i>
        </button>
      )}
    </div>
  );
};

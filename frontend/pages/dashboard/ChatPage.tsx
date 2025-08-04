import React, { useState, useRef, useEffect, FormEvent } from 'react';
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { ChatMessage, AttachedFile } from '../../types';
import { PaperclipIcon, SendIcon, Spinner, UserIcon } from '../../components/icons';

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const initialMessage: ChatMessage = {
        id: 'init-1', 
        text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم امروز به شما کمک کنم؟',
        sender: 'model', 
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) 
    };
    return [initialMessage];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) {
        return;
    };

    setIsLoading(true);
    const userMessageText = input;
    setInput('');
    
    const timestamp = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: 'user',
      timestamp,
    };
    
    const modelPlaceholderId = `model-${Date.now()}`;
    const modelPlaceholder: ChatMessage = {
        id: modelPlaceholderId,
        text: '',
        sender: 'model',
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        isLoading: true,
    }

    setMessages(prev => [...prev, userMessage, modelPlaceholder]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { reply } = await response.json();
        
      const modelMessage: ChatMessage = {
          id: modelPlaceholderId,
          text: reply || "متاسفانه نتوانستم پاسخی تولید کنم.",
          sender: 'model',
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => prev.map(msg => msg.id === modelPlaceholderId ? modelMessage : msg));

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
          id: modelPlaceholderId,
          text: "خطایی در ارتباط با سرویس رخ داد. لطفا دوباره تلاش کنید.",
          sender: 'model',
          timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => prev.map(msg => msg.id === modelPlaceholderId ? errorMessage : msg));
    } finally {
      setIsLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
    </div>
  );

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto">
      <>
        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0006 18.26L4.94063 21.31L6.52063 13.7L0.990625 8.89L8.62063 8.13L12.0006 1.1L15.3806 8.13L23.0106 8.89L17.4806 13.7L19.0606 21.31L12.0006 18.26Z"></path></svg>
                  </div>
              )}
              <div className={`max-w-lg rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-white/10 text-slate-200 rounded-bl-lg'}`}>
                {msg.isLoading ? (
                  <div className="px-4 py-3"><TypingIndicator /></div>
                ) : (
                  <>
                    <div className="px-4 py-3">
                      {msg.text && <p className="text-sm whitespace-pre-wrap">{msg.text}</p>}
                      <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'} text-left`}>
                          {msg.timestamp}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-slate-600 flex-shrink-0 flex items-center justify-center"><UserIcon className="w-5 h-5 text-white" /></div>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-transparent">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-2 bg-black/20 border border-white/10 rounded-xl">
            <button type="button" className="p-2 text-slate-400 cursor-not-allowed">
              <PaperclipIcon />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
              {isLoading ? <Spinner className="w-5 h-5"/> : <SendIcon />}
            </button>
          </form>
        </div>
      </>
    </div>
  );
};

export default ChatPage;
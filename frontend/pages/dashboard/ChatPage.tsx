import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { ChatMessage, AttachedFile } from '../../types';
import { PaperclipIcon, SendIcon, Spinner, UserIcon } from '../../components/icons';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

// Utility to convert file to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Lazy initialization to prevent module-level errors from crashing the app
    const initialMessage: ChatMessage = {
        id: 'init-1', 
        text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم امروز به شما کمک کنم؟ می‌توانید سوال بپرسید یا فایلی را برای بررسی آپلود کنید.', 
        sender: 'model', 
        timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) 
    };
    return [initialMessage];
  });
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ai, setAi] = useState<GoogleGenAI | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Effect hook is now solely responsible for initializing the AI service.
    try {
      const aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
      setAi(aiInstance);
    } catch (error) {
        console.error("Failed to initialize GoogleGenAI:", error);
        setInitError("خطا در راه‌اندازی سرویس هوش مصنوعی. لطفا از فعال بودن کلید API اطمینان حاصل کرده و صفحه را دوباره بارگیری کنید.");
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if ((input.trim() === '' && !attachedFile) || isLoading || !ai) {
        if (!ai) console.error("AI service is not initialized.");
        return;
    };

    setIsLoading(true);
    const userMessageText = input;
    const userFile = attachedFile;
    
    // Reset inputs
    setInput('');
    setAttachedFile(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
    
    const timestamp = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

    // Add user message to UI
    let userMessageFile: AttachedFile | undefined = undefined;
    if (userFile) {
        const fileDataUrl = await new Promise<string>(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(userFile);
        });
        userMessageFile = { name: userFile.name, type: userFile.type, data: fileDataUrl };
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: userMessageText,
      sender: 'user',
      timestamp,
      file: userMessageFile,
    };
    
    // Add a placeholder for the model's response
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
        const contents: any = { parts: [] };
        if (userMessageText) {
            contents.parts.push({ text: userMessageText });
        }
        if (userFile) {
            const filePart = await fileToGenerativePart(userFile);
            contents.parts.push(filePart);
        }

        const result: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
        });
        
        const responseText = result.text;
        
        const modelMessage: ChatMessage = {
            id: modelPlaceholderId,
            text: responseText || "متاسفانه نتوانستم پاسخی تولید کنم.",
            sender: 'model',
            timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => prev.map(msg => msg.id === modelPlaceholderId ? modelMessage : msg));

    } catch (error) {
      console.error('Error sending message to Gemini:', error);
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

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setAttachedFile(e.target.files[0]);
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
      {initError ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-red-500/80 mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
              <h2 className="text-xl font-bold text-white mb-2">خطای اتصال</h2>
              <p className="text-slate-300 max-w-md">{initError}</p>
          </div>
      ) : (
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
                    {msg.file?.type?.startsWith('image/') && (
                      <img src={msg.file.data} alt={msg.file.name} className="max-w-full max-h-64 object-cover rounded-t-2xl" />
                    )}
                    <div className="px-4 py-3">
                      {msg.text && <p className="text-sm whitespace-pre-wrap">{msg.text}</p>}
                      
                      {msg.file?.type && !msg.file.type.startsWith('image/') && (
                        <div className="mt-2 p-2 bg-black/20 rounded-lg flex items-center gap-2">
                            <PaperclipIcon className="w-4 h-4 text-slate-300 flex-shrink-0" />
                            <span className="text-xs text-slate-300 truncate">{msg.file.name}</span>
                        </div>
                      )}
                      
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
          {attachedFile && (
              <div className="mb-2 p-2 bg-white/10 rounded-lg flex items-center justify-between text-sm">
                  <span className="text-slate-200 truncate">{attachedFile.name}</span>
                  <button onClick={() => { setAttachedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; }} className="text-red-400 text-2xl">&times;</button>
              </div>
          )}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 p-2 bg-black/20 border border-white/10 rounded-xl">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-300 hover:text-white transition-colors">
              <PaperclipIcon />
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileAttach} className="hidden" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
              disabled={isLoading || !ai}
            />
            <button type="submit" disabled={isLoading || !ai || (!input.trim() && !attachedFile)} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
              {isLoading ? <Spinner className="w-5 h-5"/> : <SendIcon />}
            </button>
          </form>
        </div>
      </>
      )}
    </div>
  );
};

export default ChatPage;
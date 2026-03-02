import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, ShieldAlert, Terminal } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Nexus AI Threat Analyzer online. How can I assist with your security operations today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: "You are Nexus AI, a highly advanced cybersecurity threat analyzer. Your tone is professional, technical, and slightly futuristic. You help users with vulnerability research, CTF tips, and general cybersecurity advice. Use markdown for formatting.",
        }
      });

      const assistantMessage = { role: 'assistant', content: response.text || "Analysis complete. No immediate threats detected in your query." };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to Nexus Core. Please check your uplink." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel w-[400px] h-[500px] mb-4 flex flex-col shadow-2xl overflow-hidden border-cyber-blue/30"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-cyber-blue/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyber-blue flex items-center justify-center text-cyber-black">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">NEXUS AI</div>
                  <div className="text-[10px] font-mono text-cyber-blue flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
                    THREAT ANALYZER ACTIVE
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    msg.role === 'user' 
                      ? 'bg-cyber-blue/20 border border-cyber-blue/30 text-white' 
                      : 'bg-white/5 border border-white/10 text-white/80'
                  }`}>
                    {msg.role === 'assistant' && <div className="flex items-center gap-2 mb-2 text-cyber-blue opacity-50"><Terminal size={12} /> ANALYZING...</div>}
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-cyber-blue animate-pulse">
                    Processing uplink...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query system..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-white font-mono text-xs focus:outline-none focus:border-cyber-blue/50"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-cyber-blue hover:text-white transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-cyber-blue text-cyber-black shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        {isOpen ? <X size={28} className="relative z-10" /> : <MessageSquare size={28} className="relative z-10" />}
      </motion.button>
    </div>
  );
}

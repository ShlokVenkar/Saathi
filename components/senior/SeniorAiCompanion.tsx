'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSaathi } from '@/context/SaathiContext';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Bot, 
  User, 
  Phone, 
  Music, 
  AlertTriangle,
  Heart,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'saathi';
  text: string;
  timestamp: string;
  actionType?: 'call' | 'music' | 'sos' | 'checkin';
}

interface SeniorAiCompanionProps {
  onBack: () => void;
  onNavigate?: (view: 'checkin' | 'family' | 'services' | 'devotional') => void;
}

export const SeniorAiCompanion: React.FC<SeniorAiCompanionProps> = ({ onBack, onNavigate }) => {
  const { senior, seniorLang, tSenior, readAloud, createRequest } = useSaathi();
  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome greeting message based on language
  const getInitialMessage = () => {
    if (seniorLang === 'hi') {
      return `नमस्ते ${senior.name.split(' ')[0]} जी! 😊 मैं साथी हूँ। आज मैं आपकी क्या मदद कर सकता हूँ? आप मुझसे कुछ भी बात कर सकते हैं।`;
    }
    if (seniorLang === 'en') {
      return `Hello ${senior.name.split(' ')[0]}! 😊 I am SAATHI, your friendly companion. How can I help you today? Feel free to talk to me.`;
    }
    return `नमस्कार ${senior.name.split(' ')[0]} काका! 😊 मी साथी आहे, तुमचा डिजिटल मित्र. मी तुम्हाला कशी मदत करू शकतो? तुम्ही माझ्याशी मनमोकळेपणाने बोलू शकता.`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'saathi',
      text: getInitialMessage(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Check speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = seniorLang === 'hi' ? 'hi-IN' : seniorLang === 'mr' ? 'mr-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputQuery(transcript);
          setIsListening(false);
          handleSendMessage(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [seniorLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported on this browser. Please type your message.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  // AI Response Generator
  const generateCompanionResponse = (query: string): { reply: string; action?: 'call' | 'music' | 'sos' | 'checkin' } => {
    const q = query.toLowerCase();

    // 1. Loneliness / Feeling alone
    if (q.includes('एकटं') || q.includes('एकाकी') || q.includes('alone') || q.includes('lonely') || q.includes('अकेला')) {
      if (seniorLang === 'hi') {
        return { reply: 'मैं हमेशा आपके साथ हूँ। 😊 आप चाहें तो प्रिया जी से बात कर सकते हैं या कोई मधुर भजन सुन सकते हैं। क्या मैं भजन शुरू करूँ?' };
      }
      if (seniorLang === 'en') {
        return { reply: 'I am always right here with you! 😊 Would you like to call Priya or listen to some peaceful devotional music?' };
      }
      return { reply: 'मी इथे तुमच्या सोबत आहे! 😊 काळजी करू नका. तुम्हाला प्रियाशी बोलायचे आहे का, की शांत भक्तीगीत ऐकायचे आहे?' };
    }

    // 2. Family Call / Talk to daughter
    if (q.includes('मुलगी') || q.includes('प्रिया') || q.includes('family') || q.includes('daughter') || q.includes('बेटी') || q.includes('बात')) {
      createRequest('FAMILY', 'APP');
      if (seniorLang === 'hi') {
        return { 
          reply: 'मैंने प्रिया जी को संदेश भेज दिया है कि आप उनसे बात करना चाहते हैं। आप नीचे दिए गए बटन से सीधे कॉल भी कर सकते हैं।',
          action: 'call'
        };
      }
      if (seniorLang === 'en') {
        return { 
          reply: 'I have notified Priya that you want to talk! You can also tap the call button below to call her directly.',
          action: 'call'
        };
      }
      return { 
        reply: 'मी प्रियाला लगेच निरोप पाठवला आहे की तुम्हाला बोलायचे आहे. तुम्ही खालील बटनावरून लगेच थेट फोनही करू शकता.',
        action: 'call'
      };
    }

    // 3. Music / Bhajan
    if (q.includes('गाणं') || q.includes('भजन') || q.includes('music') || q.includes('song') || q.includes('गाना') || q.includes('आरती')) {
      if (seniorLang === 'hi') {
        return { reply: 'बिल्कुल! आपके मन की शांति के लिए सुंदर भक्ति संगीत उपलब्ध है। आइए भक्ति सेक्शन खोलते हैं।', action: 'music' };
      }
      if (seniorLang === 'en') {
        return { reply: 'Of course! We have beautiful peaceful devotional songs for you. Let me take you to the Devotional section.', action: 'music' };
      }
      return { reply: 'नक्कीच! तुमच्यासाठी सुखकर्ता दुखहर्ता, ओम नमः शिवाय आणि विठू माऊली अशी सुंदर भक्तीगीते आहेत. भक्ती विभागात जाण्यासाठी खाली दाबा.', action: 'music' };
    }

    // 4. Help / Pain / Emergency
    if (q.includes('मदत') || q.includes('help') || q.includes('दुखत') || q.includes('pain') || q.includes('दर्द') || q.includes('sos')) {
      if (seniorLang === 'hi') {
        return { reply: 'यदि आपको कोई दर्द या आपातकालीन स्थिति है, तो कृपया घबराएं नहीं। हमने सहायता विकल्प तैयार रखे हैं।', action: 'sos' };
      }
      if (seniorLang === 'en') {
        return { reply: 'If you need immediate help or are in pain, please do not worry. We have emergency assistance ready.', action: 'sos' };
      }
      return { reply: 'जर तुम्हाला तातडीने मदत हवी असेल किंवा अंगात दुखत असेल, तर अजिबात काळजी करू नका. खालील बटण दाबून त्वरित मदत मिळवा.', action: 'sos' };
    }

    // 5. Routine / What to do today
    if (q.includes('काय करायचं') || q.includes('today') || q.includes('आज') || q.includes('routine')) {
      if (seniorLang === 'hi') {
        return { reply: 'आज का दिन बहुत अच्छा है! आपकी सुबह 9:00 बजे की दवा का समय हो चुका है, और क्या आपने आज का चेक-इन किया है?', action: 'checkin' };
      }
      if (seniorLang === 'en') {
        return { reply: 'Today is a wonderful day! Remember to take your morning medication and complete your daily wellbeing check-in.', action: 'checkin' };
      }
      return { reply: 'आजचा दिवस खूप छान आहे! तुमची सकाळची ९:०० ची गोळी घेण्याची आठवण ठेवा, आणि आजचा दैनिक Check-in पूर्ण केला का ते तपासा.', action: 'checkin' };
    }

    // Default warm friendly response
    if (seniorLang === 'hi') {
      return { reply: `मैंने आपकी बात समझ ली है। मैं हमेशा आपकी सहायता और बातचीत के लिए उपलब्ध हूँ। क्या आप परिवार से संपर्क करना चाहते हैं?` };
    }
    if (seniorLang === 'en') {
      return { reply: `I understand! I am always here to assist you and keep you company. Would you like to check in with family or listen to some music?` };
    }
    return { reply: `मी तुमचे म्हणणे समजून घेतले. मी सदैव तुमच्या मदतीसाठी आणि सुख-दुःखात सोबत देण्यासाठी इथे आहे. 😊` };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Generate AI response with a short natural pause
    setTimeout(() => {
      const response = generateCompanionResponse(text.trim());
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'saathi',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType: response.action
      };
      setMessages((prev) => [...prev, botMsg]);
      readAloud(response.reply);
    }, 600);
  };

  // Quick Prompt Chips
  const quickPrompts = [
    { label: '👨‍👩‍👧 मुलीशी बोलायचे आहे', query: 'मला माझ्या मुलीशी बोलायचं आहे' },
    { label: '❤️ मला एकटं वाटतंय', query: 'मला एकटं वाटतंय' },
    { label: '🎵 भक्तीगीत ऐकायचे आहे', query: 'मला गाणं ऐकायचं आहे' },
    { label: '💊 आज मला काय करायचे आहे?', query: 'आज मला काय करायचं आहे?' },
    { label: '🆘 मला मदत हवी आहे', query: 'मला तातडीने मदत हवी आहे' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 sm:px-5 sm:py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-2xl font-black text-base sm:text-xl flex items-center gap-2 active:scale-95 transition-all shadow-sm border-2 border-slate-300"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>{tSenior('common.back')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-blue-100 text-blue-950 border border-blue-300 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-blue-800 shrink-0" />
            <span>साथी मित्र (AI)</span>
          </span>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="bg-white rounded-3xl shadow-md border-3 border-blue-200 flex flex-col h-[520px] sm:h-[580px] overflow-hidden">
        
        {/* Chat Banner */}
        <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-700 rounded-2xl text-2xl">
              🤖
            </div>
            <div>
              <h2 className="font-black text-lg sm:text-xl">साथी (SAATHI Companion)</h2>
              <p className="text-xs text-blue-200 font-bold">तुमचा प्रेमळ आणि हुशार सोबती</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black border border-emerald-400/30 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ऑनलाइन
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-end ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                    🤖
                  </div>
                )}

                <div
                  className={`max-w-[82%] sm:max-w-[70%] p-4 sm:p-5 rounded-3xl space-y-2 shadow-sm ${
                    isUser
                      ? 'bg-blue-900 text-white rounded-br-none border-2 border-blue-800'
                      : 'bg-white text-slate-900 rounded-bl-none border-2 border-slate-200'
                  }`}
                >
                  <p className="text-base sm:text-xl font-bold leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-200/40 text-xs">
                    <span className={isUser ? 'text-blue-200' : 'text-slate-500'}>
                      {msg.timestamp}
                    </span>

                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => readAloud(msg.text)}
                        className="p-1 text-blue-700 hover:text-blue-900 flex items-center gap-1 font-bold active:scale-95"
                        title="Listen to message"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{tSenior('common.readAloud')}</span>
                      </button>
                    )}
                  </div>

                  {/* Contextual Action Button if suggested by AI */}
                  {msg.actionType === 'call' && (
                    <a
                      href={`tel:${senior.primaryCaregiverPhone}`}
                      className="mt-2 w-full p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      <span>प्रियाला थेट फोन करा</span>
                    </a>
                  )}

                  {msg.actionType === 'music' && onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate('devotional')}
                      className="mt-2 w-full p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
                    >
                      <Music className="w-5 h-5" />
                      <span>भक्तीची गाणी ऐका</span>
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-slate-800 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                    👴
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(p.query)}
              className="px-3.5 py-1.5 bg-white hover:bg-blue-50 text-slate-800 border border-slate-300 rounded-full text-xs sm:text-sm font-bold shrink-0 shadow-xs active:scale-95 transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Bottom Input & Voice Mic Bar */}
        <div className="p-3 sm:p-4 bg-white border-t-2 border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Large Voice Microphone Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-4 rounded-2xl font-black text-xl flex items-center justify-center shrink-0 transition-all active:scale-95 shadow-md ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-300'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
              title="Speak into microphone"
              aria-label="Voice Input"
            >
              {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>

            {/* Query Input Box */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isListening ? 'मी ऐकत आहे, बोला...' : 'इथे लिहा किंवा माइकवर बोला...'}
              className="flex-1 px-4 py-3.5 bg-slate-100 border-2 border-slate-300 focus:border-blue-500 rounded-2xl text-base sm:text-lg font-bold text-slate-900 outline-none"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-4 bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white rounded-2xl font-black shrink-0 active:scale-95 shadow-md"
              aria-label="Send message"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

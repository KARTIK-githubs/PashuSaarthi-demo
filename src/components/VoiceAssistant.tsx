import { Mic, MicOff, Volume2, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface VoiceAssistantProps {
  language: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  audioUrl?: string;
}

export function VoiceAssistant({ language }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: "Voice Assistant",
      subtitle: "Ask questions about poultry care in your language",
      startListening: "Hold to Speak",
      listening: "Listening...",
      processing: "Processing...",
      tapToSpeak: "Tap and hold the mic button to speak",
      ai: "AI Assistant"
    },
    hi: {
      title: "वॉयस असिस्टेंट",
      subtitle: "अपनी भाषा में पोल्ट्री की देखभाल के बारे में सवाल पूछें",
      startListening: "बोलने के लिए दबाएं",
      listening: "सुन रहे हैं...",
      processing: "प्रसंस्करण...",
      tapToSpeak: "बोलने के लिए माइक बटन को दबाएं और रोकें",
      ai: "AI सहायक"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Mock responses for demo
  const mockResponses = {
    en: [
      "Regular feeding 2-3 times daily with balanced feed. Ensure clean fresh water is always available.",
      "Signs of healthy chickens include bright eyes, red combs, active behavior, and good appetite.",
      "Common diseases include Newcastle, Coccidiosis, and Fowl Pox. Vaccination is important for prevention.",
      "Keep the coop clean, provide proper ventilation, and maintain temperature between 65-75°F.",
      "Contact your nearest veterinarian or call our helpline at 1800-XXX-XXXX for emergency support."
    ],
    hi: [
      "संतुलित आहार के साथ दिन में 2-3 बार नियमित भोजन दें। साफ पानी हमेशा उपलब्ध रखें।",
      "स्वस्थ मुर्गियों के लक्षण में चमकदार आंखें, लाल कंघी, सक्रिय व्यवहार और अच्छी भूख शामिल है।",
      "सामान्य बीमारियों में न्यूकैसल, कॉक्सीडियोसिस और फॉउल पॉक्स शामिल हैं। रोकथाम के लिए टीकाकरण जरूरी है।",
      "कूप को साफ रखें, उचित वेंटिलेशन प्रदान करें, और तापमान 18-24°C के बीच बनाए रखें।",
      "आपातकालीन सहायता के लिए अपने निकटतम पशु चिकित्सक से संपर्क करें या हमारी हेल्पलाइन 1800-XXX-XXXX पर कॉल करें।"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Fallback for browsers without speech recognition
      simulateVoiceInput();
      return;
    }

    setIsListening(true);
    setTimeout(() => {
      simulateVoiceInput();
    }, 2000);
  };

  const simulateVoiceInput = () => {
    setIsListening(false);
    setIsProcessing(true);

    // Simulate user speech input
    const userQuestions = language === 'hi' 
      ? ["मेरे मुर्गों को कैसे खिलाना चाहिए?", "स्वस्थ मुर्गी की पहचान कैसे करें?", "बीमारियों से कैसे बचाव करें?"]
      : ["How should I feed my chickens?", "How to identify healthy chickens?", "How to prevent diseases?"];
    
    const randomQuestion = userQuestions[Math.floor(Math.random() * userQuestions.length)];
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: randomQuestion,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI processing delay
    setTimeout(() => {
      const responses = mockResponses[language as keyof typeof mockResponses] || mockResponses.en;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);

      // Auto-play response if speech synthesis is available
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(randomResponse);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        speechSynthesis.speak(utterance);
      }
    }, 2000);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] p-4">
      <div className="text-center mb-4 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200">
        <h1 className="text-3xl mb-3 font-bold text-purple-800">{t.title}</h1>
        <p className="text-purple-600 text-lg font-medium">{t.subtitle}</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-2xl">🗣️</span>
          <span className="text-2xl">🐔</span>
          <span className="text-2xl">💬</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <Card className="border-dashed border-3 border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <Mic className="w-16 h-16 text-purple-600 mx-auto mb-4 drop-shadow-sm" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-lg">🎤</span>
                  </div>
                </div>
                <h3 className="font-bold text-purple-800 mb-2">Start Conversation</h3>
                <p className="text-purple-600 text-sm font-medium">{t.tapToSpeak}</p>
              </CardContent>
            </Card>
            
            {/* Quick questions */}
            <Card className="bg-white/80 backdrop-blur-sm border border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-800 font-bold">Common Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(language === 'hi' ? [
                  "मुर्गियों का भोजन कैसा होना चाहिए?",
                  "बीमार मुर्गी की पहचान कैसे करें?",
                  "कूप की सफाई कैसे करें?"
                ] : [
                  "How to feed chickens properly?",
                  "How to identify sick chickens?",
                  "How to clean the coop?"
                ]).map((question, index) => (
                  <div key={index} className="text-sm text-green-700 bg-green-50 p-2 rounded-lg border border-green-200">
                    "💭 {question}"
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <Avatar className="w-8 h-8 bg-green-100">
                <AvatarFallback className="text-green-600">AI</AvatarFallback>
              </Avatar>
            )}
            
            <div className={`max-w-xs lg:max-w-md ${message.isUser ? 'order-2' : ''}`}>
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.isUser
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                {message.text}
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {!message.isUser && (
                  <button
                    onClick={() => speakMessage(message.text)}
                    className="h-6 w-6 p-0 rounded hover:bg-gray-100 flex items-center justify-center"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {message.isUser && (
              <Avatar className="w-8 h-8 bg-blue-100">
                <AvatarFallback className="text-blue-600">U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="flex gap-3 justify-start">
            <Avatar className="w-8 h-8 bg-green-100">
              <AvatarFallback className="text-green-600">AI</AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500">{t.processing}</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Input Controls */}
      <div className="bg-gradient-to-t from-white to-gray-50 border-t-2 border-gray-200 pt-6 px-4">
        <div className="flex items-center justify-center">
          <div className="relative">
            <button
              className={`w-24 h-24 rounded-full text-white transition-all duration-300 flex items-center justify-center disabled:opacity-50 shadow-xl ${
                isListening 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse scale-110' 
                  : 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105'
              }`}
              onMouseDown={handleStartListening}
              onMouseUp={() => setIsListening(false)}
              onTouchStart={handleStartListening}
              onTouchEnd={() => setIsListening(false)}
              disabled={isProcessing}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 drop-shadow-sm" />
              ) : (
                <Mic className="w-10 h-10 drop-shadow-sm" />
              )}
            </button>
            
            {/* Ripple effect when listening */}
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-4">
          <Badge 
            variant={isListening ? "destructive" : "secondary"} 
            className={`text-sm px-4 py-2 font-semibold ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-purple-100 text-purple-700'
            }`}
          >
            {isListening ? '🔴 ' + t.listening : '🎤 ' + t.startListening}
          </Badge>
        </div>

        {/* Language indicator */}
        <div className="text-center mt-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Speaking in {language === 'hi' ? 'हिंदी' : 'English'}
          </span>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  Bot,
  User,
  HelpCircle,
  ArrowRight,
  Pill,
  AlertTriangle
} from 'lucide-react';
import { MEDICINES_DATABASE } from '../data/medicines';
import { Medicine } from '../types';
import { speakText, stopSpeaking, isSpeaking } from '../utils/audio';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  medicineMatch?: Medicine;
  timestamp: string;
}

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedicine: (medicine: Medicine) => void;
  voiceSpeed?: number;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  onSelectMedicine,
  voiceSpeed = 1.0,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: 'Xin chào! Tôi là Trợ lý Dược sĩ MediBot. Bạn có thể nói hoặc gõ câu hỏi về liều dùng, cách uống, tác dụng phụ hoặc tương tác giữa các loại thuốc. Tôi sẽ tóm tắt súc tích và đọc to câu trả lời cho bạn!',
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingState, setIsSpeakingState] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'vi-VN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleSendMessage(transcript);
          }
          setIsListening(false);
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
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      setIsSpeakingState(false);
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      setIsSpeakingState(false);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: content.trim(),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent clinical response
    setTimeout(() => {
      const q = content.toLowerCase();
      let replyText = '';
      let matchedMed: Medicine | undefined = undefined;

      if (q.includes('panadol') || q.includes('paracetamol') || q.includes('hạ sốt') || q.includes('đau đầu')) {
        matchedMed = MEDICINES_DATABASE.find(m => m.id === 'panadol-extra');
        replyText =
          'Panadol Extra dùng giảm đau và hạ sốt nhanh. Người lớn uống 1 đến 2 viên mỗi 4 đến 6 tiếng. Tuyệt đối không quá 8 viên một ngày. Cảnh báo quan trọng: Không uống rượu bia khi dùng thuốc vì rất độc cho gan.';
      } else if (q.includes('augmentin') || q.includes('kháng sinh') || q.includes('viêm họng') || q.includes('ho')) {
        matchedMed = MEDICINES_DATABASE.find(m => m.id === 'augmentin-625');
        replyText =
          'Augmentin 625mg là kháng sinh điều trị nhiễm khuẩn hô hấp và tai mũi họng. Bạn nên uống thuốc vào đầu bữa ăn để tránh đau dạ dày. Cần uống đủ đợt từ 5 đến 7 ngày theo chỉ định của bác sĩ, không được tự ý bỏ thuốc giữa chừng.';
      } else if (q.includes('berberin') || q.includes('tiêu chảy') || q.includes('đau bụng') || q.includes('bà bầu') || q.includes('mang thai')) {
        matchedMed = MEDICINES_DATABASE.find(m => m.id === 'berberin-100');
        replyText =
          'Berberin trị tiêu chảy và rối loạn tiêu hóa rất tốt cho người lớn (uống 2-4 viên/lần, ngày 2 lần). LƯU Ý ĐẶC BIỆT: Berberin TUYỆT ĐỐI KHÔNG ĐƯỢC DÙNG cho phụ nữ có thai vì kích thích co bóp tử cung gây nguy hiểm cho thai nhi.';
      } else if (q.includes('nexium') || q.includes('dạ dày') || q.includes('trào ngược') || q.includes('ợ chua')) {
        matchedMed = MEDICINES_DATABASE.find(m => m.id === 'nexium-20');
        replyText =
          'Nexium 20mg ức chế acid dạ dày, trị trào ngược và ợ nóng. Thời điểm uống vàng là buổi sáng trước bữa ăn 30 đến 60 phút. Chú ý nuốt nguyên viên với nước lọc, không được nhai hoặc nghiền thuốc.';
      } else if (q.includes('huyết áp') || q.includes('amlodipine') || q.includes('tim mạch')) {
        matchedMed = MEDICINES_DATABASE.find(m => m.id === 'amlodipine-5');
        replyText =
          'Amlodipine 5mg giúp hạ huyết áp và bảo vệ tim mạch. Bạn nên uống 1 viên vào một giờ cố định mỗi sáng. Không được tự ý ngưng thuốc đột ngột và tuyệt đối không ăn bưởi chùm vì có thể làm tụt huyết áp quá mức.';
      } else if (q.includes('tiểu đường') || q.includes('đường huyết') || q.includes('metformin') || q.includes('glucophage')) {
        matchedMed = MEDICINES_DATABASE.find(m => m.id === 'glucophage-500');
        replyText =
          'Glucophage 500mg chứa Metformin kiểm soát đường huyết tuýp 2. Hãy uống ngay trong hoặc sau bữa ăn để giảm triệu chứng buồn nôn, đau bụng. Tránh xa rượu bia khi dùng thuốc này.';
      } else if (q.includes('dị ứng') || q.includes('ngứa') || q.includes('hắt hơi') || q.includes('telfast')) {
        matchedMed = MEDICINES_DATABASE.find(m => m.id === 'telfast-180');
        replyText =
          'Telfast 180mg trị dị ứng, mề đay và viêm mũi. Uống 1 viên mỗi ngày với nước lọc. Thuốc này không gây buồn ngủ, an toàn khi bạn lái xe và làm việc.';
      } else {
        replyText =
          'Tôi đã nhận được câu hỏi của bạn. Để đảm bảo an toàn tuyệt đối, bạn nên kiểm tra tên hoạt chất, liều lượng và thời điểm uống (trước hay sau ăn). Bạn có thể thử tra cứu bằng mã vạch trên hộp hoặc hỏi chi tiết tên một loại thuốc cụ thể nhé!';
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        medicineMatch: matchedMed,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Read reply aloud
      setIsSpeakingState(true);
      speakText(
        replyText,
        voiceSpeed,
        () => setIsSpeakingState(true),
        () => setIsSpeakingState(false)
      );
    }, 600);
  };

  const handleSpeakMessage = (text: string) => {
    if (isSpeakingState) {
      stopSpeaking();
      setIsSpeakingState(false);
    } else {
      setIsSpeakingState(true);
      speakText(
        text,
        voiceSpeed,
        () => setIsSpeakingState(true),
        () => setIsSpeakingState(false)
      );
    }
  };

  const sampleVoicePrompts = [
    'Panadol Extra uống mấy viên một ngày?',
    'Uống kháng sinh Augmentin có được uống bia rượu không?',
    'Thuốc huyết áp Amlodipine uống sáng hay tối?',
    'Berberin có dùng được cho phụ nữ mang thai không?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col h-[85vh] max-h-[700px]">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Trợ Lý Đối Thoại Y Tế MediBot
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-medium border border-blue-500/30">
                  AI Y Khoa
                </span>
              </h3>
              <p className="text-xs text-slate-400">Nhận diện giọng nói & Đọc to súc tích</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {isSpeakingState && (
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsSpeakingState(false);
                }}
                className="p-2 text-cyan-400 hover:text-cyan-300 rounded-full bg-cyan-950/60 border border-cyan-500/30 animate-pulse"
                title="Dừng đọc"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Read button for assistant messages */}
                  {msg.sender === 'assistant' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleSpeakMessage(msg.text)}
                        className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 font-medium py-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Đọc câu trả lời</span>
                      </button>
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>
                  )}
                </div>

                {/* Linked Medicine Card */}
                {msg.medicineMatch && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-blue-500/40 flex items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">
                          {msg.medicineMatch.name}
                        </h5>
                        <p className="text-[11px] text-slate-400 truncate">
                          {msg.medicineMatch.genericName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onSelectMedicine(msg.medicineMatch!);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1"
                    >
                      <span>Chi tiết</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Listening Indicator */}
          {isListening && (
            <div className="p-3.5 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-3 animate-pulse">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span>Đang lắng nghe giọng nói của bạn... Hãy nói câu hỏi về thuốc.</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Voice Prompts */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto flex gap-2 no-scrollbar">
          {sampleVoicePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700/80 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Voice Input & Text Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          {/* Big Voice Button */}
          <button
            onClick={toggleListening}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/40 animate-pulse'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20'
            }`}
            title={isListening ? 'Dừng ghi âm' : 'Nói câu hỏi của bạn'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            placeholder={isListening ? 'Đang nghe...' : 'Gõ câu hỏi hoặc bấm micro để nói...'}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputText)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />

          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

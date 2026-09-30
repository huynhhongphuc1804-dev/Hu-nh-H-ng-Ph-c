import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Clock,
  AlertTriangle,
  ShieldAlert,
  Share2,
  Pill,
  Check,
  Building,
  Calendar,
  Sparkles,
  BookmarkCheck,
  Scale
} from 'lucide-react';
import { Medicine } from '../types';
import { speakText, stopSpeaking, isSpeaking } from '../utils/audio';

interface DrugDetailModalProps {
  medicine: Medicine | null;
  onClose: () => void;
  onAddToSchedule: (medicine: Medicine) => void;
  onCheckInteraction: (medicine: Medicine) => void;
  voiceSpeed?: number;
}

export const DrugDetailModal: React.FC<DrugDetailModalProps> = ({
  medicine,
  onClose,
  onAddToSchedule,
  onCheckInteraction,
  voiceSpeed = 1.0,
}) => {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(voiceSpeed);
  const [activeTab, setActiveTab] = useState<'info' | 'dosage' | 'warnings' | 'interactions'>('info');
  const [copied, setCopied] = useState(false);

  if (!medicine) return null;

  const handleToggleVoice = () => {
    if (isPlayingVoice) {
      stopSpeaking();
      setIsPlayingVoice(false);
    } else {
      setIsPlayingVoice(true);
      speakText(
        medicine.summaryVoice,
        currentSpeed,
        () => setIsPlayingVoice(true),
        () => setIsPlayingVoice(false)
      );
    }
  };

  const handleSpeedChange = (speed: number) => {
    setCurrentSpeed(speed);
    if (isPlayingVoice) {
      stopSpeaking();
      speakText(
        medicine.summaryVoice,
        speed,
        () => setIsPlayingVoice(true),
        () => setIsPlayingVoice(false)
      );
    }
  };

  const handleShare = () => {
    const textToShare = `[Tra Cứu Thuốc MediScan]
Thuốc: ${medicine.name} (${medicine.genericName} - ${medicine.strength})
Tác dụng: ${medicine.indications.join('; ')}
Liều dùng người lớn: ${medicine.dosage.adults}
Lưu ý: ${medicine.warnings.join('; ')}`;

    if (navigator.share) {
      navigator.share({
        title: medicine.name,
        text: textToShare,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="relative bg-slate-950 p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={medicine.imageUrl}
              alt={medicine.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-800 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    medicine.requiresPrescription
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {medicine.requiresPrescription ? 'Thuốc Kê Đơn (ETC)' : 'Thuốc Không Kê Đơn (OTC)'}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  {medicine.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {medicine.name}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-400 font-medium">
                Hoạt chất: {medicine.genericName} ({medicine.strength})
              </p>
              <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap gap-x-3">
                <span>Số ĐK: {medicine.registrationNumber}</span>
                <span>Mã vạch: {medicine.barcode}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Summary Bar (Text-to-Speech) */}
        <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/60 to-slate-900 border-b border-slate-800 p-3.5 px-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
                isPlayingVoice
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 animate-pulse'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
              }`}
            >
              {isPlayingVoice ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingVoice ? 'Dừng đọc' : 'Đọc tóm tắt súc tích'}</span>
            </button>

            <span className="text-xs text-slate-300 hidden sm:inline">
              Tối ưu cho người cao tuổi & nghe nhanh
            </span>
          </div>

          {/* Speed switcher */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Tốc độ:</span>
            {[0.8, 1.0, 1.2].map(speed => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  currentSpeed === speed
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tác dụng & Chỉ định
          </button>
          <button
            onClick={() => setActiveTab('dosage')}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'dosage'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Liều lượng & Cách dùng
          </button>
          <button
            onClick={() => setActiveTab('warnings')}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'warnings'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Cảnh báo & Chống chỉ định
          </button>
          <button
            onClick={() => setActiveTab('interactions')}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'interactions'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tác dụng phụ & Tương tác
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-sm text-slate-300 leading-relaxed">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tác dụng chính & Trường hợp sử dụng
                </h4>
                <ul className="space-y-2">
                  {medicine.indications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span className="text-slate-200">{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Dạng bào chế:</span>
                  <span className="text-white font-medium">{medicine.dosageForm}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Nhà sản xuất:</span>
                  <span className="text-white font-medium">{medicine.manufacturer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Xuất xứ:</span>
                  <span className="text-white font-medium">{medicine.country}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Bảo quản:</span>
                  <span className="text-white font-medium">{medicine.storage}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dosage' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Liều lượng cho người lớn:
                </span>
                <p className="text-sm text-white font-medium">{medicine.dosage.adults}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Liều lượng cho trẻ em:
                </span>
                <p className="text-sm text-white font-medium">{medicine.dosage.children}</p>
              </div>

              {medicine.dosage.specialNotes && (
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200">
                  <strong>Thời điểm & Lưu ý quan trọng:</strong> {medicine.dosage.specialNotes}
                </div>
              )}
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-4">
              {/* Warnings */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Cảnh báo an toàn khẩn cấp</span>
                </div>
                <ul className="space-y-1.5 text-xs text-rose-200">
                  {medicine.warnings.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Chống chỉ định (Những ai KHÔNG được dùng)
                </h4>
                <ul className="space-y-2">
                  {medicine.contraindications.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tác dụng phụ có thể gặp
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {medicine.sideEffects.map((side, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                      {side}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Tương tác với thuốc khác & Thực phẩm
                </h4>
                <ul className="space-y-1.5 text-xs">
                  {medicine.interactions.map((inter, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
                      ⚠️ {inter}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép!' : 'Chia sẻ'}</span>
            </button>

            <button
              onClick={() => onCheckInteraction(medicine)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Kiểm tra tương tác</span>
            </button>
          </div>

          <button
            onClick={() => onAddToSchedule(medicine)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all active:scale-95"
          >
            <Clock className="w-4 h-4" />
            <span>+ Thêm vào Thời Gian Vàng</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Scale, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw } from 'lucide-react';
import { MEDICINES_DATABASE } from '../data/medicines';
import { Medicine } from '../types';

interface DrugInteractionCheckerProps {
  isOpen: boolean;
  onClose: () => void;
  initialMedicine?: Medicine | null;
}

export const DrugInteractionChecker: React.FC<DrugInteractionCheckerProps> = ({
  isOpen,
  onClose,
  initialMedicine,
}) => {
  const [med1Id, setMed1Id] = useState<string>(
    initialMedicine ? initialMedicine.id : MEDICINES_DATABASE[0].id
  );
  const [med2Id, setMed2Id] = useState<string>(MEDICINES_DATABASE[1].id);

  if (!isOpen) return null;

  const med1 = MEDICINES_DATABASE.find(m => m.id === med1Id) || MEDICINES_DATABASE[0];
  const med2 = MEDICINES_DATABASE.find(m => m.id === med2Id) || MEDICINES_DATABASE[1];

  // Evaluate interaction level
  const evaluateInteraction = () => {
    if (med1.id === med2.id) {
      return {
        level: 'danger' as const,
        title: 'Cảnh báo trùng lặp hoạt chất!',
        desc: 'Bạn đang chọn cùng một loại thuốc. Uống gấp đôi liều lượng có nguy cơ quá liều và ngộ độc thuốc cấp tính.',
        advice: 'Chỉ uống đúng 1 liều theo hướng dẫn của bác sĩ hoặc dược sĩ.',
      };
    }

    // Specific clinically known pairs
    if (
      (med1.id === 'panadol-extra' && med2.id === 'augmentin-625') ||
      (med2.id === 'panadol-extra' && med1.id === 'augmentin-625')
    ) {
      return {
        level: 'safe' as const,
        title: 'Có thể phối hợp an toàn khi bị sốt kèm nhiễm trùng',
        desc: 'Paracetamol và Augmentin thường được phối hợp cùng nhau trong điều trị viêm xoang, viêm họng có sốt. Không có tương tác dược lý đối kháng nguy hiểm.',
        advice: 'Nên uống Augmentin vào đầu bữa ăn và Panadol sau ăn với nhiều nước.',
      };
    }

    if (
      (med1.id === 'smecta-3g' || med2.id === 'smecta-3g') ||
      (med1.id === 'berberin-100' && med2.id === 'augmentin-625')
    ) {
      return {
        level: 'warning' as const,
        title: 'Tương tác cản trở hấp thu thuốc (Cần uống cách xa nhau)',
        desc: 'Smecta hoặc Berberin có tính chất bao phủ niêm mạc hoặc hấp phụ chất, làm giảm đáng kể khả năng hấp thụ thuốc kháng sinh hoặc thuốc khác vào cơ thể.',
        advice: 'Bắt buộc uống cách nhau ít nhất 2 giờ đồng hồ để các thuốc phát huy đầy đủ tác dụng.',
      };
    }

    if (
      (med1.id === 'nexium-20' && med2.id === 'amlodipine-5') ||
      (med2.id === 'nexium-20' && med1.id === 'amlodipine-5')
    ) {
      return {
        level: 'safe' as const,
        title: 'Tương tác mức độ nhẹ / Có thể dùng chung',
        desc: 'Nexium làm giảm acid dạ dày nhưng không ảnh hưởng nghiêm trọng đến chuyển hóa của Amlodipine.',
        advice: 'Uống Nexium trước ăn sáng 30 phút, Amlodipine uống cố định một giờ trong ngày.',
      };
    }

    if (
      (med1.id === 'glucophage-500' && med2.id === 'panadol-extra') ||
      (med2.id === 'glucophage-500' && med1.id === 'panadol-extra')
    ) {
      return {
        level: 'safe' as const,
        title: 'Có thể dùng chung khi cần thiết',
        desc: 'Không có báo cáo về tương tác trực tiếp đối kháng giữa Paracetamol và Metformin.',
        advice: 'Theo dõi đường huyết định kỳ và tránh nhịn đói khi uống thuốc.',
      };
    }

    return {
      level: 'warning' as const,
      title: 'Cần thận trọng khi phối hợp nhiều loại thuốc cùng lúc',
      desc: 'Khi sử dụng từ 2 loại thuốc trở lên, gan và thận phải chuyển hóa nhiều hoạt chất cùng lúc. Có thể làm thay đổi thời gian bán thải của thuốc.',
      advice: 'Hãy tham khảo ý kiến bác sĩ điều trị hoặc dược sĩ lâm sàng nếu bạn phải uống liên tục trên 3 ngày.',
    };
  };

  const result = evaluateInteraction();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Kiểm Tra Tương Tác Thuốc Kép</h3>
              <p className="text-xs text-slate-400">Chọn 2 loại thuốc để phát hiện xung đột nguy hiểm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Thuốc thứ nhất:
              </label>
              <select
                value={med1Id}
                onChange={e => setMed1Id(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {MEDICINES_DATABASE.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.genericName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Thuốc thứ hai:
              </label>
              <select
                value={med2Id}
                onChange={e => setMed2Id(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {MEDICINES_DATABASE.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.genericName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Analysis Banner */}
          <div
            className={`p-5 rounded-2xl border ${
              result.level === 'danger'
                ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                : result.level === 'warning'
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2.5 font-bold text-base mb-2">
              {result.level === 'danger' && <ShieldAlert className="w-5 h-5 text-rose-400" />}
              {result.level === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {result.level === 'safe' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              <span>{result.title}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
              {result.desc}
            </p>

            <div className="p-3 bg-black/30 rounded-xl text-xs space-y-1">
              <span className="font-semibold text-white block">Lời khuyên sử dụng:</span>
              <p className="text-slate-300">{result.advice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

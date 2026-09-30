import React, { useState } from 'react';
import {
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Pill,
  Trash2,
  Check,
  Sparkles,
  Flame,
  Bell,
  Sun,
  Sunset,
  Moon,
  Coffee
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MedicationSchedule, Medicine } from '../types';
import { MEDICINES_DATABASE } from '../data/medicines';
import { sounds } from '../utils/audio';

interface GoldenHourViewProps {
  schedules: MedicationSchedule[];
  onUpdateSchedules: (schedules: MedicationSchedule[]) => void;
  onOpenMedicineDetail: (medicine: Medicine) => void;
}

export const GoldenHourView: React.FC<GoldenHourViewProps> = ({
  schedules,
  onUpdateSchedules,
  onOpenMedicineDetail,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(MEDICINES_DATABASE[0].id);
  const [dosage, setDosage] = useState('1 viên');
  const [mealTiming, setMealTiming] = useState<'before' | 'after' | 'with' | 'any'>('after');
  const [timesInput, setTimesInput] = useState('08:00, 13:00, 20:00');
  const [durationDays, setDurationDays] = useState(7);
  const [notes, setNotes] = useState('Uống sau khi ăn no, uống nhiều nước.');

  const todayStr = new Date().toISOString().split('T')[0];

  const toggleTakeDose = (scheduleId: string, time: string) => {
    const key = `${todayStr}-${time}`;
    const updated = schedules.map(s => {
      if (s.id === scheduleId) {
        const currentVal = s.takenLogs[key] || false;
        const newLogs = { ...s.takenLogs, [key]: !currentVal };

        if (!currentVal) {
          sounds.playSuccessChime();
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
          });
        }

        return { ...s, takenLogs: newLogs };
      }
      return s;
    });
    onUpdateSchedules(updated);
  };

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMed = MEDICINES_DATABASE.find(m => m.id === selectedMedId) || MEDICINES_DATABASE[0];
    const parsedTimes = timesInput
      .split(',')
      .map(t => t.trim())
      .filter(t => Boolean(t));

    const newSchedule: MedicationSchedule = {
      id: `sch_${Date.now()}`,
      medicineId: targetMed.id,
      medicineName: targetMed.name,
      dosage: dosage.trim() || '1 viên',
      mealTiming,
      times: parsedTimes.length > 0 ? parsedTimes : ['08:00', '19:00'],
      startDate: todayStr,
      durationDays: Number(durationDays) || 7,
      notes: notes.trim(),
      takenLogs: {},
    };

    onUpdateSchedules([newSchedule, ...schedules]);
    setShowAddModal(false);
    sounds.playSuccessChime();
  };

  const handleDeleteSchedule = (id: string) => {
    onUpdateSchedules(schedules.filter(s => s.id !== id));
  };

  // Calculate today's adherence
  let totalDosesToday = 0;
  let takenDosesToday = 0;

  schedules.forEach(s => {
    s.times.forEach(t => {
      totalDosesToday += 1;
      const key = `${todayStr}-${t}`;
      if (s.takenLogs[key]) takenDosesToday += 1;
    });
  });

  const adherencePercent =
    totalDosesToday > 0 ? Math.round((takenDosesToday / totalDosesToday) * 100) : 100;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/20 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Thời Gian Vàng Uống Thuốc</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Lịch Nhắc Uống Thuốc Chuẩn Giờ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Uống thuốc đúng cữ, đúng liều lượng quyết định hơn 80% hiệu quả điều trị và tránh tình trạng kháng thuốc hay tác dụng phụ.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm cữ thuốc mới</span>
          </button>
        </div>

        {/* Progress & Streak Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400">Tiến độ hôm nay</span>
            <div className="text-xl font-bold text-white mt-0.5">
              {takenDosesToday} / {totalDosesToday} cữ
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${adherencePercent}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400">Chuỗi ngày tuân thủ</span>
            <div className="text-xl font-bold text-amber-400 mt-0.5 flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span>7 Ngày liên tiếp</span>
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">Xuất sắc! Giữ vững phong độ</span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-400">Tỷ lệ tuân thủ</span>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">
              {adherencePercent}%
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {adherencePercent >= 80 ? 'An toàn & Hiệu quả cao' : 'Cần chú ý uống đều hơn'}
            </span>
          </div>
        </div>
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          Danh sách thuốc cần uống ({schedules.length})
        </h3>

        {schedules.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800/80 p-8">
            <Pill className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">Chưa có lịch uống thuốc nào</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
              Hãy thêm các loại thuốc đang sử dụng hoặc tra cứu thuốc và bấm &quot;Thêm vào Thời Gian Vàng&quot;.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors"
            >
              Thêm lịch ngay
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {schedules.map(sch => {
              const med = MEDICINES_DATABASE.find(m => m.id === sch.medicineId);

              return (
                <div
                  key={sch.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{sch.medicineName}</h4>
                          {med && (
                            <button
                              onClick={() => onOpenMedicineDetail(med)}
                              className="text-[11px] text-cyan-400 hover:underline"
                            >
                              (Xem hướng dẫn)
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Liều: <strong className="text-white">{sch.dosage}</strong> •{' '}
                          {sch.mealTiming === 'before'
                            ? 'Uống trước ăn 30 phút'
                            : sch.mealTiming === 'after'
                            ? 'Uống sau khi ăn no'
                            : sch.mealTiming === 'with'
                            ? 'Uống trong bữa ăn'
                            : 'Uống bất kỳ lúc nào'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteSchedule(sch.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors self-end sm:self-center"
                      title="Xóa cữ thuốc"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {sch.notes && (
                    <div className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-4">
                      💡 {sch.notes}
                    </div>
                  )}

                  {/* Daily times check-in chips */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                      Các cữ uống hôm nay:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {sch.times.map(time => {
                        const key = `${todayStr}-${time}`;
                        const isTaken = sch.takenLogs[key] || false;

                        return (
                          <button
                            key={time}
                            onClick={() => toggleTakeDose(sch.id, time)}
                            className={`p-3 rounded-xl border transition-all flex items-center justify-between text-left ${
                              isTaken
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                                : 'bg-slate-950 border-slate-800 hover:border-amber-500/40 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-xs font-mono font-bold">{time}</span>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                                isTaken
                                  ? 'bg-emerald-500 text-slate-950'
                                  : 'border border-slate-700 text-transparent'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Thêm Cữ Uống Thuốc Mới
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSchedule} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                  Chọn thuốc từ cơ sở dữ liệu:
                </label>
                <select
                  value={selectedMedId}
                  onChange={e => setSelectedMedId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500 text-xs"
                >
                  {MEDICINES_DATABASE.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.genericName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Liều lượng mỗi lần:
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={e => setDosage(e.target.value)}
                    placeholder="1 viên, 5ml..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Thời điểm uống:
                  </label>
                  <select
                    value={mealTiming}
                    onChange={e => setMealTiming(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="after">Sau khi ăn</option>
                    <option value="before">Trước khi ăn</option>
                    <option value="with">Trong bữa ăn</option>
                    <option value="any">Tùy ý</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                  Giờ uống trong ngày (ngăn cách bằng dấu phẩy):
                </label>
                <input
                  type="text"
                  value={timesInput}
                  onChange={e => setTimesInput(e.target.value)}
                  placeholder="08:00, 13:00, 20:00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                  Ghi chú dặn dò:
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Ví dụ: Uống cùng 1 ly nước đầy..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md"
                >
                  Lưu vào lịch Thời Gian Vàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

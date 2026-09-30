import React, { useState } from 'react';
import {
  User,
  Settings,
  Download,
  Volume2,
  Type,
  WifiOff,
  ShieldCheck,
  FileSpreadsheet,
  Trash2,
  Check,
  Edit2,
  Save,
  HelpCircle,
  ExternalLink,
  Heart
} from 'lucide-react';
import { UserProfile, MedicationSchedule, FamilyMember } from '../types';
import { exportMedicalData, clearSearchHistory } from '../utils/storage';
import { sounds } from '../utils/audio';

interface SettingsProfileViewProps {
  user: UserProfile;
  schedules: MedicationSchedule[];
  family: FamilyMember[];
  onUpdateUser: (user: UserProfile) => void;
  onClearHistory: () => void;
}

export const SettingsProfileView: React.FC<SettingsProfileViewProps> = ({
  user,
  schedules,
  family,
  onUpdateUser,
  onClearHistory,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [age, setAge] = useState(user.age.toString());
  const [allergiesText, setAllergiesText] = useState(user.allergies.join(', '));
  const [conditionsText, setConditionsText] = useState(user.medicalConditions.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name: name.trim(),
      phone: phone.trim(),
      age: Number(age) || user.age,
      allergies: allergiesText
        .split(',')
        .map(a => a.trim())
        .filter(Boolean),
      medicalConditions: conditionsText
        .split(',')
        .map(c => c.trim())
        .filter(Boolean),
    };
    onUpdateUser(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    sounds.playSuccessChime();
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExport = () => {
    exportMedicalData(schedules, family, user);
    sounds.playSuccessChime();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/20">
              {user.name.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {user.name}
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                  Đã xác thực SĐT
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                SĐT: {user.phone} • {user.age} tuổi • Mã gia đình: {user.familyCode}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 self-end sm:self-center"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Hủy' : 'Chỉnh sửa hồ sơ'}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-slate-800 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Họ và tên:</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Số điện thoại:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Tuổi:</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Tiền sử dị ứng (ngăn cách bằng dấu phẩy):</label>
              <input
                type="text"
                value={allergiesText}
                onChange={e => setAllergiesText(e.target.value)}
                placeholder="Ví dụ: Dị ứng Penicillin, Aspirin..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Bệnh nền mãn tính (ngăn cách bằng dấu phẩy):</label>
              <input
                type="text"
                value={conditionsText}
                onChange={e => setConditionsText(e.target.value)}
                placeholder="Ví dụ: Viêm dạ dày, Tăng huyết áp..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Lưu thay đổi hồ sơ</span>
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block mb-1">Tiền sử dị ứng thuốc:</span>
              <span className="text-rose-300 font-medium">
                {user.allergies.length > 0 ? user.allergies.join(', ') : 'Chưa ghi nhận dị ứng'}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-500 block mb-1">Bệnh nền cần lưu ý:</span>
              <span className="text-amber-300 font-medium">
                {user.medicalConditions.length > 0
                  ? user.medicalConditions.join(', ')
                  : 'Sức khỏe bình thường'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Accessibility & Voice Settings */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          Tiện Ích & Trợ Năng Dành Cho Người Cao Tuổi
        </h3>

        {/* Font size switcher */}
        <div className="flex items-center justify-between py-2 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-white block">Cỡ chữ hiển thị</span>
            <span className="text-[11px] text-slate-400">Tùy chỉnh độ lớn chữ giúp dễ đọc khi xem đơn thuốc</span>
          </div>
          <div className="flex gap-1.5">
            {[
              { id: 'normal', label: 'Chuẩn' },
              { id: 'large', label: 'Cỡ Lớn' },
              { id: 'extra-large', label: 'Rất Lớn' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => onUpdateUser({ ...user, fontSize: item.id as any })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  user.fontSize === item.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Voice speed */}
        <div className="flex items-center justify-between py-2 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-white block">Tốc độ đọc giọng nói (TTS)</span>
            <span className="text-[11px] text-slate-400">Chậm hơn (0.8x) giúp người lớn tuổi nghe rõ ràng từng chữ</span>
          </div>
          <div className="flex gap-1.5">
            {[
              { val: 0.8, label: '0.8x (Chậm)' },
              { val: 1.0, label: '1.0x (Chuẩn)' },
              { val: 1.2, label: '1.2x (Nhanh)' },
            ].map(item => (
              <button
                key={item.val}
                onClick={() => onUpdateUser({ ...user, voiceSpeed: item.val })}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  user.voiceSpeed === item.val
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Chimes */}
        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-xs font-semibold text-white block">Âm thanh chuông báo & Bíp quét</span>
            <span className="text-[11px] text-slate-400">Phát âm thanh khi quét mã vạch và nhắc giờ uống thuốc</span>
          </div>
          <button
            onClick={() => onUpdateUser({ ...user, soundEnabled: !user.soundEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              user.soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                user.soundEnabled ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Offline & Data Export */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Download className="w-5 h-5 text-emerald-400" />
          Xuất Báo Cáo Y Tế & Chế Độ Ngoại Tuyến
        </h3>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Chế độ hoạt động ngoại tuyến (Offline)</div>
              <p className="text-[11px] text-slate-400">
                Toàn bộ dữ liệu thuốc, lịch uống thuốc và chỉ số gia đình đã được lưu trên thiết bị. Bạn có thể tra cứu bình thường khi mất mạng Internet.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            Sẵn sàng
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleExport}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Xuất toàn bộ báo cáo thuốc & đơn thuốc (.txt)</span>
          </button>

          <button
            onClick={onClearHistory}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Xoá lịch sử tìm kiếm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

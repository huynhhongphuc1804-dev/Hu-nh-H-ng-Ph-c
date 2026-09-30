import React, { useState } from 'react';
import {
  HeartPulse,
  Users,
  KeyRound,
  ShieldAlert,
  BellRing,
  Activity,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Share2,
  Copy,
  Check,
  PhoneCall,
  Volume2
} from 'lucide-react';
import { FamilyMember } from '../types';
import { sounds } from '../utils/audio';

interface HealthTreeViewProps {
  familyMembers: FamilyMember[];
  familyCode: string;
  onUpdateFamily: (members: FamilyMember[]) => void;
}

export const HealthTreeView: React.FC<HealthTreeViewProps> = ({
  familyMembers,
  familyCode,
  onUpdateFamily,
}) => {
  const [activeTab, setActiveTab] = useState<'members' | 'alerts'>('members');
  const [copiedCode, setCopiedCode] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [simulatedAlert, setSimulatedAlert] = useState<{
    member: FamilyMember;
    message: string;
  } | null>(null);

  // New member form
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Mẹ');
  const [newMemberAge, setNewMemberAge] = useState('65');
  const [newMemberPhone, setNewMemberPhone] = useState('');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(familyCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTriggerSosTest = (member: FamilyMember) => {
    sounds.playSosAlarm();
    setSimulatedAlert({
      member,
      message: `CẢNH BÁO KHẨN CẤP: ${member.name} có chỉ số huyết áp bất thường (158/96 mmHg) và chưa uống thuốc huyết áp lúc 08:00 sáng nay!`,
    });
  };

  const handleDismissAlert = () => {
    setSimulatedAlert(null);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMem: FamilyMember = {
      id: `fam_${Date.now()}`,
      name: newMemberName.trim(),
      relation: newMemberRelation,
      age: Number(newMemberAge) || 50,
      avatar: newMemberRelation.includes('Mẹ') || newMemberRelation.includes('Bà') ? '👵' : '👴',
      phone: newMemberPhone.trim() || '0900000000',
      syncCode: familyCode,
      isLinked: true,
      activeMedicationsCount: 1,
      adherenceRate: 100,
      metrics: [
        {
          date: 'Vừa kết nối',
          systolicBP: 120,
          diastolicBP: 80,
          heartRate: 72,
          bloodSugar: 5.5,
          status: 'normal',
        },
      ],
    };

    onUpdateFamily([...familyMembers, newMem]);
    setShowAddMember(false);
    setNewMemberName('');
    sounds.playSuccessChime();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* SOS Alert Banner if triggered */}
      {simulatedAlert && (
        <div className="p-5 rounded-3xl bg-rose-950 border-2 border-rose-500 shadow-2xl shadow-rose-900/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-bounce">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-rose-800 px-2 py-0.5 rounded-full">
                  BÁO ĐỘNG SỨC KHỎE GIA ĐÌNH
                </span>
                <span className="text-xs text-rose-300">Vừa xong</span>
              </div>
              <p className="text-sm font-semibold text-rose-100 mt-1">
                {simulatedAlert.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <a
              href={`tel:${simulatedAlert.member.phone}`}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Gọi ngay
            </a>
            <button
              onClick={handleDismissAlert}
              className="px-3.5 py-2 bg-rose-800 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl"
            >
              Đã xử lý
            </button>
          </div>
        </div>
      )}

      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/20 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Hệ Thống Liên Kết Cây Sức Khỏe</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Bảo Vệ Người Thân Từ Xa
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Khi các tài khoản nhập chung mã kích hoạt, mọi chỉ số huyết áp, nhịp tim hay trường hợp quên uống thuốc sẽ lập tức được gửi thông báo cảnh báo tức thì.
            </p>
          </div>

          {/* Family Sync Code Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-center sm:text-right shrink-0 w-full sm:w-auto">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Mã kết nối gia đình của bạn:
            </span>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <span className="font-mono text-lg font-extrabold text-emerald-400 tracking-wider">
                {familyCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
                title="Sao chép mã"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Cung cấp mã này cho người thân để liên kết</p>
          </div>
        </div>
      </div>

      {/* Linked Members Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            Thành viên trong Cây Sức Khỏe ({familyMembers.length})
          </h3>
          <button
            onClick={() => setShowAddMember(true)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm người thân</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {familyMembers.map(member => {
            const latestMetric = member.metrics[0];

            return (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">{member.name}</h4>
                        <p className="text-xs text-slate-400">
                          {member.relation} • {member.age} tuổi • SĐT: {member.phone}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Đã liên kết
                    </span>
                  </div>

                  {/* Vitals row */}
                  {latestMetric ? (
                    <div className="grid grid-cols-3 gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 mb-3 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Huyết áp</span>
                        <span
                          className={`text-xs font-bold font-mono ${
                            latestMetric.systolicBP >= 140 ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {latestMetric.systolicBP}/{latestMetric.diastolicBP}
                        </span>
                        <span className="text-[9px] text-slate-500 block">mmHg</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">Nhịp tim</span>
                        <span className="text-xs font-bold font-mono text-cyan-400">
                          {latestMetric.heartRate}
                        </span>
                        <span className="text-[9px] text-slate-500 block">bpm</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">Tuân thủ thuốc</span>
                        <span className="text-xs font-bold text-amber-400">
                          {member.adherenceRate}%
                        </span>
                        <span className="text-[9px] text-slate-500 block">
                          {member.activeMedicationsCount} loại thuốc
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 py-3 text-center bg-slate-950/50 rounded-xl mb-3">
                      Chưa có dữ liệu đo huyết áp hôm nay
                    </div>
                  )}

                  {member.lastAlert && (
                    <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-[11px] text-amber-300 mb-3 flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{member.lastAlert.message}</span>
                    </div>
                  )}
                </div>

                {/* Card footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">Cập nhật: {latestMetric?.date || 'Gần đây'}</span>
                  <button
                    onClick={() => handleTriggerSosTest(member)}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[11px] font-semibold transition-colors flex items-center gap-1"
                  >
                    <BellRing className="w-3 h-3" />
                    Thử phát cảnh báo SOS
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Thêm Thành Viên Vào Cây Sức Khỏe
              </h3>
              <button
                onClick={() => setShowAddMember(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                  Họ và tên người thân:
                </label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={e => setNewMemberName(e.target.value)}
                  placeholder="Ví dụ: Bà Hoàng Thị Lan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Quan hệ:
                  </label>
                  <select
                    value={newMemberRelation}
                    onChange={e => setNewMemberRelation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Mẹ">Mẹ</option>
                    <option value="Bố">Bố</option>
                    <option value="Bà nội">Bà nội</option>
                    <option value="Ông nội">Ông nội</option>
                    <option value="Bà ngoại">Bà ngoại</option>
                    <option value="Ông ngoại">Ông ngoại</option>
                    <option value="Con cái">Con cái</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                    Tuổi:
                  </label>
                  <input
                    type="number"
                    value={newMemberAge}
                    onChange={e => setNewMemberAge(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 uppercase tracking-wider">
                  Số điện thoại khẩn cấp:
                </label>
                <input
                  type="tel"
                  value={newMemberPhone}
                  onChange={e => setNewMemberPhone(e.target.value)}
                  placeholder="0987 654 321"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md mt-2"
              >
                Kích hoạt liên kết thành viên
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

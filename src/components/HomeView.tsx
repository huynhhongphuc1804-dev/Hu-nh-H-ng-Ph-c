import React, { useState } from 'react';
import {
  Search,
  ScanLine,
  Camera,
  Mic,
  Clock,
  HeartPulse,
  Scale,
  Sparkles,
  ArrowRight,
  Filter,
  Pill,
  ShieldCheck,
  AlertTriangle,
  History,
  TrendingUp,
  X
} from 'lucide-react';
import { Medicine, MedicationSchedule, FamilyMember, UserProfile } from '../types';
import { MEDICINES_DATABASE, CATEGORIES } from '../data/medicines';

interface HomeViewProps {
  onOpenBarcode: () => void;
  onOpenImageSearch: () => void;
  onOpenVoice: () => void;
  onOpenInteraction: () => void;
  onSelectMedicine: (medicine: Medicine) => void;
  onNavigateTab: (tab: 'golden_hour' | 'health_tree' | 'profile') => void;
  schedules: MedicationSchedule[];
  family: FamilyMember[];
  searchHistory: string[];
  onSelectHistoryTerm: (term: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenBarcode,
  onOpenImageSearch,
  onOpenVoice,
  onOpenInteraction,
  onSelectMedicine,
  onNavigateTab,
  schedules,
  family,
  searchHistory,
  onSelectHistoryTerm,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Filter medicines
  const filteredMedicines = MEDICINES_DATABASE.filter(med => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.barcode.includes(searchTerm) ||
      med.indications.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat =
      selectedCategory === 'Tất cả' || med.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-7 max-w-5xl mx-auto pb-12">
      {/* Search Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 border border-blue-500/20 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs text-cyan-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Tra cứu thông minh bằng Mã Vạch, Hình Ảnh & Giọng Nói
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            Tra cứu liều dùng, tác dụng & tương tác thuốc chính xác
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            Nhập tên hoạt chất, tên thương mại hoặc sử dụng camera quét mã vạch trên vỏ hộp.
          </p>

          {/* Unified Smart Search Input */}
          <div className="relative pt-2">
            <div className="flex items-center bg-slate-950/90 border border-blue-500/40 focus-within:border-cyan-400 rounded-2xl p-1.5 shadow-2xl transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Tìm thuốc: Panadol, Augmentin, đau dạ dày, sốt..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
              />

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center gap-1 pr-1 shrink-0">
                <button
                  onClick={onOpenVoice}
                  className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/80 rounded-xl transition-colors"
                  title="Tìm bằng giọng nói"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenImageSearch}
                  className="p-2 text-purple-400 hover:text-purple-300 hover:bg-slate-800/80 rounded-xl transition-colors"
                  title="Tìm bằng hình ảnh"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenBarcode}
                  className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md transition-colors"
                  title="Quét mã vạch"
                >
                  <ScanLine className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Recent Search Chips */}
            {searchHistory.length > 0 && !searchTerm && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0">
                  <History className="w-3 h-3" /> Gần đây:
                </span>
                {searchHistory.slice(0, 5).map((term, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchTerm(term);
                      onSelectHistoryTerm(term);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 whitespace-nowrap text-[11px]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 Core Quick Action Portals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Barcode Portal */}
        <button
          onClick={onOpenBarcode}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/20 hover:border-blue-500/50 hover:bg-slate-900 transition-all text-left group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ScanLine className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">Quét Mã Vạch</h4>
            <p className="text-xs text-slate-400 mt-1">
              Quét mã EAN-13 trên hộp thuốc để tra ngay tác dụng & liều dùng
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-medium">
            <span>Bắt đầu quét</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 2. Photo Vision Portal */}
        <button
          onClick={onOpenImageSearch}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900 transition-all text-left group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">Chụp Ảnh Thuốc</h4>
            <p className="text-xs text-slate-400 mt-1">
              AI nhận diện nhãn vỉ thuốc, hàm lượng và đơn thuốc bác sĩ
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-purple-400 font-medium">
            <span>Tải ảnh lên</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 3. Voice Assistant Portal */}
        <button
          onClick={onOpenVoice}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">Hỏi Đáp Giọng Nói</h4>
            <p className="text-xs text-slate-400 mt-1">
              Nói câu hỏi y tế, ứng dụng tóm tắt súc tích và đọc to câu trả lời
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
            <span>Bấm để nói</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* 4. Drug Interaction Portal */}
        <button
          onClick={onOpenInteraction}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/20 hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left group shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm sm:text-base">Tương Tác Thuốc</h4>
            <p className="text-xs text-slate-400 mt-1">
              Phát hiện xung đột nguy hiểm khi uống 2 loại thuốc cùng nhau
            </p>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-medium">
            <span>Kiểm tra ngay</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* Two Live System Widgets: Golden Hour & Health Tree */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Golden Hour Widget */}
        <div
          onClick={() => onNavigateTab('golden_hour')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Thời Gian Vàng Hôm Nay
              </span>
            </div>
            <span className="text-xs text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
              Xem lịch <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="text-sm font-semibold text-white">
            {schedules.length} đơn thuốc đang hoạt động
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Uống thuốc đúng cữ giờ giúp tối ưu hóa nồng độ trong máu và tránh quên liều.
          </p>
        </div>

        {/* Health Tree Widget */}
        <div
          onClick={() => onNavigateTab('health_tree')}
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Cây Sức Khỏe Gia Đình
              </span>
            </div>
            <span className="text-xs text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="text-sm font-semibold text-white">
            {family.length} thành viên đang kết nối an toàn
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Chỉ số huyết áp và lịch uống thuốc được giám sát và đồng bộ tự động.
          </p>
        </div>
      </div>

      {/* Medicine Directory Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Pill className="w-5 h-5 text-blue-400" />
              Danh Mục Thuốc Phổ Biến ({filteredMedicines.length})
            </h3>
            <p className="text-xs text-slate-400">
              Tra cứu thông tin đã được kiểm định từ Dược thư Quốc gia
            </p>
          </div>

          {/* Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Medicines List */}
        {filteredMedicines.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-slate-900/40 border border-slate-800 p-8 space-y-3">
            <Pill className="w-12 h-12 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-white">Không tìm thấy loại thuốc phù hợp</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Không tìm thấy kết quả cho &quot;{searchTerm}&quot;. Bạn có thể thử tìm bằng hoạt chất, chụp ảnh nhãn thuốc hoặc hỏi Trợ lý giọng nói.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={onOpenVoice}
                className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-semibold"
              >
                Hỏi MediBot giọng nói
              </button>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tất cả');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold"
              >
                Xem tất cả thuốc
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedicines.map(med => (
              <div
                key={med.id}
                onClick={() => onSelectMedicine(med)}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={med.imageUrl}
                      alt={med.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            med.requiresPrescription
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/20'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                          }`}
                        >
                          {med.requiresPrescription ? 'ETC - Kê đơn' : 'OTC - Tự do'}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate">
                          {med.dosageForm}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors truncate">
                        {med.name}
                      </h4>
                      <p className="text-xs text-cyan-400 font-medium truncate">
                        {med.genericName}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {med.indications[0]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Mã vạch: {med.barcode.slice(0, 7)}...
                  </span>
                  <span className="text-blue-400 group-hover:text-cyan-300 font-medium flex items-center gap-1">
                    Chi tiết & Giọng đọc <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

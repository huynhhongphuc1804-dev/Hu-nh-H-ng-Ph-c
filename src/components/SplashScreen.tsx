import React from 'react';
import { Pill, ScanLine, ShieldCheck, HeartPulse, Sparkles, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-xs text-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Chuẩn Dữ Liệu Dược Học BYT</span>
        </div>
        <button
          onClick={onEnter}
          className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          Bỏ qua
        </button>
      </div>

      {/* Center Hero */}
      <div className="relative z-10 max-w-lg mx-auto text-center my-auto py-8">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-2xl shadow-blue-500/30 mx-auto flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-3xl flex items-center justify-center backdrop-blur">
              <Pill className="w-12 h-12 text-cyan-400 -rotate-45" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-slate-900">
            <ScanLine className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Tra Cứu Thuốc
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-2xl sm:text-3xl font-bold mt-1">
            MediScan AI
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md mx-auto mb-8">
          Giải pháp tra cứu thông tin dược phẩm thông minh qua <strong className="text-cyan-300">Quét mã vạch</strong>, <strong className="text-cyan-300">Hình ảnh bao bì</strong>, <strong className="text-cyan-300">Giọng nói tự nhiên</strong>, lịch nhắc <strong className="text-amber-300">Thời Gian Vàng</strong> và bảo vệ sức khỏe gia đình với <strong className="text-emerald-300">Cây Sức Khỏe</strong>.
        </p>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-2 gap-3 text-left mb-8 max-w-md mx-auto">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
            <ScanLine className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="text-xs font-semibold text-white">Quét Mã Vạch & Ảnh</div>
            <div className="text-[11px] text-slate-400">Tra cứu tức thì trong 1 giây</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
            <Sparkles className="w-4 h-4 text-purple-400 mb-1" />
            <div className="text-xs font-semibold text-white">Giọng Nói & AI</div>
            <div className="text-[11px] text-slate-400">Đọc to súc tích cho người lớn</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
            <HeartPulse className="w-4 h-4 text-amber-400 mb-1" />
            <div className="text-xs font-semibold text-white">Thời Gian Vàng</div>
            <div className="text-[11px] text-slate-400">Nhắc uống đúng giờ, chuẩn liều</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
            <div className="text-xs font-semibold text-white">Cây Sức Khỏe</div>
            <div className="text-[11px] text-slate-400">Liên kết cảnh báo người thân</div>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mx-auto active:scale-95"
        >
          <span>Bắt đầu tra cứu ngay</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Notes */}
      <div className="relative z-10 text-center text-xs text-slate-400">
        Hoạt động hoàn hảo cả khi không có kết nối Internet • Bảo mật thông tin y tế cá nhân
      </div>
    </div>
  );
};

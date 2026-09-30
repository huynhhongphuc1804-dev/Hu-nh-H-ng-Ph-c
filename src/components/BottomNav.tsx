import React from 'react';
import { Home, Clock, HeartPulse, User, ScanLine, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  onOpenBarcode: () => void;
  activeSchedulesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenBarcode,
  activeSchedulesCount,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 md:hidden pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Trang chủ</span>
        </button>

        <button
          onClick={() => onSelectTab('golden_hour')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
            activeTab === 'golden_hour' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Giờ Vàng</span>
          {activeSchedulesCount > 0 && (
            <span className="absolute top-1 right-1/4 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
              {activeSchedulesCount}
            </span>
          )}
        </button>

        {/* Floating Center Scan Button */}
        <div className="relative -top-4 flex items-center justify-center">
          <button
            onClick={onOpenBarcode}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center border-4 border-slate-950 active:scale-95 transition-transform"
            title="Quét mã vạch thuốc"
          >
            <ScanLine className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={() => onSelectTab('health_tree')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'health_tree' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HeartPulse className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Cây Sức Khỏe</span>
        </button>

        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'profile' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Hồ sơ</span>
        </button>
      </div>
    </div>
  );
};

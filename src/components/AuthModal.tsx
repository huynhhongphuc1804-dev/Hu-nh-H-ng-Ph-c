import React, { useState } from 'react';
import { X, Phone, Lock, CheckCircle2, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveUser: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveUser,
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [name, setName] = useState(currentUser.name || '');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 9) {
      setError('Vui lòng nhập số điện thoại hợp lệ (từ 10 chữ số)');
      return;
    }
    setError('');
    setStep('otp');
    setOtp('888888'); // Pre-fill test OTP for seamless instant demonstration
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '888888' && otp.length < 4) {
      setError('Mã OTP không chính xác. Hãy nhập mã 888888.');
      return;
    }
    setError('');
    const updatedUser: UserProfile = {
      ...currentUser,
      phone,
      name: name.trim() || 'Người dùng MediScan',
    };
    onSaveUser(updatedUser);
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('phone');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Đăng Nhập / Đăng Ký</h2>
              <p className="text-xs text-slate-400">Đồng bộ dữ liệu thuốc & Cây Sức Khỏe gia đình</p>
            </div>
          </div>

          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Họ và tên của bạn
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Số điện thoại di động
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm">
                    🇻🇳 +84
                  </div>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-20 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {error && <div className="text-xs text-rose-400">{error}</div>}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>Nhận mã xác thực OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline"
                >
                  Tiếp tục trải nghiệm mà không cần đăng nhập
                </button>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="p-3 bg-blue-950/40 border border-blue-500/20 rounded-xl text-xs text-blue-300">
                Mã xác thực thử nghiệm đã được tự động điền: <strong className="font-mono text-white">888888</strong>.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Nhập mã OTP (6 chữ số)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder="888888"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {error && <div className="text-xs text-rose-400">{error}</div>}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Xác nhận & Hoàn tất</span>
              </button>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="hover:text-white"
                >
                  Thay đổi số điện thoại
                </button>
                <span>Gửi lại sau {countdown}s</span>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Đăng nhập thành công!</h3>
              <p className="text-xs text-slate-400">Đang chuẩn bị hồ sơ y tế cho bạn...</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Thông tin cá nhân & lịch sử tra cứu của bạn được mã hóa an toàn trên thiết bị.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

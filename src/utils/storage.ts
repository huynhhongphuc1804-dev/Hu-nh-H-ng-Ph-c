import { FamilyMember, MedicationSchedule, UserProfile } from '../types';

const STORAGE_KEYS = {
  USER: 'mediscan_user_profile',
  SCHEDULES: 'mediscan_schedules',
  HISTORY: 'mediscan_search_history',
  FAMILY: 'mediscan_family_members',
  SPLASH_SEEN: 'mediscan_splash_seen',
};

export const defaultUser: UserProfile = {
  id: 'usr_default',
  name: 'Nguyễn Văn An',
  phone: '0912345678',
  age: 38,
  gender: 'male',
  allergies: ['Dị ứng Penicillin nhẹ'],
  medicalConditions: ['Viêm dạ dày nhẹ', 'Tiền sử huyết áp cao gia đình'],
  familyCode: 'MED-8892-VN',
  fontSize: 'normal',
  voiceSpeed: 1.0,
  soundEnabled: true,
  offlineMode: false,
};

export const defaultFamily: FamilyMember[] = [
  {
    id: 'fam_1',
    name: 'Bà Nguyễn Thị Mai (Mẹ)',
    relation: 'Mẹ',
    age: 68,
    avatar: '👵',
    phone: '0988123456',
    syncCode: 'MED-8892-VN',
    isLinked: true,
    activeMedicationsCount: 2,
    adherenceRate: 92,
    metrics: [
      { date: 'Hôm nay 07:00', systolicBP: 125, diastolicBP: 80, heartRate: 72, bloodSugar: 5.6, status: 'normal' },
      { date: 'Hôm qua 18:00', systolicBP: 142, diastolicBP: 88, heartRate: 78, bloodSugar: 6.2, status: 'warning' },
      { date: 'Hôm qua 07:00', systolicBP: 128, diastolicBP: 82, heartRate: 74, status: 'normal' },
    ],
    lastAlert: {
      type: 'critical_bp',
      message: 'Huyết áp đo lúc chiều tối hôm qua hơi cao (142/88 mmHg). Đã nhắc uống Amlodipine.',
      timestamp: 'Hôm qua 18:15',
      resolved: true,
    }
  },
  {
    id: 'fam_2',
    name: 'Ông Nguyễn Văn Bình (Bố)',
    relation: 'Bố',
    age: 72,
    avatar: '👴',
    phone: '0977234567',
    syncCode: 'MED-8892-VN',
    isLinked: true,
    activeMedicationsCount: 3,
    adherenceRate: 85,
    metrics: [
      { date: 'Hôm nay 06:30', systolicBP: 130, diastolicBP: 84, heartRate: 68, bloodSugar: 6.8, status: 'normal' },
      { date: '28/09 07:00', systolicBP: 132, diastolicBP: 85, heartRate: 70, bloodSugar: 7.1, status: 'normal' },
    ],
  },
  {
    id: 'fam_3',
    name: 'Bé Nguyễn Minh Khang (Con)',
    relation: 'Con',
    age: 8,
    avatar: '👦',
    phone: '0912345678',
    syncCode: 'MED-8892-VN',
    isLinked: true,
    activeMedicationsCount: 0,
    adherenceRate: 100,
    metrics: [],
  }
];

export const defaultSchedules: MedicationSchedule[] = [
  {
    id: 'sch_1',
    medicineId: 'panadol-extra',
    medicineName: 'Panadol Extra 500mg',
    dosage: '1 viên',
    mealTiming: 'after',
    times: ['08:00', '13:00', '20:00'],
    startDate: new Date().toISOString().split('T')[0],
    durationDays: 3,
    notes: 'Uống sau khi ăn no. Nhớ uống nhiều nước.',
    takenLogs: {
      [`${new Date().toISOString().split('T')[0]}-08:00`]: true,
    }
  },
  {
    id: 'sch_2',
    medicineId: 'nexium-20',
    medicineName: 'Nexium 20mg (Dạ dày)',
    dosage: '1 viên',
    mealTiming: 'before',
    times: ['06:30'],
    startDate: new Date().toISOString().split('T')[0],
    durationDays: 14,
    notes: 'Uống trước bữa ăn sáng 30 phút. Nuốt nguyên viên.',
    takenLogs: {}
  }
];

export const getStoredUser = (): UserProfile => {
  if (typeof window === 'undefined') return defaultUser;
  const raw = localStorage.getItem(STORAGE_KEYS.USER);
  if (!raw) return defaultUser;
  try {
    return { ...defaultUser, ...JSON.parse(raw) };
  } catch {
    return defaultUser;
  }
};

export const saveStoredUser = (user: UserProfile) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getStoredSchedules = (): MedicationSchedule[] => {
  if (typeof window === 'undefined') return defaultSchedules;
  const raw = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
  if (!raw) return defaultSchedules;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultSchedules;
  }
};

export const saveStoredSchedules = (schedules: MedicationSchedule[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
};

export const getStoredFamily = (): FamilyMember[] => {
  if (typeof window === 'undefined') return defaultFamily;
  const raw = localStorage.getItem(STORAGE_KEYS.FAMILY);
  if (!raw) return defaultFamily;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultFamily;
  }
};

export const saveStoredFamily = (family: FamilyMember[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(family));
};

export const getStoredHistory = (): string[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
  if (!raw) return ['Panadol Extra', 'Augmentin 625mg', 'Berberin', 'Nexium 20mg'];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const addSearchHistory = (term: string) => {
  if (typeof window === 'undefined' || !term.trim()) return;
  const current = getStoredHistory().filter(h => h.toLowerCase() !== term.toLowerCase());
  const updated = [term.trim(), ...current].slice(0, 15);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
};

export const clearSearchHistory = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
};

export const exportMedicalData = (schedules: MedicationSchedule[], family: FamilyMember[], user: UserProfile) => {
  const content = `=========================================
BÁO CÁO Y TẾ & ĐƠN THUỐC ĐIỆN TỬ - MEDISCAN
Ngày xuất: ${new Date().toLocaleString('vi-VN')}
=========================================

1. THÔNG TIN NGƯỜI DÙNG:
- Họ và tên: ${user.name}
- Số điện thoại: ${user.phone}
- Tuổi: ${user.age} tuổi
- Tiền sử dị ứng: ${user.allergies.join(', ') || 'Không ghi nhận'}
- Bệnh nền: ${user.medicalConditions.join(', ') || 'Không ghi nhận'}
- Mã Cây Sức Khỏe gia đình: ${user.familyCode}

2. LỊCH UỐNG THUỐC "THỜI GIAN VÀNG":
${schedules.map((s, idx) => `
#${idx + 1}. ${s.medicineName}
   - Liều dùng: ${s.dosage} (${s.mealTiming === 'before' ? 'Trước ăn' : s.mealTiming === 'after' ? 'Sau ăn' : 'Tùy ý'})
   - Giờ uống hàng ngày: ${s.times.join(', ')}
   - Ghi chú: ${s.notes || 'Không'}
`).join('')}

3. THÀNH VIÊN CÂY SỨC KHỎE LIÊN KẾT:
${family.map((f, idx) => `
- ${f.name} (${f.relation}, ${f.age} tuổi) - Tuân thủ: ${f.adherenceRate}%
  Huyết áp gần nhất: ${f.metrics[0]?.systolicBP || '--'}/${f.metrics[0]?.diastolicBP || '--'} mmHg, Nhịp tim: ${f.metrics[0]?.heartRate || '--'} bpm
`).join('')}

=========================================
Bản quyền ứng dụng Tra Cứu Thuốc MediScan.
*Lưu ý: Luôn tham khảo ý kiến bác sĩ hoặc dược sĩ trước khi thay đổi liều lượng thuốc.*
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MediScan_Bao_Cao_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

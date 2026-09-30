export interface Medicine {
  id: string;
  name: string;
  genericName: string; // Tên hoạt chất
  brandName: string;
  barcode: string; // Mã vạch EAN-13/UPC
  registrationNumber: string; // Số đăng ký BYT
  category: string; // Nhóm tác dụng
  dosageForm: string; // Dạng bào chế: Viên nén, Dung dịch, Siro...
  strength: string; // Hàm lượng
  manufacturer: string;
  country: string;
  imageUrl: string;
  
  indications: string[]; // Tác dụng / Chỉ định
  dosage: {
    adults: string;
    children: string;
    specialNotes?: string;
  };
  contraindications: string[]; // Chống chỉ định
  sideEffects: string[]; // Tác dụng phụ
  interactions: string[]; // Tương tác với thuốc/thực phẩm
  warnings: string[]; // Cảnh báo thận trọng
  storage: string; // Hướng dẫn bảo quản
  summaryVoice: string; // Đoạn tóm tắt súc tích đọc bằng giọng nói
  requiresPrescription: boolean; // Thuốc kê đơn hay không kê đơn (ETC vs OTC)
}

export interface MedicationSchedule {
  id: string;
  medicineId: string;
  medicineName: string;
  dosage: string;
  mealTiming: 'before' | 'after' | 'with' | 'any'; // Trước ăn, sau ăn, trong khi ăn
  times: string[]; // ['08:00', '13:00', '19:00']
  startDate: string;
  durationDays: number;
  notes?: string;
  takenLogs: Record<string, boolean>; // '2026-09-30-08:00': true
}

export interface HealthMetric {
  date: string;
  systolicBP: number; // Huyết áp tâm thu (mmHg)
  diastolicBP: number; // Huyết áp tâm trương (mmHg)
  heartRate: number; // Nhịp tim (bpm)
  bloodSugar?: number; // Đường huyết (mmol/L)
  status: 'normal' | 'warning' | 'danger';
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string; // 'Bố', 'Mẹ', 'Bà nội', 'Con gái'...
  age: number;
  avatar: string;
  phone: string;
  syncCode: string; // Mã liên kết Cây Sức Khỏe
  isLinked: boolean;
  metrics: HealthMetric[];
  activeMedicationsCount: number;
  adherenceRate: number; // Tỷ lệ uống đúng giờ (%)
  lastAlert?: {
    type: 'critical_bp' | 'missed_dose' | 'high_sugar';
    message: string;
    timestamp: string;
    resolved: boolean;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  allergies: string[];
  medicalConditions: string[];
  familyCode: string;
  fontSize: 'normal' | 'large' | 'extra-large';
  voiceSpeed: number; // 0.8, 1.0, 1.2
  soundEnabled: boolean;
  offlineMode: boolean;
}

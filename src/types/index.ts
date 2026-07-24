export type WasteCategory = 'plastic' | 'paper' | 'residue';

export type UserRole = 'student' | 'school_staff' | 'admin' | 'fmcg';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  schoolId?: string;
  schoolName?: string;
  avatarUrl?: string;
  joinedAt: string;
}

export interface Student extends User {
  role: 'student';
  points: number;
  rank: number;
  streak: number;
  totalEntries: number;
  totalWeightKg: number;
  co2eKg: number;
}

export interface WasteEntry {
  id: string;
  studentId: string;
  ecoStationId: string;
  ecoStationName: string;
  category: WasteCategory;
  photoUrl?: string;
  notes?: string;
  pointsEarned: number;
  createdAt: string;
}

export interface EcoStation {
  id: string;
  name: string;
  location: string;
  schoolId: string;
  qrCode: string;
  totalScans: number;
  lastUsedAt?: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  costPoints: number;
  stock: number;
  category: 'canteen' | 'voucher' | 'school' | 'other';
  schoolId: string;
  active?: boolean;
}

export interface Redemption {
  id: string;
  studentId: string;
  studentName: string;
  rewardId: string;
  rewardName: string;
  pointsSpent: number;
  smsCode?: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
  createdAt: string;
  fulfilledAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  points: number;
  streak: number;
  isCurrentUser: boolean;
}

export interface ActivityEntry {
  id: string;
  category: WasteCategory;
  pointsEarned: number;
  createdAt: string;
  ecoStationName: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export const CATEGORY_CONFIG: Record<
  WasteCategory,
  { label: string; emoji: string; color: string; basePoints: number }
> = {
  plastic: { label: 'Plastic', emoji: '🔵', color: 'var(--color-plastic)', basePoints: 50 },
  paper: { label: 'Paper', emoji: '📄', color: 'var(--color-paper)', basePoints: 40 },
  residue: { label: 'Residue', emoji: '⚫', color: 'var(--color-residue)', basePoints: 10 },
};

export const PHOTO_BONUS_POINTS = 20;

export type SystemStatusLevel = 'healthy' | 'warning' | 'error';

export interface SystemStatus {
  id: string;
  service: string;
  status: SystemStatusLevel;
  primaryMetric: string;
  detail: string;
}

export interface KeyMetric {
  label: string;
  value: string | number;
  icon: string;
  trend?: number;
}

export interface School {
  id: string;
  name: string;
  city: string;
  principalName: string;
  phone: string;
  studentCount: number;
  ecoStationCount: number;
  activeStudents30d: number;
  revenueSharePercent: number;
  totalRevenueMillion: number;
  status: 'active' | 'paused' | 'archived';
  joinedAt: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  status: 'success' | 'warning' | 'error';
}

export interface ActivityDataPoint {
  date: string;
  entries: number;
}

export interface BrandPackagingItem {
  type: string;
  count: number;
  weightKg: number;
  sharePercent: number;
}

export interface BrandAudit {
  brand: string;
  parentCompany: string;
  packaging: BrandPackagingItem[];
  totalUnits: number;
  totalWeightKg: number;
  marketSharePercent: number;
}

export interface CompetitorShare {
  name: string;
  sharePercent: number;
}

export interface FMCGCompany {
  id: string;
  name: string;
  email: string;
  tier: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'pending';
  contractStart: string;
  contractEnd: string;
  apiRequestsMonth: number;
  reportsGenerated: number;
  rateLimitPercent: number;
  plan: string;
  costPerMonth: number;
  billingCycle: 'monthly' | 'annual';
  nextChargeDate: string;
  paymentMethod: string;
}

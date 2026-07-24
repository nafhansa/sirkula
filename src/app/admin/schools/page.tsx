'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/admin/Breadcrumb';
import { SchoolsTable } from '@/components/admin/SchoolsTable';
import { OnboardSchoolWizard } from '@/components/admin/OnboardSchoolWizard';
import { Toast } from '@/components/common/Toast';
import { type School } from '@/types/admin';

const MOCK_SCHOOLS: School[] = [
  {
    id: '1',
    name: 'SMAN 15 Bandung',
    city: 'Bandung',
    principalName: 'Budi Santoso',
    phone: '082211223344',
    studentCount: 1200,
    ecoStationCount: 8,
    activeStudents30d: 780,
    revenueSharePercent: 70,
    totalRevenueMillion: 8.4,
    status: 'active',
    joinedAt: '2025-08-01',
  },
  {
    id: '2',
    name: 'SMPN 3 Jakarta',
    city: 'Jakarta',
    principalName: 'Siti Rahayu',
    phone: '081234567890',
    studentCount: 900,
    ecoStationCount: 5,
    activeStudents30d: 430,
    revenueSharePercent: 65,
    totalRevenueMillion: 5.2,
    status: 'active',
    joinedAt: '2025-09-15',
  },
  {
    id: '3',
    name: 'SMAN 5 Surabaya',
    city: 'Surabaya',
    principalName: 'Ahmad Fauzi',
    phone: '085678901234',
    studentCount: 1400,
    ecoStationCount: 10,
    activeStudents30d: 1020,
    revenueSharePercent: 72,
    totalRevenueMillion: 11.8,
    status: 'active',
    joinedAt: '2025-07-20',
  },
  {
    id: '4',
    name: 'MAN 1 Yogyakarta',
    city: 'Yogyakarta',
    principalName: 'Dewi Kusuma',
    phone: '087788990011',
    studentCount: 650,
    ecoStationCount: 4,
    activeStudents30d: 210,
    revenueSharePercent: 68,
    totalRevenueMillion: 2.8,
    status: 'paused',
    joinedAt: '2025-10-01',
  },
  {
    id: '5',
    name: 'SMAN 22 Bandung',
    city: 'Bandung',
    principalName: 'Hendra Wijaya',
    phone: '081122334455',
    studentCount: 980,
    ecoStationCount: 6,
    activeStudents30d: 670,
    revenueSharePercent: 70,
    totalRevenueMillion: 7.1,
    status: 'active',
    joinedAt: '2026-01-15',
  },
  {
    id: '6',
    name: 'SMPN 8 Medan',
    city: 'Medan',
    principalName: 'Ratna Sari',
    phone: '082233445566',
    studentCount: 720,
    ecoStationCount: 5,
    activeStudents30d: 380,
    revenueSharePercent: 67,
    totalRevenueMillion: 3.9,
    status: 'active',
    joinedAt: '2025-11-01',
  },
  {
    id: '7',
    name: 'SMAN 1 Malang',
    city: 'Malang',
    principalName: 'Eko Prasetyo',
    phone: '089900112233',
    studentCount: 1100,
    ecoStationCount: 7,
    activeStudents30d: 820,
    revenueSharePercent: 71,
    totalRevenueMillion: 9.3,
    status: 'active',
    joinedAt: '2025-08-20',
  },
  {
    id: '8',
    name: 'SMK Negeri 2 Makassar',
    city: 'Makassar',
    principalName: 'Nur Hidayat',
    phone: '085566778899',
    studentCount: 850,
    ecoStationCount: 6,
    activeStudents30d: 0,
    revenueSharePercent: 65,
    totalRevenueMillion: 0,
    status: 'archived',
    joinedAt: '2025-06-01',
  },
];

export default function SchoolsManagementPage() {
  const [schools, setSchools] = useState<School[]>(MOCK_SCHOOLS);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleDelete = (id: string) => {
    setSchools((prev) => prev.filter((s) => s.id !== id));
    setToast({ visible: true, message: '🗑️ Sekolah berhasil dihapus' });
  };

  const handleOnboard = () => {
    setWizardOpen(false);
    setToast({ visible: true, message: '✅ Sekolah berhasil di-onboard!' });
  };

  return (
    <>
      <Toast
        message={toast.message}
        type="success"
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {wizardOpen && (
        <OnboardSchoolWizard onClose={() => setWizardOpen(false)} onSubmit={handleOnboard} />
      )}

      <Breadcrumb items={[{ label: 'Dashboard', href: '/admin' }, { label: 'Schools' }]} />

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">Manajemen Sekolah</h1>
          <p className="text-sm text-[var(--color-neutral-500)] mt-1">
            {schools.length} sekolah terdaftar
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-[var(--color-neutral-300)] text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-50)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
            Filters
          </button>
          <button
            onClick={() => setWizardOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-semibold text-white transition-colors"
            style={{ background: 'var(--color-primary)' }}
          >
            <span aria-hidden="true">+</span>
            Tambah Sekolah
          </button>
        </div>
      </div>

      <SchoolsTable schools={schools} onDelete={handleDelete} />
    </>
  );
}

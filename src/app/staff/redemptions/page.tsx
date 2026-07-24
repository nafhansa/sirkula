'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/admin/Breadcrumb';
import { RedemptionCard } from '@/components/staff/RedemptionCard';
import { Toast } from '@/components/common/Toast';
import { type Redemption } from '@/types';

const MOCK_REDEMPTIONS: Redemption[] = [
  {
    id: '1',
    studentId: 'STU-0231',
    studentName: 'Sekar Ayu',
    rewardId: '1',
    rewardName: 'Voucher Kantin Rp 20k',
    pointsSpent: 100,
    smsCode: 'ABC231',
    status: 'pending',
    createdAt: '2026-07-01T08:12:00',
  },
  {
    id: '2',
    studentId: 'STU-0198',
    studentName: 'Rizky Pratama',
    rewardId: '3',
    rewardName: 'Parking Pass (1 minggu)',
    pointsSpent: 250,
    smsCode: 'PRK198',
    status: 'pending',
    createdAt: '2026-07-01T07:45:00',
  },
  {
    id: '3',
    studentId: 'STU-0342',
    studentName: 'Dita Fitriana',
    rewardId: '2',
    rewardName: 'Free Pastry (Kantin)',
    pointsSpent: 80,
    smsCode: 'PST342',
    status: 'pending',
    createdAt: '2026-06-30T14:22:00',
  },
  {
    id: '4',
    studentId: 'STU-0110',
    studentName: 'Budi Santoso Jr.',
    rewardId: '4',
    rewardName: 'Library Credit Rp 50k',
    pointsSpent: 150,
    smsCode: 'LIB110',
    status: 'pending',
    createdAt: '2026-06-30T11:05:00',
  },
  {
    id: '5',
    studentId: 'STU-0287',
    studentName: 'Nadia Putri',
    rewardId: '1',
    rewardName: 'Voucher Kantin Rp 20k',
    pointsSpent: 100,
    smsCode: 'ABC287',
    status: 'pending',
    createdAt: '2026-06-29T16:38:00',
  },
];

const COMPLETED_LAST_7_DAYS = 23;

export default function RedemptionsQueuePage() {
  const [redemptions, setRedemptions] = useState<Redemption[]>(MOCK_REDEMPTIONS);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const pending = redemptions.filter((r) => r.status === 'pending');

  const handleComplete = async (id: string) => {
    setCompletingId(id);
    await new Promise((r) => setTimeout(r, 700));
    setRedemptions((prev) => prev.filter((r) => r.id !== id));
    setCompletingId(null);
    setToast({
      visible: true,
      message: '✅ Redemption ditandai selesai, notifikasi terkirim ke siswa',
    });
  };

  return (
    <>
      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <Breadcrumb items={[{ label: 'Dashboard', href: '/staff' }, { label: 'Redemptions' }]} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">
          Pending Redemptions: {pending.length}
        </h1>
        <p className="text-sm text-[var(--color-neutral-500)]">
          Completed (Last 7 Days):{' '}
          <span className="font-semibold text-[var(--color-neutral-800)]">
            {COMPLETED_LAST_7_DAYS}
          </span>{' '}
          <button className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>
            View All
          </button>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {pending.length === 0 ? (
          <div
            className="bg-white rounded-xl p-12 text-center"
            style={{
              boxShadow: 'var(--shadow-admin-sm)',
              border: '1px solid var(--color-neutral-200)',
            }}
          >
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-semibold text-[var(--color-neutral-700)]">
              Semua redemption sudah diproses!
            </p>
          </div>
        ) : (
          pending.map((r) => (
            <RedemptionCard
              key={r.id}
              redemption={r}
              onComplete={handleComplete}
              completing={completingId === r.id}
            />
          ))
        )}
      </div>
    </>
  );
}

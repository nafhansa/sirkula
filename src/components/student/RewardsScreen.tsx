'use client';

import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { Toast } from '@/components/common/Toast';
import { type Reward } from '@/types';
import { useRewards } from '@/hooks/useRewards';

type FilterCategory = 'all' | 'canteen' | 'voucher' | 'school';

const FILTER_OPTIONS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'canteen', label: 'Kantin' },
  { id: 'voucher', label: 'Voucher' },
  { id: 'school', label: 'Sekolah' },
];

const MOCK_REWARDS: Reward[] = [
  {
    id: '1',
    name: 'Voucher Kantin Rp 20k',
    description: 'Bisa dipakai di kantin sekolah',
    icon: '🍕',
    costPoints: 100,
    stock: 45,
    category: 'canteen',
    schoolId: '1',
  },
  {
    id: '2',
    name: 'Free Pastry (Kantin)',
    description: '',
    icon: '🧁',
    costPoints: 80,
    stock: 15,
    category: 'canteen',
    schoolId: '1',
  },
  {
    id: '3',
    name: 'Parking Pass (1 minggu)',
    description: '',
    icon: '🎫',
    costPoints: 250,
    stock: 0,
    category: 'school',
    schoolId: '1',
  },
  {
    id: '4',
    name: 'Library Credit Rp 50k',
    description: '',
    icon: '📚',
    costPoints: 150,
    stock: 3,
    category: 'school',
    schoolId: '1',
  },
];

const STUDENT_ID = '1';
const STUDENT_NAME = 'Jeremy Christiano';
const STUDENT_POINTS = 2450;

export function RewardsScreen() {
  const { rewards, isRedeeming, redeem } = useRewards(MOCK_REWARDS);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [points, setPoints] = useState(STUDENT_POINTS);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const filtered = filter === 'all' ? rewards : rewards.filter((r) => r.category === filter);

  const handleRedeem = async () => {
    if (!selectedReward) return;
    const redemption = await redeem(selectedReward, STUDENT_ID, STUDENT_NAME);
    setPoints((p) => p - selectedReward.costPoints);
    setToast({ visible: true, message: `✅ Kode voucher ${redemption.smsCode} dikirim ke SMS!` });
    setSelectedReward(null);
  };

  return (
    <>
      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
        duration={5000}
      />

      {selectedReward && (
        <Modal
          visible
          title="Konfirmasi Penukaran"
          onClose={() => setSelectedReward(null)}
          confirmLabel={`Tukar (${selectedReward.costPoints} pts)`}
          onConfirm={handleRedeem}
          confirmLoading={isRedeeming}
        >
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <span className="text-5xl" aria-hidden="true">
              {selectedReward.icon}
            </span>
            <p className="text-base font-semibold text-[var(--color-neutral-900)] m-0">
              {selectedReward.name}
            </p>
            <p className="text-sm text-[var(--color-neutral-500)] m-0">
              Kamu akan menggunakan <strong>{selectedReward.costPoints} poin</strong>
            </p>
            <p className="text-sm text-[var(--color-neutral-500)] m-0">
              Sisa poin: <strong>{points - selectedReward.costPoints}</strong>
            </p>
          </div>
        </Modal>
      )}

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Balance */}
        <div
          className="p-4 rounded-[var(--border-radius-xl)] text-white"
          style={{
            background:
              'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
          }}
        >
          <p className="text-xs text-white opacity-80 m-0">SALDO POIN</p>
          <p
            className="text-3xl font-bold text-white m-0"
            aria-label={`${points.toLocaleString('id-ID')} poin`}
          >
            💰 {points.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Filter chips */}
        <div
          className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
          role="group"
          aria-label="Filter reward"
        >
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              aria-pressed={filter === opt.id}
              className={[
                'shrink-0 px-4 py-2 rounded-[var(--border-radius-full)] text-sm font-semibold',
                'border-2 transition-all duration-150',
                filter === opt.id
                  ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                  : 'bg-white border-[var(--color-neutral-300)] text-[var(--color-neutral-700)]',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Rewards list */}
        <div className="flex flex-col gap-3">
          {filtered.map((reward) => {
            const canAfford = points >= reward.costPoints;
            const available = reward.stock > 0 && canAfford;

            return (
              <div
                key={reward.id}
                className="bg-white rounded-[var(--border-radius-lg)] p-4"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {reward.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-[var(--color-neutral-900)] m-0 truncate">
                      {reward.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-[var(--color-primary)]">
                        {reward.costPoints} pts
                      </span>
                      <span className="text-neutral-300">•</span>
                      <span
                        className={`text-xs ${reward.stock === 0 ? 'text-[var(--color-danger)]' : 'text-[var(--color-neutral-500)]'}`}
                      >
                        {reward.stock === 0 ? 'Habis' : `Stok: ${reward.stock}`}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => available && setSelectedReward(reward)}
                  disabled={!available}
                  className={[
                    'mt-3 w-full py-2.5 rounded-[var(--border-radius-md)] text-sm font-semibold',
                    'transition-all duration-150',
                    available
                      ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] active:scale-95'
                      : 'bg-[var(--color-neutral-200)] text-[var(--color-neutral-500)] cursor-not-allowed',
                  ].join(' ')}
                  aria-label={
                    available
                      ? `Tukar ${reward.name}`
                      : reward.stock === 0
                        ? 'Stok habis'
                        : 'Poin tidak cukup'
                  }
                >
                  {reward.stock === 0 ? 'Stok Habis' : !canAfford ? 'Poin Kurang' : 'Tukar'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

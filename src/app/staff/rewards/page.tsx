'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/common/Button';
import { Toast } from '@/components/common/Toast';
import { RewardFormModal, type RewardFormValues } from '@/components/staff/RewardFormModal';
import { type Reward } from '@/types';

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
    active: true,
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
    active: true,
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
    active: true,
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
    active: false,
  },
];

export default function ManageRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>(MOCK_REWARDS);
  const [editing, setEditing] = useState<Reward | null | undefined>(undefined);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleSubmit = (values: RewardFormValues) => {
    const description = values.description ?? '';
    if (editing) {
      setRewards((prev) =>
        prev.map((r) => (r.id === editing.id ? { ...r, ...values, description } : r)),
      );
      setToast({ visible: true, message: '✅ Reward berhasil diperbarui' });
    } else {
      const newReward: Reward = {
        ...values,
        description,
        id: crypto.randomUUID(),
        schoolId: '1',
        active: true,
      };
      setRewards((prev) => [newReward, ...prev]);
      setToast({ visible: true, message: '✅ Reward baru ditambahkan' });
    }
    setEditing(undefined);
  };

  const handleDelete = (id: string) => {
    setRewards((prev) => prev.filter((r) => r.id !== id));
    setToast({ visible: true, message: '🗑️ Reward dihapus' });
  };

  const handleToggleActive = (id: string) => {
    setRewards((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  return (
    <>
      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {editing !== undefined && (
        <RewardFormModal
          reward={editing}
          onClose={() => setEditing(undefined)}
          onSubmit={handleSubmit}
        />
      )}

      <PageHeader
        title="Manage Rewards"
        subtitle={`${rewards.length} reward terdaftar`}
        breadcrumb={[{ label: 'Dashboard', href: '/staff' }, { label: 'Manage Rewards' }]}
        actions={<Button label="+ Tambah Reward" onClick={() => setEditing(null)} />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-xl p-4 flex flex-col gap-3"
            style={{
              boxShadow: 'var(--shadow-admin-sm)',
              border: '1px solid var(--color-neutral-200)',
              opacity: reward.active === false ? 0.6 : 1,
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden="true">
                {reward.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[var(--color-neutral-900)] truncate">
                  {reward.name}
                </p>
                <p className="text-sm text-[var(--color-primary)] font-bold mt-0.5">
                  {reward.costPoints} pts
                </p>
                <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">
                  {reward.stock === 0 ? 'Stok habis' : `Stok: ${reward.stock}`}
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-[var(--color-neutral-600)] select-none">
              <input
                type="checkbox"
                checked={reward.active !== false}
                onChange={() => handleToggleActive(reward.id)}
                className="rounded"
              />
              {reward.active === false ? 'Nonaktif' : 'Aktif'}
            </label>

            <div className="flex gap-2 mt-auto">
              <Button
                label="Edit"
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => setEditing(reward)}
              />
              <Button
                label="Hapus"
                variant="danger"
                size="sm"
                fullWidth
                onClick={() => handleDelete(reward.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Modal } from '@/components/common/Modal';
import { Input, TextArea } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { FormGroup } from '@/components/admin/FormSection';
import { type Reward } from '@/types';

const schema = z.object({
  name: z.string().min(1, 'Nama reward wajib diisi'),
  icon: z.string().min(1, 'Icon wajib diisi').max(4),
  description: z.string().max(200).optional(),
  costPoints: z.number().int().min(1, 'Minimal 1 poin'),
  stock: z.number().int().min(0, 'Stok tidak boleh negatif'),
  category: z.enum(['canteen', 'voucher', 'school', 'other']),
});

export type RewardFormValues = z.infer<typeof schema>;

interface RewardFormModalProps {
  reward: Reward | null;
  onClose: () => void;
  onSubmit: (values: RewardFormValues) => void;
}

export function RewardFormModal({ reward, onClose, onSubmit }: RewardFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RewardFormValues>({
    resolver: zodResolver(schema),
    defaultValues: reward
      ? {
          name: reward.name,
          icon: reward.icon,
          description: reward.description,
          costPoints: reward.costPoints,
          stock: reward.stock,
          category: reward.category,
        }
      : { name: '', icon: '🎁', description: '', costPoints: 100, stock: 10, category: 'canteen' },
  });

  return (
    <Modal
      visible
      title={reward ? 'Edit Reward' : 'Tambah Reward'}
      onClose={onClose}
      confirmLabel={reward ? 'Simpan' : 'Tambah'}
      confirmLoading={isSubmitting}
      onConfirm={handleSubmit(onSubmit)}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nama Reward"
          required
          {...register('name')}
          error={errors.name?.message ?? ''}
        />
        <Input
          label="Icon (emoji)"
          required
          {...register('icon')}
          error={errors.icon?.message ?? ''}
        />
        <TextArea
          label="Deskripsi"
          {...register('description')}
          error={errors.description?.message ?? ''}
          rows={2}
        />
        <FormGroup columns={2}>
          <Input
            label="Biaya Poin"
            type="number"
            required
            {...register('costPoints', { valueAsNumber: true })}
            error={errors.costPoints?.message ?? ''}
          />
          <Input
            label="Stok"
            type="number"
            required
            {...register('stock', { valueAsNumber: true })}
            error={errors.stock?.message ?? ''}
          />
        </FormGroup>
        <Select
          label="Kategori"
          {...register('category')}
          options={[
            { label: 'Kantin', value: 'canteen' },
            { label: 'Voucher', value: 'voucher' },
            { label: 'Sekolah', value: 'school' },
            { label: 'Lainnya', value: 'other' },
          ]}
        />
      </form>
    </Modal>
  );
}

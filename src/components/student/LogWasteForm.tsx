'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import NextImage from 'next/image';
import { Button } from '@/components/common/Button';
import { Input, TextArea } from '@/components/common/Input';
import { Toast } from '@/components/common/Toast';
import { type WasteCategory, CATEGORY_CONFIG, PHOTO_BONUS_POINTS } from '@/types';
import { queueWasteLog } from '@/lib/sync';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

const schema = z.object({
  eco_station_id: z.string().min(1, 'Station required'),
  product_name: z.string().min(1, 'Nama produk wajib diisi').max(120),
  category: z.enum(['plastic', 'paper', 'residue'], { message: 'Pilih jenis sampah' }),
  notes: z.string().max(200).optional(),
});

type FormValues = z.infer<typeof schema>;

const CATEGORIES: { id: WasteCategory; label: string }[] = [
  { id: 'plastic', label: '🔵 Plastic — Botol & Kemasan' },
  { id: 'paper', label: '📄 Paper — Kertas & Karton' },
  { id: 'residue', label: '⚫ Residue — Campuran' },
];

export function LogWasteForm() {
  const router = useRouter();
  const params = useSearchParams();
  const stationId = params.get('stationId') ?? '';
  const stationName = params.get('stationName') ?? stationId;

  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'warning';
  }>({
    visible: false,
    message: '',
    type: 'success',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { eco_station_id: stationId, notes: '' },
  });

  const selectedCategory = watch('category');
  const basePoints = selectedCategory ? CATEGORY_CONFIG[selectedCategory].basePoints : 0;
  const photoBonus = photoFile ? PHOTO_BONUS_POINTS : 0;
  const totalPoints = basePoints + photoBonus;

  const onPhotoSelected = (file: File | null) => {
    setPhotoFile(file);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const onSubmit = async (data: FormValues) => {
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

    if (isOffline) {
      await queueWasteLog({
        studentId: 'current-user',
        data: {
          eco_station_id: data.eco_station_id,
          product_name: data.product_name,
          category: data.category,
          notes: data.notes ?? undefined,
        },
      });
      setToast({
        visible: true,
        message: '📵 Disimpan offline — akan sync otomatis saat online',
        type: 'warning' as const,
      });
      setTimeout(() => router.push('/student'), 1800);
      return;
    }

    try {
      let photoUrl: string | undefined;
      if (photoFile && isCloudinaryConfigured()) {
        setIsUploadingPhoto(true);
        photoUrl = await uploadToCloudinary(photoFile);
        setIsUploadingPhoto(false);
      }

      const res = await fetch('/api/waste-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: data.product_name,
          category: data.category,
          ecoStationId: data.eco_station_id,
          photoUrl,
          notes: data.notes || undefined,
        }),
      });

      if (!res.ok) throw new Error('submit failed');

      setToast({
        visible: true,
        message: '✅ Terkirim! Menunggu approval admin untuk poinmu.',
        type: 'success',
      });
      setTimeout(() => router.push('/student'), 1800);
    } catch {
      setIsUploadingPhoto(false);
      await queueWasteLog({
        studentId: 'current-user',
        data: {
          eco_station_id: data.eco_station_id,
          product_name: data.product_name,
          category: data.category,
          notes: data.notes ?? undefined,
        },
      });
      setToast({
        visible: true,
        message: '⚠️ Gagal terkirim, tersimpan untuk sync nanti',
        type: 'warning' as const,
      });
      setTimeout(() => router.push('/student'), 1800);
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onDismiss={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-4 flex flex-col gap-5">
        {/* Station */}
        <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-lighter)] rounded-[var(--border-radius-md)]">
          <span className="text-xl" aria-hidden="true">
            ✅
          </span>
          <div>
            <p className="text-xs text-[var(--color-neutral-500)] m-0">Eco-Station Terdeteksi</p>
            <p className="text-sm font-semibold text-[var(--color-primary-dark)] m-0">
              {stationName}
            </p>
          </div>
        </div>

        {/* Product name */}
        <Input
          label="Nama Produk"
          required
          placeholder="Contoh: Botol Aqua 600ml"
          {...register('product_name')}
          {...(errors.product_name?.message ? { error: errors.product_name.message } : {})}
        />

        {/* Category dropdown */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm font-semibold text-[var(--color-neutral-700)]"
          >
            Jenis Sampah <span className="text-[var(--color-danger)]">*</span>
          </label>
          <select
            id="category"
            {...register('category')}
            defaultValue=""
            className="w-full min-h-[48px] px-4 py-3 rounded-[var(--border-radius-md)] text-base border border-[var(--color-neutral-300)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          >
            <option value="" disabled>
              Pilih jenis sampah
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label} ({CATEGORY_CONFIG[cat.id].basePoints} pts)
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-[var(--color-danger)]">{errors.category.message}</p>
          )}
        </div>

        {/* Photo */}
        <div>
          <p className="text-sm font-semibold text-[var(--color-neutral-700)] mb-2">
            Tambah Foto{' '}
            <span className="text-xs font-normal text-[var(--color-success)]">
              (opsional, +{PHOTO_BONUS_POINTS} pts bonus!)
            </span>
          </p>
          <label
            htmlFor="photo-upload"
            className="relative flex flex-col items-center justify-center w-[120px] h-[120px] border-2 border-dashed border-[var(--color-neutral-300)] rounded-[var(--border-radius-md)] cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] transition-colors overflow-hidden"
          >
            {photoPreview ? (
              <NextImage
                src={photoPreview}
                alt="Preview"
                fill
                className="object-cover rounded-[10px]"
                unoptimized
              />
            ) : (
              <>
                <span className="text-3xl" aria-hidden="true">
                  📷
                </span>
                <span className="text-xs text-[var(--color-neutral-500)] mt-1 text-center px-2">
                  Tap untuk upload
                </span>
              </>
            )}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => onPhotoSelected(e.target.files?.[0] ?? null)}
          />
          {!isCloudinaryConfigured() && photoFile && (
            <p className="text-xs text-[var(--color-neutral-500)] mt-2">
              ⓘ Upload foto belum aktif — bonus poin tetap dihitung, entri akan dikirim tanpa foto.
            </p>
          )}
        </div>

        {/* Notes */}
        <TextArea
          label="Catatan (opsional)"
          placeholder="Tambahkan catatan..."
          rows={3}
          maxLength={200}
          showCount
          {...register('notes')}
          value={watch('notes') ?? ''}
        />

        {/* Points preview */}
        {selectedCategory && (
          <div className="p-4 bg-[var(--color-primary-lighter)] rounded-[var(--border-radius-md)] border border-[var(--color-primary-light)]">
            <p className="text-sm font-semibold text-[var(--color-neutral-700)] mb-2">
              📊 Poin yang akan kamu dapat (setelah disetujui admin):
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span>{CATEGORY_CONFIG[selectedCategory].label}</span>
                <span className="font-semibold">{basePoints} pts</span>
              </div>
              {photoBonus > 0 && (
                <div className="flex justify-between text-[var(--color-success)]">
                  <span>📷 Foto bonus</span>
                  <span className="font-semibold">+{photoBonus} pts</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[var(--color-primary-light)] pt-1 mt-1 font-bold text-[var(--color-primary-dark)]">
                <span>Total</span>
                <span>⭐ {totalPoints} pts</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            label={
              isUploadingPhoto
                ? 'Mengunggah foto...'
                : isSubmitting
                  ? 'Menyimpan...'
                  : 'Submit Waste'
            }
            variant="primary"
            fullWidth
            type="submit"
            disabled={!selectedCategory}
            loading={isSubmitting || isUploadingPhoto}
          />
          <Button
            label="Batal"
            variant="outline"
            fullWidth
            type="button"
            onClick={() => router.back()}
          />
        </div>
      </form>
    </>
  );
}

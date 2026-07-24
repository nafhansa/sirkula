'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';

const step1Schema = z.object({
  name: z.string().min(3, 'Minimal 3 karakter'),
  address: z.string().min(5, 'Minimal 5 karakter'),
  principalName: z.string().min(3, 'Minimal 3 karakter'),
  phone: z.string().min(10, 'Nomor tidak valid').max(15),
});

const step2Schema = z.object({
  studentCount: z.number().min(1).max(10000),
  ecoStationCount: z.number().min(1).max(100),
  revenueSharePercent: z.number().min(50).max(90),
  city: z.string().min(2),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;

interface OnboardSchoolWizardProps {
  onClose: () => void;
  onSubmit: (data: Step1 & Step2) => void;
}

const STEP_LABELS = ['Informasi Dasar', 'Detail Sekolah', 'Review & Konfirmasi'];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
              style={
                i < step
                  ? { background: 'var(--color-success)', color: 'white' }
                  : i === step
                    ? { background: 'var(--color-primary)', color: 'white' }
                    : { background: 'var(--color-neutral-200)', color: 'var(--color-neutral-500)' }
              }
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span
              className="text-xs font-medium hidden sm:block"
              style={{
                color: i === step ? 'var(--color-primary-dark)' : 'var(--color-neutral-500)',
              }}
            >
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div
              className="h-0.5 flex-1"
              style={{ background: i < step ? 'var(--color-success)' : 'var(--color-neutral-200)' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function OnboardSchoolWizard({ onClose, onSubmit }: OnboardSchoolWizardProps) {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1 | null>(null);
  const [step2Data, setStep2Data] = useState<Step2 | null>(null);

  const form1 = useForm<Step1>({ resolver: zodResolver(step1Schema) });
  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: { studentCount: 500, ecoStationCount: 5, revenueSharePercent: 70 },
  });

  const handleStep1 = (data: Step1) => {
    setStep1Data(data);
    setStep(1);
  };

  const handleStep2 = (data: Step2) => {
    setStep2Data(data);
    setStep(2);
  };

  const handleFinalSubmit = () => {
    if (step1Data && step2Data) {
      onSubmit({ ...step1Data, ...step2Data });
    }
  };

  const fieldCls =
    'w-full px-3 py-2 text-sm rounded-lg border border-[var(--color-neutral-300)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-lighter)]';
  const labelCls = 'block text-xs font-semibold text-[var(--color-neutral-700)] mb-1';
  const errorCls = 'text-xs text-[var(--color-danger)] mt-1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: 'var(--shadow-admin-lg)' }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-neutral-900)]">
                Onboard Sekolah Baru
              </h2>
              <p className="text-sm text-[var(--color-neutral-500)] mt-0.5">
                Langkah {step + 1} dari 3
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-neutral-100)] transition-colors text-[var(--color-neutral-500)]"
            >
              ✕
            </button>
          </div>

          <ProgressBar step={step} />

          {/* Step 1: Basic Info */}
          {step === 0 && (
            <form onSubmit={form1.handleSubmit(handleStep1)} className="flex flex-col gap-4">
              <div>
                <label htmlFor="s1-name" className={labelCls}>
                  Nama Sekolah *
                </label>
                <input
                  id="s1-name"
                  className={fieldCls}
                  placeholder="SMAN 1 Bandung"
                  {...form1.register('name')}
                />
                {form1.formState.errors.name && (
                  <p className={errorCls}>{form1.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="s1-address" className={labelCls}>
                  Alamat *
                </label>
                <input
                  id="s1-address"
                  className={fieldCls}
                  placeholder="Jl. Merdeka No. 1, Bandung"
                  {...form1.register('address')}
                />
                {form1.formState.errors.address && (
                  <p className={errorCls}>{form1.formState.errors.address.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="s1-principal" className={labelCls}>
                  Nama Kepala Sekolah *
                </label>
                <input
                  id="s1-principal"
                  className={fieldCls}
                  placeholder="Bapak/Ibu ..."
                  {...form1.register('principalName')}
                />
                {form1.formState.errors.principalName && (
                  <p className={errorCls}>{form1.formState.errors.principalName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="s1-phone" className={labelCls}>
                  Nomor Kontak *
                </label>
                <input
                  id="s1-phone"
                  type="tel"
                  className={fieldCls}
                  placeholder="0812xxxxxxxx"
                  {...form1.register('phone')}
                />
                {form1.formState.errors.phone && (
                  <p className={errorCls}>{form1.formState.errors.phone.message}</p>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ background: 'var(--color-primary)' }}
                >
                  Selanjutnya →
                </button>
              </div>
            </form>
          )}

          {/* Step 2: School Details */}
          {step === 1 && (
            <form onSubmit={form2.handleSubmit(handleStep2)} className="flex flex-col gap-4">
              <div>
                <label htmlFor="s2-city" className={labelCls}>
                  Kota *
                </label>
                <input
                  id="s2-city"
                  className={fieldCls}
                  placeholder="Bandung"
                  {...form2.register('city')}
                />
                {form2.formState.errors.city && (
                  <p className={errorCls}>{form2.formState.errors.city.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="s2-students" className={labelCls}>
                  Jumlah Siswa *
                </label>
                <input
                  id="s2-students"
                  type="number"
                  className={fieldCls}
                  {...form2.register('studentCount', { valueAsNumber: true })}
                />
                {form2.formState.errors.studentCount && (
                  <p className={errorCls}>{form2.formState.errors.studentCount.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="s2-eco" className={labelCls}>
                  Jumlah Eco-Station *
                </label>
                <input
                  id="s2-eco"
                  type="number"
                  className={fieldCls}
                  {...form2.register('ecoStationCount', { valueAsNumber: true })}
                />
                {form2.formState.errors.ecoStationCount && (
                  <p className={errorCls}>{form2.formState.errors.ecoStationCount.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="s2-share" className={labelCls}>
                  Revenue Share Sekolah (%) *
                </label>
                <input
                  id="s2-share"
                  type="number"
                  min={50}
                  max={90}
                  className={fieldCls}
                  {...form2.register('revenueSharePercent', { valueAsNumber: true })}
                />
                <p className="text-xs text-[var(--color-neutral-400)] mt-1">
                  Disarankan 70%. Min 50%, Max 90%.
                </p>
                {form2.formState.errors.revenueSharePercent && (
                  <p className={errorCls}>{form2.formState.errors.revenueSharePercent.message}</p>
                )}
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ background: 'var(--color-primary)' }}
                >
                  Selanjutnya →
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Review */}
          {step === 2 && step1Data && step2Data && (
            <div>
              <div
                className="rounded-xl p-4 mb-4 flex flex-col gap-2"
                style={{
                  background: 'var(--color-primary-lighter)',
                  border: '1px solid var(--color-primary-light)',
                }}
              >
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-1">
                  Ringkasan
                </p>
                {[
                  ['Nama Sekolah', step1Data.name],
                  ['Alamat', step1Data.address],
                  ['Kota', step2Data.city],
                  ['Kepala Sekolah', step1Data.principalName],
                  ['Kontak', step1Data.phone],
                  ['Jumlah Siswa', step2Data.studentCount.toLocaleString('id-ID')],
                  ['Eco-Station', step2Data.ecoStationCount],
                  ['Revenue Share', `${step2Data.revenueSharePercent}%`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-[var(--color-neutral-600)]">{k}</span>
                    <span className="font-semibold text-[var(--color-neutral-800)]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] transition-colors"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ background: 'var(--color-primary)' }}
                >
                  ✅ Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

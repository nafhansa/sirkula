import { Suspense } from 'react';
import { MobileHeader } from '@/components/student/MobileHeader';
import { LogWasteForm } from '@/components/student/LogWasteForm';

export default function LogWastePage() {
  return (
    <>
      <MobileHeader title="Log Waste" showBack />
      <Suspense
        fallback={
          <div className="p-4 text-center text-sm text-[var(--color-neutral-500)]">Memuat...</div>
        }
      >
        <LogWasteForm />
      </Suspense>
    </>
  );
}

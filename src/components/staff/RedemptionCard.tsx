'use client';

import { type Redemption } from '@/types';
import { Button } from '@/components/common/Button';

interface RedemptionCardProps {
  redemption: Redemption;
  onComplete: (id: string) => void;
  completing: boolean;
}

export function RedemptionCard({ redemption, onComplete, completing }: RedemptionCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--color-neutral-400)]">
          {new Date(redemption.createdAt).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className="font-semibold text-[var(--color-neutral-900)] mt-0.5">
          {redemption.studentName}{' '}
          <span className="text-xs font-normal text-[var(--color-neutral-400)]">
            #{redemption.studentId}
          </span>
        </p>
        <p className="text-sm text-[var(--color-neutral-700)] mt-0.5">
          🎁 {redemption.rewardName} ·{' '}
          <span className="font-semibold text-[var(--color-primary)]">
            {redemption.pointsSpent} pts
          </span>
        </p>
        {redemption.smsCode && (
          <p
            className="text-xs font-mono mt-1 px-2 py-0.5 rounded inline-block"
            style={{
              background: 'var(--color-primary-lighter)',
              color: 'var(--color-primary-dark)',
            }}
          >
            SMS: {redemption.smsCode}
          </p>
        )}
      </div>

      <div className="flex gap-2 shrink-0">
        <Button label="Fulfill" variant="outline" size="sm" />
        <Button
          label="✓ Mark as Complete"
          variant="primary"
          size="sm"
          loading={completing}
          onClick={() => onComplete(redemption.id)}
        />
      </div>
    </div>
  );
}

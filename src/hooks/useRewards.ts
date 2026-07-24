'use client';

import { useCallback, useState } from 'react';
import { type Reward, type Redemption } from '@/types';

export interface UseRewardsResult {
  rewards: Reward[];
  redemptionHistory: Redemption[];
  isRedeeming: boolean;
  redeem: (reward: Reward, studentId: string, studentName: string) => Promise<Redemption>;
}

export function useRewards(initialRewards: Reward[]): UseRewardsResult {
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);
  const [redemptionHistory, setRedemptionHistory] = useState<Redemption[]>([]);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const redeem = useCallback(async (reward: Reward, studentId: string, studentName: string) => {
    setIsRedeeming(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const redemption: Redemption = {
      id: crypto.randomUUID(),
      studentId,
      studentName,
      rewardId: reward.id,
      rewardName: reward.name,
      pointsSpent: reward.costPoints,
      smsCode: `ABC${Math.floor(Math.random() * 999)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setRewards((prev) =>
      prev.map((r) => (r.id === reward.id ? { ...r, stock: Math.max(0, r.stock - 1) } : r)),
    );
    setRedemptionHistory((prev) => [redemption, ...prev]);
    setIsRedeeming(false);
    return redemption;
  }, []);

  return { rewards, redemptionHistory, isRedeeming, redeem };
}

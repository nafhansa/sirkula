'use client';

import { useEffect, useState } from 'react';
import { HomeHeader } from '@/components/student/MobileHeader';
import { GreetingCard } from '@/components/student/GreetingCard';
import { PointsHeroCard } from '@/components/student/PointsHeroCard';
import { StatCards } from '@/components/student/QuickActionGrid';
import { ActivityFeed } from '@/components/student/ActivityFeed';
import { useAuth } from '@/hooks/useAuth';
import { type ActivityEntry, type WasteCategory } from '@/types';

interface WasteEntryApi {
  id: string;
  category: WasteCategory;
  status: 'pending' | 'approved' | 'rejected';
  pointsAwarded: number;
  createdAt: string;
  ecoStation: { name: string } | null;
}

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const [activity, setActivity] = useState<ActivityEntry[]>([]);

  useEffect(() => {
    fetch('/api/waste-entries')
      .then((res) => res.json())
      .then((data) => {
        const entries: WasteEntryApi[] = data.entries ?? [];
        setActivity(
          entries.map((e) => ({
            id: e.id,
            category: e.category,
            pointsEarned: e.pointsAwarded,
            createdAt: e.createdAt,
            ecoStationName: e.ecoStation?.name ?? '-',
            status: e.status,
          })),
        );
      })
      .catch(() => setActivity([]));
  }, []);

  const todayPoints = activity
    .filter(
      (e) =>
        e.status === 'approved' &&
        new Date(e.createdAt).toDateString() === new Date().toDateString(),
    )
    .reduce((sum, e) => sum + e.pointsEarned, 0);

  if (isLoading || !user) {
    return <div className="p-4 text-center text-sm text-[var(--color-neutral-500)]">Memuat...</div>;
  }

  return (
    <>
      <HomeHeader schoolName={user.schoolName ?? 'Sirkula'} />

      <div className="flex flex-col gap-4 pb-4">
        <GreetingCard name={user.name} />

        <PointsHeroCard
          points={user.points}
          className_label={user.schoolName ?? ''}
          progressPercent={90}
          hasDailyMission
        />

        <StatCards packageCount={user.totalEntries} rank={0} todayPoints={todayPoints} />

        <ActivityFeed entries={activity} />
      </div>
    </>
  );
}

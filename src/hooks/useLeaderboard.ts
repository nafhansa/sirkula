'use client';

import { useEffect, useMemo, useState } from 'react';
import { type LeaderboardEntry } from '@/types';

export type WsStatus = 'connecting' | 'connected' | 'disconnected';

export interface UseLeaderboardResult {
  entries: LeaderboardEntry[];
  month: number;
  setMonth: (index: number) => void;
  wsStatus: WsStatus;
}

export function useLeaderboard(monthlyData: LeaderboardEntry[][]): UseLeaderboardResult {
  const [month, setMonth] = useState(0);
  const [wsStatus, setWsStatus] = useState<WsStatus>('connecting');

  useEffect(() => {
    // Real-time updates land in Fase 8 (WebSocket server). Until then this
    // just marks the connection as established so the UI can show a status dot.
    const t = setTimeout(() => setWsStatus('connected'), 400);
    return () => clearTimeout(t);
  }, []);

  const entries = useMemo(() => monthlyData[month] ?? [], [monthlyData, month]);

  return { entries, month, setMonth, wsStatus };
}

'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { type ActivityDataPoint } from '@/types/admin';

interface DailyActivityChartProps {
  data: ActivityDataPoint[];
}

export function DailyActivityChart({ data }: DailyActivityChartProps) {
  return (
    <div
      className="bg-white rounded-xl p-5 animate-[fadeIn_300ms_ease]"
      style={{ boxShadow: 'var(--shadow-admin-sm)', border: '1px solid var(--color-neutral-200)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-neutral-800)]">
            Aktivitas Harian
          </h3>
          <p className="text-xs text-[var(--color-neutral-500)] mt-0.5">
            Jumlah entri sampah per hari (30 hari terakhir)
          </p>
        </div>
        <span
          className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full"
          style={{ background: 'var(--color-primary-lighter)', color: 'var(--color-primary)' }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: 'var(--color-primary)' }}
          />
          Entries
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: 'var(--color-neutral-500)' }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />
          <YAxis
            domain={[0, 200]}
            tick={{ fontSize: 10, fill: 'var(--color-neutral-500)' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: '1px solid var(--color-neutral-200)',
              boxShadow: 'var(--shadow-admin-sm)',
            }}
            labelStyle={{ color: 'var(--color-neutral-700)', fontWeight: 600 }}
          />
          <Line
            type="monotone"
            dataKey="entries"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--color-primary)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { type KeyMetric } from '@/types/admin';
import { MetricCard } from './MetricCard';

interface KeyMetricsGridProps {
  metrics: KeyMetric[];
}

export function KeyMetricsGrid({ metrics }: KeyMetricsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {metrics.map((m) => (
        <MetricCard key={m.label} metric={m} />
      ))}
    </div>
  );
}

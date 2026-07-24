import { type SystemStatus } from '@/types/admin';
import { StatusCard } from './StatusCard';

interface SystemStatusGridProps {
  items: SystemStatus[];
}

export function SystemStatusGrid({ items }: SystemStatusGridProps) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <StatusCard key={item.id} item={item} />
      ))}
    </div>
  );
}

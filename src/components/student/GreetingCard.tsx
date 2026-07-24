interface GreetingCardProps {
  name: string;
  date?: string | undefined;
}

export function GreetingCard({ name, date }: GreetingCardProps) {
  const firstName = name.split(' ')[0] ?? name;

  const displayDate =
    date ??
    new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

  return (
    <div className="px-5 pt-3 pb-1">
      <p className="text-xs text-[var(--color-neutral-500)] mb-1">{displayDate}</p>
      <h1 className="text-2xl font-bold text-[var(--color-neutral-900)] m-0">
        Halo, {firstName} 👋
      </h1>
    </div>
  );
}

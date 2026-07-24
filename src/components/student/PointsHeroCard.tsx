import Link from 'next/link';

interface PointsHeroCardProps {
  points: number;
  className_label?: string;
  progressPercent?: number;
  hasDailyMission?: boolean;
}

function CircularProgress({ percent }: { percent: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90" aria-hidden="true">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="white"
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-sm font-bold text-white">{percent}%</span>
    </div>
  );
}

export function PointsHeroCard({
  points,
  className_label = 'Siswa Kelas II IPA 2',
  progressPercent = 90,
  hasDailyMission = true,
}: PointsHeroCardProps) {
  return (
    <div
      className="mx-5 rounded-[20px] overflow-hidden relative text-white"
      style={{ boxShadow: 'var(--shadow-lg)', minHeight: '180px' }}
    >
      {/* Background: waste image placeholder with green overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #2D8659ee 0%, #1B5E3Fcc 60%, #1B5E3F99 100%)',
          backgroundColor: 'var(--color-primary)',
        }}
        aria-hidden="true"
      />
      {/* Subtle texture circles */}
      <div
        className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5"
        aria-hidden="true"
      />
      <div
        className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-white/5"
        aria-hidden="true"
      />

      <div className="relative z-10 p-5">
        {/* Badge */}
        {hasDailyMission && (
          <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 mb-3">
            <span className="text-xs font-semibold">Misi Harian Tersedia</span>
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
          </div>
        )}

        {/* Points */}
        <p
          className="text-3xl font-bold leading-tight mb-0.5 text-white animate-[bounce_600ms_ease]"
          aria-label={`${points.toLocaleString('id-ID')} Sirkula Credits`}
        >
          {points.toLocaleString('id-ID')} Sirkula Credits
        </p>
        <p className="text-sm text-white opacity-75 mb-4">{className_label}</p>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <CircularProgress percent={progressPercent} />
          <Link
            href="/student/scan"
            className="bg-white text-[var(--color-primary-dark)] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[var(--color-primary-lighter)] transition-colors active:scale-95"
          >
            Scan Sampah
          </Link>
        </div>
      </div>
    </div>
  );
}

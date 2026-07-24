import { MobileHeader } from '@/components/student/MobileHeader';
import { LeaderboardScreen } from '@/components/student/LeaderboardScreen';

export default function LeaderboardPage() {
  return (
    <>
      <MobileHeader title="Leaderboard" showBack />
      <LeaderboardScreen />
    </>
  );
}

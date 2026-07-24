import { MobileHeader } from '@/components/student/MobileHeader';
import { RewardsScreen } from '@/components/student/RewardsScreen';

export default function RewardsPage() {
  return (
    <>
      <MobileHeader title="Redeem Rewards" showBack />
      <RewardsScreen />
    </>
  );
}

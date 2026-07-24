import { MobileHeader } from '@/components/student/MobileHeader';
import { ProfileScreen } from '@/components/student/ProfileScreen';

export default function ProfilePage() {
  return (
    <>
      <MobileHeader title="My Passport" showBack />
      <ProfileScreen />
    </>
  );
}

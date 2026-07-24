import { MobileHeader } from '@/components/student/MobileHeader';
import { ScanScreen } from '@/components/student/ScanScreen';

export default function ScanPage() {
  return (
    <>
      <MobileHeader title="Scan Waste" showBack />
      <ScanScreen />
    </>
  );
}

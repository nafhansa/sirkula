import { PageHeader } from '@/components/admin/PageHeader';
import { StudentsTable } from '@/components/staff/StudentsTable';
import { type Student } from '@/types';

const NAMES = [
  'Sekar Ayu',
  'Rizky Pratama',
  'Dita Fitriana',
  'Budi Santoso Jr.',
  'Nadia Putri',
  'Andi Wijaya',
  'Putri Lestari',
  'Fajar Nugraha',
  'Maya Sari',
  'Doni Setiawan',
  'Intan Permata',
  'Yoga Pratama',
  'Citra Dewi',
  'Hafiz Ramadhan',
  'Salsa Amelia',
  'Rian Firmansyah',
  'Bella Anggraini',
  'Dimas Aditya',
  'Vina Oktaviani',
  'Galih Prasetyo',
];

const MOCK_STUDENTS: Student[] = NAMES.map((name, i) => ({
  id: `STU-0${100 + i}`,
  name,
  role: 'student',
  schoolId: '1',
  schoolName: 'SMAN 15 Bandung',
  joinedAt: '2025-08-01',
  points: 3240 - i * 87,
  rank: i + 1,
  streak: i % 4 === 0 ? 0 : 21 - i,
  totalEntries: 40 - i,
  totalWeightKg: 12.4 - i * 0.3,
  co2eKg: 8.1 - i * 0.2,
}));

export default function StaffStudentsPage() {
  return (
    <>
      <PageHeader
        title="Students"
        subtitle={`${MOCK_STUDENTS.length} siswa terdaftar`}
        breadcrumb={[{ label: 'Dashboard', href: '/staff' }, { label: 'Students' }]}
      />

      <StudentsTable students={MOCK_STUDENTS} />
    </>
  );
}

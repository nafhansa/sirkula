import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    include: { school: true },
  });
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const totalEntries = await prisma.wasteEntry.count({
    where: { studentId: user.id, status: 'approved' },
  });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
      schoolName: user.school?.name,
      points: user.points,
      streak: user.streak,
      totalEntries,
    },
  });
}

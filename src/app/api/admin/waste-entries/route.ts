import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'school_staff')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const validStatus =
    status === 'pending' || status === 'approved' || status === 'rejected' ? status : undefined;

  const entries = await prisma.wasteEntry.findMany({
    ...(validStatus ? { where: { status: validStatus } } : {}),
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      student: { select: { id: true, name: true, email: true } },
      ecoStation: { select: { id: true, name: true } },
      reviewedBy: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json({ entries });
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { CATEGORY_CONFIG, PHOTO_BONUS_POINTS } from '@/types';

export async function POST(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'school_staff')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await ctx.params;
  const entry = await prisma.wasteEntry.findUnique({ where: { id } });
  if (!entry) {
    return NextResponse.json({ error: 'Entri tidak ditemukan' }, { status: 404 });
  }
  if (entry.status !== 'pending') {
    return NextResponse.json({ error: 'Entri sudah diproses' }, { status: 409 });
  }

  const points =
    CATEGORY_CONFIG[entry.category].basePoints + (entry.photoUrl ? PHOTO_BONUS_POINTS : 0);

  const [updatedEntry] = await prisma.$transaction([
    prisma.wasteEntry.update({
      where: { id },
      data: {
        status: 'approved',
        pointsAwarded: points,
        reviewedById: session.sub,
        reviewedAt: new Date(),
      },
    }),
    prisma.user.update({
      where: { id: entry.studentId },
      data: { points: { increment: points } },
    }),
  ]);

  return NextResponse.json({ entry: updatedEntry });
}

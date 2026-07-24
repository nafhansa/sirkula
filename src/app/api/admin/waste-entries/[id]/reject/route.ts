import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const schema = z.object({ reason: z.string().max(200).optional() });

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || (session.role !== 'admin' && session.role !== 'school_staff')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => ({}));
  const parsed = schema.safeParse(body ?? {});
  const reason = parsed.success ? parsed.data.reason : undefined;

  const entry = await prisma.wasteEntry.findUnique({ where: { id } });
  if (!entry) {
    return NextResponse.json({ error: 'Entri tidak ditemukan' }, { status: 404 });
  }
  if (entry.status !== 'pending') {
    return NextResponse.json({ error: 'Entri sudah diproses' }, { status: 409 });
  }

  const updated = await prisma.wasteEntry.update({
    where: { id },
    data: {
      status: 'rejected',
      reviewedById: session.sub,
      reviewedAt: new Date(),
      ...(reason ? { rejectionReason: reason } : {}),
    },
  });

  return NextResponse.json({ entry: updated });
}

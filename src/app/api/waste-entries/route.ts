import { NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const schema = z.object({
  productName: z.string().min(1).max(120),
  category: z.enum(['plastic', 'paper', 'residue']),
  ecoStationId: z.string().min(1).optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
  notes: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'student') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Data tidak valid', issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const { productName, category, ecoStationId, photoUrl, notes } = parsed.data;

  let ecoStation = null;
  if (ecoStationId) {
    ecoStation = await prisma.ecoStation.findFirst({
      where: { OR: [{ id: ecoStationId }, { qrCode: ecoStationId }] },
    });
  }

  const entry = await prisma.wasteEntry.create({
    data: {
      studentId: session.sub,
      productName,
      category,
      status: 'pending',
      ...(ecoStation ? { ecoStationId: ecoStation.id } : {}),
      ...(photoUrl ? { photoUrl } : {}),
      ...(notes ? { notes } : {}),
    },
  });

  return NextResponse.json({ entry });
}

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'student') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const entries = await prisma.wasteEntry.findMany({
    where: { studentId: session.sub },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { ecoStation: true },
  });

  return NextResponse.json({ entries });
}

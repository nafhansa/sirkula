import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
});
const prisma = new PrismaClient({ adapter });

const ADMIN_EMAIL = 'admin@sirkula.id';
const ADMIN_PASSWORD = 'Admin123!';

async function main() {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      passwordHash,
      name: 'Sirkula Admin',
      role: 'admin',
    },
  });
  console.log(`✔ Admin ready: ${admin.email} / ${ADMIN_PASSWORD}`);

  const school = await prisma.school.upsert({
    where: { id: 'demo-school' },
    update: {},
    create: {
      id: 'demo-school',
      name: 'SMAN 15 Bandung',
      city: 'Bandung',
    },
  });
  console.log(`✔ School ready: ${school.name}`);

  const stations = [
    { id: 'ESB-01', name: 'Kantin Area' },
    { id: 'ESB-02', name: 'Koridor Blok A' },
  ];
  for (const s of stations) {
    await prisma.ecoStation.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        name: s.name,
        schoolId: school.id,
        qrCode: s.id,
      },
    });
  }
  console.log(`✔ Eco-stations ready: ${stations.map((s) => s.id).join(', ')}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const databaseUrl = process.env.DATABASE_URL ?? 'file:./prisma/dev.db';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: databaseUrl,
  },
  migrations: {
    // @ts-expect-error: `adapter` is supported at runtime by prisma 7.9's migration
    // engine but is missing from the current @prisma/config type definitions.
    adapter: async () => new PrismaBetterSqlite3({ url: databaseUrl }),
    seed: 'tsx prisma/seed.ts',
  },
});

import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

export interface PendingLog {
  id: string;
  studentId: string;
  data: {
    eco_station_id: string;
    product_name: string;
    category: 'plastic' | 'paper' | 'residue';
    photo_url?: string | undefined;
    notes?: string | undefined;
  };
  createdAt: string;
  retryCount: number;
}

interface SirkulaDB extends DBSchema {
  pending_logs: {
    key: string;
    value: PendingLog;
  };
}

let _db: IDBPDatabase<SirkulaDB> | null = null;

async function getDB() {
  if (typeof window === 'undefined') throw new Error('IndexedDB only available in browser');
  if (_db) return _db;
  _db = await openDB<SirkulaDB>('sirkula-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('pending_logs')) {
        db.createObjectStore('pending_logs', { keyPath: 'id' });
      }
    },
  });
  return _db;
}

export async function addPendingLog(log: PendingLog): Promise<void> {
  const db = await getDB();
  await db.put('pending_logs', log);
}

export async function getPendingLogs(): Promise<PendingLog[]> {
  const db = await getDB();
  return db.getAll('pending_logs');
}

export async function deletePendingLog(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('pending_logs', id);
}

export async function getPendingCount(): Promise<number> {
  const db = await getDB();
  return db.count('pending_logs');
}

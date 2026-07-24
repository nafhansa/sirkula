'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/sync';

export function ServiceWorkerProvider() {
  useEffect(() => {
    void registerServiceWorker();
  }, []);

  return null;
}

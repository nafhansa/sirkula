'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/common/Button';

// Lazy load QR scanner — heavy library, client only
const QRScanner = dynamic(() => import('./QRScanner'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-black">
      <p className="text-white text-sm">Memuat kamera...</p>
    </div>
  ),
});

export function ScanScreen() {
  const router = useRouter();
  const [scannedStation, setScannedStation] = useState<{ id: string; name: string } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleScan = useCallback((qrData: string) => {
    try {
      // QR data format: { id: "ESB-01", name: "Kantin Area" }
      const parsed = JSON.parse(qrData) as { id: string; name: string };
      setScannedStation(parsed);
    } catch {
      // Plain text fallback — use as station ID
      setScannedStation({ id: qrData, name: qrData });
    }
  }, []);

  const handleNext = () => {
    if (!scannedStation) return;
    router.push(
      `/student/log-waste?stationId=${scannedStation.id}&stationName=${encodeURIComponent(scannedStation.name)}`,
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100dvh-56px-var(--bottom-tab-height))]">
      {/* Camera area */}
      <div className="relative flex-1 bg-black overflow-hidden">
        {!permissionDenied ? (
          <QRScanner onScan={handleScan} onPermissionDenied={() => setPermissionDenied(true)} />
        ) : (
          <PermissionDeniedOverlay />
        )}

        {/* Scan frame overlay */}
        {!scannedStation && !permissionDenied && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-52 h-52 border-2 border-dashed rounded-[var(--border-radius-lg)]"
              style={{ borderColor: 'var(--color-primary-light)' }}
              aria-label="Area scan QR code"
            >
              {/* Corner decorations */}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map(
                (pos) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-6 h-6 border-[var(--color-primary-light)]`}
                    style={{
                      borderTopWidth: pos.includes('top') ? '3px' : '0',
                      borderBottomWidth: pos.includes('bottom') ? '3px' : '0',
                      borderLeftWidth: pos.includes('left') ? '3px' : '0',
                      borderRightWidth: pos.includes('right') ? '3px' : '0',
                    }}
                  />
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom panel */}
      <div className="bg-white px-4 py-5 flex flex-col gap-4">
        {scannedStation ? (
          <>
            <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-lighter)] rounded-[var(--border-radius-md)]">
              <span className="text-2xl" aria-hidden="true">
                ✅
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] m-0">
                  QR Code Terdeteksi!
                </p>
                <p className="text-xs text-[var(--color-neutral-700)] m-0">
                  Eco-Station: {scannedStation.name} ({scannedStation.id})
                </p>
              </div>
            </div>
            <Button label="Lanjut →" variant="primary" fullWidth onClick={handleNext} />
            <button
              onClick={() => setScannedStation(null)}
              className="text-sm text-[var(--color-neutral-500)] text-center"
            >
              Scan ulang
            </button>
          </>
        ) : (
          <p className="text-sm text-[var(--color-neutral-500)] text-center">
            ⓘ Arahkan kamera ke QR code pada tempat sampah
          </p>
        )}
      </div>
    </div>
  );
}

function PermissionDeniedOverlay() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-white text-center bg-[var(--color-neutral-900)]">
      <span className="text-5xl" aria-hidden="true">
        📵
      </span>
      <h2 className="text-lg font-semibold text-white m-0">Akses Kamera Ditolak</h2>
      <p className="text-sm text-white opacity-80 m-0">
        Izinkan akses kamera di pengaturan browser untuk dapat men-scan QR code.
      </p>
    </div>
  );
}

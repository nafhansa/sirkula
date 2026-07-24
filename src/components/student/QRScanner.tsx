'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (data: string) => void;
  onPermissionDenied: () => void;
}

export default function QRScanner({ onScan, onPermissionDenied }: QRScannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannedRef = useRef(false);

  const handleScan = useCallback(
    (decodedText: string) => {
      if (scannedRef.current) return;
      scannedRef.current = true;
      onScan(decodedText);
    },
    [onScan],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const scannerId = 'qr-scanner-container';
    const scanner = new Html5Qrcode(scannerId);
    scannerRef.current = scanner;

    const debounceMs = 500;
    let lastScanTime = 0;

    scanner
      .start(
        { facingMode: 'environment' },
        {
          fps: 60,
          qrbox: { width: 200, height: 200 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          const now = Date.now();
          if (now - lastScanTime < debounceMs) return;
          lastScanTime = now;
          handleScan(decodedText);
        },
        undefined,
      )
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('denied')) {
          onPermissionDenied();
        }
      });

    return () => {
      const state = scanner.getState();
      if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
        scanner.stop().catch(() => null);
      }
    };
  }, [handleScan, onPermissionDenied]);

  return (
    <div className="w-full h-full">
      <div id="qr-scanner-container" ref={containerRef} className="w-full h-full" />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface ScannerProps {
  onScanSuccess: (result: string) => void;
  isFlashOn: boolean;
  isZoomEnabled: boolean;
}

export default function Scanner({ onScanSuccess, isFlashOn, isZoomEnabled }: ScannerProps) {
  const [html5Qrcode, setHtml5Qrcode] = useState<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const qrcode = new Html5Qrcode('reader');
    setHtml5Qrcode(qrcode);

    return () => {
      if (qrcode) {
        qrcode.stop().catch(console.error);
        qrcode.clear();
      }
    };
  }, []);

  useEffect(() => {
    const startScanning = async () => {
      if (!html5Qrcode || isScanning) return;

      try {
        setIsScanning(true);
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 0) {
          const camera = cameras[0];
          await html5Qrcode.start(
            camera.id,
            {
              fps: 10,
              qrbox: { width: 280, height: 280 },
              aspectRatio: 1,
              torch: isFlashOn,
              zoom: isZoomEnabled ? 2 : 1,
            },
            (text) => {
              onScanSuccess(text);
              html5Qrcode.stop().catch(console.error);
              setIsScanning(false);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      } catch (err) {
        console.error('Error starting scanner:', err);
        setIsScanning(false);
      }
    };

    startScanning();
  }, [html5Qrcode, isFlashOn, isZoomEnabled]);

  return (
    <div 
      id="reader" 
      className="qr-container rounded-3xl overflow-hidden bg-black/40 backdrop-blur-sm h-[350px]"
    />
  );
}
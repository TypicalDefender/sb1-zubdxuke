'use client';

import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { X, Copy, MapPin, RefreshCw } from 'lucide-react';

export default function QRScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const qrScanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 280,
          height: 280,
        },
        fps: 10,
      },
      false
    );

    setScanner(qrScanner);

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, []);

  const handleScanSuccess = (decodedText: string) => {
    setScanResult(decodedText);
    if (scanner) {
      scanner.clear();
    }
  };

  const startScanning = () => {
    if (scanner) {
      scanner.render(handleScanSuccess, (error) => {
        console.error(error);
      });
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    startScanning();
  };

  useEffect(() => {
    startScanning();
  }, [scanner]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900/40 to-black">
      <div className="absolute top-4 left-4 text-white/50 text-4xl font-bold">
        04
      </div>
      
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white/70 hover:text-white"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-sm">
          <h2 className="text-white/90 text-xl mb-8 text-center">
            Scan any QR code to pay
          </h2>

          <div className="relative">
            <div 
              id="reader" 
              className="qr-container rounded-3xl overflow-hidden bg-black/40 backdrop-blur-sm"
            />

            {scanResult && (
              <div className="absolute inset-0 bg-black/90 rounded-3xl p-6">
                <div className="text-white/90 break-all">
                  <h3 className="font-medium mb-2">Scanned Result:</h3>
                  <p className="text-sm">{scanResult}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={() => {
                if (scanResult) {
                  navigator.clipboard.writeText(scanResult);
                }
              }}
            >
              <Copy className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <MapPin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={resetScanner}
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        #reader {
          border: none !important;
          width: 100% !important;
        }
        
        #reader * {
          border: none !important;
        }

        #reader video {
          border-radius: 1.5rem !important;
        }

        #reader__scan_region {
          background: transparent !important;
        }

        #reader__scan_region img {
          display: none !important;
        }

        #reader__dashboard {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
        }

        #reader__dashboard_section_swaplink {
          display: none !important;
        }

        #reader__dashboard_section_csr button {
          display: none !important;
        }

        #reader__status_span {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
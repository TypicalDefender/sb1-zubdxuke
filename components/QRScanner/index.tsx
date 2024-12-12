'use client';

import { useState, useCallback } from 'react';
import Header from './Header';
import Scanner from './Scanner';
import Controls from './Controls';
import { scannerStyles } from './styles';

export default function QRScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);

  const handleScanSuccess = useCallback((result: string) => {
    setScanResult(result);
  }, []);

  const handleFileUpload = async (file: File) => {
    try {
      // In a real implementation, you would:
      // 1. Create a temporary URL for the file
      // 2. Use a QR code detection library to process the image
      // 3. Extract the QR code data
      const imageUrl = URL.createObjectURL(file);
      console.log('Processing file:', imageUrl);
      
      // For demo purposes, we'll just show that we received the file
      setScanResult(`Uploaded file: ${file.name}`);
      
      // Clean up
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const toggleFlash = useCallback(() => {
    setIsFlashOn(prev => !prev);
  }, []);

  const toggleZoom = useCallback(() => {
    setIsZoomEnabled(prev => !prev);
  }, []);

  const resetScanner = () => {
    setScanResult(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900/40 to-black">
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-sm">
          <h2 className="text-white/90 text-xl mb-8 text-center">
            Scan any QR code to pay
          </h2>

          <div className="relative">
            {!scanResult && (
              <Scanner 
                onScanSuccess={handleScanSuccess}
                isFlashOn={isFlashOn}
                isZoomEnabled={isZoomEnabled}
              />
            )}

            {scanResult && (
              <div className="h-[350px] bg-black/90 rounded-3xl p-6 flex flex-col">
                <div className="text-white/90 break-all flex-1">
                  <h3 className="font-medium mb-2">Scanned Result:</h3>
                  <p className="text-sm">{scanResult}</p>
                </div>
                <button
                  onClick={resetScanner}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Tap to scan again
                </button>
              </div>
            )}
          </div>

          <Controls
            onUpload={handleFileUpload}
            onToggleFlash={toggleFlash}
            onToggleZoom={toggleZoom}
          />
        </div>
      </div>

      <style jsx global>
        {scannerStyles}
      </style>
    </div>
  );
}
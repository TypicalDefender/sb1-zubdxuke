'use client';

import { Button } from '@/components/ui/button';
import { Upload, Flashlight, ZoomIn } from 'lucide-react';

interface ControlsProps {
  onUpload: (file: File) => void;
  onToggleFlash: () => void;
  onToggleZoom: () => void;
}

export default function Controls({ onUpload, onToggleFlash, onToggleZoom }: ControlsProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  return (
    <div className="flex justify-center gap-4 mt-8">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Upload QR code image"
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/10 hover:bg-white/20 text-white"
        >
          <Upload className="h-5 w-5" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={onToggleFlash}
        aria-label="Toggle flash"
      >
        <Flashlight className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-white/10 hover:bg-white/20 text-white"
        onClick={onToggleZoom}
        aria-label="Toggle zoom"
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
    </div>
  );
}
'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function Header() {
  return (
    <>
      <div className="absolute top-4 left-4 text-white/50 text-4xl font-bold">
        03
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
    </>
  );
}
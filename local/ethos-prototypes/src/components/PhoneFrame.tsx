import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6">
      <div className={`phone-frame ${className}`}>
        {children}
      </div>
    </div>
  );
}

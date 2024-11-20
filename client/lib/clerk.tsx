
'use client';

import { ClerkProvider } from '@clerk/nextjs';
import type { ReactNode } from 'react';

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export default function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return (
    <ClerkProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !}
  >
    {children}
  </ClerkProvider>
  );
}
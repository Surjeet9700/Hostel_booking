
'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { SearchProvider } from '@/components/providers/SearchContext';
import { Spinner } from '@/components/Spinner';
import { SelectedHostelProvider } from './_contexts/SelectedHostelContext';
import Navbar from './_components/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full w-screen flex flex-col">
      <SelectedHostelProvider>
        <SearchProvider>
          <Navbar />
          <main className="flex-1 h-full overflow-y-auto">
            {children}
          </main>
        </SearchProvider>
      </SelectedHostelProvider>
    </div>
  );
};

export default MainLayout;
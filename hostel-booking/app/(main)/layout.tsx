"use client"

import React from 'react';
import { redirect } from 'next/navigation';
import Navbar from './_components/Navbar';
import { SearchProvider } from '@/components/providers/SearchContext';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true; // Replace with your actual authentication logic

  if (!isAuthenticated) {
    redirect('/');
    return null; // Ensure the component does not render anything after redirect
  }

  return (
    <div className="h-full w-screen flex flex-col">
      <SearchProvider>
        <Navbar />
        <main className="flex-1 h-full overflow-y-auto">
          {children}
        </main>
      </SearchProvider>
    </div>
  );
};

export default MainLayout;
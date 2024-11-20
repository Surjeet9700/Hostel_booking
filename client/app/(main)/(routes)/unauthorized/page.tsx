// pages/unauthorized.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center  text-white justify-center min-h-screen bg-gray">
      <div className="p-8 border rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
// components/ProtectedRoute.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Optional: specify required role
}

// Simple Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Enter Admin Access Code</h2>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Access Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => onSubmit(code)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [hasAccessCode, setHasAccessCode] = useState(false);

  // Define your admin access code
  const ADMIN_ACCESS_CODE = '032003'; // Replace with a secure code

  useEffect(() => {
    console.log('isLoaded:', isLoaded);
    console.log('isSignedIn:', isSignedIn);
    console.log('role:', user?.publicMetadata?.role);

    if (isLoaded) {
      if (!isSignedIn) {
        router.replace('/');
      } else if (requiredRole) {
        const role = user?.publicMetadata?.role;

        if (role !== requiredRole) {
          router.replace('/unauthorized'); // Ensure you have this page
        } else {
          // If role is admin, show access code modal
          setShowModal(true);
        }
      }
    }
  }, [isLoaded, isSignedIn, user, router, requiredRole]);

  const handleAccessCodeSubmit = (code: string) => {
    if (code === ADMIN_ACCESS_CODE) {
      setHasAccessCode(true);
      setShowModal(false);
    } else {
      alert('Incorrect access code. Please try again.');
      setCode(''); // Clear the input if using refs
    }
  };

  if (!isLoaded || !isSignedIn || (requiredRole && !hasAccessCode)) {
    return (
      <>
        {/* Show Spinner while loading */}
        {(!isLoaded || !isSignedIn) && (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size='lg' />
          </div>
        )}

        {/* Show Modal for Access Code */}
        {showModal && requiredRole && (
          <Modal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              router.replace('/'); 
            }}
            onSubmit={handleAccessCodeSubmit}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
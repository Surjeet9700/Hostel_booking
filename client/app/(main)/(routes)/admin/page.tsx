// AdminPage.tsx

import React from 'react';
import AdminBookings from '../../_components/AdminBooking';
import ProtectedRoute from '../../_contexts/ProctectedRoute';

const AdminPage: React.FC = () => {
  return (
    <ProtectedRoute requiredRole='admin'>
      <AdminBookings />
    </ProtectedRoute>
  );
};

export default AdminPage;
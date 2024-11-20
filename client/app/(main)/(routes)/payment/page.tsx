
"use client";

import React from 'react';
import PaymentPage from '../../_components/Paymentpage';

const BookingConfirmationPage: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col">
      <PaymentPage />
    </div>
  );
};

export default BookingConfirmationPage;
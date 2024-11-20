// app/booking-confirmation/page.tsx

"use client";

import React from 'react';
import BookingConfirmation from '../../_components/BookingConfirmation';

const BookingConfirmationPage: React.FC = () => {
  return (
    <div className="min-h-full flex flex-col">
      <BookingConfirmation />
    </div>
  );
};

export default BookingConfirmationPage;
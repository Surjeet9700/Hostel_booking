
"use client";

import React, { useState } from 'react';
import { Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useSelectedHostel, Booking, Hostel } from '../_contexts/SelectedHostelContext';

const cancellationReasons = [
  'Maintenance Issues',
  'Hostel Overbooked',
  'Reservation Error',
  'Policy Violation',
  'Other',
];

const AdminBookings: React.FC = () => {
  const { bookings, hostels, cancelBooking, confirmBooking } = useSelectedHostel();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>('');

  const handleOpenCancelDialog = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsCancelDialogOpen(true);
  };

  const handleOpenConfirmDialog = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsConfirmDialogOpen(true);
  };

  const handleCancelBooking = () => {
    if (selectedBookingId && selectedReason) {
      cancelBooking(selectedBookingId, selectedReason);
      setSelectedBookingId(null);
      setSelectedReason('');
      setIsCancelDialogOpen(false);
      alert('Booking has been canceled and the user has been notified.');
    } else {
      alert('Please select a reason for cancellation.');
    }
  };

  const handleConfirmBooking = () => {
    if (selectedBookingId) {
      confirmBooking(selectedBookingId);
      setSelectedBookingId(null);
      setIsConfirmDialogOpen(false);
      alert('Booking has been confirmed successfully.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Bookings Panel</h1>

      {bookings.length === 0 ? (
        <div className="text-center">
          <p>No bookings available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: Booking) => {
            const hostel: Hostel | undefined = hostels.find((h) => h._id === booking.hostelId);
            return (
              <div
                key={booking.bookingId}
                className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {hostel ? hostel.title : 'Hostel Title'}
                  </h2>
                  <p className="text-gray-500">{hostel ? hostel.location : 'Location'}</p>
                  <p className="mt-2">
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </p>
                  <p>
                    <strong>Confirmation Code:</strong> {booking.confirmationCode}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    {booking.status === 'canceled'
                      ? `Canceled (${booking.cancellationReason})`
                      : booking.status === 'confirmed'
                      ? 'Confirmed'
                      : 'Active'}
                  </p>
                </div>
                {booking.status !== 'canceled' && (
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button
                      variant="destructive"
                      onClick={() => handleOpenCancelDialog(booking.bookingId)}
                    >
                      <Trash2 className="mr-2 w-4 h-4" />
                      Cancel Booking
                    </Button>
                    {booking.status !== 'confirmed' && (
                      <Button
                        variant="outline"
                        onClick={() => handleOpenConfirmDialog(booking.bookingId)}
                      >
                        <CheckCircle className="mr-2 w-4 h-4" />
                        Confirm Booking
                      </Button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Booking Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Please select a reason for cancelling the booking.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <select
              title='confirmation'
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a reason</option>
              {cancellationReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelBooking}
              disabled={!selectedReason}
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Booking Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to confirm this booking?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handleConfirmBooking}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
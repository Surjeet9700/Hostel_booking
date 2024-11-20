
'use client';
import React, { useState, useEffect } from 'react';
import { MessageCircle, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useSelectedHostel, Booking, Hostel } from '../_contexts/SelectedHostelContext';
import { useRouter } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

const Bookings: React.FC = () => {
  const { bookings, removeBooking, hostels } = useSelectedHostel();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState<string>('');
  const router = useRouter();

  const handleCancelBooking = (id: string) => {
    removeBooking(id);
    setIsCancelDialogOpen(false);
  };

  useEffect(() => {
    const canceledBooking = bookings.find(
      (booking) => booking.status === 'canceled' && booking.cancellationReason
    );
    if (canceledBooking) {
      setCancellationReason(canceledBooking.cancellationReason as string);
      setIsPopoverOpen(true);
    }
  }, [bookings]);

  if (!bookings) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center">
          <p>You have no bookings.</p>
          <Button onClick={() => router.push('/home')} className="mt-4 px-4 py-2">
            Browse Rooms
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking: Booking) => {
            const hostel: Hostel | undefined = hostels.find((h) => h._id === booking.hostelId);

            return (
              <div key={booking.bookingId} className="border rounded-lg p-4 flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-48 bg-gray-200">
                  {hostel && hostel.images && hostel.images.length > 0 ? (
                    <Image
                      src={hostel.images[0]}
                      alt={hostel.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  ) : (
                    <p className="text-center pt-16">No images available.</p>
                  )}
                </div>
                <div className="md:ml-6 w-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{hostel ? hostel.title : 'Hostel Title'}</h2>
                    <p className="text-gray-500">{hostel ? hostel.location : 'Location'}</p>

                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-semibold">{hostel ? hostel.rating : 'Rating'}</span>
                      <span className="text-gray-500 ml-2">({hostel ? hostel.reviews : 'Reviews'} reviews)</span>
                    </div>

                    <div className="mt-4">
                      <p>
                        <strong>Check-In:</strong> {new Date(booking.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Check-Out:</strong> {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Total Price:</strong> ₹{booking.totalPrice}
                      </p>
                      <p>
                        <strong>Booking ID:</strong> {booking.bookingId}
                      </p>
                      {booking.confirmationCode && (
                        <p>
                          <strong>Confirmation Code:</strong> {booking.confirmationCode}
                        </p>
                      )}
                      {booking.status === 'canceled' && booking.cancellationReason && (
                        <p className="text-red-500">
                          <strong>Status:</strong> Canceled - {booking.cancellationReason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 pr-2 p-1 pt-2">
                    <Button className="w-full" variant="outline">
                      <MessageCircle className="mr-2 ml-2 w-4 h-4" /> Contact Host
                    </Button>
                    {booking.status !== 'canceled' && (
                      <Button
                        className="w-full"
                        variant="destructive"
                        onClick={() => {
                          setIsCancelDialogOpen(true);
                          setSelectedBookingId(booking.bookingId);
                        }}
                      >
                        <Trash2 className="mr-2 w-3 h-4 " /> Cancel 
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Booking Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={() => setIsCancelDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedBookingId !== null) handleCancelBooking(selectedBookingId);
              }}
            >
              Confirm Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Popover Notification for Admin-Canceled Bookings */}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>
          {/* Invisible trigger */}
          <span></span>
        </PopoverTrigger>
        <PopoverContent className="max-w-sm">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Booking Canceled</h3>
            <p>
              Your booking has been canceled by the hostel admin due to: <strong>{cancellationReason}</strong>.
              A refund has been initiated and will reflect in your account shortly.
            </p>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => setIsPopoverOpen(false)}
            >
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Bookings;
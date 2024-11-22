'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Star, Trash2, Calendar, MapPin, DollarSign, CheckCircle, XCircle } from 'lucide-react';
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
import { Spinner } from '@/components/Spinner';
import ChatInterface from './chat-interface';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";

const RedesignedBookings: React.FC = () => {
  const { bookings, removeBooking, hostels } = useSelectedHostel();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCancelBooking = (id: string) => {
    removeBooking(id);
    setIsCancelDialogOpen(false);
    toast({
      title: "Booking Canceled",
      description: "Your booking has been successfully canceled.",
      variant: "destructive",
    });
  };

  useEffect(() => {
    const confirmedBooking = bookings.find(
      (booking) => booking.status === 'confirmed'
    );
    if (confirmedBooking) {
      toast({
        title: "Booking Confirmed",
        description: "Your booking has been confirmed by the admin.",
        variant: "default",
      });
    }
  }, [bookings, toast]);

  if (!bookings) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Spinner size="icon" />
      </div>
    );
  }

  const activeBookings = bookings.filter(booking => booking.status !== 'canceled');
  const canceledBookings = bookings.filter(booking => booking.status === 'canceled');

  const renderBookingCard = (booking: Booking) => {
    const hostel: Hostel | undefined = hostels.find(
      (h) => h._id === booking.hostelId
    );

    return (
      <Card key={booking.bookingId} className="mb-4">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{hostel ? hostel.title : 'Hostel Title'}</span>
            {booking.status === 'confirmed' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : booking.status === 'canceled' ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 h-48 bg-gray-200 mb-4 md:mb-0 md:mr-4">
              {hostel && hostel.image ? (
                <Image
                  src={hostel.image}
                  alt={hostel.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              ) : (
                <p className="text-center pt-16">No images available.</p>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{hostel ? hostel.location : 'Location'}</span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="font-semibold">{hostel ? hostel.rating : 'Rating'}</span>
                <span className="text-gray-500 ml-2">({hostel ? hostel.reviews : 'Reviews'} reviews)</span>
              </div>
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span>Total Price: ₹{booking.totalPrice}</span>
              </div>
              <p className="text-sm text-gray-500">Booking ID: {booking.bookingId}</p>
              {booking.confirmationCode && (
                <p className="text-sm text-gray-500">Confirmation Code: {booking.confirmationCode}</p>
              )}
              {booking.status === 'canceled' && booking.cancellationReason && (
                <p className="text-sm text-red-500 mt-2">
                  Canceled: {booking.cancellationReason}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageCircle className="mr-2 w-4 h-4" /> Contact Host
          </Button>
          {booking.status !== 'canceled' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setIsCancelDialogOpen(true);
                setSelectedBookingId(booking.bookingId);
              }}
            >
              <Trash2 className="mr-2 w-4 h-4" /> Cancel
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center">
          <p>You have no bookings.</p>
          <Button onClick={() => router.push('/home')} className="mt-4">
            Browse Rooms
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
            <TabsTrigger value="canceled">Canceled Bookings</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {activeBookings.map(renderBookingCard)}
          </TabsContent>
          <TabsContent value="canceled">
            {canceledBookings.map(renderBookingCard)}
          </TabsContent>
        </Tabs>
      )}

      {/* Cancel Booking Confirmation Dialog */}
      <Dialog
        open={isCancelDialogOpen}
        onOpenChange={() => setIsCancelDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
            >
              Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedBookingId !== null)
                  handleCancelBooking(selectedBookingId);
              }}
            >
              Confirm Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Interface Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chat with Hostel Support</DialogTitle>
          </DialogHeader>
          <ChatInterface />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChatOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast component */}
      <Toaster />
    </div>
  );
};

export default RedesignedBookings;


import React from 'react'
import { CheckCircle, Calendar, Clock, Users, MapPin, ChevronRight, Phone, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image';

interface BookingConfirmationProps {
  guestName: string;
  propertyName: string;
  hostName: string;
  checkInDate: string;
  checkOutDate: string;
  checkInTime: string;
  checkOutTime: string;
  guests: number;
  location: string;
  imageUrl: string;
  confirmationCode: string;
}

export default function BookingConfirmation({
  guestName,
  propertyName,
  hostName,
  checkInDate,
  checkOutDate,
  checkInTime,
  checkOutTime,
  guests,
  location,
  imageUrl,
  confirmationCode
}: BookingConfirmationProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed! {guestName}</h1>
        <p className="text-xl text-gray-600">You&apos;re going to {location}</p>
      </div>

      <div className="bg-white text-black border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{propertyName}</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <span>{checkInDate} - {checkOutDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-500" />
              <span>Check-in: {checkInTime} • Check-out: {checkOutTime}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <span>{guests} guest{guests > 1 ? 's' : ''}</span>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Image src={imageUrl} width={96} height={96} alt={propertyName} className="w-24 h-24 object-cover rounded-lg" />
            <div>
              <p className="font-semibold mb-1">Hosted by {hostName}</p>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Confirmation code</span>
            <span className="font-semibold">{confirmationCode}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">What&apos;s next?</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="bg-rose-100 rounded-full p-2 mr-4">
                <MessageSquare className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <p className="font-semibold">Message your host</p>
                <p className="text-gray-600">Let them know when you&apos;re arriving and ask any questions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </li>
            <li className="flex items-center">
              <div className="bg-rose-100 rounded-full p-2 mr-4">
                <Phone className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <p className="font-semibold">Add your phone number</p>
                <p className="text-gray-600">Get important updates about your reservation</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Cancellation policy</h3>
          <p className="text-gray-600 mb-2">Free cancellation before {checkInDate}. After that, cancel before check-in and get a 50% refund, minus the service fee.</p>
          <Button variant="link" className="text-gray-600 p-0">Learn more</Button>
        </div>
      </div>
    </div>
  )
}
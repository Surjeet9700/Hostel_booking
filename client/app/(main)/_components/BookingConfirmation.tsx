"use client"

import React, { useEffect, useState } from 'react'
import { CheckCircle, Star, Calendar, Bed, ShowerHeadIcon as Shower } from 'lucide-react'
import { useSelectedHostel, Booking, Hostel } from '../_contexts/SelectedHostelContext'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BookingConfirmation() {
  const { bookings, hostels } = useSelectedHostel()
  const router = useRouter()
  const searchParams = useSearchParams()

  const confirmationCode = searchParams?.get('confirmationCode') || null

  const [booking, setBooking] = useState<Booking | null>(null)
  const [hostel, setHostel] = useState<Hostel | null>(null)

  useEffect(() => {
    console.log('Hostels', hostels )
    if (confirmationCode) {
      const foundBooking = bookings.find((b) => b.confirmationCode === confirmationCode);
      if (foundBooking) {
        const foundHostel = hostels.find((h) => h._id === foundBooking.hostelId);
        if (foundHostel) {
          setHostel(foundHostel);
          console.log('Found Hostel:', foundHostel);
        } else {
          console.error(`No hostel found with ID: ${foundBooking.hostelId}`);
          setHostel(null);
        }
        setBooking(foundBooking);
      } else {
        setBooking(null);
      }
    }
  }, [confirmationCode, bookings, hostels, hostel]);



  if (!confirmationCode || !booking || !hostel) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500 mb-4">
              {!confirmationCode
                ? "Invalid booking confirmation."
                : !booking
                ? "No booking details available."
                : "Hostel details not found."}
            </p>
            <Button
              onClick={() => router.push('/home')}
              className="w-full"
            >
              Browse Rooms
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { title, location, rating, reviews, host, hostImage, beds, bathrooms } = hostel
  const { startDate, endDate, totalPrice } = booking

  const totalDays = Math.ceil(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 ">
      <Card className="mb-8 border-none ">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Booking Confirmed!</CardTitle>
          <p className="text-xl text-muted-foreground">
            You&apos;re going to <span className="font-semibold">{location}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Confirmation Code: <span className="font-semibold">{confirmationCode}</span>
          </p>
        </CardHeader>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <div className="flex items-center mb-4">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground ml-2">({reviews} reviews)</span>
          </div>
          <div className="flex items-center mb-6">
            <Image
              src={hostImage}
              alt={host}
              width={50}
              height={50}
              className="rounded-full mr-4"
            />
            <span className="text-muted-foreground text-lg">
              Hosted by {host}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Check-In:</h3>
                <p className="text-muted-foreground">{new Date(startDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Check-Out:</h3>
                <p className="text-muted-foreground">{new Date(endDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Bed className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Beds:</h3>
                <p className="text-muted-foreground">{beds}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shower className="mr-2 h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Bathrooms:</h3>
                <p className="text-muted-foreground">{bathrooms}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Total Price:</h3>
            <p className="text-lg">
              ₹{totalPrice} for {totalDays} night{totalDays > 1 ? 's' : ''}
            </p>
          </div>
        </CardContent>
      </Card>

 

      <div className="text-center">
        <Button
          onClick={() => router.push('/trips')}
          className="w-full md:w-auto px-6 py-3"
        >
          View My Bookings
        </Button>
      </div>
    </div>
  )
}
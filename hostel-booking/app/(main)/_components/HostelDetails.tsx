"use client"


import React, { useState } from 'react'
import { Star, Heart, Share, MapPin, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'

// Mock data for hotel details
const hotelData = {
  id: 1,
  title: "Luxurious Penthouse with Stunning City View",
  location: "New York, NY",
  rating: 4.92,
  reviews: 284,
  type: "Entire apartment",
  host: "John Doe",
  hostImage: "/placeholder.svg?height=50&width=50",
  beds: 2,
  bathrooms: 2,
  guests: 4,
  price: 250,
  description: "Experience luxury living in this stunning penthouse apartment with breathtaking city views. Perfect for couples or small families looking for an unforgettable stay in the heart of New York City.",
  amenities: ["Wifi", "Kitchen", "Washer", "Dryer", "Air conditioning", "Heating", "TV", "Elevator"],
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
}

export default function HostelDetails() {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{hotelData.title}</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-semibold mr-1">{hotelData.rating}</span>
          <span className="text-gray-500 mr-2">({hotelData.reviews} reviews)</span>
          <span className="text-gray-500">{hotelData.location}</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="mr-2">
            <Share className="h-5 w-5 mr-2" />
            Share
          </Button>
          <Button variant="ghost">
            <Heart className="h-5 w-5 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <Carousel className="w-full max-w-5xl mx-auto mb-8">
        <CarouselContent>
          {hotelData.images.map((image, index) => (
            <CarouselItem key={index}>
              <img src={image} alt={`Room view ₹{index + 1}`} className="w-full h-[400px] object-cover rounded-lg" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{hotelData.type} hosted by {hotelData.host}</h2>
              <p className="text-gray-500">{hotelData.guests} guests · {hotelData.beds} bedrooms · {hotelData.beds} beds · {hotelData.bathrooms} bathrooms</p>
            </div>
            <img src={hotelData.hostImage} alt={hotelData.host} className="w-12 h-12 rounded-full" />
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">About this space</h3>
            <p className="text-gray-700">{hotelData.description}</p>
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
            <ul className="grid grid-cols-2 gap-4">
              {hotelData.amenities.slice(0, showAllAmenities ? undefined : 6).map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {amenity}
                </li>
              ))}
            </ul>
            {hotelData.amenities.length > 6 && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowAllAmenities(!showAllAmenities)}
              >
                {showAllAmenities ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" />
                    Show less amenities
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show all {hotelData.amenities.length} amenities
                  </>
                )}
              </Button>
            )}
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-700">{hotelData.location}</p>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="border rounded-lg p-6 shadow-lg sticky top-8">
            <h3 className="text-2xl font-semibold mb-4">₹{hotelData.price} <span className="text-base font-normal text-gray-500">night</span></h3>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {startDate ? startDate.toLocaleDateString() : 'Select date'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select check-in date</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border"
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {endDate ? endDate.toLocaleDateString() : 'Select date'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Select check-out date</DialogTitle>
                    </DialogHeader>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="rounded-md border"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select title='gender' className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Male</option>
                <option>Female</option>
                <option>others</option>
            
              </select>
            </div>
            <Link href="/payment">
            <Button className="w-full mb-4">Reserve</Button>
            </Link>
            <p className="text-center text-gray-500 text-sm">You won&apos;t be charged yet</p>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span>₹{hotelData.price} x 5 nights</span>
                <span>₹{hotelData.price * 5}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Cleaning fee</span>
                <span>₹75</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Service fee</span>
                <span>₹100</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{hotelData.price * 5 + 75 + 100}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
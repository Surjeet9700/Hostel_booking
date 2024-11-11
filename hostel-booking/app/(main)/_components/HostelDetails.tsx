"use client"

import React, { useState, useEffect } from 'react'
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
import { mergeWithDefaults } from '../_data/mergeWithDefaults'
import { Spinner } from '@/components/Spinner'

type HostelDetailsProps = {
  id: string;
};

type Hostel = {
  id: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
  host: string;
  hostImage: string;
  beds: number;
  bathrooms: number;
  guests: number;
  price: number;
  description: string;
  amenities: string[];
  images: string[];
};

const HostelDetails = ({ id }: HostelDetailsProps) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [room, setRoom] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/hostels/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch room details: ${response.statusText}`);
        }
        const data = await response.json();
        const mergedData = mergeWithDefaults(data);
        setRoom(mergedData);
        console.log('Amenities:', mergedData.amenities); // Debugging line
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const calculateTotalDays = (start: Date | undefined, end: Date | undefined) => {
    if (!start || !end) return 0;
    const diffTime = end.getTime() - start.getTime();
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const totalDays = calculateTotalDays(startDate, endDate);
  const totalPrice = room ? room.price * totalDays + 75 + 100 : 0;

  if (loading) {
    return <div className='flex flex-col justify-center items-center h-screen'>
      <Spinner size='icon'/>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!room) {
    return <div>Room not found!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{room.title}</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-semibold mr-1">{room.rating}</span>
          <span className="text-gray-500 mr-2">({room.reviews} reviews)</span>
          <span className="text-gray-500">{room.location}</span>
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

      {/* Image Banner */}
      <div className="relative w-full h-[500px] mb-8">
        {room.images && room.images.length > 0 ? (
          <Carousel className="w-full h-full">
            <CarouselContent>
              {room.images.map((image, index) => (
                <CarouselItem key={index}>
                  <img src={image} alt={`Room view ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
            <span className="text-gray-700">No images available</span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{room.type} hosted by {room.host}</h2>
              <p className="text-gray-500"> {room.beds} beds · {room.bathrooms} bathrooms</p>
            </div>
            <img src={room.hostImage} alt={room.host} className="w-12 h-12 rounded-full" />
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">About this space</h3>
            <p className="text-gray-700">{room.description}</p>
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
            <ul className="grid grid-cols-2 gap-4">
              {room.amenities && room.amenities.length > 0 ? (
                room.amenities.slice(0, showAllAmenities ? undefined : 6).map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {amenity}
                  </li>
                ))
              ) : (
                <li>No amenities listed.</li>
              )}
            </ul>
            {room.amenities && room.amenities.length > 6 && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setShowAllAmenities(!showAllAmenities);
                  console.log('Show All Amenities:', !showAllAmenities);
                }}
              >
                {showAllAmenities ? (
                  <ChevronUp className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 mr-2" />
                )}
                {showAllAmenities ? 'Show less amenities' : `Show all ${room.amenities.length} amenities`}
              </Button>
            )}
          </div>

          <hr className="my-6" />

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            {/* You can integrate a map here */}
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-700">{room.location}</p>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="border rounded-lg p-6 shadow-lg sticky top-8">
            <h3 className="text-2xl font-semibold mb-4">₹{room.price} <span className="text-base font-normal text-gray-500">night</span></h3>
            <div className="flex mb-4">
              {/* Check-in */}
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
              {/* Check-out */}
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
            <Link href="/payment">
              <Button className="w-full mb-4">Reserve</Button>
            </Link>
            <p className="text-center text-gray-500 text-sm">You won&apos;t be charged yet</p>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span>₹{room.price} x {totalDays} night{totalDays !== 1 ? 's' : ''}</span>
                <span>₹{room.price * totalDays}</span>
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
                <span>₹{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
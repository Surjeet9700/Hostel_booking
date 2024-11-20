
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Star, Heart, Share, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from '@/components/ui/label';
import { useSelectedHostel } from '../_contexts/SelectedHostelContext'; // Added import
import { startOfToday, isBefore } from 'date-fns'; // Added import for date-fns
import MapView from './MapView';

type Hostel = {
  _id: string;
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
  images?: string[]; // Optional array
  image?: string;    // Optional single image
};




type HostelDetailsProps = {
  room: Hostel;
};

const HostelDetails: React.FC<HostelDetailsProps> = ({ room }) => {

  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const router = useRouter();
  const { addBooking, setSelectedHostel, startDate, setStartDate, endDate, setEndDate } = useSelectedHostel(); // Moved inside the component

  const today = startOfToday(); // Define today's date

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date && isBefore(date, today)) {
      alert("Check-in date cannot be in the past.");
      setStartDate(undefined);
    } else {
      setStartDate(date);
      // If endDate is before the new startDate, reset endDate
      if (endDate && date && isBefore(endDate, date)) {
        setEndDate(undefined);
      }
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && isBefore(date, startDate || today)) {
      alert("Check-out date cannot be before check-in date.");
      setEndDate(undefined);
    } else {
      setEndDate(date);
    }
  };

    // Helper functions
    const getRandomLatitude = (): number => {
      const minLat = 17.1000
      const maxLat = 17.7000
      return parseFloat((Math.random() * (maxLat - minLat) + minLat).toFixed(6))
    }
  
    const getRandomLongitude = (): number => {
      const minLng = 78.2000
      const maxLng = 78.7000
      return parseFloat((Math.random() * (maxLng - minLng) + minLng).toFixed(6))
    }
  
    // Generate random coordinates
    const randomLat = getRandomLatitude()
    const randomLng = getRandomLongitude()

  const calculateTotalDays = (start: Date | undefined, end: Date | undefined) => {
    if (!start || !end) return 0;
    const diffTime = end.getTime() - start.getTime();
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const totalDays = calculateTotalDays(startDate, endDate);
  const totalPrice = room ? room.price * totalDays + 75 + 100 : 0;

  // Prepare images array
  const images = room.images && room.images.length > 0 
    ? room.images 
    : room.image 
      ? [room.image] 
      : [];

  const handleReserve = () => {
    if (!startDate || !endDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const confirmationCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Create a new booking object
    const newBooking = {
      bookingId: uuidv4(), 
      hostelId: room._id,      
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalPrice,
      confirmationCode,       
    };
  
    // Add the booking to the context
    addBooking(newBooking);
  
    setSelectedHostel(room);
    router.push(`/payment?confirmationCode=${confirmationCode}`);
  };

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
      <div className="relative w-full h-[600px] mb-8">
        {images.length > 0 ? (
          <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-full"> 
                <img 
                  src={image} 
                  alt={`Room view ${index + 1}`} 
                  className="object-cover rounded-lg w-full h-[550px]"  
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No images available.</p>
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
            {/* integrate a map here */}
            <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <MapView 
                locations={[
                  {
                    lat: randomLat,        
                    lng: randomLng
                  }
                ]}
                marker={[randomLat, randomLng]}  
                center={[randomLat, randomLng]}  
                zoom={12} 
                className="w-full h-52" 
                showPriceMarkers={false}
              />
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
                <Label className="block text-sm font-medium text-gray-700 mb-1">Check-in</Label>
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
                      onSelect={handleStartDateSelect}
                      disabled={{ before: today }} 
                      className="rounded-md border"
                    />
                  </DialogContent>
                </Dialog>
              </div>
              {/* Check-out */}
              <div className="w-1/2 pl-2">
                <Label className="block text-sm font-medium text-gray-700 mb-1">Check-out</Label>
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
                      onSelect={handleEndDateSelect} 
                      disabled={{ before: startDate || today }} 
                      className="rounded-md border"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Button className="w-full mb-4" onClick={handleReserve}>Reserve</Button>
            <p className="text-center text-gray-500 text-sm">You wont be charged yet</p>
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
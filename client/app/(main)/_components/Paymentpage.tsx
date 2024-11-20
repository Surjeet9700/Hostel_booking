"use client";

import React, { useState } from 'react';
import { ChevronLeft, Star, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelectedHostel } from '../_contexts/SelectedHostelContext';
import { v4 as uuidv4 } from 'uuid';
import MapView from './MapView';

// TypeScript Interfaces
interface Booking {
  bookingId: string;
  hostelId: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  totalPrice: number;
  confirmationCode: string;
}

const PaymentPage: React.FC = () => {
  const { selectedHostel, startDate, endDate, addBooking } = useSelectedHostel();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
  });

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

  if (!selectedHostel || !startDate || !endDate) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Go back to previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">No Hostel Selected</h1>
        </div>
        <p className="text-center text-gray-500">Please select a hostel and valid dates before proceeding to payment.</p>
      </div>
    );
  }

  const {
    _id, 
    title,
    price,
    images,
    description,
    location,
    host,
    hostImage,
    amenities,
    rating,
    reviews
  } = selectedHostel;

  const calculateTotalDays = (start: Date, end: Date) => {
    const diffTime = end.getTime() - start.getTime();
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
  };

  const totalDays = calculateTotalDays(startDate, endDate);
  const totalPrice = price * totalDays + 75 + 100; // Example fees

  // Validation function for payment details
  const validate = () => {
    let valid = true;
    const newErrors = { cardNumber: '', expiry: '', cvc: '', name: '' };

    // Validate Card Number
    const cardRegex = /^\d{16}$/;
    if (!cardRegex.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
      valid = false;
    }

    // Validate Expiry Date
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      newErrors.expiry = 'Expiry date must be in MM/YY format.';
      valid = false;
    } else {
      const [month, year] = expiry.split('/').map(Number);
      const expiryDate = new Date(2000 + year, month);
      const currentDate = new Date();
      if (expiryDate < currentDate) {
        newErrors.expiry = 'Expiry date cannot be in the past.';
        valid = false;
      }
    }

    // Validate CVC
    const cvcRegex = /^\d{3}$/;
    if (!cvcRegex.test(cvc)) {
      newErrors.cvc = 'CVC must be 3 digits.';
      valid = false;
    }

    // Validate Name
    if (name.trim() === '') {
      newErrors.name = 'Name on card is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle payment submission
  const handlePayment = () => {
    if (validate()) {
      // Create a new booking object
      const newBooking: Booking = {
        bookingId: uuidv4(),
        hostelId: selectedHostel._id, // Changed from 'id' to '_id'
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalPrice,
        confirmationCode: generateConfirmationCode(),
      };

      // Add the new booking to context
      addBooking(newBooking);
      console.log('New Booking Added:', newBooking); // Debugging

      router.push(`/booking-confirmation?confirmationCode=${newBooking.confirmationCode}`);
    }
  };

  // Generate a confirmation code
  const generateConfirmationCode = () => {
    return uuidv4().split('-').join('').substring(0, 8).toUpperCase();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.push(`/hostel/${_id}`)} // Changed from 'id' to '_id'
          className="p-1 rounded-full hover:bg-gray-200"
          aria-label="Go back to hostel details"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">Confirm and Pay</h1>
      </div>

      <div className="grid md:grid-cols-[1fr,380px] gap-8">
        {/* Hostel Details */}
        <div className="space-y-6">
          {/* Hostel Images */}
          {images && images.length > 0 && (
            <div className="relative w-full h-96 mb-4">
              <Carousel showArrows={true} showThumbs={false} infiniteLoop={true}>
                {images.map((image, index) => (
                  <div key={index} className="relative w-full h-full">
                    <img 
                      src={image} 
                      alt={`Room view ${index + 1}`} 
                      className="object-cover rounded-lg w-full h-full"  
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}

          {/* Hostel Title and Rating */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{rating}</span>
              <span className="text-gray-500 ml-1">({reviews} reviews)</span>
            </div>
          </div>

          {/* Host Information */}
          <div className="flex items-center mb-4">
            <img src={hostImage} alt={host} className="w-10 h-10 rounded-full mr-3" />
            <span className="text-gray-700">Hosted by {host}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About this space</h3>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Amenities</h3>
            <ul className="grid grid-cols-2 gap-4">
              {amenities && amenities.length > 0 ? (
                amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {amenity}
                  </li>
                ))
              ) : (
                <li>No amenities listed.</li>
              )}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <div className="h-54 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
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
            <p className="text-gray-700">{location}</p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="border rounded-lg p-6 shadow">
            <h3 className="text-2xl font-semibold mb-4">Payment Summary</h3>
            <div className="flex justify-between mb-2">
              <span>₹{price} x {totalDays} night{totalDays !== 1 ? 's' : ''}</span>
              <span>₹{price * totalDays}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Cleaning fee</span>
              <span>₹25</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service fee</span>
              <span>₹50</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border rounded-lg p-6 shadow">
            <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={errors.cardNumber ? 'border-red-500' : ''}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
              </div>

              {/* Expiry Date and CVC */}
              <div className="flex gap-4">
                {/* Expiry Date */}
                <div className="flex-1">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className={errors.expiry ? 'border-red-500' : ''}
                  />
                  {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                </div>

                {/* CVC */}
                <div className="flex-1">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className={errors.cvc ? 'border-red-500' : ''}
                  />
                  {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                </div>
              </div>

              {/* Name on Card */}
              <div>
                <Label htmlFor="name">Name on Card</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
            </div>

            {/* Pay Button */}
            <Button className="w-full mt-6" onClick={handlePayment}>
              Pay ₹{totalPrice}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
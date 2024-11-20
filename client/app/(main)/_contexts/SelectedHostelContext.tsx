// _contexts/SelectedHostelContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Booking interface with cancellation details
export interface Booking {
  bookingId: string;
  hostelId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  confirmationCode: string;
  status?: 'active' | 'canceled'; 
  cancellationReason?: string; 
};

// Hostel type definition
export type Hostel = {
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
  images?: string[];
  image?: string;
};

// Context type including the cancelBooking function
type SelectedHostelContextType = {
  bookings: Booking[];
  cancelBooking: (id: string, reason: string) => void;
  selectedHostel: Hostel | null;
  setSelectedHostel: (hostel: Hostel | null) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  addBooking: (booking: Booking) => void;
  removeBooking: (bookingId: string) => void;
  hostels: Hostel[];
  setHostels: (hostels: Hostel[]) => void;
};

// Create the context
const SelectedHostelContext = createContext<SelectedHostelContextType | undefined>(undefined);

// Provider component
export const SelectedHostelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hostels, setHostels] = useState<Hostel[]>([]);

  // Load bookings and hostels from localStorage on mount
  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        const parsedBookings: Booking[] = JSON.parse(storedBookings);
        setBookings(parsedBookings);
      } catch (error) {
        console.error("Failed to parse bookings from localStorage:", error);
        localStorage.removeItem('bookings');
      }
    }

    // **Modified Section Starts Here**
    // Always fetch the latest hostels data to prevent using stale data
    const fetchHostels = async () => {
      try {
        const response = await fetch('/api/hostels', { cache: 'no-store' }); // Prevent caching
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Hostel[] = await response.json();
        setHostels(data);
        localStorage.setItem('hostels', JSON.stringify(data));
        console.log('Fetched Hostels:', data); // Debugging
      } catch (error) {
        console.error("Error fetching hostels:", error);
        // Optionally, you can set hostels to an empty array or keep existing data
        setHostels([]);
      }
    };

    fetchHostels();
    // **Modified Section Ends Here**
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Save hostels to localStorage whenever they change
  useEffect(() => {
    if (hostels.length > 0) {
      localStorage.setItem('hostels', JSON.stringify(hostels));
    }
  }, [hostels]);

  // Function to add a new booking
  const addBooking = (booking: Booking) => {
    console.log("Adding Booking:", booking);
    setBookings(prev => [...prev, booking]);
  };

  // Function to remove a booking by its bookingId
  const removeBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.bookingId !== bookingId));
  };

  // Function to cancel a booking with a reason
  const cancelBooking = (bookingId: string, reason: string) => {
    setBookings(prev => 
      prev.map(b => 
        b.bookingId === bookingId 
          ? { ...b, status: 'canceled', cancellationReason: reason } 
          : b
      )
    );
  };

  return (
    <SelectedHostelContext.Provider value={{
      bookings,
      cancelBooking,
      selectedHostel,
      setSelectedHostel,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      addBooking,
      removeBooking,
      hostels,
      setHostels
    }}>
      {children}
    </SelectedHostelContext.Provider>
  );
};

// Custom hook to use the SelectedHostelContext
export const useSelectedHostel = () => {
  const context = useContext(SelectedHostelContext);
  if (!context) {
    throw new Error('useSelectedHostel must be used within a SelectedHostelProvider');
  }
  return context;
};
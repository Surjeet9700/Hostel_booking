// _contexts/SelectedHostelContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Booking interface with cancellation and confirmation details
export interface Booking {
  bookingId: string;
  hostelId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  confirmationCode: string;
  status?: 'active' | 'confirmed' | 'canceled'; // Added 'confirmed'
  cancellationReason?: string;
}

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

// Context type including the cancelBooking and confirmBooking functions
type SelectedHostelContextType = {
  bookings: Booking[];
  cancelBooking: (id: string, reason: string, shouldPersist?: boolean) => void;
  confirmBooking: (id: string, shouldPersist?: boolean) => void; // Added confirmBooking
  selectedHostel: Hostel | null;
  setSelectedHostel: (hostel: Hostel | null) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  addBooking: (booking: Booking, shouldPersist?: boolean) => void;
  removeBooking: (bookingId: string, shouldPersist?: boolean) => void;
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
    // Load bookings
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        const parsedBookings: Booking[] = JSON.parse(storedBookings);
        setBookings(parsedBookings);
        console.log("Loaded Bookings from localStorage:", parsedBookings); // Debugging
      } catch (error) {
        console.error("Failed to parse bookings from localStorage:", error);
        localStorage.removeItem('bookings');
      }
    }

    // Load hostels or fetch from API
    const storedHostels = localStorage.getItem('hostels');
    if (storedHostels) {
      try {
        const parsedHostels: Hostel[] = JSON.parse(storedHostels);
        setHostels(parsedHostels);
        console.log("Loaded Hostels from localStorage:", parsedHostels); // Debugging
      } catch (error) {
        console.error("Failed to parse hostels from localStorage:", error);
        localStorage.removeItem('hostels');
        fetchHostels();
      }
    } else {
      // Fetch hostels from an API or define them statically
      fetchHostels();
    }

    // Function to fetch hostels from API
    async function fetchHostels() {
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
    }
  }, []);

  // Function to add a new booking
  const addBooking = (booking: Booking, shouldPersist: boolean = true) => {
    console.log("Adding Booking:", booking); // Debugging
    setBookings(prev => {
      // Check for duplicate bookingId to prevent duplicates
      const isDuplicate = prev.some(b => b.bookingId === booking.bookingId);
      if (isDuplicate) {
        console.warn(`Booking with ID ${booking.bookingId} already exists. Skipping addition.`);
        return prev;
      }

      const updatedBookings: Booking[] = [...prev, booking];
      console.log("Updated Bookings:", updatedBookings); // Debugging

      if (shouldPersist) {
        try {
          localStorage.setItem('bookings', JSON.stringify(updatedBookings));
          console.log("Saved Bookings to localStorage:", updatedBookings); // Debugging
        } catch (error) {
          console.error("Failed to save bookings to localStorage:", error);
        }
      }

      return updatedBookings;
    });
  };

  // Function to remove a booking by its bookingId
  const removeBooking = (bookingId: string, shouldPersist: boolean = true) => {
    console.log(`Removing Booking with ID: ${bookingId}`); // Debugging
    setBookings(prev => {
      const updatedBookings: Booking[] = prev.filter(b => b.bookingId !== bookingId);
      console.log("Updated Bookings after Removal:", updatedBookings); // Debugging

      if (shouldPersist) {
        try {
          localStorage.setItem('bookings', JSON.stringify(updatedBookings));
          console.log("Saved Bookings to localStorage:", updatedBookings); // Debugging
        } catch (error) {
          console.error("Failed to save bookings to localStorage:", error);
        }
      }

      return updatedBookings;
    });
  };

  // Function to cancel a booking with a reason
  const cancelBooking = (bookingId: string, reason: string, shouldPersist: boolean = true) => {
    console.log(`Canceling Booking with ID: ${bookingId} for Reason: ${reason}`); // Debugging
    setBookings(prev => {
      const updatedBookings: Booking[] = prev.map(b =>
        b.bookingId === bookingId
          ? { ...b, status: 'canceled', cancellationReason: reason }
          : b
      );
      console.log("Updated Bookings after Cancellation:", updatedBookings); // Debugging

      if (shouldPersist) {
        try {
          localStorage.setItem('bookings', JSON.stringify(updatedBookings));
          console.log("Saved Bookings to localStorage:", updatedBookings); // Debugging
        } catch (error) {
          console.error("Failed to save bookings to localStorage:", error);
        }
      }

      return updatedBookings;
    });
  };

  // Function to confirm a booking
  const confirmBooking = (bookingId: string, shouldPersist: boolean = true) => {
    console.log(`Confirming Booking with ID: ${bookingId}`); // Debugging
    setBookings(prev => {
      const updatedBookings: Booking[] = prev.map(b =>
        b.bookingId === bookingId
          ? { ...b, status: 'confirmed' }
          : b
      );
      console.log("Updated Bookings after Confirmation:", updatedBookings); // Debugging

      if (shouldPersist) {
        try {
          localStorage.setItem('bookings', JSON.stringify(updatedBookings));
          console.log("Saved Bookings to localStorage:", updatedBookings); // Debugging
        } catch (error) {
          console.error("Failed to save bookings to localStorage:", error);
        }
      }

      return updatedBookings;
    });
  };

  return (
    <SelectedHostelContext.Provider value={{
      bookings,
      cancelBooking,
      confirmBooking, // Added confirmBooking
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
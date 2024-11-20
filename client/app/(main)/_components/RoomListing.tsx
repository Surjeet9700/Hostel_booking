"use client"

import React, { useState, useEffect } from 'react'
import { Star, Heart, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from '@/components/Spinner'
import { useSearch } from '@/components/providers/SearchContext';
import Categories, { Category } from './Categories'
import Image from 'next/image'
import MapView from './MapView'

type Room = {
  _id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  type: string;
  beds: number;
  location: string; 
};

export default function RoomListing() {
  const { searchQuery } = useSearch();
  const [showMap, setShowMap] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000]) // Adjusted default price range
  const [roomListings, setRoomListings] = useState<Room[]>([]);
  const [filteredRoomListings, setFilteredRoomListings] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Manage activeCategory state
  const [activeCategory, setActiveCategory] = useState<string>('1'); // Default to first category

  useEffect(() => {
    const fetchRoomListings = async () => {
      try {
        const response = await fetch('/api/hostels');
        console.log('Response status:', response.status); // Log response status
        if (!response.ok) {
          throw new Error(`Failed to fetch room listings: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data
        setRoomListings(data);
        setFilteredRoomListings(data);
      } catch (error) {
        console.error('Error fetching room listings:', error); // Log error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoomListings();
  }, []);

  // Utility functions to generate random coordinates within Telangana
  const getRandomLatitude = (): number => {
    // Generates a random latitude between 16.7 and 19.5
    return parseFloat((Math.random() * (19.5 - 16.7) + 16.7).toFixed(6));
  }
  
  const getRandomLongitude = (): number => {
    // Generates a random longitude between 77.2 and 80.2
    return parseFloat((Math.random() * (80.2 - 77.2) + 77.2).toFixed(6));
  }

  useEffect(() => {
    console.log('Applying filters with search query:', searchQuery, 'and activeCategory:', activeCategory); // Log search query and activeCategory
    const applyFilters = () => {
      let filtered = roomListings;

      // Define categories array (should match Categories.tsx)
      const categories: Category[] = [
        { id: '1', name: 'Gachibowli', icon: 'Gachibowli' },
        { id: '2', name: 'Banjara Hills', icon: 'Banjara Hills' },
        { id: '3', name: 'Hitech City', icon: 'Hitech City' },
        { id: '4', name: 'Charminar', icon: 'Charminar' },
        { id: '5', name: 'Jubilee Hills', icon: 'Jubilee Hills' },
        { id: '6', name: 'Kondapur', icon: 'Kondapur' },
        { id: '7', name: 'Begumpet', icon: 'Begumpet' },
        { id: '8', name: 'Secunderabad', icon: 'Secunderabad' },
        { id: '9', name: 'Hussain Sagar', icon: 'Hussain Sagar' },
        { id: '10', name: 'Shamshabad', icon: 'Shamshabad' },
      ];

      // Filter by active category (location)
      if (activeCategory) {
        const selectedCategory = categories.find(cat => cat.id === activeCategory);
        if (selectedCategory) {
          filtered = filtered.filter(room => room.location === selectedCategory.name);
          console.log(`Filtered by category (${selectedCategory.name}):`, filtered);
        }
      }

      // Filter by price range
      filtered = filtered.filter(room => {
        const isWithinPriceRange = room.price >= priceRange[0] && room.price <= priceRange[1];
        console.log(`Room ${room.title} with price ${room.price} is within price range: ${isWithinPriceRange}`);
        return isWithinPriceRange;
      });

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(room => {
          const matchesSearchQuery = room.title.toLowerCase().includes(searchQuery.toLowerCase());
          console.log(`Room ${room.title} matches search query: ${matchesSearchQuery}`);
          return matchesSearchQuery;
        });
      }

      console.log('Final filtered data:', filtered); // Log final filtered data
      setFilteredRoomListings(filtered);
      setCurrentPage(1); // Reset to first page on filter change
    };

    applyFilters();
  }, [priceRange, searchQuery, roomListings, activeCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedRoomListings = filteredRoomListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log('Paginated data:', paginatedRoomListings); // Log paginated data

  if (loading) {
    return <div className='flex flex-col justify-center items-center h-screen'>
      <Spinner size='icon' />
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        {/* Pass activeCategory and setActiveCategory to Categories */}
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter rooms</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <h3 className="font-medium mb-2">Price range</h3>
              <Slider
                min={0}
                max={5000}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
              {/* Add more filter options here */}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedRoomListings.map((room) => (
          <Link key={room._id} href={`/rooms/${room._id}`}>
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <div className="relative">
                <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Image 
                    src={room.image} 
                    alt={room.title}
                    fill
                    className="object-cover rounded-lg w-full h-48"
                    priority
                  />
                </div>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">{room.title}</h2>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{room.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 mb-2">{room.type} · {room.beds} bed{room.beds > 1 ? 's' : ''}</p>
                <p className="font-semibold">₹{room.price} / night</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-2">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <span className="flex items-center px-4 py-2">
          Page {currentPage} of {Math.ceil(filteredRoomListings.length / itemsPerPage)}
        </span>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredRoomListings.length / itemsPerPage)}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

       {/* Map Toggle Button */}
       <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </Button>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="mt-8 border flex justify-center items-center rounded-lg overflow-hidden h-[400px]">
          <MapView 
            locations={filteredRoomListings.map(room => ({
              lat: getRandomLatitude(),
              lng: getRandomLongitude(),
              price: room.price
            }))}
            center={[17.3850, 78.4867]} 
            zoom={8} 
            showPriceMarkers={true} 
            className="w-full h-96"                  
          />
        </div>
      )}
    </div>
  )
}
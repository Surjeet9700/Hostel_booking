"use client"


import React, { useState } from 'react'
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

// Mock data for room listings
const roomListings = [
  {
    id: 1,
    title: "Cozy Studio in Downtown",
    image: "/placeholder.svg?height=200&width=300",
    price: 75,
    rating: 4.8,
    reviews: 120,
    type: "Entire apartment",
    beds: 1,
  },
  {
    id: 2,
    title: "Luxurious Penthouse with City View",
    image: "/placeholder.svg?height=200&width=300",
    price: 200,
    rating: 4.9,
    reviews: 85,
    type: "Entire apartment",
    beds: 2,
  },
  {
    id: 3,
    title: "Charming Cottage near the Beach",
    image: "/placeholder.svg?height=200&width=300",
    price: 120,
    rating: 4.7,
    reviews: 95,
    type: "Entire house",
    beds: 3,
  },
  {
    id: 4,
    title: "Modern Loft in Arts District",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.6,
    reviews: 70,
    type: "Entire loft",
    beds: 2,
  },
  {
    id: 5,
    title: "Modern Loft in Arts District",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.6,
    reviews: 70,
    type: "Entire loft",
    beds: 2,
  },
  {
    id: 6,
    title: "Modern Loft in Arts District",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.6,
    reviews: 70,
    type: "Entire loft",
    beds: 2,
  },
  {
    id: 7,
    title: "Modern Loft in Arts District",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.6,
    reviews: 70,
    type: "Entire loft",
    beds: 2,
  },
  {
    id: 8,
    title: "Modern Loft in Arts District",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.6,
    reviews: 70,
    type: "Entire loft",
    beds: 2,
  },
  {
    id: 9,
    title: "Modern Loft in Arts District",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.6,
    reviews: 70,
    type: "Entire loft",
    beds: 2,
  },
  {
    id: 10,
    title: "Modern Loft in Arts District",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.6,
    reviews: 70,
    type: "Entire loft",
    beds: 2,
  },
  // Add more mock listings as needed
]

export default function RoomListing() {
  const [showMap, setShowMap] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">300+ stays in New York</h1>
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
                max={1000}
                step={10}
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
      {roomListings.map((room) => (
        <Link key={room.id} href={`/rooms`}>
          <div className="border rounded-lg overflow-hidden">
            <div className="relative">
              <img src={room.image} alt={room.title} className="w-full h-48 object-cover" />
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

      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="mr-2">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button variant="outline">
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? 'Hide map' : 'Show map'}
        </Button>
      </div>

      {showMap && (
        <div className="mt-8 border rounded-lg overflow-hidden h-96">
          {/* Replace this with an actual map component */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Map view (placeholder)</span>
          </div>
        </div>
      )}
    </div>
  )
}
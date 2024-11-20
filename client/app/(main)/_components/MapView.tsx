// MapView.tsx

'use client'

import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Button } from "@/components/ui/button"
import { List } from 'lucide-react'

interface Location {
  lat: number
  lng: number
  price?: number
}

interface MapViewProps {
  locations: Location[]
  center?: [number, number]
  zoom?: number
  marker?: [number, number] // Corrected prop name
  className?: string // Added for custom Tailwind CSS
  showPriceMarkers?: boolean // New prop to control marker rendering
}

// Define an interface to include _getIconUrl
interface IconDefaultPrototype {
  _getIconUrl?: string
}

const MapView: React.FC<MapViewProps> = ({
  locations,
  center = [17.3850, 78.4867], // Default center set to Hyderabad, Telangana
  zoom = 10,
  marker,
  className = 'w-full h-96', // Default height and width, can be overridden
  showPriceMarkers = false // Default to false
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const [showList, setShowList] = useState(false)

  // Define the default Leaflet icon if not already defined
  useEffect(() => {
    // Fix for default icon images not showing in certain build setups
    delete (L.Icon.Default.prototype as IconDefaultPrototype)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView(center, zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      mapInstanceRef.current = map
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [center, zoom])

  useEffect(() => {
    const map = mapInstanceRef.current
    if (map) {
      // Clear all existing markers except the tile layer
      map.eachLayer((layer) => {
        if ((layer as L.Marker).getLatLng && !(layer instanceof L.TileLayer)) {
          map.removeLayer(layer)
        }
      })

      // Re-add the tile layer after clearing markers
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      // Conditionally add custom price markers
      if (showPriceMarkers) {
        locations.forEach((location) => {
          const icon = L.divIcon({
            className: 'custom-icon',
            html: `<div class="bg-white text-black px-2 py-1 rounded-full shadow-md">
                     <span class="text-sm font-semibold">₹${location.price?.toLocaleString('en-IN')}</span>
                   </div>`,
            iconSize: [100, 40],
            iconAnchor: [50, 20],
          })

          L.marker([location.lat, location.lng], { icon })
            .addTo(map)
            .bindPopup(`<b>₹${location.price?.toLocaleString('en-IN')}</b>`)
        })
      }

      // Add the main marker if provided
      if (marker) {
        const mainIcon = L.icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Use a valid image URL or your custom icon
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          shadowSize: [41, 41]
        })

        L.marker(marker, { icon: mainIcon })
          .addTo(map)
          .bindPopup('<b>Hostel Location</b>')
          .openPopup()
      }
    }
  }, [locations, marker, showPriceMarkers])

  const handleLocationClick = (location: Location) => {
    const map = mapInstanceRef.current
    if (map) {
      map.setView([location.lat, location.lng], 12)
      setShowList(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full" />

      {/* Toggle Button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          variant="default"
          className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          onClick={() => setShowList(!showList)}
        >
          <List className="mr-2 h-4 w-4" />
          {showList ? 'Hide List' : 'Show List'}
        </Button>
      </div>

      {/* Location List */}
      {showList && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-lg p-4 z-50">
          <ul className="space-y-2">
            {locations.map((location, index) => (
              <li
                key={index}
                className="flex justify-between items-center cursor-pointer hover:bg-muted p-2 rounded"
                onClick={() => handleLocationClick(location)}
              >
                <span>Location {index + 1}</span>
                <span className="font-semibold">
                  ₹{location.price?.toLocaleString('en-IN') || 'N/A'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MapView
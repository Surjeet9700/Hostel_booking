// components/Categories.tsx
"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { MapPin, Home, Building, Coffee, ShoppingCart, Castle, Trees, Flame, Wind, GlassWater, Mountain, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from "react"

const iconMap = {
  'Gachibowli': Building,
  'Banjara Hills': Home,
  'Hitech City': MapPin,
  'Charminar': Castle,
  'Jubilee Hills': Trees,
  'Kondapur': ShoppingCart,
  'Begumpet': Coffee,
  'Secunderabad': Wind,
  'Hussain Sagar': GlassWater,
  'Shamshabad': Flame,
  'default': Mountain,
}

export interface Category {
  id: string
  name: string
  icon?: keyof typeof iconMap
}

interface CategoriesProps {
  categories?: Category[]
  activeCategory: string
  setActiveCategory: (id: string) => void
}

export default function Categories({ 
  categories = [
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
  ],
  activeCategory,
  setActiveCategory
}: CategoriesProps) {
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current
        setShowRightArrow(scrollWidth > clientWidth && scrollWidth - clientWidth - scrollLeft > 10)
      }
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current
      setShowRightArrow(scrollWidth > clientWidth && scrollWidth - clientWidth - scrollLeft > 10)
    }
  }

  return (
    <div className="relative w-full border-b">
      <div className="flex items-center justify-between px-4">
        <ScrollArea 
          className="w-full whitespace-nowrap" 
          onScroll={handleScroll}
          ref={scrollContainerRef}
        >
          <div className="flex w-max space-x-6 py-4 px-2">
            {categories.map((category) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || iconMap.default
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="group relative flex flex-col items-center justify-center gap-2"
                >
                  <div className={cn(
                    "flex flex-col items-center gap-2 px-1 transition-colors duration-200",
                    activeCategory === category.id ? "text-primary" : "text-muted-foreground"
                  )}>
                    <Icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className={cn(
                    "absolute bottom-0 left-0 h-0.5 w-full -mb-4 transition-all duration-200",
                    activeCategory === category.id ? "bg-primary scale-100" : "scale-0"
                  )} />
                </button>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
      
      {showRightArrow && (
        <div className="absolute right-[120px] top-1/2 -translate-y-1/2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      )}
    </div>
  )
}
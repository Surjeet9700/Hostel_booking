"use client"
import { ChevronLeft, Star, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import Image from 'next/image'

export default function PaymentPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/room">
        <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-semibold">Confirm and pay</h1>
      </div>

      <div className="grid md:grid-cols-[1fr,380px] gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-5 w-5 text-teal-600" />
            <div>
              <p>Hi, you&apos;re logged in</p>
              <p className="text-gray-500">Review your booking details to continue.</p>
            </div>
          </div>

          <div className="border rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <div>
                <p className="font-semibold mb-1">Good price.</p>
                <p className="text-sm text-gray-600">
                  Your dates are ₹3,798 less than the avg. nightly rate over the last 3 months.
                </p>
              </div>
              <div className="text-rose-500">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0L16 8L8 16L0 8L8 0Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your trip</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">Dates</h3>
                  <p className="text-gray-600">11-16 Nov</p>
                </div>
                <Button variant="link" className="text-gray-600">Edit</Button>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">Check-in time</h3>
                  <p className="text-gray-600">3:00 pm – 5:00 pm</p>
                </div>
                <Button variant="link" className="text-gray-600">Edit</Button>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">Guests</h3>
                  <p className="text-gray-600">1 guest</p>
                </div>
                <Button variant="link" className="text-gray-600">Edit</Button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Pay with</h2>
            <div className="space-y-4">
              <Select defaultValue="credit">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">Credit or debit card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="card">Card number</Label>
                  <Input id="card" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiration</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" placeholder="Enter postcode" />
                </div>
                <Select defaultValue="in">
                  <SelectTrigger>
                    <SelectValue placeholder="Select country/region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Required for your trip</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <div className="flex gap-2">
                  <Input id="phone" placeholder="Add" className="max-w-[200px]" />
                  <Button variant="outline">Add</Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Add and confirm your phone number to get trip updates.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Cancellation policy</h2>
            <p className="text-gray-600 mb-1">This reservation is non-refundable.</p>
            <Button variant="link" className="text-gray-600 px-0">Learn more</Button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Ground rules</h2>
            <p className="text-gray-600 mb-4">We ask every guest to remember a few simple things about what makes a great guest.</p>
            <ul className="text-gray-600 space-y-1">
              <li>• Follow the house rules</li>
              <li>• Treat your Host&apos;s home like your own</li>
            </ul>
          </div>
          <Link href="/success">
          <Button className="w-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white">
            Confirm and pay
          </Button>
          </Link>
        </div>

        <div className="border rounded-2xl p-6 h-fit sticky top-8">
          <div className="flex gap-4 pb-6 border-b">
            <Image
              src="/placeholder.svg"
              alt="Property"
              className="w-28 h-20 object-cover rounded-lg"
              height={80}
              width={120}
            />
            <div>
              <p className="text-sm text-gray-600">Entire bungalow</p>
              <h3 className="font-semibold">Sky Villa-Luxury lakeview Bungalow in City Center</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm">5.00 (3 reviews) • </span>
                <span className="text-sm">⚡ Superhost</span>
              </div>
            </div>
          </div>

          <div className="py-6">
            <h3 className="font-semibold mb-4">Price details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>₹22,950 × 5 nights</span>
                <span>₹114,750</span>
              </div>
              <div className="flex justify-between">
                <span>Airbnb service fee</span>
                <span>₹16,200.06</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹20,655</span>
              </div>
              <div className="pt-3 border-t flex justify-between font-semibold">
                <span>Total (INR)</span>
                <span>₹151,605.06</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
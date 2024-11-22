// ChatInterface.tsx

'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi, how can I help you with your hostel booking today?",
      sender: 'bot'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    if (message.includes('price')) {
      return "Our hostel prices start at ₹500 per night. Would you like to know more details?"
    }
    if (message.includes('availability')) {
      return "I can check the availability for you. Please provide your check-in and check-out dates."
    }
    if (message.includes('amenities')) {
      return "We offer free Wi-Fi, breakfast, laundry services, and a common lounge area."
    }
    if (message.includes('location')) {
      return "Our hostel is located in the heart of the city, close to major attractions and public transport."
    }
    return "I'm here to help with any questions you have about your hostel booking. How can I assist you further?"
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim()) return

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setInputMessage('')

    // Bot response based on user message
    setTimeout(() => {
      const responseText = getBotResponse(inputMessage)
      const botResponse: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot'
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>HD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">Hostel Support</div>
            <div className="text-sm text-muted-foreground">Always here to help</div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </Card>
  )
}
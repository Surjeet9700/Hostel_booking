import BookingConfirmation from "../../_components/BookingConfirmation"

const page = () => {
    const bookingDetails = {
        guestName: "John Doe",
        propertyName: "Luxury Beachfront Villa",
        hostName: "Jane Smith",
        checkInDate: "Aug 15, 2023",
        checkOutDate: "Aug 20, 2023",
        checkInTime: "3:00 PM",
        checkOutTime: "11:00 AM",
        guests: 2,
        location: "Bali, Indonesia",
        imageUrl: "/placeholder.svg?height=96&width=96",
        confirmationCode: "HMZYK52269"
      }
  return (
    <div className="min-h-full flex flex-col ">
       <BookingConfirmation {...bookingDetails}/>
    </div>
  )
}


export default page
import RoomListing from "../../_components/RoomListing"


const page = () => {
  return (
    <div className="min-h-full flex flex-col ">
    <div className="flex flex-col items-center justify-center
     text-center gap-y-8 px-6 pb-10">
      <RoomListing/>
    </div>
    </div>
  )
}

export default page
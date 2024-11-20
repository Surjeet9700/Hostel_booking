
import HostelDetails from "@/app/(main)/_components/HostelDetails";

// Define the type for the room data
type Hostel = {
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
  images?: string[]; // Optional array of images
  image?: string;    // Optional single image
};

type Props = {
  params: {
    id: string;
  };
};

const RoomPage = async ({ params }: Props) => {
  const { id } = params;

  try {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hostels/${id}`, {
      // Optionally configure caching
      // cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch room details: ${response.statusText}`);
    }

    const room: Hostel = await response.json();

    console.log("RoomPage - Fetched room:", room); 

    
    const transformedRoom = {
      ...room,
      images: room.images && room.images.length > 0 ? room.images : room.image ? [room.image] : [],
    };

    return <HostelDetails room={transformedRoom} />;
    
  } catch (error: unknown) {
    console.error("RoomPage - Error fetching room:", error); 
    return <div>Error loading hostel details</div>;
  }
};

export default RoomPage;
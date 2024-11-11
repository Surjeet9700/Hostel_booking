type Hostel = {
    id: string;
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
    images: string[];
  };
  
  const defaultHostel: Hostel = {
    id: '',
    title: 'Default Title',
    location: 'Hyd Telangana',
    rating: 0,
    reviews: 0,
    type: 'Default Type',
    host: 'Default Host',
    hostImage: '/placeholder.svg?height=50&width=50',
    beds: 1,
    bathrooms: 1,
    guests: 1,
    price: 0,
    description: 'A cozy and compact studio apartment located in the prime area of Jubilee Hills. Perfect for solo travelers or couples who want a comfortable, stylish stay.',
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Heating', 'TV'],
    images: ['/placeholder.svg?height=400&width=600'],
  };
  
  export const mergeWithDefaults = (data: Partial<Hostel>): Hostel => {
    return { ...defaultHostel, ...data };
  };
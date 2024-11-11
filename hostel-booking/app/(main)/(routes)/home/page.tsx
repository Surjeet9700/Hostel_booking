"use client"

import RoomListing from "../../_components/RoomListing";
import { useContext } from 'react';
import { SearchContext } from '@/components/providers/SearchContext';

const Page = () => {
  const { searchQuery } = useContext(SearchContext);

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 px-6 pb-10">
        <RoomListing searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Page;
import { Menu, Search, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Logo } from '@/app/(markting)/_components/Logo'
import { UserButton } from '@clerk/clerk-react'
import Link from 'next/link'
import { useSearch } from '@/components/providers/SearchContext';

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    console.log('Search query updated:', event.target.value); // Log search query
  };

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href='/home'>
              <Logo />
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden sm:block flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Start your search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                className="absolute right-0 top-0 mt-2 mr-3 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right side menu */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="ml-2" aria-label="Change language">
              <Globe className="h-5 w-5" />
            </Button>

            {/* User menu dropdown */}
            <Button variant="outline" size="icon" className="ml-2 w-20 border-gray-300">
              <Menu className="h-5 w-5" />
              <div className='h-5 w-5'>
                <UserButton />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="sm:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Start your search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full border rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            className="absolute right-0 top-0 mt-2 mr-3 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  )
}
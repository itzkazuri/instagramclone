'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';

export function MobileExploreSearch() {
  const [isExplorePage, setIsExplorePage] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on the explore page
    setIsExplorePage(pathname === '/explore');
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  if (!isExplorePage) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-40 p-2 md:hidden">
      {showSearch ? (
        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 mr-2"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowSearch(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Explore</h1>
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
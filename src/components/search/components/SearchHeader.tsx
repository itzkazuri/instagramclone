import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchHeader = ({ searchQuery, setSearchQuery }: SearchHeaderProps) => (
  <div className="p-6 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b">
    <h2 className="text-3xl font-bold mb-6 text-gray-900">Search</h2>
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input 
        placeholder="Search accounts and tags..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-12 pr-4 py-3 text-lg rounded-xl border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 h-8 w-8"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  </div>
);
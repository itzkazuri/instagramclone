import { SearchResult } from "@/lib/dummy-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Link from "next/link";

interface SearchResultItemProps {
  result: SearchResult;
  isRecent?: boolean;
}

export const SearchResultItem = ({ result, isRecent = false }: SearchResultItemProps) => (
  <Link href={`/user/${result.username}`}>
    <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group rounded-lg mx-2">
      <div className="relative">
        <Avatar className="h-14 w-14 mr-4 ring-2 ring-gray-100 group-hover:ring-gray-200 transition-all">
          <AvatarImage src={result.avatar} alt={result.name} />
          <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {result.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {result.isVerified && (
          <div className="absolute -bottom-1 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-gray-900 truncate">{result.username}</p>
          {result.followerCount && result.followerCount > 10000 && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-100">
              {result.followerCount > 1000000 
                ? `${(result.followerCount / 1000000).toFixed(1)}M` 
                : `${(result.followerCount / 1000).toFixed(0)}K`}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600 truncate">{result.name}</p>
        {result.mutualFriends && (
          <p className="text-xs text-gray-500 mt-1">
            Followed by {result.mutualFriends} others
          </p>
        )}
      </div>
      {isRecent && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 h-8 w-8"
          onClick={(e) => {
            e.preventDefault();
            // Handle remove from recent
          }}
        >
          <X className="h-4 w-4 text-gray-400" />
        </Button>
      )}
    </div>
  </Link>
);
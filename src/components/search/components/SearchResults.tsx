import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Clock } from "lucide-react";
import { SearchResult } from "@/lib/dummy-data";
import { SearchResultItem } from "./SearchResultItem";
import { TrendingItem } from "./TrendingItem";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchResultsProps {
  searchQuery: string;
  filteredResults: SearchResult[];
  results: SearchResult[];
  activeTab: "recent" | "trending";
  trendingTopics: { title: string; posts: number }[];
}

export const SearchResults = ({ 
  searchQuery, 
  filteredResults, 
  results, 
  activeTab, 
  trendingTopics 
}: SearchResultsProps) => (
  <ScrollArea className="flex-1">
    <div className="py-4">
      {searchQuery ? (
        // Search Results
        <>
          {filteredResults.length > 0 ? (
            <div className="space-y-1">
              <h3 className="font-semibold px-6 mb-3 text-gray-700 text-sm uppercase tracking-wide">
                Search Results ({filteredResults.length})
              </h3>
              {filteredResults.map(result => 
                <SearchResultItem key={result.id} result={result} />
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No results found</p>
              <p className="text-gray-400 text-sm mt-2">
                Try searching for something else
              </p>
            </div>
          )}
        </>
      ) : (
        // Tab Content
        <>
          {activeTab === "recent" ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-6 mb-3">
                <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
                  Recent Searches
                </h3>
                {results.length > 0 && (
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 text-sm">
                    Clear all
                  </Button>
                )}
              </div>
              {results.length > 0 ? (
                results.map(result => 
                  <SearchResultItem key={result.id} result={result} isRecent={true} />
                )
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No recent searches</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Your recent searches will appear here
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              <h3 className="font-semibold px-6 mb-3 text-gray-700 text-sm uppercase tracking-wide">
                Trending Now
              </h3>
              {trendingTopics.map((topic, index) => 
                <TrendingItem key={index} title={topic.title} posts={topic.posts} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  </ScrollArea>
);
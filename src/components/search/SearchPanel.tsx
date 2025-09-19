import { useState } from "react";
import { DUMMY_SEARCH_RESULTS, SearchResult } from "@/lib/dummy-data";
import { SearchHeader } from "./components/SearchHeader";
import { SearchTabs } from "./components/SearchTabs";
import { SearchResults } from "./components/SearchResults";
import { QuickActionsFooter } from "./components/QuickActionsFooter";

export function SearchPanel() {
  const results = DUMMY_SEARCH_RESULTS;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"recent" | "trending">("recent");

  const trendingTopics = [
    { title: "cosplay", posts: 2500000 },
    { title: "anime", posts: 1800000 },
    { title: "gaming", posts: 950000 },
    { title: "art", posts: 750000 },
    { title: "photography", posts: 680000 },
  ];

  const filteredResults = searchQuery 
    ? results.filter(result => 
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : results;

  return (
    <div className="flex flex-col h-full border-l border-r w-full sm:w-[420px] bg-white">
      <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} searchQuery={searchQuery} />
      <SearchResults 
        searchQuery={searchQuery} 
        filteredResults={filteredResults} 
        results={results} 
        activeTab={activeTab} 
        trendingTopics={trendingTopics} 
      />
      <QuickActionsFooter searchQuery={searchQuery} resultsLength={results.length} />
    </div>
  );
}
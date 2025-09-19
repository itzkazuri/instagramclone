import { cn } from "@/lib/utils";
import { Clock, TrendingUp } from "lucide-react";

interface SearchTabsProps {
  activeTab: "recent" | "trending";
  setActiveTab: (tab: "recent" | "trending") => void;
  searchQuery: string;
}

export const SearchTabs = ({ activeTab, setActiveTab, searchQuery }: SearchTabsProps) => {
  if (searchQuery) return null;

  return (
    <div className="flex border-b bg-white">
      <button
        onClick={() => setActiveTab("recent")}
        className={cn(
          "flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 border-b-2",
          activeTab === "recent"
            ? "border-black text-black"
            : "border-transparent text-gray-600 hover:text-gray-900"
        )}
      >
        <div className="flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" />
          Recent
        </div>
      </button>
      <button
        onClick={() => setActiveTab("trending")}
        className={cn(
          "flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 border-b-2",
          activeTab === "trending"
            ? "border-black text-black"
            : "border-transparent text-gray-600 hover:text-gray-900"
        )}
      >
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Trending
        </div>
      </button>
    </div>
  );
};
'use client';

import { AppSidebar } from "@/components/navigation/app-sidebar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { SearchPanel } from "@/components/search/SearchPanel";
import { useSearch } from "@/context/SearchContext";
import { cn } from "@/lib/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isSearchPanelOpen } = useSearch();

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      
      {isSearchPanelOpen && (
        <div className="hidden md:block w-[420px]">
          <SearchPanel />
        </div>
      )}

      <main className="flex-1 overflow-y-auto md:ml-0">
        {children}
      </main>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

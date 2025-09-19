"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useSearch } from "@/context/SearchContext"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { SidebarHeader } from "./sidebar/SidebarHeader"
import { SidebarNavigation } from "./sidebar/SidebarNavigation"
import { SidebarSecondaryNavigation } from "./sidebar/SidebarSecondaryNavigation"
import { SidebarFooter } from "./sidebar/SidebarFooter"

export function AppSidebar() {
  const pathname = usePathname()
  const { closeSearchPanel, isSearchPanelOpen } = useSearch()

  // Close search panel when navigating to a page that doesn't use the search panel
  useEffect(() => {
    if (isSearchPanelOpen && pathname !== "/" && pathname !== "/search") {
      closeSearchPanel();
    }
  }, [pathname, isSearchPanelOpen, closeSearchPanel]);

  return (
    <Sidebar variant="inset" className="border-r">
      <SidebarHeader />
      
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarNavigation closeSearchPanel={closeSearchPanel} />
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-6" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarSecondaryNavigation closeSearchPanel={closeSearchPanel} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
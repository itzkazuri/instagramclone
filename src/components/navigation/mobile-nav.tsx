"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { mobileNavItems } from "./nav-config"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.url
          return (
            <Link key={item.title} href={item.url}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "relative flex flex-col items-center gap-1 h-14 w-16",
                  isActive && "text-black font-semibold"
                )}
              >
                <div className="h-6 w-6">
                  <item.icon className={cn(isActive ? "text-black" : "text-gray-500")} />
                </div>
                <span className="text-xs font-normal">{item.title}</span>
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

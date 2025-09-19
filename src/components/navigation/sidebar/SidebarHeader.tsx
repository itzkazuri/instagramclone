'use client';

import Link from "next/link";
import { Instagram } from "lucide-react";

export function SidebarHeader() {
  return (
    <div className="px-5 py-7 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative">
          <Instagram className="h-11 w-11 text-black transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Cosplayer
        </span>
      </Link>
    </div>
  );
}
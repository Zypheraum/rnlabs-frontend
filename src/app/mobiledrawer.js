'use client'

import { Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import Link from "next/link"
import { useState } from "react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "https://t.me/mridulsingh9", label: "Contact", external: true },
  ]

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[96%] p-6">
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="text-2xl font-semibold text-[#1e3a8a] hover:text-blue-600 transition-all duration-300 py-2 border-b border-gray-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="https://dex.raum.network"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-[#1e3a8a] rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Explore Our Ecosystem
          </Link>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
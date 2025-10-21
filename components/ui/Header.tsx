"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import catalog from "../../app/data/catalog.json";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function Header() {

    const { cart } = useCart();

    return (
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 text-slate-100">
          <a href="/"><h1 className="text-2xl font-bold">TastiePastry</h1></a>
          <nav className="space-x-6 font-medium hidden md:flex">
            {/* Home */}
            <a href="/" className="relative group">
              <span className="text-slate-100 group-hover:text-pink-400 transition">
                Home
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Shop with dropdown */}
            <ShopDropdown />

            {/* About */}
            <Link href="/#about" className="relative group">
              <span className="text-slate-100 group-hover:text-pink-400 transition">
                About
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Contact */}
            <Link href="/#contact" className="relative group">
              <span className="text-slate-100 group-hover:text-pink-400 transition">
                Contact
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <a href="/checkout" className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </a>
          </nav>
        </header>
    )
}

export function ShopDropdown() {
  const [open, setOpen] = React.useState(false)
  const closeTimer = React.useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const handleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="text-slate-100 hover:text-pink-400 transition"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <a href="javascript:void(0)" className="relative group">
              <span className="text-slate-100 group-hover:text-pink-400 transition">
                Shop
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        className={`
          w-56 rounded-xl bg-white shadow-lg
          transition-all duration-300
          data-[state=closed]:opacity-0 data-[state=closed]:translate-y-2
          data-[state=open]:opacity-100 data-[state=open]:translate-y-0
        `}>
          {catalog.map((category) => (
            <a
              key={category.id}
              href={`/catalog?category=${category.id}`}
              className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500">
              {category.slug}
            </a>
            ))
          }
        
      </PopoverContent>
    </Popover>
  )
}
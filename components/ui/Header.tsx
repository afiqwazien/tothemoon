"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import catalog from "@/data/catalog.json";
import React from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function Header() {
    const { cart } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [mobileShopOpen, setMobileShopOpen] = React.useState(false);

    return (
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 text-slate-100">
          <Link href="/"><h1 className="text-2xl font-bold">TastiePastry</h1></Link>
          
          {/* Desktop Navigation */}
          <nav className="space-x-6 font-medium hidden md:flex">
            {/* Home */}
            <Link href="/" className="relative group">
              <span className="text-slate-100 group-hover:text-pink-400 transition">
                Home
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

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

            <Link href="/checkout" className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            <Link href="/checkout" className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="text-slate-100 hover:text-pink-400 transition">
                  <Menu size={28} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-gradient-to-br from-pink-50 to-white">
                <SheetTitle className="text-2xl font-bold text-gray-800 p-4">
                  TastiePastry
                </SheetTitle>
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/" 
                    className="text-lg font-medium text-gray-700 hover:text-pink-500 transition-all hover:translate-x-2 duration-200 py-2 px-4 rounded-lg hover:bg-pink-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>

                  {/* Shop Accordion */}
                  <div className="rounded-lg overflow-hidden">
                    <button
                      onClick={() => setMobileShopOpen(!mobileShopOpen)}
                      className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-pink-500 transition-all duration-200 py-2 px-4 rounded-lg hover:bg-pink-100"
                    >
                      <span>Shop</span>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-300 ${
                          mobileShopOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        mobileShopOpen ? 'max-h-96 mt-2' : 'max-h-0'
                      }`}
                    >
                      <div className="flex flex-col space-y-2 pl-4 py-2 bg-white/50 rounded-lg">
                        {catalog.map((category) => (
                          <Link
                            key={category.id}
                            href={`/catalog?category=${category.id}`}
                            className="text-gray-600 hover:text-pink-500 transition-all hover:translate-x-2 duration-200 py-2 px-4 rounded-md hover:bg-pink-50"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.slug}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link 
                    href="/#about" 
                    className="text-lg font-medium text-gray-700 hover:text-pink-500 transition-all hover:translate-x-2 duration-200 py-2 px-4 rounded-lg hover:bg-pink-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>

                  <Link 
                    href="/#contact" 
                    className="text-lg font-medium text-gray-700 hover:text-pink-500 transition-all hover:translate-x-2 duration-200 py-2 px-4 rounded-lg hover:bg-pink-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
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
        <span className="relative group cursor-pointer">
          <span className="text-slate-100 group-hover:text-pink-400 transition">
            Shop
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
        </span>
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
            <Link
              key={category.id}
              href={`/catalog?category=${category.id}`}
              className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500">
              {category.slug}
            </Link>
            ))
          }
        
      </PopoverContent>
    </Popover>
  )
}
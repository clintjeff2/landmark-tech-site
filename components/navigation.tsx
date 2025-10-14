"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/courses", label: "Courses" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg gradient-purple-pink flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">LT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-bold text-xl leading-tight">Landmark</span>
              <span className="text-muted-foreground text-xs">Since 2005</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-signature group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/register"
              className="bg-gradient-orange-red text-white hover:opacity-90 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2" aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass border-t border-border">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-foreground/80 hover:text-foreground transition-colors text-base font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="block bg-gradient-orange-red text-white text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

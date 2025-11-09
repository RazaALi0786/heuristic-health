"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLink =
    "text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--primary)] transition-colors";

  return (
    <nav className="border-b bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-[var(--primary)]" />
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent"
            >
              Heuristic Health
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={navLink}>
              Home
            </Link>
            <Link href="/solutions" className={navLink}>
              Solutions
            </Link>
            <Link href="/jobs" className={navLink}>
              Jobs
            </Link>
            <Link href="/contact" className={navLink}>
              Contact
            </Link>
          </div>

          {/* Buttons */}
          {/* <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--foreground)] focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t bg-[var(--background)] px-4 pb-4 space-y-2">
          <Link
            href="/"
            className={`${navLink} block`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/solutions"
            className={`${navLink} block`}
            onClick={() => setIsOpen(false)}
          >
            Solutions
          </Link>
          <Link
            href="/contact"
            className={`${navLink} block`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {/* <div className="flex flex-col gap-2 pt-3">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div> */}
        </div>
      )}
    </nav>
  );
}

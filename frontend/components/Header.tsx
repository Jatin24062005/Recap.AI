'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLists = ['Home', 'Features', 'How it works', 'Testimonials', 'Contact Us']

const Header = () => {
  return (
    <header className="w-full py-5 px-5 sm:px-10 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="flex w-full max-w-screen-xl mx-auto items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center ">
          <div className="scale-125">
       
          </div>
          <span className="ml-1 text-xl font-semibold text-primary tracking-tight">
            Recap<span className="text-white">.ai</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 ">
          {navLists.map((nav) => (
            <Link
              key={nav}
              href={`#${nav.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm text-muted-foreground hover:text-white transition-all"
            >
              {nav}
            </Link>
          ))}
        </div>

        {/* Login Button */}
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header

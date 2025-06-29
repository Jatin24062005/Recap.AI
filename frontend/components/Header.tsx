"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookie from "js-cookie";
import useHasMounted from "@/hooks/useHasMounted";

const navLists = [
  "Dashboard",
  "Features",
  "How it works",
  "Testimonials",
  "Contact Us",
];

const Header = () => {
  const hasMounted = useHasMounted();
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const token = Cookie.get("token");
    setLoginStatus(!!token);
  }, []);

  const handleLogout = () => {
    Cookie.remove("token");
    window.location.href = "/";
  };

  return (
    <header className="w-full py-5 px-5 sm:px-10 backdrop-blur-md bg-background/70 border-b border-border">
      <nav className="flex w-full max-w-screen-xl mx-auto items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="ml-1 text-xl font-semibold text-primary tracking-tight">
            Recap<span className="text-white">.ai</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          {navLists.map((nav) => (
            <Link
              key={nav}
              href={ nav ==="Dashboard"? '/dashboard':`#${nav.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm text-muted-foreground hover:text-white transition-all"
            >
              {nav}
            </Link>
          ))}
        </div>

        {/* Auth Button */}
        <div className="flex items-center gap-4">
          {!hasMounted ? null : !loginStatus ? (
            <Link href="/login">
              <Button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition">
                Login
              </Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:opacity-90 hover:text-white transition"
            >
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

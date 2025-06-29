"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white px-10 py-24 mt-24 rounded-t-3xl shadow-2xl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-12">
        {/* Company Overview */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Recap.ai</h2>
          <p className="text-sm text-gray-400 mb-4">
            Recap.ai transforms your virtual meetings into powerful summaries.
            Our AI-driven note-taking assistant automatically listens,
            understands, and captures what matters most.
          </p>
          <p className="text-sm text-gray-500">
            Join thousands of teams around the world who rely on Recap.ai for
            smarter productivity.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Product</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            <li>
              <a href="#dashboard" className="hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white">
                Smart Summaries
              </a>
            </li>
            <li>
              <a href="#integrations" className="hover:text-white">
                Integrations
              </a>
            </li>
            <li>
              <a href="#plans" className="hover:text-white">
                Pricing Plans
              </a>
            </li>
            <li>
              <a href="#demo" className="hover:text-white">
                Book a Demo
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Developer API
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Community
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Affiliate Program
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                GDPR Compliance
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for product updates, tips, and exclusive
            offers. No spam.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full sm:w-auto px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:brightness-110 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} Recap.ai. Built with ❤️ for teams
          worldwide.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">
            Twitter
          </a>
          <a href="#" className="hover:text-white">
            GitHub
          </a>
          <a href="#" className="hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { useUser } from "@/context/AuthContext";
import axiosInstance from "@/utils/axios";
import Cookie from "js-cookie"; // Import js-cookie to manage cookies

export default function LandingPage() {
  const heroRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const [url, setUrl] = useState("");
  const { user } = useUser();
  const token = Cookie.get("token"); // Get token from cookies

  const handleSendUrl = async () => {
    if (!user || !token) {
      // If user is not logged in, show an error message
      toast.error("Please log_in to start recording");
    }
    if (!url) {
      return toast.error("Please enter a Google Meet URL");
    }

    try {
      // Your API call or logic to send the URL goes here
      const response = await axiosInstance.post("/meeting", {
        url,
      });
      console.log(response); 
      if (response.status === 200) {
        toast.success("Recap.Ai started successfully");
        
        // Optionally, redirect to a recording page or update UI
      } else {
        toast.error("Failed to start recording");
      }

    } catch (error) {
      toast.error("Failed to start recording");
    } 
  };

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 2 }
    );
    gsap.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 0.5, duration: 1 }
    );
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, delay: 1, duration: 0.8 }
    );
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-transparent text-foreground flex flex-col items-center justify-center px-6 ">
        <h1
          ref={heroRef}
          className="text-4xl md:text-6xl font-bold text-center max-w-3xl"
        >
          AI-Powered Meeting Recording & Summarization
        </h1>

        <p
          ref={subRef}
          className="text-muted-foreground mt-6 text-lg md:text-xl max-w-xl text-center"
        >
          Join your Google Meet, record in real-time, and get smart transcripts
          & summaries. All inside your browser.
        </p>

        <div ref={ctaRef} className="mt-10">
          <div className="flex w-full h-fit  items-center gap-2">
            <Input
              type="text"
              className="w-fit px-14 pr-5 py-4 rounded-md text-white bg-transparent 
             border border-white/30 
             shadow-[0_0_15px_rgba(255,255,255,0.2)] 
             focus:outline-none focus:ring-2 focus:ring-white/10 
             transition-all duration-300"
              placeholder="Enter Google Meet Url"
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline"
              className="flex items-center w-fit   py-4 gap-2 px-6"
              onClick={handleSendUrl}
            >
              <svg
                height="100px"
                viewBox="0 0 48 48"
                width="100px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  fill="#fff"
                  height="16"
                  transform="rotate(-90 20 24)"
                  width="16"
                  x="12"
                  y="16"
                />
                <polygon
                  fill="#1e88e5"
                  points="3,17 3,31 8,32 13,31 13,17 8,16"
                />
                <path
                  d="M37,24v14c0,1.657-1.343,3-3,3H13l-1-5l1-5h14v-7l5-1L37,24z"
                  fill="#4caf50"
                />
                <path
                  d="M37,10v14H27v-7H13l-1-5l1-5h21C35.657,7,37,8.343,37,10z"
                  fill="#fbc02d"
                />
                <path
                  d="M13,31v10H6c-1.657,0-3-1.343-3-3v-7H13z"
                  fill="#1565c0"
                />
                <polygon fill="#e53935" points="13,7 13,17 3,17" />
                <polygon
                  fill="#2e7d32"
                  points="38,24 37,32.45 27,24 37,15.55"
                />
                <path
                  d="M46,10.11v27.78c0,0.84-0.98,1.31-1.63,0.78L37,32.45v-16.9l7.37-6.22C45.02,8.8,46,9.27,46,10.11z"
                  fill="#4caf50"
                />
              </svg>
              Start Recording
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

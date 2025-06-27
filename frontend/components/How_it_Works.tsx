"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(stepsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 145%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <section className="py-20 bg-background" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div
          //@ts-ignore
            ref={(el) => el && (stepsRef.current[0] = el)}
            className="flex flex-col items-center text-center gap-4"
          >
            <svg
              height="80px"
              viewBox="0 0 48 48"
              width="80px"
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
              <polygon fill="#1e88e5" points="3,17 3,31 8,32 13,31 13,17 8,16" />
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
              <polygon fill="#2e7d32" points="38,24 37,32.45 27,24 37,15.55" />
              <path
                d="M46,10.11v27.78c0,0.84-0.98,1.31-1.63,0.78L37,32.45v-16.9l7.37-6.22C45.02,8.8,46,9.27,46,10.11z"
                fill="#4caf50"
              />
            </svg>

            <h3 className="text-xl font-semibold">Join Your Meeting</h3>
            <p className="text-muted-foreground">
              Start or join a Google Meet session directly from our platform.
            </p>
          </div>

          {/* Step 2 */}
          <div
          //@ts-ignore

            ref={(el) => el && (stepsRef.current[1] = el)}
            className="flex flex-col items-center text-center gap-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 12H9m12 0A9 9 0 113 12a9 9 0 0118 0z"
              />
            </svg>

            <h3 className="text-xl font-semibold">Record in Real-Time</h3>
            <p className="text-muted-foreground">
              Our AI captures every word spoken during the meeting.
            </p>
          </div>

          {/* Step 3 */}
          <div
          //@ts-ignore
            ref={(el) => el && (stepsRef.current[2] = el)}
            className="flex flex-col items-center text-center gap-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 20l9-5-9-5-9 5 9 5z"
              />
            </svg>

            <h3 className="text-xl font-semibold">Get Smart Summaries</h3>
            <p className="text-muted-foreground">
              Receive concise summaries and transcripts after your meeting ends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

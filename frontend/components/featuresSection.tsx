"use client";

import { useRef, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Auto Recording",
    description: "Automatically joins your Google Meet and starts recording in real-time—no clicks needed.",
  },
  {
    title: "Smart Summaries",
    description: "AI condenses your meeting into actionable summaries and key discussion points.",
  },
  {
    title: "Instant Transcripts",
    description: "Accurate, searchable transcripts generated as soon as the meeting ends.",
  },
  {
    title: "Browser-Based",
    description: "No installation required. Just open Chrome and you’re ready to go.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50, // alternate left/right animation
        duration: 0.6,
        delay: index * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 140%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="bg-[#121212] py-24 px-6 rounded-3xl my-16">
      <section
        ref={sectionRef}
        className="w-full max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4">Features</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Everything you need to effortlessly capture and summarize your meetings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              // @ts-ignore
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <Card className="flex items-start gap-4 p-6 bg-[#1f1f1f] hover:bg-[#2a2a2a] transition duration-300 border border-gray-700 shadow-sm">
                <CheckCircle className="text-green-500 mt-1" size={28} />
                <div>
                  <h3 className="text-white font-semibold text-xl mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

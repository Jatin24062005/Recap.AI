"use client"
import { useRef, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import gsap from 'gsap'

const features = [
  {
    title: "Auto Recording",
    description: "Joins Google Meet & records in real-time automatically.",
  },
  {
    title: "Smart Summaries",
    description: "AI summarizes meetings into key points & action items.",
  },
  {
    title: "Instant Transcripts",
    description: "Get clean, searchable transcripts immediately after the call.",
  },
  {
    title: "Browser-Based",
    description: "No installs. Works in Chrome. Lightweight & secure.",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3 }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen max-w-5xl mx-auto px-6 py-20 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Features</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
        Everything you need to capture, understand, and recall your meetings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <CheckCircle className="text-green-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-xl">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
export default FeaturesSection
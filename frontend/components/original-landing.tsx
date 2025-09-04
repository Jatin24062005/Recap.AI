"use client"
import { ArrowRight, PlayCircle, Rocket, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

/**
 * Drop this file in a Next.js app as app/page.tsx.
 * Tailwind CSS recommended. Monochrome vibe, Calldock-style.
 */
export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-neutral-900"></div>
            <span className="text-xl font-black tracking-tight">recap.ai</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <a href="#products" className="hover:text-black">
              Our Products
            </a>
            <a href="#pricing" className="hover:text-black">
              Pricing
            </a>
            <a href="#faq" className="hover:text-black">
              FAQ
            </a>
            <a href="#how" className="hover:text-black">
              How it works
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#login" className="hidden sm:inline text-sm font-semibold text-neutral-600 hover:text-black">
              Login
            </a>
            <a
              href="#trial"
              className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Try for free
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center py-20">
            {/* Left rail name strip */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="h-0.5 w-10 bg-red-500 mb-6"></div>
              <p className="text-5xl leading-none font-black tracking-tight">Jatin</p>
              <p className="text-2xl leading-tight font-black tracking-tight">recap.ai</p>
            </div>

            {/* Copy */}
            <div className="lg:col-span-6">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-6xl font-black tracking-tight text-neutral-900"
              >
                Scale your resume reviews
                <br />
                <span className="text-neutral-700">without hiring more recruiters</span>
              </motion.h1>
              <p className="mt-6 max-w-2xl text-lg text-neutral-600">
                AI agents qualify candidates, summarize CVs, and auto-rank applicants in seconds— delivering only
                interview‑ready profiles to your team.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#trial"
                  className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white text-sm font-semibold hover:opacity-90"
                >
                  <span>Start Your Free Trial</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#google"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                    <path d="M533.5 278.4c0-18.6-1.7-36.5-4.9-53.9H272v102h146.9c-6.3 34-25.2 62.7-53.9 82v68h87.1c50.9-46.9 81.4-116.1 81.4-198.1z" />
                    <path d="M272 544.3c73.5 0 135.2-24.3 180.2-66.1l-87.1-68c-24.2 16.2-55.2 26-93.1 26-71.6 0-132.3-48.4-153.9-113.5h-90.5v71.3C72.4 489 165.7 544.3 272 544.3z" />
                    <path d="M118.1 322.7c-11.4-34-11.4-71.3 0-105.3v-71.3H27.6C-9.2 197.7-9.2 346.6 27.6 428.7l90.5-71.3z" />
                    <path d="M272 107.7c39.9-.6 76.3 13.6 104.8 40.7l78.4-78.4C406.9 15.7 345.5-3.3 272 0 165.7 0 72.4 55.3 27.6 146.9l90.5 71.3C139.7 156.1 200.4 107.7 272 107.7z" />
                  </svg>
                  Continue with Google
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-neutral-600">
                <div className="h-5 w-5 rounded-full border border-neutral-300 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                </div>
                <span>Setup in under 5 minutes. No credit card required.</span>
              </div>

              {/* Key points */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: <Zap className="h-4 w-4" />, label: "Rank candidates automatically" },
                  { icon: <Shield className="h-4 w-4" />, label: "Private & secure" },
                  { icon: <Rocket className="h-4 w-4" />, label: "Integrates with ATS" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2">
                    {f.icon}
                    <span className="text-sm text-neutral-700">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right mock + avatar */}
            <div className="lg:col-span-4">
              <div className="relative">
                {/* Dashboard mock */}
                <div className="rounded-2xl border border-neutral-200 shadow-sm bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b border-neutral-200 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-neutral-300" />
                    <div className="h-2 w-2 rounded-full bg-neutral-300" />
                    <div className="h-2 w-2 rounded-full bg-neutral-300" />
                    <span className="ml-2 text-xs font-semibold text-neutral-500">recap.ai • Dashboard</span>
                  </div>
                  <div className="p-4 grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 space-y-3">
                      <Card title="Total Resumes" value="1,248" trend="▲ 12%" />
                      <Card title="Avg. Review Time" value="34s" trend="▼ 8%" />
                      <Card title="Qualified" value="68%" trend="▲ 5%" />
                    </div>
                    <div className="col-span-12 md:col-span-6 space-y-3">
                      <Integration name="Slack" />
                      <Integration name="Zapier" />
                      <Integration name="Google Drive" />
                    </div>
                  </div>
                </div>

                {/* Floating avatar */}
                <div className="hidden md:block absolute -right-8 -bottom-8">
                  <div className="h-36 w-36 rounded-full border-4 border-white shadow-xl overflow-hidden">
                    {/* Replace with your image */}
                    <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1605470207352-6f94b2e65559?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / social proof */}
      <section className="py-16 border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-neutral-500 mb-6">
            Trusted by teams screening thousands of resumes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 opacity-80">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-xs font-bold"
              >
                LOGO {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight">How it works</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Connect your sources",
                desc: "Import resumes from Drive, email, or your ATS.",
                icon: <PlayCircle className="h-5 w-5" />,
              },
              {
                title: "AI reviews & ranks",
                desc: "We parse, score, and summarize candidates in seconds.",
                icon: <Zap className="h-5 w-5" />,
              },
              {
                title: "Share shortlists",
                desc: "Send interview‑ready profiles to hiring managers.",
                icon: <ArrowRight className="h-5 w-5" />,
              },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 p-6 bg-white">
                <div className="flex items-center gap-2 text-neutral-700">
                  {s.icon}
                  <span className="text-sm font-semibold">Step {i + 1}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 p-8 md:p-12 bg-neutral-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                Ready to screen resumes at lightning speed?
              </h3>
              <p className="mt-2 text-neutral-600">Start free, then scale with transparent pricing.</p>
            </div>
            <a
              href="#trial"
              className="inline-flex items-center rounded-full bg-black px-6 py-3 text-white text-sm font-semibold hover:opacity-90"
            >
              Start your free trial <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-neutral-900"></div>
            <span className="font-black">recap.ai</span>
          </div>
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Recap.ai — Built with ♥ for hiring teams.
          </p>
        </div>
      </footer>
    </div>
  )
}

function Card({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <p className="text-xs font-semibold text-neutral-500">{title}</p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-black">{value}</span>
        <span className="text-xs font-semibold text-neutral-600">{trend}</span>
      </div>
    </div>
  )
}

function Integration({ name }: { name: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-neutral-500 mt-1">Connect to sync notifications & files.</p>
      </div>
      <button className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold hover:bg-neutral-50">
        Connect
      </button>
    </div>
  )
}

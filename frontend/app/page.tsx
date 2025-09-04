"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Rocket,
  Shield,
  Zap,
  Mic,
  Video,
  FileText,
  Clock,
  Users,
  TrendingUp,
  Activity,
  CheckCircle,
  Globe,
  Bot,
  Brain,
  Database,
  Cloud,
  Sparkles,
  Calendar,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { LoginModal } from "@/components/login-modal"

// Sample data for charts
const meetingData = [
  { month: "Jan", meetings: 45, transcribed: 42, accuracy: 96 },
  { month: "Feb", meetings: 52, transcribed: 50, accuracy: 97 },
  { month: "Mar", meetings: 48, transcribed: 47, accuracy: 98 },
  { month: "Apr", meetings: 61, transcribed: 60, accuracy: 98 },
  { month: "May", meetings: 55, transcribed: 54, accuracy: 99 },
  { month: "Jun", meetings: 67, transcribed: 66, accuracy: 99 },
]

const accuracyData = [
  { name: "Whisper AI", value: 99, color: "#000000" },
  { name: "Google Speech", value: 94, color: "#666666" },
  { name: "Azure Speech", value: 91, color: "#999999" },
  { name: "AWS Transcribe", value: 88, color: "#cccccc" },
]

const performanceData = [
  { time: "0s", cpu: 12, memory: 45, network: 23 },
  { time: "30s", cpu: 25, memory: 52, network: 67 },
  { time: "60s", cpu: 18, memory: 48, network: 45 },
  { time: "90s", cpu: 22, memory: 55, network: 78 },
  { time: "120s", cpu: 15, memory: 42, network: 34 },
  { time: "150s", cpu: 28, memory: 58, network: 89 },
]

const usageStats = [
  { feature: "Auto Join", usage: 98 },
  { feature: "Recording", usage: 95 },
  { feature: "Transcription", usage: 92 },
  { feature: "API Storage", usage: 88 },
  { feature: "Real-time Access", usage: 85 },
]

export default function MeetBotLanding() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [animationProgress, setAnimationProgress] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginMode, setLoginMode] = useState<"login" | "signup">("login")
  const [meetUrl, setMeetUrl] = useState("")

  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const isHeroInView = useInView(heroRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })
  const isDemoInView = useInView(demoRef, { once: true })
  const isPricingInView = useInView(pricingRef, { once: true })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Auto-play demo simulation

    useEffect(() => {
    const id = setTimeout(
      () => window.dispatchEvent(new Event("resize")),
      0
    );
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => (prev + 1) % 180)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-neutral-300 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-neutral-400 rounded-full"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-1 h-1 bg-neutral-500 rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        />
      </div>

      {/* Navigation */}
      <motion.header
        className="sticky top-0 z-50 w-full backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div
              className="h-8 w-8 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Bot className="h-4 w-4 text-white" />
            </motion.div>
            <span className="text-xl font-black tracking-tight">MeetBot.ai</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {["Features", "Demo", "Pricing", "API", "Docs"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-black dark:hover:text-white transition-colors relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black dark:bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              onClick={() => {
                setLoginMode("login")
                setIsLoginModalOpen(true)
              }}
              className="hidden sm:inline text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button
              onClick={() => {
                setLoginMode("signup")
                setIsLoginModalOpen(true)
              }}
              className="inline-flex items-center rounded-full bg-black dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-black hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-12 gap-12 items-center py-20"
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            {/* Left Brand Strip */}
            <motion.div className="hidden lg:block lg:col-span-2" variants={itemVariants}>
              <motion.div
                className="h-1 w-12 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 mb-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              <motion.p
                className="text-5xl leading-none font-black tracking-tight bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Meet
              </motion.p>
              <motion.p
                className="text-2xl leading-tight font-black tracking-tight text-neutral-700 dark:text-neutral-300"
                variants={itemVariants}
              >
                Bot.ai
              </motion.p>
              <motion.div className="mt-4 space-y-2" variants={itemVariants}>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Live Recording</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>AI Processing</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div className="lg:col-span-6" variants={itemVariants}>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span>Powered by Whisper AI & Selenium</span>
                <Badge variant="secondary" className="ml-2">
                  New
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Automate Your
                <br />
                <motion.span
                  className="bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-yellow-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                  style={{ backgroundSize: "400% 400%" }}
                >
                  Google Meet
                </motion.span>
                <br />
                <span className="text-neutral-700 dark:text-neutral-300">Workflow</span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Our intelligent bot automatically joins Google Meet sessions, records conversations, and provides
                real-time transcriptions using advanced Whisper AI technology. Built with Selenium automation and
                deployed with Next.js for seamless integration.
              </motion.p>

              <motion.div
                className="mt-8 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="url"
                      placeholder="Enter Google Meet URL"
                      value={meetUrl}
                      onChange={(e) => setMeetUrl(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                  <motion.button
                    className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white px-8 py-3 text-white dark:text-black text-sm font-semibold hover:opacity-90 transition-all duration-300 h-12"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (meetUrl) {
                        console.log("Starting bot for:", meetUrl)
                        // Handle bot start logic
                      }
                    }}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    <span>Start Bot</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>

                <motion.button
                  className="inline-flex items-center justify-center rounded-full border-2 border-neutral-300 dark:border-neutral-600 px-8 py-3 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 w-full sm:w-auto"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#000",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="mr-2 h-4 w-4" />
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-8 flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>99.2% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>Real-time Processing</span>
                </div>
              </motion.div>

              {/* Feature Pills */}
              <motion.div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                variants={containerVariants}
                initial="hidden"
                animate={isHeroInView ? "visible" : "hidden"}
              >
                {[
                  {
                    icon: <Bot className="h-4 w-4" />,
                    label: "Selenium Automation",
                    color: "bg-blue-50 text-blue-700 border-blue-200",
                  },
                  {
                    icon: <Mic className="h-4 w-4" />,
                    label: "Whisper AI Transcription",
                    color: "bg-green-50 text-green-700 border-green-200",
                  },
                  {
                    icon: <Video className="h-4 w-4" />,
                    label: "HD Recording",
                    color: "bg-purple-50 text-purple-700 border-purple-200",
                  },
                  {
                    icon: <FileText className="h-4 w-4" />,
                    label: "REST API Access",
                    color: "bg-orange-50 text-orange-700 border-orange-200",
                  },
                  {
                    icon: <Globe className="h-4 w-4" />,
                    label: "Next.js Frontend",
                    color: "bg-red-50 text-red-700 border-red-200",
                  },
                  {
                    icon: <Cloud className="h-4 w-4" />,
                    label: "Cloud Deployment",
                    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${feature.color} transition-all duration-300 hover:shadow-md`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -1 }}
                  >
                    {feature.icon}
                    <span className="text-sm font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Dashboard */}
            <motion.div className="lg:col-span-4" variants={itemVariants}>
              <motion.div className="relative" variants={floatingVariants} animate="animate">
                {/* Main Dashboard */}
                <motion.div
                  className="rounded-2xl border border-neutral-200 shadow-2xl bg-white overflow-hidden backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  whileHover={{ scale: 1.02, rotateY: -2 }}
                >
                  {/* Browser Header */}
                  <div className="px-4 py-3 border-b border-neutral-200 flex items-center gap-2 bg-neutral-50">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md px-3 py-1 text-xs font-mono text-neutral-500 border">
                        meetbot.ai/dashboard
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-neutral-500">Live</span>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-4">
                    {/* Status Cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        className="rounded-lg border border-neutral-200 p-3 bg-gradient-to-br from-green-50 to-emerald-50"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs font-semibold text-green-700">Recording</span>
                        </div>
                        <div className="text-lg font-black text-green-900">
                          {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")}
                        </div>
                      </motion.div>

                      <motion.div
                        className="rounded-lg border border-neutral-200 p-3 bg-gradient-to-br from-blue-50 to-cyan-50"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-3 h-3 text-blue-500" />
                          <span className="text-xs font-semibold text-blue-700">AI Processing</span>
                        </div>
                        <div className="text-lg font-black text-blue-900">99.2%</div>
                      </motion.div>
                    </div>

                    {/* Live Transcription Preview */}
                    <motion.div
                      className="rounded-lg border border-neutral-200 p-4 bg-neutral-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-neutral-600" />
                        <span className="text-sm font-semibold text-neutral-700">Live Transcription</span>
                        <div className="ml-auto flex gap-1">
                          <div className="w-1 h-4 bg-neutral-400 rounded animate-pulse" />
                          <div
                            className="w-1 h-3 bg-neutral-300 rounded animate-pulse"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-1 h-5 bg-neutral-500 rounded animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 text-xs text-neutral-600">
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.4 }}
                        >
                          "Let's discuss the quarterly results..."
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.6 }}
                        >
                          "The automation bot has been performing..."
                        </motion.p>
                        <motion.div
                          className="flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8 }}
                        >
                          <div className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" />
                          <div
                            className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        { label: "Sessions", value: "1,247", icon: <Users className="w-3 h-3" /> },
                        { label: "Hours", value: "2,891", icon: <Clock className="w-3 h-3" /> },
                        { label: "Accuracy", value: "99.2%", icon: <TrendingUp className="w-3 h-3" /> },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          className="rounded-md border border-neutral-200 p-2 bg-white"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="flex items-center justify-center gap-1 mb-1 text-neutral-500">
                            {stat.icon}
                          </div>
                          <div className="text-sm font-black text-neutral-900">{stat.value}</div>
                          <div className="text-xs text-neutral-500">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  variants={pulseVariants}
                  animate="animate"
                >
                  <Mic className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7, type: "spring" }}
                  variants={floatingVariants}
                  animate="animate"
                >
                  <Video className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center"
            animate={{ borderColor: ["#d4d4d8", "#000", "#d4d4d8"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1 h-3 bg-neutral-600 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Social Proof / Logos */}
      <motion.section
        className="py-16 border-t border-neutral-200 bg-neutral-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-center text-sm font-semibold text-neutral-500 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by teams automating thousands of meetings worldwide
          </motion.p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Google Meet", "Zoom", "Microsoft Teams", "Slack", "Discord", "WebEx"].map((company, index) => (
              <motion.div
                key={index}
                className="h-12 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Administrative Automation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  MEETING AUTOMATION
                </span>
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">We do the heavy lifting</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Auto Join Meetings", desc: "Selenium automation joins Google Meet sessions automatically" },
                  { title: "Real-time Recording", desc: "High-quality audio capture with ffmpeg processing" },
                  { title: "AI Transcription", desc: "Whisper AI provides accurate speech-to-text conversion" },
                  { title: "Smart Processing", desc: "Automated file handling and API integration" },
                  { title: "Session Management", desc: "Chrome profile authentication and session handling" },
                  { title: "Data Storage", desc: "Secure transcript storage via REST API endpoints" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-500 flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  THE GOOD STUFF
                </span>
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">
                So you can focus on what matters
              </h2>

              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-lg">
                <div className="space-y-4">
                  {[
                    {
                      icon: "🎥",
                      title: "Meeting joined",
                      desc: "Bot successfully connected to daily standup",
                      time: "2m ago",
                      color: "bg-white",
                    },
                    {
                      icon: "📝",
                      title: "Transcript generated",
                      desc: "AI processing completed for project review",
                      time: "5m ago",
                      color: "bg-white"
                    },
                    {
                      icon: "💾",
                      title: "Recording saved",
                      desc: "High-quality audio stored in cloud storage",
                      time: "10m ago",
                      color: "",
                    },
                    {
                      icon: "🔄",
                      title: "API sync completed",
                      desc: "Transcript data pushed to your dashboard",
                      time: "15m ago",
                      color: "",
                    },
                    {
                      icon: "🎯",
                      title: "Meeting joined",
                      desc: "Bot automatically joined client presentation",
                      time: "2m ago",
                      color: "",
                    },
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg border  hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${activity.color} border flex items-center justify-center text-white font-semibold flex-shrink-0`}
                      >
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-neutral-900 dark:text-white">{activity.title}</h3>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">{activity.time}</span>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{activity.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Automation Features Section */}
      <motion.section
        ref={featuresRef}
        id="features"
        className="py-24 bg-neutral-50 dark:bg-neutral-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-4">
              Powerful Automation Features
            </h2>
            <motion.p
              className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Built with cutting-edge technology stack including Selenium, Whisper AI, ffmpeg processing, and Next.js
              frontend for seamless meeting automation.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr"
            variants={containerVariants}
            initial="hidden"
            whileInView={isFeaturesInView ? "visible" : "hidden"}
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Bot className="h-6 w-6" />,
                title: "Selenium Automation",
                description:
                  "Pre-authenticated Chrome profiles automatically join Google Meet sessions without manual intervention.",
                tech: "Selenium WebDriver",
                size: "md:col-span-2 lg:col-span-3",
              },
              {
                icon: <Mic className="h-6 w-6" />,
                title: "Whisper AI Transcription",
                description:
                  "State-of-the-art speech recognition with 99.2% accuracy across multiple languages and accents.",
                tech: "OpenAI Whisper",
                size: "md:col-span-2 lg:col-span-3",
              },
              {
                icon: <Video className="h-6 w-6" />,
                title: "HD Recording",
                description: "High-quality audio and video recording with ffmpeg processing for optimal compression.",
                tech: "FFmpeg",
                size: "md:col-span-2 lg:col-span-2",
              },
              {
                icon: <Database className="h-6 w-6" />,
                title: "REST API Storage",
                description: "Secure cloud storage with RESTful API access for retrieving transcripts and recordings.",
                tech: "REST API",
                size: "md:col-span-2 lg:col-span-2",
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Next.js Frontend",
                description: "Modern React-based dashboard for real-time monitoring and transcript access.",
                tech: "Next.js + React",
                size: "md:col-span-2 lg:col-span-2",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Enterprise Security",
                description: "End-to-end encryption with enterprise-grade security protocols and compliance.",
                tech: "AES-256 Encryption",
                size: "md:col-span-4 lg:col-span-6",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`group relative rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800 hover:shadow-lg transition-all duration-300 ${feature.size}`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.01,
                  y: -2,
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 mb-4 group-hover:scale-105 transition-transform duration-300"
                  whileHover={{ rotate: 3 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {feature.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 mb-3 text-sm leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {feature.tech}
                  </Badge>
                  <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity" whileHover={{ x: 3 }}>
                    <ArrowRight className="h-4 w-4 text-neutral-400" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Demo Section */}
      <motion.section
        ref={demoRef}
        id="demo"
        className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-4">
              See It In Action
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Experience our automation bot in real-time. Watch how it seamlessly joins meetings, records conversations,
              and provides instant transcriptions.
            </p>
          </motion.div>

          {/* Demo Video Player */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {/* Video Player Interface */}
              <div className="aspect-video bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))",
                      "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
                      "linear-gradient(45deg, rgba(236,72,153,0.2), rgba(59,130,246,0.2))",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Play Button */}
                <motion.button
                  className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <motion.div animate={{ rotate: isPlaying ? 0 : 0 }} transition={{ duration: 0.3 }}>
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white ml-1" />
                    ) : (
                      <Play className="h-8 w-8 text-white ml-1" />
                    )}
                  </motion.div>
                </motion.button>

                {/* Demo Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <motion.div
                      className="text-6xl font-black mb-4"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      MeetBot.ai
                    </motion.div>
                    <div className="text-lg opacity-80">Live Demo Recording</div>
                  </div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="bg-black/90 backdrop-blur-sm p-4">
                <div className="flex items-center gap-4">
                  <motion.button
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                  </motion.button>

                  <div className="flex items-center gap-2">
                    <SkipBack className="h-4 w-4 text-white/60" />
                    <Rewind className="h-4 w-4 text-white/60" />
                    <FastForward className="h-4 w-4 text-white/60" />
                    <SkipForward className="h-4 w-4 text-white/60" />
                  </div>

                  <div className="flex-1 mx-4">
                    <div className="relative">
                      <div className="h-1 bg-white/20 rounded-full">
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${(currentTime / 180) * 100}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-white text-sm font-mono">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, "0")} / 3:00
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-white" />
                      )}
                    </motion.button>
                    <div className="w-20 h-1 bg-white/20 rounded-full">
                      <div className="h-full bg-white rounded-full" style={{ width: `${isMuted ? 0 : volume}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Demo Features Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView={isDemoInView ? "visible" : "hidden"}
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Automated Join",
                description:
                  "Bot automatically joins scheduled Google Meet sessions using pre-authenticated Chrome profiles",
                icon: <Calendar className="h-6 w-6" />,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Live Recording",
                description: "High-quality audio/video capture with real-time processing using ffmpeg technology",
                icon: <Video className="h-6 w-6" />,
                color: "from-green-500 to-emerald-500",
              },
              {
                step: "03",
                title: "AI Transcription",
                description: "Whisper AI processes audio in real-time, delivering accurate transcripts via REST API",
                icon: <FileText className="h-6 w-6" />,
                color: "from-purple-500 to-pink-500",
              },
            ].map((demo, index) => (
              <motion.div key={index} className="relative group" variants={itemVariants}>
                <motion.div
                  className="rounded-2xl border border-neutral-200 p-8 bg-white hover:shadow-xl transition-all duration-500"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center text-white font-bold text-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      {demo.step}
                    </motion.div>
                    <motion.div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${demo.color} flex items-center justify-center text-white`}
                      whileHover={{ rotate: -5, scale: 1.1 }}
                    >
                      {demo.icon}
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{demo.title}</h3>

                  <p className="text-neutral-600 leading-relaxed">{demo.description}</p>

                  {/* Progress Indicator */}
                  <motion.div
                    className="mt-6 h-1 bg-neutral-100 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${demo.color} rounded-full`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 1 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics & Analytics Section */}
      <motion.section
        ref={statsRef}
        className="py-24 bg-white dark:bg-neutral-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-4">
              Performance Analytics
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Real-time insights into your meeting automation performance, transcription accuracy, and system resource
              utilization.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView={isStatsInView ? "visible" : "hidden"}
            viewport={{ once: true }}
          >
            {[
              {
                label: "Meetings Automated",
                value: "12,847",
                change: "+23%",
                icon: <Users className="h-6 w-6" />,
                color: "text-blue-600",
              },
              {
                label: "Hours Recorded",
                value: "28,912",
                change: "+18%",
                icon: <Clock className="h-6 w-6" />,
                color: "text-green-600",
              },
              {
                label: "Transcription Accuracy",
                value: "99.2%",
                change: "+0.3%",
                icon: <TrendingUp className="h-6 w-6" />,
                color: "text-purple-600",
              },
              {
                label: "API Requests",
                value: "1.2M",
                change: "+45%",
                icon: <Activity className="h-6 w-6" />,
                color: "text-orange-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800 hover:shadow-lg transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div className={`${stat.color}`} whileHover={{ scale: 1.1, rotate: 5 }}>
                    {stat.icon}
                  </motion.div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>

                <motion.div
                  className="text-3xl font-black text-neutral-900 dark:text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>

                <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Meeting Analytics Chart */}
            <motion.div
      className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800 w-full"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Meeting Analytics</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-black dark:bg-white rounded-full" />
            <span className="text-neutral-600 dark:text-neutral-400">Meetings</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-neutral-400 rounded-full" />
            <span className="text-neutral-600 dark:text-neutral-400">Transcribed</span>
          </div>
        </div>
      </div>

      {/* Force definite size and give SVG a color for currentColor to work */}
      <div className="relative w-full px-2 mt-6 h-64 text-neutral-900 dark:text-neutral-100">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={meetingData}>
            <CartesianGrid stroke="currentColor" strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis
              dataKey="month"
              stroke="currentColor"
              tick={{ fill: "currentColor" }}
              axisLine={{ stroke: "currentColor", strokeOpacity: 0.3 }}
              tickLine={{ stroke: "currentColor", strokeOpacity: 0.3 }}
            />
            <YAxis
              stroke="currentColor"
              tick={{ fill: "currentColor" }}
              axisLine={{ stroke: "currentColor", strokeOpacity: 0.3 }}
              tickLine={{ stroke: "currentColor", strokeOpacity: 0.3 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background, #111827)",
                border: "1px solid var(--border, #374151)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                color: "var(--foreground, #F9FAFB)",
              }}
            />
            {/* Solid line for Meetings */}
            <Line
              type="monotone"
              dataKey="meetings"
              stroke="currentColor"
              strokeWidth={3}
              isAnimationActive={false}
              dot={{ r: 4, stroke: "currentColor", fill: "currentColor" }}
            />
            {/* Lighter line for Transcribed */}
            <Line
              type="monotone"
              dataKey="transcribed"
              stroke="currentColor"
              strokeOpacity={0.6}
              strokeWidth={2}
              isAnimationActive={false}
              dot={{ r: 3, stroke: "currentColor", fill: "currentColor", strokeOpacity: 0.6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
            {/* Transcription Accuracy Chart */}
    <motion.div
      className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800 w-full"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
        Transcription Accuracy
      </h3>

      <div className="relative w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={accuracyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              isAnimationActive={false} // ← avoids clash with Motion
            >
              {accuracyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background, #111827)",
                border: "1px solid var(--border, #374151)",
                borderRadius: "8px",
                color: "var(--foreground, #F9FAFB)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3 mt-4">
        {accuracyData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
          </div>

          {/* System Performance Chart */}
          <motion.div
            className="rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">System Performance</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-neutral-600 dark:text-neutral-400">CPU Usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-neutral-600 dark:text-neutral-400">Memory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-neutral-600 dark:text-neutral-400">Network</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                  <XAxis dataKey="time" stroke="currentColor" opacity={0.6} />
                  <YAxis stroke="currentColor" opacity={0.6} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      color: "var(--foreground)",
                    }}
                  />
                  <Area type="monotone" dataKey="cpu" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="network"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Usage Statistics */}
          <motion.div
            className="mt-8 rounded-2xl border border-neutral-200 p-6 bg-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-neutral-900 mb-6">Feature Usage</h3>

            <div className="space-y-4">
              {usageStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-sm font-medium text-neutral-700">{stat.feature}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-neutral-900 to-neutral-600 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${stat.usage}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-neutral-900 w-10 text-right">{stat.usage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        ref={pricingRef}
        id="pricing"
        className="py-24 bg-gradient-to-b from-neutral-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose the perfect plan for your meeting automation needs. All plans include our core features with
              scalable limits.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView={isPricingInView ? "visible" : "hidden"}
            viewport={{ once: true }}
          >
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for small teams getting started with meeting automation",
                features: [
                  "Up to 50 meetings/month",
                  "Basic transcription",
                  "7-day recording storage",
                  "Email support",
                  "REST API access",
                ],
                popular: false,
                color: "border-neutral-200",
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                description: "Advanced features for growing teams and businesses",
                features: [
                  "Up to 500 meetings/month",
                  "Advanced AI transcription",
                  "30-day recording storage",
                  "Priority support",
                  "Advanced analytics",
                  "Custom integrations",
                  "Team collaboration",
                ],
                popular: true,
                color: "border-black ring-2 ring-black",
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "Tailored solutions for large organizations",
                features: [
                  "Unlimited meetings",
                  "Custom AI models",
                  "Unlimited storage",
                  "24/7 dedicated support",
                  "On-premise deployment",
                  "Custom integrations",
                  "SLA guarantees",
                  "Advanced security",
                ],
                popular: false,
                color: "border-neutral-200",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative rounded-2xl border ${plan.color} p-8 bg-white hover:shadow-xl transition-all duration-500`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: plan.popular ? "0 25px 50px rgba(0,0,0,0.2)" : "0 25px 50px rgba(0,0,0,0.1)",
                }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-black text-white px-4 py-1">Most Popular</Badge>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-4xl font-black text-neutral-900">{plan.price}</span>
                    <span className="text-neutral-600">{plan.period}</span>
                  </div>
                  <p className="text-sm text-neutral-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-neutral-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full rounded-full py-3 px-6 text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-black text-white hover:opacity-90"
                      : "border border-neutral-300 text-neutral-900 hover:bg-neutral-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing FAQ */}
          <motion.div
            className="mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-center text-neutral-900 mb-8">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {[
                {
                  question: "How does the meeting automation work?",
                  answer:
                    "Our bot uses Selenium WebDriver with pre-authenticated Chrome profiles to automatically join Google Meet sessions, record audio/video, and process transcriptions using Whisper AI.",
                },
                {
                  question: "What's included in the transcription accuracy?",
                  answer:
                    "Our Whisper AI integration provides 99.2% accuracy across multiple languages, with real-time processing and automatic punctuation, speaker identification, and timestamp generation.",
                },
                {
                  question: "Can I integrate with my existing tools?",
                  answer:
                    "Yes! Our REST API allows seamless integration with your existing workflow tools, CRM systems, and collaboration platforms. We also provide webhooks for real-time notifications.",
                },
                {
                  question: "Is my data secure?",
                  answer:
                    "Absolutely. We use enterprise-grade AES-256 encryption, comply with GDPR and SOC 2 standards, and offer on-premise deployment options for maximum security.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border border-neutral-200 p-6 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="font-semibold text-neutral-900 mb-2">{faq.question}</h4>
                  <p className="text-sm text-neutral-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-24 bg-black text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))",
                "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
                "linear-gradient(45deg, rgba(236,72,153,0.2), rgba(59,130,246,0.2))",
              ],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to Automate Your
              <br />
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Meeting Workflow?
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-xl text-neutral-300 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of teams already using MeetBot.ai to streamline their Google Meet sessions with intelligent
              automation and AI-powered transcription.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-neutral-100 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="mr-2 h-5 w-5" />
                <span>Start Free Trial</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>

              <motion.button
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(255,255,255,0.8)",
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="mr-2 h-5 w-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center justify-center gap-8 text-sm text-neutral-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Brand */}
            <div className="md:col-span-1">
              <motion.div className="flex items-center gap-2 mb-4" whileHover={{ scale: 1.05 }}>
                <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-black">MeetBot.ai</span>
              </motion.div>
              <p className="text-sm text-neutral-600 mb-4">
                Intelligent meeting automation powered by Selenium, Whisper AI, and modern web technologies.
              </p>
              <div className="flex gap-3">
                {["GitHub", "Twitter", "LinkedIn"].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-black hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xs font-bold">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                {["Features", "Pricing", "API Documentation", "Integrations", "Changelog"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a href="#" className="hover:text-black transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                {["About Us", "Blog", "Careers", "Press", "Contact"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a href="#" className="hover:text-black transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                {["Help Center", "Community", "Status", "Security", "Privacy"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a href="#" className="hover:text-black transition-colors">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Bottom */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} MeetBot.ai — Built with ♥ for automation enthusiasts.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a href="#" className="hover:text-black transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Cookies
              </a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        mode={loginMode}
        onModeChange={setLoginMode}
      />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Square,
  Download,
  FileText,
  Settings,
  LogOut,
  Bot,
  CheckCircle,
  Moon,
  Sun,
  Search,
  Bell,
  Plus,
  TrendingUp,
  Mic,
  Video,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { VideoDashboard } from "./video-dashboard" // Added import for VideoDashboard component

interface DashboardProps {
  onLogout: () => void
  isDarkMode: boolean
  toggleTheme: () => void
}

const weeklyMeetingData = [
  { day: "Mon", meetings: 4, duration: 180 },
  { day: "Tue", meetings: 6, duration: 240 },
  { day: "Wed", meetings: 8, duration: 320 },
  { day: "Thu", meetings: 5, duration: 200 },
  { day: "Fri", meetings: 7, duration: 280 },
  { day: "Sat", meetings: 2, duration: 80 },
  { day: "Sun", meetings: 1, duration: 45 },
]

const transcriptionStats = [
  { month: "Jan", accuracy: 94, processed: 120 },
  { month: "Feb", accuracy: 96, processed: 145 },
  { month: "Mar", accuracy: 98, processed: 180 },
  { month: "Apr", accuracy: 97, processed: 165 },
]

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 2,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 80,
    },
  },
}

const elementVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function Dashboard({ onLogout, isDarkMode, toggleTheme }: DashboardProps) {
  const [meetUrl, setMeetUrl] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [botStatus, setBotStatus] = useState<"idle" | "joining" | "recording" | "processing">("idle")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null)

  const [recentMeetings, setRecentMeetings] = useState([
    {
      id: 1,
      title: "Product Strategy Meeting",
      date: "Today",
      duration: "45 min",
      status: "completed",
      transcript: true,
      participants: 8,
      type: "strategy",
    },
    {
      id: 2,
      title: "Client Onboarding Call",
      date: "Yesterday",
      duration: "60 min",
      status: "processing",
      transcript: false,
      participants: 5,
      type: "client",
    },
    {
      id: 3,
      title: "Weekly Team Standup",
      date: "2 days ago",
      duration: "30 min",
      status: "completed",
      transcript: true,
      participants: 12,
      type: "team",
    },
    {
      id: 4,
      title: "Sales Demo Presentation",
      date: "3 days ago",
      duration: "90 min",
      status: "completed",
      transcript: true,
      participants: 6,
      type: "sales",
    },
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleStartBot = () => {
    if (!meetUrl) return
    setBotStatus("joining")
    setTimeout(() => {
      setBotStatus("recording")
      setIsRecording(true)
      setRecordingTime(0)
    }, 3000)
  }

  const handleStopBot = () => {
    setBotStatus("processing")
    setIsRecording(false)
    setTimeout(() => {
      setBotStatus("idle")
      setRecentMeetings((prev) => [
        {
          id: Date.now(),
          title: "New Meeting Recording",
          date: "Just now",
          duration: `${Math.floor(recordingTime / 60)} min`,
          status: "completed",
          transcript: true,
          participants: Math.floor(Math.random() * 10) + 3,
          type: "general",
        },
        ...prev,
      ])
    }, 5000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting)
  }

  const handleBackToDashboard = () => {
    setSelectedMeeting(null)
  }

  if (selectedMeeting) {
    return <VideoDashboard meeting={selectedMeeting} onBack={handleBackToDashboard} isDarkMode={isDarkMode} />
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <motion.div
                className="flex items-center space-x-3"
                variants={elementVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </motion.div>
                <span className="text-lg font-bold text-foreground">MeetBot</span>
              </motion.div>

              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-sm font-medium text-foreground hover:bg-accent/50">
                  Dashboard
                </Button>
                <Button variant="ghost" className="text-sm text-muted-foreground hover:bg-accent/50">
                  Recordings
                </Button>
                <Button variant="ghost" className="text-sm text-muted-foreground hover:bg-accent/50">
                  Analytics
                </Button>
                <Button variant="ghost" className="text-sm text-muted-foreground hover:bg-accent/50">
                  Settings
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                className="relative hidden sm:block"
                variants={elementVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-card/50 backdrop-blur-sm border-border/50 focus:bg-card/80 transition-all duration-200 text-sm"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                variants={elementVariants}
                initial="hidden"
                animate="visible"
              >
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-accent/50">
                  <Bell className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variants={elementVariants}
                initial="hidden"
                animate="visible"
              >
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-9 w-9 p-0 hover:bg-accent/50">
                  <AnimatePresence mode="wait">
                    {isDarkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div
                className="h-8 w-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
                variants={elementVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-primary-foreground text-sm font-medium select-none">U</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                variants={elementVariants}
                initial="hidden"
                animate="visible"
              >
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  size="sm"
                  className="hover:bg-destructive/10 hover:text-destructive text-sm"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:col-span-8 space-y-8">
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Meeting Tracker
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-1">
                        Track meetings and access detailed data on each recording
                      </CardDescription>
                    </div>
                    <motion.div
                      className="flex items-center space-x-2 text-primary"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    >
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-xl font-bold">+24%</span>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 relative">
                        <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="https://meet.google.com/xxx-xxxx-xxx"
                          value={meetUrl}
                          onChange={(e) => setMeetUrl(e.target.value)}
                          disabled={botStatus !== "idle"}
                          className="pl-10 h-12 bg-muted/30 backdrop-blur-sm border-border/50 focus:bg-muted/50 transition-all duration-200 text-sm"
                        />
                      </div>
                      {botStatus === "idle" ? (
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Button
                            onClick={handleStartBot}
                            disabled={!meetUrl}
                            className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Start Recording
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <Button
                            onClick={handleStopBot}
                            variant="destructive"
                            className="h-12 px-8 shadow-lg text-sm font-medium"
                          >
                            <Square className="h-4 w-4 mr-2" />
                            Stop Recording
                          </Button>
                        </motion.div>
                      )}
                    </div>

                    <motion.div
                      className="bg-muted/20 backdrop-blur-sm rounded-xl p-4 border border-border/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      animate={{
                        boxShadow:
                          botStatus === "recording"
                            ? [
                                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                                "0 0 0 10px rgba(239, 68, 68, 0)",
                                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                              ]
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      transition={{ duration: 1.5, repeat: botStatus === "recording" ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className={`h-3 w-3 rounded-full ${
                              botStatus === "idle"
                                ? "bg-muted-foreground"
                                : botStatus === "joining"
                                  ? "bg-yellow-500"
                                  : botStatus === "recording"
                                    ? "bg-red-500"
                                    : "bg-primary"
                            }`}
                            animate={botStatus !== "idle" ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <span className="font-medium text-foreground text-sm">
                            {botStatus === "idle" && "Ready to join meeting"}
                            {botStatus === "joining" && "Joining meeting..."}
                            {botStatus === "recording" && "Recording in progress"}
                            {botStatus === "processing" && "Processing recording..."}
                          </span>
                        </div>
                        <AnimatePresence>
                          {isRecording && (
                            <motion.div
                              className="flex items-center space-x-2 text-red-500"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                            >
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <Mic className="h-4 w-4" />
                              </motion.div>
                              <span className="font-mono text-base">{formatTime(recordingTime)}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="mt-8 bg-muted/10 backdrop-blur-sm rounded-xl p-4 border border-border/20"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={weeklyMeetingData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            backdropFilter: "blur(8px)",
                          }}
                        />
                        <Bar dataKey="meetings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Your Recent Meetings
                  </CardTitle>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-foreground border-border/50 hover:bg-accent/50 backdrop-blur-sm text-sm"
                    >
                      See all Meetings
                    </Button>
                  </motion.div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {recentMeetings.map((meeting, index) => (
                      <motion.div
                        key={meeting.id}
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 100,
                        }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() => handleMeetingClick(meeting)}
                        className="flex items-center justify-between p-4 bg-muted/20 backdrop-blur-sm rounded-xl hover:bg-muted/30 transition-all duration-200 border border-border/20 cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Video className="h-6 w-6 text-primary-foreground" />
                          </motion.div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">{meeting.title}</h4>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>{meeting.date}</span>
                              <span>•</span>
                              <span>{meeting.duration}</span>
                              <span>•</span>
                              <span>{meeting.participants} participants</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge className="bg-muted/50 text-muted-foreground border-border/50 backdrop-blur-sm text-xs">
                            {meeting.type}
                          </Badge>
                          <Badge
                            variant={meeting.status === "completed" ? "default" : "secondary"}
                            className="backdrop-blur-sm text-xs"
                          >
                            {meeting.status}
                          </Badge>
                          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="sm" className="hover:bg-accent/50">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    Transcription Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="p-3 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="text-xl font-bold text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                      >
                        156
                      </motion.div>
                      <div className="text-xs text-muted-foreground">Processed</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="p-3 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div
                        className="text-xl font-bold text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        98%
                      </motion.div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="p-3 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div
                        className="text-xl font-bold text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        24h
                      </motion.div>
                      <div className="text-xs text-muted-foreground">Saved</div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-muted/10 backdrop-blur-sm rounded-lg p-2 border border-border/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={transcriptionStats}>
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    className="flex items-center justify-between p-3 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20"
                    whileHover={{ scale: 1.02, x: 2 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </motion.div>
                      <span className="text-foreground text-sm">Bot Service</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-700 backdrop-blur-sm text-xs">
                      Online
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-between p-3 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20"
                    whileHover={{ scale: 1.02, x: 2 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </motion.div>
                      <span className="text-foreground text-sm">Whisper AI</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-700 backdrop-blur-sm text-xs">
                      Active
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="p-3 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20"
                    whileHover={{ scale: 1.02, x: 2 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-primary" />
                        <span className="text-foreground text-sm">Storage</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2.4GB / 10GB</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-muted/20 backdrop-blur-sm border-border/50 hover:bg-muted/30 transition-all duration-200 text-sm"
                    >
                      <Plus className="h-4 w-4 mr-3" />
                      Schedule Recording
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-muted/20 backdrop-blur-sm border-border/50 hover:bg-muted/30 transition-all duration-200 text-sm"
                    >
                      <Download className="h-4 w-4 mr-3" />
                      Export Transcripts
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-muted/20 backdrop-blur-sm border-border/50 hover:bg-muted/30 transition-all duration-200 text-sm"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Bot Settings
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

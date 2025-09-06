"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  ArrowLeft,
  Download,
  Share2,
  Clock,
  Users,
  Calendar,
  FileText,
  Search,
  Copy,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface Meeting {
  id: number
  title: string
  date: string
  duration: string
  status: string
  transcript: boolean
  participants: number
  type: string
  videoUrl?: string
  description?: string
  transcriptText?: string
}

interface VideoDashboardProps {
  meeting: Meeting
  onBack: () => void
  isDarkMode: boolean
}

const mockTranscript = [
  {
    timestamp: "00:00",
    speaker: "John Doe",
    text: "Good morning everyone, let's start with our product strategy discussion.",
  },
  {
    timestamp: "00:15",
    speaker: "Sarah Smith",
    text: "Thanks John. I've prepared the quarterly analysis that shows our user engagement has increased by 24%.",
  },
  {
    timestamp: "00:32",
    speaker: "Mike Johnson",
    text: "That's excellent news. Can you walk us through the key metrics that contributed to this growth?",
  },
  {
    timestamp: "01:05",
    speaker: "Sarah Smith",
    text: "Absolutely. The main drivers were our new onboarding flow and the AI-powered recommendations feature.",
  },
  {
    timestamp: "01:28",
    speaker: "John Doe",
    text: "The AI recommendations have been particularly effective. We're seeing 40% higher conversion rates.",
  },
  {
    timestamp: "01:45",
    speaker: "Lisa Chen",
    text: "I'd like to discuss the technical implementation challenges we faced during the rollout.",
  },
  {
    timestamp: "02:12",
    speaker: "Mike Johnson",
    text: "Good point Lisa. The scalability issues were resolved with the new microservices architecture.",
  },
  {
    timestamp: "02:35",
    speaker: "Sarah Smith",
    text: "Moving forward, I suggest we focus on mobile optimization as our next priority.",
  },
]

export function VideoDashboard({ meeting, onBack, isDarkMode }: VideoDashboardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(2700) // 45 minutes in seconds
  const [volume, setVolume] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedText, setCopiedText] = useState("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number) => {
    setCurrentTime(value)
  }

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const handleCopyTranscript = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const filteredTranscript = mockTranscript.filter(
    (item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" onClick={onBack} className="hover:bg-accent/50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </motion.div>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-lg font-semibold text-foreground">{meeting.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {meeting.date} • {meeting.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="bg-card/50 backdrop-blur-sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="bg-card/50 backdrop-blur-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              ref={containerRef}
              className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Video Element */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/meeting-recording-video-thumbnail.jpg"
                >
                  <source src="/sample-meeting.mp4" type="video/mp4" />
                </video>

                {/* Play Button Overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.button
                        onClick={handlePlayPause}
                        className="h-20 w-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Play className="h-8 w-8 text-black ml-1" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Controls */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <Progress
                      value={(currentTime / duration) * 100}
                      className="h-2 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const percentage = x / rect.width
                        handleSeek(percentage * duration)
                      }}
                    />
                    <div className="flex justify-between text-xs text-white/80 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        onClick={handlePlayPause}
                        className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5 text-white" />
                        ) : (
                          <Play className="h-5 w-5 text-white ml-0.5" />
                        )}
                      </motion.button>

                      <motion.button
                        onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                        className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SkipBack className="h-4 w-4 text-white" />
                      </motion.button>

                      <motion.button
                        onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                        className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <SkipForward className="h-4 w-4 text-white" />
                      </motion.button>

                      <motion.button
                        onClick={() => setIsMuted(!isMuted)}
                        className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 text-white" />
                        ) : (
                          <Volume2 className="h-4 w-4 text-white" />
                        )}
                      </motion.button>
                    </div>

                    <motion.button
                      onClick={handleFullscreen}
                      className="h-8 w-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isFullscreen ? (
                        <Minimize className="h-4 w-4 text-white" />
                      ) : (
                        <Maximize className="h-4 w-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Meeting Details */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{meeting.title}</CardTitle>
                  <CardDescription className="text-base">
                    This meeting covered our quarterly product strategy and discussed key performance metrics, including
                    user engagement improvements and technical implementation challenges.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary" className="text-xs">
                        {meeting.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Transcript Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-border/50 h-fit">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center text-foreground">
                    <FileText className="h-5 w-5 mr-2" />
                    Meeting Transcript
                  </CardTitle>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transcript..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-muted/30 backdrop-blur-sm border-border/50"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    <AnimatePresence>
                      {filteredTranscript.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20 hover:bg-muted/30 transition-colors group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {item.timestamp}
                              </Badge>
                              <span className="text-sm font-medium text-foreground">{item.speaker}</span>
                            </div>
                            <motion.button
                              onClick={() => handleCopyTranscript(item.text)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {copiedText === item.text ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4 text-muted-foreground" />
                              )}
                            </motion.button>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Button
                      variant="outline"
                      className="w-full bg-muted/20 backdrop-blur-sm border-border/50 hover:bg-muted/30"
                      onClick={() =>
                        handleCopyTranscript(mockTranscript.map((item) => `${item.speaker}: ${item.text}`).join("\n\n"))
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Full Transcript
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Sparkles, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface FilterBarProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedLanguage: string
  setSelectedLanguage: (value: string) => void
  selectedTags: string[]
  setSelectedTags: (value: string[]) => void
  sortBy: string
  setSortBy: (value: string) => void
  showGoodFirstIssues: boolean
  setShowGoodFirstIssues: (value: boolean) => void
  languages?: string[]
  topics?: string[]
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLanguage,
  setSelectedLanguage,
  selectedTags,
  setSelectedTags,
  sortBy,
  setSortBy,
  showGoodFirstIssues,
  setShowGoodFirstIssues,
  languages = [],
  topics = [],
}) => {
  const [searchInputValue, setSearchInputValue] = useState(searchTerm)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const filterRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Transform for subtle 3D effect
  const rotateX = useTransform(y, [-100, 100], [2, -2])
  const rotateY = useTransform(x, [-100, 100], [-2, 2])

  // Spring physics for smoother animation
  const springX = useSpring(rotateX, { stiffness: 400, damping: 25 })
  const springY = useSpring(rotateY, { stiffness: 400, damping: 25 })

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchInputValue)
  }

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!filterRef.current) return

    const rect = filterRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Update motion values
    x.set(mouseX / 10)
    y.set(mouseY / 10)

    // Update mouse position for gradient
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const handleMouseLeave = () => {
    // Reset to original position
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={filterRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative bg-card rounded-xl p-5 shadow-lg border overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.7 : 0,
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(var(--primary), 0.15), transparent 60%)`
            : "none",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isHovered &&
          Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: [null, Math.random() * 100 + "%"],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
      </div>

      <div className="flex flex-col gap-5 relative z-10">
        <form onSubmit={handleSearch} className="relative">
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Search size={18} />
          </motion.div>

          <motion.div
            style={{ zIndex: 1 }}
            whileTap={{ scale: 0.98 }}
            whileHover={{
              boxShadow: "0 0 0 2px rgba(var(--primary), 0.3)",
              y: -2,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Input
              placeholder="Search repositories..."
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              className="pl-10 pr-24 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300 h-11"
              style={{ transform: "translateZ(10px)" }}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ zIndex: 2 }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            <Button
              type="submit"
              size="sm"
              className="h-9 px-4 bg-primary/90 hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg"
              style={{ transform: "translateZ(20px)" }}
            >
              <span className="mr-1">Search</span>
              <Sparkles size={14} className="animate-pulse" />
            </Button>
          </motion.div>
        </form>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div
            className="flex-1"
            style={{ transform: "translateZ(5px)" }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
              <motion.span
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 5 }}
              >
                <SlidersHorizontal size={14} className="text-primary/80" />
              </motion.span>
              Language
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            className="flex-1"
            style={{ transform: "translateZ(5px)" }}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
              <motion.span
                animate={{ rotate: [0, 180] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", repeatDelay: 6 }}
              >
                <Filter size={14} className="text-primary/80" />
              </motion.span>
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="updated">Recently Updated</SelectItem>
                <SelectItem value="issues">Most Issues</SelectItem>
                <SelectItem value="goodFirstIssues">Good First Issues</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        <motion.div
          style={{ transform: "translateZ(8px)" }}
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <span className="text-primary/80">#</span> Topics
            </label>
            {selectedTags.length > 0 && (
              <motion.button
                onClick={() => setSelectedTags([])}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 90] }}
                  transition={{ duration: 0.3 }}
                  className="group-hover:rotate-90 transition-transform"
                >
                  <X size={12} />
                </motion.div>
                Clear all
              </motion.button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
            <AnimatePresence>
              {topics.map((tag) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: [-1, 1, -1, 0],
                    transition: { rotate: { duration: 0.3 } },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all duration-300",
                      selectedTags.includes(tag)
                        ? "bg-primary hover:bg-primary/90 shadow-sm"
                        : "hover:bg-primary/10 border-primary/20",
                    )}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-1">
                        <X size={12} />
                      </motion.span>
                    )}
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* 3D edge lighting effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, transparent, rgba(var(--primary), 0.05) 20%, transparent 30%),
            linear-gradient(to bottom, transparent, rgba(var(--primary), 0.05) 20%, transparent 30%)
          `,
          opacity: 0,
          transformStyle: "preserve-3d",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          rotateX: isHovered ? springX.get() * 2 : 0,
          rotateY: isHovered ? springY.get() * 2 : 0,
        }}
      />
    </motion.div>
  )
}

export default FilterBar

"use client"

import { motion } from "motion/react"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export default function HeroSectionOne() {
  // Define the words for the first line of the typewriter effect
  const wordsLine1 = [{ text: "Launch" }, { text: "your" }, { text: "website" }, { text: "in" }]

  // Define the words for the second line of the typewriter effect
  const wordsLine2 = [{ text: "hours," }, { text: "not" }, { text: "days" }]
  
  // State to track which line is active for the cursor
  const [activeLine, setActiveLine] = useState(1)
  
  // Use a ref to track if the animations have been played
  const animationPlayedRef = useRef(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Only run animation if it hasn't played yet
    if (!animationPlayedRef.current) {
      animationPlayedRef.current = true;
      
      // Start with first line
      setActiveLine(1)
      
      // After first line is done (around 3 seconds), switch to second line
      const timer = setTimeout(() => {
        setActiveLine(2)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div 
      className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center"
      ref={sectionRef}
    >
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        {/* Two-line heading with sequential typewriter effect */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300">
          <div className="flex flex-col items-center relative">
            {/* First line */}
            <div className="flex items-center">
              <TypewriterEffectSmooth
                words={wordsLine1}
                className="text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300 mb-0 pb-0"
                cursorClassName="hidden" // Hide the individual cursor
                startDelay={0.5}
              />
              
              {/* Shared cursor for line 1 */}
              {activeLine === 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block rounded-sm w-[4px] h-8 md:h-12 lg:h-16 bg-blue-500"
                />
              )}
            </div>
            
            {/* Second line */}
            <div className="flex items-center">
              <TypewriterEffectSmooth
                words={wordsLine2}
                className="text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300 mt-0 pt-0"
                cursorClassName="hidden" // Hide the individual cursor
                startDelay={3.5} // Start after first line completes
              />
              
              {/* Shared cursor for line 2 */}
              {activeLine === 2 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block rounded-sm w-[4px] h-8 md:h-12 lg:h-16 bg-blue-500"
                />
              )}
            </div>
          </div>
        </h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          With AI, you can launch your website in hours, not days. Try our best in class, state of the art, cutting edge
          AI tools to get your website up.
        </motion.p>
        
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button>
        </motion.div>
        
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <Image
              src="/resume.png"
              alt="Resume template preview"
              className="aspect-[16/9] h-auto w-full object-contain"
              width={1200}
              height={800}
              unoptimized
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Aceternity UI</h1>
      </div>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
    </nav>
  )
}


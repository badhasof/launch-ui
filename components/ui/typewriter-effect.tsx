"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "motion/react"
import { useEffect } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        },
      )
    }
  }, [isInView])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black opacity-0 hidden`, word.className)}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </motion.div>
    )
  }
  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center", className)}>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500", cursorClassName)}
      ></motion.span>
    </div>
  )
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  startDelay = 0.5,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
  startDelay?: number
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    }
  })
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span key={`char-${index}`} className={cn(`dark:text-white text-black `, word.className)}>
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          )
        })}
      </div>
    )
  }

  // Add cursor visibility logic
  useEffect(() => {
    const firstLineCursor = document.querySelector(".cursor-first-line")
    const secondLineCursor = document.querySelector(".cursor-second-line")

    if (firstLineCursor && secondLineCursor) {
      // For first line
      if (startDelay < 3) {
        // Initially show first line cursor, hide second line cursor
        firstLineCursor.classList.remove("opacity-0")
        secondLineCursor.classList.add("opacity-0")

        // Hide first line cursor when typing completes (after ~2.5s)
        setTimeout(() => {
          firstLineCursor.classList.add("opacity-0")
        }, 2500)
      }

      // For second line
      if (startDelay > 3) {
        // Show second line cursor when it starts typing
        setTimeout(() => {
          secondLineCursor.classList.remove("opacity-0")
        }, 100)
      }
    }
  }, [startDelay])

  return (
    <div className={cn("flex space-x-1", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: startDelay,
        }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn("block rounded-sm w-[4px] h-8 sm:h-10 xl:h-16 bg-blue-500", cursorClassName)}
      ></motion.span>
    </div>
  )
}


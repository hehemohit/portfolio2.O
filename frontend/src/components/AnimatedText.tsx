import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AnimatedText.css'

const AnimatedText: React.FC = () => {
  const words = ['Freelancer', 'Developer', 'Designer', 'Creator']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="animated-text-overlay">
      <div className="animated-text-content">
        <span className="static-text">I am a </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[currentWordIndex]}
            className="changing-word"
            initial={{ 
              opacity: 0, 
              y: 40,
              scale: 0.7,
              rotateX: -45,
              filter: "blur(4px)"
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              y: -40,
              scale: 0.7,
              rotateX: 45,
              filter: "blur(4px)"
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.23, 1, 0.32, 1],
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 0.8
            }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AnimatedText

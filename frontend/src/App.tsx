import './App.css'
import godfatherImage from './assets/godfather.png'
import mohitLogo from './assets/mohitlogo.png'
import { useState, useEffect } from 'react'
import LogoLoopBits from './components/LogoLoopBits'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'
import BlurText from './components/BlurText'
import LightRays from './components/LightRays'
import { motion, AnimatePresence } from 'motion/react'
 

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showNav, setShowNav] = useState(false)

  const navVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0 }
    }
  }

  const navItemVariants: any = {
    hidden: { opacity: 0, x: 140 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } }
  }

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Play gunshot sound when home page loads
      playGunshotSound()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const playGunshotSound = () => {
    try {
      // Create a gunshot sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Resume audio context if suspended (required for autoplay policies)
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      
      // Create a buffer for the gunshot sound
      const bufferSize = audioContext.sampleRate * 0.3 // 0.3 seconds
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
      const data = buffer.getChannelData(0)
      
      // Generate gunshot sound (sharp attack with quick decay)
      for (let i = 0; i < bufferSize; i++) {
        const t = i / audioContext.sampleRate
        // Sharp attack with white noise and quick decay
        const noise = (Math.random() * 2 - 1) * Math.exp(-t * 25)
        data[i] = noise * 0.8 // Increased volume
      }
      
      // Play the sound
      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(audioContext.destination)
      source.start()
    } catch (error) {
      console.log('Audio not available:', error)
    }
  }

  useEffect(() => {
    // Start button animations aligned with loading fade timing
    const totalDelay = 3000 + 300 // loader 3s + extra 300ms
    const t = setTimeout(() => setShowNav(true), totalDelay)
    return () => clearTimeout(t)
  }, [])


  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="loading-logo">
            <div className="film-reel">
              <div className="reel-center"></div>
              <div className="reel-holes">
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
                <div className="hole"></div>
              </div>
            </div>
          </div>
          <div className="loading-text">
            <h1 className="loading-title">MOHIT JANGID</h1>
            <p className="loading-subtitle">CINEMA CLASSIC</p>
          </div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <nav className="retro-navbar">
        <div className="nav-brand">
          <h1>Mohit Jangid</h1>
          <span className="nav-subtitle">CINEMA CLASSIC</span>
        </div>
      </nav>
      
      <section id="home" className="home-section">
        <img 
          src={godfatherImage} 
          alt="The Godfather Movie Poster" 
          className="centered-image"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
        <div className="logo-overlay">
          <img 
            src={mohitLogo} 
            alt="Mohit Jangid Logo" 
            className="mohit-logo"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
          <div className="logo-description">
            <BlurText
              text={"I’m Mohit Jangid — a developer and creator blending classic cinematic aesthetics with modern web engineering. I design and build smooth, high-impact experiences with React, Next.js, TypeScript, and motion-first interfaces."}
              delay={120}
              animateBy="words"
              direction="top"
              className=""
            />
          </div>
        </div>
            <AnimatePresence initial={false}>
            {showNav && (
            <motion.div className="section-nav-buttons" key="nav-buttons"
              variants={navVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              <motion.button 
                className="section-nav-btn" 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                variants={navItemVariants}
              >
                ABOUT
              </motion.button>
              <motion.button 
                className="section-nav-btn" 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                variants={navItemVariants}
              >
                PROJECTS
              </motion.button>
              <motion.button 
                className="section-nav-btn" 
                onClick={() => document.getElementById('funtime')?.scrollIntoView({ behavior: 'smooth' })}
                variants={navItemVariants}
              >
                FUNTIME
              </motion.button>
            </motion.div>
            )}
            </AnimatePresence>
            
          </section>

      <section id="about" className="content-section">
        <div className="section-content">
          <h2 className="section-title">ABOUT</h2>
          <div className="section-text">
            <p>Welcome to my cinematic world. I'm Mohit Jangid, a passionate creator who brings stories to life through the lens of classic cinema.</p>
            <p>Drawing inspiration from timeless masterpieces like The Godfather, I craft experiences that blend the golden age of filmmaking with modern innovation.</p>
            <p>Every project is a tribute to the art of storytelling, where every frame tells a story and every moment is crafted with precision.</p>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffda03"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.8}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
      </section>

      {/* Logo Loop between About and Projects */}
      <section className="logo-loop-section">
        <div className="section-content">
          <LogoLoopBits
            logos={[
              { node: <SiReact />, title: 'React', href: 'https://react.dev' },
              { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
              { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
              { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
            ]}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Technology partners"
            style={{ color: '#ffda03' }}
          />
        </div>
      </section>

      <section id="projects" className="content-section">
        <div className="section-content">
          <h2 className="section-title">PROJECTS</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Cinematic Portfolio</h3>
              <p>A collection of visual stories inspired by classic cinema, featuring dramatic lighting and compelling narratives.</p>
            </div>
            <div className="project-card">
              <h3>Film Noir Collection</h3>
              <p>Dark, atmospheric pieces that capture the essence of classic film noir with modern sensibilities.</p>
            </div>
            <div className="project-card">
              <h3>Golden Age Revival</h3>
              <p>Contemporary works that pay homage to the golden age of Hollywood with a fresh perspective.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="funtime" className="content-section">
        <div className="section-content">
          <h2 className="section-title">FUNTIME</h2>
          <div className="section-text">
            <p>When I'm not creating cinematic masterpieces, you'll find me exploring the world of classic films, discovering hidden gems, and sharing my passion for storytelling.</p>
            <p>From analyzing the cinematography of Kubrick to discussing the narrative techniques of Coppola, every moment is an opportunity to learn and grow.</p>
            <p>Join me on this journey through the art of cinema, where every frame is a work of art and every story is worth telling.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App

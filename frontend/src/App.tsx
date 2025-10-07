import './App.css'
import godfatherImage from './assets/godfather.png'
import mohitLogo from './assets/mohitlogo.png'
import { useState, useEffect } from 'react'
import LogoLoopBits from './components/LogoLoopBits'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'
import BlurText from './components/BlurText'
import ClickSpark from './components/ClickSpark'
import FluidGlass from './components/FluidGlass'
import ScrambledText from './components/ScrambledText'
import GlitchEffect from './components/GlitchEffect'
// import BottomNavbar from './components/BottomNavbar'
import Dock from './components/Dock'
import { VscHome, VscAccount, VscArchive, VscSettingsGear } from 'react-icons/vsc'
import { FaGamepad } from 'react-icons/fa'
 

function App() {
  const [isLoading, setIsLoading] = useState(true)

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
    <ClickSpark
      sparkColor='#ffda03'
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
      easing='ease-out'
      extraScale={1.2}
    >
             <div className="app-container">
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
              text={"I'm Mohit Jangid — a developer and creator blending classic cinematic aesthetics with modern web engineering. I design and build smooth, high-impact experiences with React, Next.js, TypeScript, and motion-first interfaces."}
              delay={120}
              animateBy="words"
              direction="top"
              className=""
            />
          </div>
        </div>
            
          </section>

      <section id="about" className="content-section">
        <GlitchEffect 
          className="about-glitch" 
          intensity="low" 
          duration={800}
          triggerOnHover={true}
          autoTrigger={false}
        >
          <div className="about-section-content">
            <h2 className="about-section-title">Who is mohit?</h2>
            <div className="about-section-text">
              <ScrambledText
                className="about-scrambled-text"
                radius={80}
                duration={1.0}
                speed={0.3}
                scrambleChars=".:"
              >
                "I am a dedicated Computer Engineering student at Universal College of Engineering and a current Web Developer Intern at DigitalVigyapan. My passion lies in creating impactful digital solutions, demonstrated through my work on an Agency Management Software and developing fully functional client websites using WordPress. I combine my technical skills with a strong foundation in social media strategy and brand management to build comprehensive and user-focused web experiences."
              </ScrambledText>
              <ScrambledText
                className="about-scrambled-text"
                radius={80}
                duration={1.0}
                speed={0.3}
                scrambleChars=".:"
              >
                "Alongside my technical roles, I have spent over 10 years immersed in the world of digital content creation on YouTube. This journey has evolved into a successful freelance career where I serve as a content writer and video editor manager for creators with audiences exceeding 800,000 subscribers. By applying my strategic knowledge, I have also grown my own channel to over 12,000 subscribers. This experience has given me a deep, practical understanding of brand management, audience engagement, and the full lifecycle of digital content, from ideation to execution."
              </ScrambledText>
            </div>
          </div>
        </GlitchEffect>
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

      <section id="fluidglass" className="fluidglass-section">
        <div className="section-content">
          <h2 className="section-title">FLUID GLASS</h2>
          <div style={{ height: '600px', position: 'relative' }}>
            <FluidGlass 
              mode="lens"
              lensProps={{
                scale: 0.4,
                ior: 1.5,
                thickness: 8,
                chromaticAberration: 0.3,
                anisotropy: 0.05,
                transmission: 1,
                roughness: 0,
                color: '#ffffff',
                attenuationColor: '#ffffff',
                attenuationDistance: 0.2
              }}
            />
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
             <Dock 
               items={[
                 { icon: <VscHome size={18} />, label: 'Home', onClick: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <VscAccount size={18} />, label: 'About', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <VscArchive size={18} />, label: 'Projects', onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <VscSettingsGear size={18} />, label: 'Fluid', onClick: () => document.getElementById('fluidglass')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <FaGamepad size={18} />, label: 'Funtime', onClick: () => document.getElementById('funtime')?.scrollIntoView({ behavior: 'smooth' }) },
               ]}
               panelHeight={68}
               baseItemSize={50}
               magnification={70}
             />
           </ClickSpark>
         )
       }

export default App

import './App.css'
import godfatherImage from './assets/godfather.png'
import mohitLogo from './assets/mohitlogo.png'
import { useState, useEffect } from 'react'
import LogoLoopBits from './components/LogoLoopBits'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'
import BlurText from './components/BlurText'
import ClickSpark from './components/ClickSpark'
// import BottomNavbar from './components/BottomNavbar'
import Dock from './components/Dock'
import GlassmorphismTimeline from './components/GlassmorphismTimeline'
import CreativeComponents from './components/CreativeComponents'
import ProjectsSection from './components/ProjectsSection'
import './components/SimpleCursor.css'
import { VscHome, VscAccount, VscArchive, VscSettingsGear } from 'react-icons/vsc'
import { FaGamepad } from 'react-icons/fa'
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaTrophy, 
  FaCode, 
  FaRocket 
} from 'react-icons/fa'
 

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
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
        {/* Resume Button */}
        <a 
          href="https://drive.google.com/file/d/1EGU71Cs0YOFkQ7NjoSwZ9fv5GFaTUi5f/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="resume-button"
        >
          <span className="resume-text">Resume</span>
          <div className="resume-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>
        
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
        
        {/* Creative Components at bottom of home section */}
        <CreativeComponents />
            
          </section>

      {/* Blur effect between sections */}
      <div className="section-blur"></div>

      <section id="about" className="glassmorphism-about-section">
        <GlassmorphismTimeline 
          items={[
            {
              year: "2023",
              title: "Started Engineering Journey",
              description: "Enrolled in B.E. Computer Engineering at Universal College of Engineering, Mumbai. This marked the beginning of my journey into the world of technology and innovation.",
              icon: <FaGraduationCap />,
              color: "#00aaff"
            },
            {
              year: "2024",
              title: "Leadership Emergence",
              description: "Took on leadership roles as Sports Head, organizing events for 1000+ students. Progressed from SAA&SH President to Joint Sports Head, developing leadership and management skills.",
              icon: <FaTrophy />,
              color: "#a259ff"
            },
            {
              year: "Aug 2025",
              title: "First Professional Step",
              description: "Achieved 44.5% engagement growth across platforms, working with leading brands like Asian Paints and Proficio Therapy. Developed content strategies and brand campaigns.",
              icon: <FaBriefcase />,
              color: "#ffb300"
            },
             {
               year: "Sep 2025",
               title: "Technical Development & Leadership",
               description: "Part of development of Agency Management Software (AMS) with direct collaboration with the founder and COO. Working closely on system architecture, feature planning, and technical implementation using React.js, Node.js, and MongoDB. Gained hands-on experience in full-stack development while contributing to strategic product decisions.",
               icon: <FaCode />,
               color: "#00c896"
             },
             {
               year: "2026+",
               title: "Future Vision",
               description: "Expanding into Java development and software engineering while diving deep into cybersecurity. Learning advanced programming paradigms, secure coding practices, and system architecture. Pursuing certifications in cybersecurity and software development to become a well-rounded full-stack engineer with security expertise.",
               icon: <FaRocket />,
               color: "#ff4c60"
             }
           ]}
         />
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

      <ProjectsSection />

      <section id="certificates" className="certificates-section">
        <div className="section-content">
          <h2 className="section-title">CERTIFICATES</h2>
          <div className="certificates-grid">
            <div className="certificate-card">
              <h3>React Development</h3>
              <p>Advanced React.js and modern web development practices</p>
              <span className="certificate-date">2024</span>
            </div>
            <div className="certificate-card">
              <h3>TypeScript Fundamentals</h3>
              <p>Type-safe JavaScript development and advanced patterns</p>
              <span className="certificate-date">2024</span>
            </div>
            <div className="certificate-card">
              <h3>Full-Stack Development</h3>
              <p>Complete web application development with Node.js and MongoDB</p>
              <span className="certificate-date">2025</span>
            </div>
            <div className="certificate-card">
              <h3>Cybersecurity Fundamentals</h3>
              <p>Secure coding practices and system security principles</p>
              <span className="certificate-date">2025</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-content">
          <h2 className="section-title">CONTACT ME</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>Ready to collaborate on your next project? I'm always excited to work on innovative solutions and bring ideas to life.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <strong>Email:</strong> mohitjangid@example.com
                </div>
                <div className="contact-item">
                  <strong>LinkedIn:</strong> linkedin.com/in/mohitjangid
                </div>
                <div className="contact-item">
                  <strong>GitHub:</strong> github.com/mohitjangid
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
             <Dock 
               items={[
                 { icon: <VscHome size={18} />, label: 'Home', onClick: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <VscAccount size={18} />, label: 'About', className: 'futuristic-about-btn', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <VscArchive size={18} />, label: 'Projects', onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <FaGraduationCap size={18} />, label: 'Certificates', onClick: () => document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' }) },
                 { icon: <VscSettingsGear size={18} />, label: 'Contact', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
               ]}
               panelHeight={68}
               baseItemSize={50}
               magnification={70}
             />
           </ClickSpark>
  )
}

export default App
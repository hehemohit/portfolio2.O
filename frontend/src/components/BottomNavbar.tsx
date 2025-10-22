import React from 'react'
import { FaHome, FaUser, FaProjectDiagram, FaGlasses, FaGamepad } from 'react-icons/fa'

type NavItem = {
  id: string
  label: string
  icon: React.ReactNode
}

const items: NavItem[] = [
  { id: 'home', label: 'HOME', icon: <FaHome className="nav-icon" /> },
  { id: 'about', label: 'ABOUT', icon: <FaUser className="nav-icon" /> },
  { id: 'projects', label: 'PROJECTS', icon: <FaProjectDiagram className="nav-icon" /> },
  { id: 'fluidglass', label: 'FLUID', icon: <FaGlasses className="nav-icon" /> },
  { id: 'funtime', label: 'FUNTIME', icon: <FaGamepad className="nav-icon" /> }
]

export default function BottomNavbar() {
  const onJump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="bottom-navbar">
      <div className="nav-links">
        {items.map((item) => (
          <span 
            key={item.id} 
            className="nav-link" 
            data-section={item.id}
            onClick={() => onJump(item.id)}
          >
            {item.icon}
            {item.label}
          </span>
        ))}
      </div>
    </nav>
  )
}

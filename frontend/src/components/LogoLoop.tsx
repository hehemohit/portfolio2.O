import React, { useEffect, useMemo, useRef, useState } from 'react'
import './LogoLoop.css'

export type LogoLoopItem = {
  key: string
  content: React.ReactNode
}

type LogoLoopProps = {
  items: LogoLoopItem[]
  speedMs?: number
  gapPx?: number
  direction?: 'left' | 'right'
  className?: string
  loop?: boolean
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  items,
  speedMs = 20000,
  gapPx = 40,
  direction = 'left',
  className = '',
  loop = false
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const pauseTimeoutRef = useRef<number | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const offsetRef = useRef<number>(0)
  const widthRef = useRef<number>(0)
  const baseSpeedRef = useRef<number>(0) // px per second
  const currentSpeedRef = useRef<number>(0)
  const targetSpeedRef = useRef<number>(0)
  const endedRef = useRef<boolean>(false)

  const duplicatedItems = useMemo(() => {
    return [...items, ...items.map((it, idx) => ({ key: `${it.key}-dup-${idx}`, content: it.content }))]
  }, [items])

  const handleItemEnter = () => {
    if (endedRef.current) return
    setIsHovering(true)
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }
    pauseTimeoutRef.current = window.setTimeout(() => {
      targetSpeedRef.current = 0
    }, 600)
  }

  const handleItemLeave = () => {
    if (endedRef.current) return
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current)
      pauseTimeoutRef.current = null
    }
    setIsHovering(false)
    targetSpeedRef.current = baseSpeedRef.current
  }

  // Initialize sizes and base speed from provided duration
  useEffect(() => {
    const measure = () => {
      const node = trackRef.current
      if (!node) return
      const children = Array.from(node.children) as HTMLElement[]
      const itemsCount = items.length
      if (itemsCount === 0 || children.length === 0) return
      const firstEl = children[0]
      const lastEl = children[Math.min(itemsCount - 1, children.length - 1)]
      const firstLeft = firstEl.getBoundingClientRect().left
      const lastRect = lastEl.getBoundingClientRect()
      const lastStyles = window.getComputedStyle(lastEl)
      const lastMr = parseFloat(lastStyles.marginRight || '0') || 0
      const firstSetWidth = (lastRect.left - firstLeft) + lastRect.width + lastMr
      widthRef.current = firstSetWidth

      const directionSign = direction === 'right' ? -1 : 1
      const speedPxPerSec = widthRef.current / (speedMs / 1000)
      baseSpeedRef.current = speedPxPerSec * directionSign
      if (currentSpeedRef.current === 0) {
        currentSpeedRef.current = baseSpeedRef.current
      }
      targetSpeedRef.current = isHovering ? 0 : baseSpeedRef.current
      endedRef.current = false
      if (direction === 'right') {
        offsetRef.current = 0
      } else {
        offsetRef.current = 0
      }
    }

    const rId = window.requestAnimationFrame(measure)
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      window.cancelAnimationFrame(rId)
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [items, gapPx, speedMs, direction, isHovering])

  // Animation loop with eased velocity
  useEffect(() => {
    let rafId: number
    const EASE = 0.08 // higher = quicker adjustment
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      // ease current speed towards target speed
      const cs = currentSpeedRef.current
      const tspeed = targetSpeedRef.current
      const newSpeed = cs + (tspeed - cs) * EASE
      currentSpeedRef.current = newSpeed

      // advance offset
      let newOffset = offsetRef.current + newSpeed * dt
      const width = widthRef.current || 1
      // wrap using additive subtraction to avoid precision jumps
      const EPS = 0.5
      if (loop) {
        if (newOffset >= width - EPS) {
          newOffset -= width * Math.floor(newOffset / width)
        } else if (newOffset < 0) {
          newOffset += width * Math.ceil((-newOffset) / width)
        }
      } else {
        // Non-infinite: stop at boundary
        if (direction !== 'right') {
          if (newOffset >= width - EPS) {
            newOffset = width
            currentSpeedRef.current = 0
            targetSpeedRef.current = 0
            endedRef.current = true
          }
        } else {
          if (newOffset <= 0 + EPS) {
            newOffset = 0
            currentSpeedRef.current = 0
            targetSpeedRef.current = 0
            endedRef.current = true
          }
        }
      }
      offsetRef.current = newOffset

      const node = trackRef.current
      if (node) {
        node.style.transform = `translate3d(${-newOffset}px, 0, 0)`
      }

      if (!endedRef.current) {
        rafId = window.requestAnimationFrame(step)
      }
    }
    rafId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(rafId)
  }, [])

  return (
    <div className={`logo-loop ${className}`} style={{ ['--gapPx' as any]: `${gapPx}px` }}>
      <div
        ref={trackRef}
        className={`logo-loop-track ${direction === 'right' ? 'logo-loop-track-reverse' : ''}`}
        aria-hidden
      >
        {duplicatedItems.map((item, idx) => (
          <div
            className="logo-loop-item"
            key={item.key}
            onMouseEnter={handleItemEnter}
            onMouseLeave={handleItemLeave}
            style={{ marginRight: gapPx }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoLoop



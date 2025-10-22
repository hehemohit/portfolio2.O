import React, { useEffect, useRef, useState } from 'react';
import './GlassmorphismTimeline.css';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface GlassmorphismTimelineProps {
  items: TimelineItem[];
}

const GlassmorphismTimeline: React.FC<GlassmorphismTimelineProps> = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const currentScrollY = window.scrollY;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - timelineTop) / (windowHeight + timelineHeight)));
      setScrollProgress(scrollProgress);

      const newVisibleItems: number[] = [];
      const timelineItems = timeline.querySelectorAll('.timeline-scroll-item');

      timelineItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top;
        const itemHeight = itemRect.height;
        const itemCenter = itemTop + itemHeight / 2;

        // Item is visible when it's in the viewport
        if (itemTop < windowHeight && itemTop + itemHeight > 0) {
          newVisibleItems.push(index);
        }
      });

      setVisibleItems(newVisibleItems);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="glassmorphism-timeline-section">
      <h2 className="timeline-main-title">
        {Array.from('MY JOURNEY TIMELINE').map((char, index) => (
          <span key={index} className="char" style={{ animationDelay: `${index * 0.1}s` }}>
            {char}
          </span>
        ))}
      </h2>
      
      
      <div className="timeline-scroll-container" ref={timelineRef}>
        {/* Vertical Progress Line */}
        <div className="timeline-vertical-line">
          <div 
            className="timeline-progress-line" 
            style={{ 
              height: `${scrollProgress * 100}%`,
              transition: 'height 0.3s ease-out'
            }}
          ></div>
        </div>
        
        {items.map((item, index) => {
          const isVisible = visibleItems.includes(index);
          const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
          
          // Calculate color intensity based on timeline position
          // First item (index 0) is fully monochrome, last item is fully colored
          const colorIntensity = index / (items.length - 1);
          
          // Create monochrome version of the color
          const getMonochromeColor = (color: string) => {
            // Convert hex to RGB
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            
            // Convert to grayscale using luminance formula
            const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            return `#${gray.toString(16).padStart(2, '0').repeat(3)}`;
          };
          
          // Interpolate between monochrome and original color
          const interpolateColor = (color1: string, color2: string, factor: number) => {
            const hex1 = color1.replace('#', '');
            const hex2 = color2.replace('#', '');
            
            const r1 = parseInt(hex1.substr(0, 2), 16);
            const g1 = parseInt(hex1.substr(2, 2), 16);
            const b1 = parseInt(hex1.substr(4, 2), 16);
            
            const r2 = parseInt(hex2.substr(0, 2), 16);
            const g2 = parseInt(hex2.substr(2, 2), 16);
            const b2 = parseInt(hex2.substr(4, 2), 16);
            
            const r = Math.round(r1 + (r2 - r1) * factor);
            const g = Math.round(g1 + (g2 - g1) * factor);
            const b = Math.round(b1 + (b2 - b1) * factor);
            
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
          };
          
          const monochromeColor = getMonochromeColor(item.color);
          const currentColor = interpolateColor(monochromeColor, item.color, colorIntensity);
          
          return (
            <div 
              key={index}
              className={`timeline-scroll-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'} ${
                isVisible ? 'timeline-visible' : 'timeline-hidden'
              } ${scrollDirection === 'up' && !isVisible ? 'timeline-reverse' : ''}`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
            <div className="timeline-card">
              <div 
                className="glassmorphism-icon"
                style={{ 
                  background: `${currentColor}20`,
                  borderColor: currentColor,
                  filter: `drop-shadow(${currentColor}40 0px 8px 16px)`
                }}
              >
                {item.icon}
              </div>
              <div className="glassmorphism-year">{item.year}</div>
              <div className="glassmorphism-label">{item.title}</div>
            </div>
            
            <div className={`timeline-description ${
              index % 2 === 0 ? 'timeline-desc-left' : 'timeline-desc-right'
            }`}>
              <div className="description-content">
                <h3 className="description-title">{item.title}</h3>
                <p className="description-text">{item.description}</p>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlassmorphismTimeline;

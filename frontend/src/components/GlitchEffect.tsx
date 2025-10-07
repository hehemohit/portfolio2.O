import { useEffect, useRef } from 'react';
import './GlitchEffect.css';

interface GlitchEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  duration?: number;
  triggerOnHover?: boolean;
  autoTrigger?: boolean;
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({
  children,
  className = '',
  intensity = 'medium',
  duration = 2000,
  triggerOnHover = true,
  autoTrigger = false
}) => {
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glitchElement = glitchRef.current;
    if (!glitchElement) return;

    const glitchIntensities = {
      low: { skew: 0.3, translate: 1, opacity: 0.8 },
      medium: { skew: 0.5, translate: 2, opacity: 0.7 },
      high: { skew: 1, translate: 4, opacity: 0.6 }
    };

    const config = glitchIntensities[intensity];

    const triggerGlitch = () => {
      // Add glitch class
      glitchElement.classList.add('glitch-active');
      
      // Random glitch variations
      const skew = (Math.random() - 0.5) * config.skew;
      const translateX = (Math.random() - 0.5) * config.translate;
      const translateY = (Math.random() - 0.5) * config.translate;
      
      glitchElement.style.setProperty('--glitch-skew', `${skew}deg`);
      glitchElement.style.setProperty('--glitch-translate-x', `${translateX}px`);
      glitchElement.style.setProperty('--glitch-translate-y', `${translateY}px`);
      glitchElement.style.setProperty('--glitch-opacity', config.opacity.toString());

      // Remove glitch class after duration
      setTimeout(() => {
        glitchElement.classList.remove('glitch-active');
      }, duration);
    };

    // Trigger glitch on mouse enter (only if enabled)
    const handleMouseEnter = () => {
      if (triggerOnHover) {
        triggerGlitch();
      }
    };

    // Random glitch intervals (only if enabled)
    let randomGlitchTimeout: NodeJS.Timeout;
    const randomGlitch = () => {
      if (autoTrigger) {
        const randomDelay = Math.random() * 10000 + 5000; // 5-15 seconds
        randomGlitchTimeout = setTimeout(() => {
          triggerGlitch();
          randomGlitch();
        }, randomDelay);
      }
    };

    if (triggerOnHover) {
      glitchElement.addEventListener('mouseenter', handleMouseEnter);
    }
    
    if (autoTrigger) {
      randomGlitch();
    }

    return () => {
      if (triggerOnHover) {
        glitchElement.removeEventListener('mouseenter', handleMouseEnter);
      }
      if (autoTrigger && randomGlitchTimeout) {
        clearTimeout(randomGlitchTimeout);
      }
    };
  }, [intensity, duration, triggerOnHover, autoTrigger]);

  return (
    <div ref={glitchRef} className={`glitch-container ${className}`}>
      {children}
    </div>
  );
};

export default GlitchEffect;

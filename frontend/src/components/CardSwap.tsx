import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import './CardSwap.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, children, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}>
    {children}
  </div>
));
Card.displayName = 'Card';

interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: string;
  children: React.ReactNode;
}

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % childArr.length);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delay, childArr.length]);

  const rendered = childArr.map((child, i) => {
    const isActive = i === currentIndex;
    const isNext = i === (currentIndex + 1) % childArr.length;
    const isPrev = i === (currentIndex - 1 + childArr.length) % childArr.length;
    
    let cardClass = 'card-inactive';
    if (isActive) cardClass = 'card-active';
    else if (isNext) cardClass = 'card-next';
    else if (isPrev) cardClass = 'card-prev';

    return isValidElement(child)
      ? cloneElement(child, {
          key: i,
          style: { 
            width, 
            height, 
            ...(child.props.style ?? {})
          },
          className: `${child.props.className || ''} ${cardClass}`.trim()
        })
      : child;
  });

  return (
    <div 
      ref={container} 
      className="card-swap-container" 
      style={{ width, height }}
      onMouseEnter={() => pauseOnHover && setCurrentIndex(currentIndex)}
      onMouseLeave={() => {}}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
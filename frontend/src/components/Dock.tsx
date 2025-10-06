'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useMotionTemplate, type MotionValue } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import './Dock.css';

type SpringConfig = { mass: number; stiffness: number; damping: number };

type DockItemProps = {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringConfig;
  distance: number;
  magnification: number;
  baseItemSize: number;
};

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize } as DOMRect;
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
   >
      {Children.map(children as any, (child: any) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', ...rest }: any) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: '-50%' as any }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50
}: {
  items: Array<{ icon: React.ReactNode; label: string; onClick?: () => void; className?: string }>;
  className?: string;
  spring?: SpringConfig;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}) {
  const mouseX = useMotionValue<number>(Infinity);
  const isHovered = useMotionValue<number>(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight]);
  // Container grows from MENU height to full dock height
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  // Reveal animation for expanding/shrinking from center
  const revealRaw = useTransform(isHovered, [0, 1], [0, 1]);
  const reveal = useSpring(revealRaw, spring);
  const itemsScaleX = useTransform(reveal, [0, 1], [0, 1]); // scaleX 0 -> 1
  const itemsOpacity = useTransform(reveal, [0, 0.2, 1], [0, 0.4, 1]);
  const dockOpacity = useTransform(reveal, [0, 1], [0.6, 1]);
  const dockOpacityVar = useMotionTemplate`${dockOpacity}`;
  const menuOpacity = useTransform(reveal, [0, 1], [1, 0]);

  // Width animation: collapsed equals one button width, expanded equals content width
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const [expandedWidth, setExpandedWidth] = useState<number>(0);
  const horizontalPadding = 32; // approximate internal horizontal paddings
  const collapsedWidth = baseItemSize + horizontalPadding;

  useEffect(() => {
    const update = () => {
      const w = itemsRef.current?.scrollWidth ?? 0;
      setExpandedWidth(Math.max(w + horizontalPadding, collapsedWidth));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [collapsedWidth, items.length]);

  const widthRow = useTransform(reveal, [0, 1], [collapsedWidth, expandedWidth]);
  const panelWidth = useSpring(widthRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' as any }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight, width: panelWidth as unknown as number, ['--dockOpacity' as any]: dockOpacityVar } as any}
        role="toolbar"
        aria-label="Application dock"
      >
        {/* Hamburger icon shown only when collapsed */}
        <motion.div className="dock-hamburger" style={{ opacity: menuOpacity }}>
          <FaBars size={18} />
        </motion.div>
        {/* Expanding items container */}
        <motion.div
          className="dock-items"
          style={{ scaleX: itemsScaleX, opacity: itemsOpacity, transformOrigin: '50% 100%' }}
          ref={itemsRef}
        >
          {items.map((item, index) => (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}



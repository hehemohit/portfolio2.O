import React from 'react';
import RotatingText from './RotatingText';
import './CreativeComponents.css';

const CreativeComponents: React.FC = () => {
  return (
    <div className="creative-components-container">
      <span className="creative-text">I am a</span>
      <div 
        className="components-badge"
        style={{
          display: 'inline-flex',
          width: 'fit-content',
          minWidth: 'fit-content',
          maxWidth: 'none',
          transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        <RotatingText
          texts={['Developer', 'Designer', 'Creator', 'Innovator', 'Problem solver', 'Tech-Enthusiast','Sportsmen']}
          mainClassName="components-rotating-text"
          staggerFrom={"last"}
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          staggerDuration={0.04}
          splitLevelClassName="overflow-hidden pb-0.5"
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.8
          }}
          rotationInterval={2500}
        />
      </div>
    </div>
  );
};

export default CreativeComponents;

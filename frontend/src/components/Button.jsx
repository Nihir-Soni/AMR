// Button.jsx
import React, { useState } from 'react';

const Button = ({ children = "Click Me!", onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      type="button"
      className="w-[140px] h-[50px] relative p-0 m-0 cursor-pointer"
      style={{ background: 'none', outline: 'none', border: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onClick}
    >
      {/* Shadow Layer (button::before equivalent) - Most bottom */}
      <div 
        className="absolute rounded-[7mm]"
        style={{ 
          width: 'calc(100% + 2px)',
          height: '100%',
          background: 'rgb(140, 140, 140)',
          top: '14px',
          left: '-1px',
          outline: '2px solid rgb(36, 38, 34)',
          zIndex: 1
        }}
      />

      {/* Bottom Layer - Middle */}
      <div 
        className="absolute w-full h-full rounded-[7mm]"
        style={{ 
          background: 'rgb(229, 229, 199)',
          top: '10px',
          left: '0',
          outline: '2px solid rgb(36, 38, 34)',
          zIndex: 2
        }}
      >
        {/* Bottom left notch */}
        <div 
          className="absolute"
          style={{
            width: '2px',
            height: '9px',
            background: 'rgb(36, 38, 34)',
            bottom: '0',
            left: '15%'
          }}
        />
        {/* Bottom right notch */}
        <div 
          className="absolute"
          style={{
            width: '2px',
            height: '9px',
            background: 'rgb(36, 38, 34)',
            bottom: '0',
            left: '85%'
          }}
        />
      </div>

      {/* Top Layer (main button face) - Front */}
      <div 
        className="w-full h-full flex items-center justify-center rounded-[7mm] relative overflow-hidden"
        style={{ 
          background: 'rgb(255, 255, 238)',
          fontFamily: 'Poppins',
          fontSize: '16px',
          color: 'rgb(36, 38, 34)',
          outline: '2px solid rgb(36, 38, 34)',
          transition: '0.2s',
          transform: isPressed ? 'translateY(10px)' : 'translateY(0)',
          zIndex: 3
        }}
      >
        {children}
        
        {/* Shine effect (top::before) */}
        <div 
          className="absolute h-full"
          style={{
            width: '15px',
            background: 'rgba(0, 0, 0, 0.1)',
            transform: 'skewX(30deg)',
            left: isPressed ? 'calc(100% + 20px)' : '-20px',
            transition: '0.25s'
          }}
        />
      </div>
    </button>
  );
};

export default Button;
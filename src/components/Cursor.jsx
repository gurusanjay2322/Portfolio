import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import hornetGif from '../assets/hornet.gif';

const Cursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    };

    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    
    const clickables = document.querySelectorAll('a, button, .clickable');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`fixed top-0 left-0 pointer-events-none z-[10000] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isHovering ? 'scale-125' : 'scale-100'}`}
    >
      <img 
        src={hornetGif} 
        alt="Hornet Cursor" 
        className="w-24 h-24 object-contain"
      />
    </div>
  );
};

export default Cursor;


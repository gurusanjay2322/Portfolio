import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import hornetGif from '../assets/hornet.gif';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Center the cursor initially to avoid jump and handle centering via GSAP
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // use quickTo for high performance mouse following
    // duration: 0.1 gives a slight smooth delay. Lower it (e.g. 0.05) for snappier feel, raise for smoother.
    // 0.1 is a good balance for "following" without feeling "laggy".
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Handle hover state via delegation to support dynamic elements
    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if target or its parents are clickable
      const isClickable = target.matches('a, button, .clickable, input, textarea, select') || target.closest('a, button, .clickable, input, textarea, select');
      
      if (isClickable) {
        gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "back.out(1.7)" });
      } else {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-[10000]"
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

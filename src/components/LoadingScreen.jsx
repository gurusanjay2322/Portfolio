import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out container then call onComplete
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: onComplete
        });
      }
    });

    // Initial State
    gsap.set(pathRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });
    
    // Animation Sequence
    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut"
    })
    .from(textRef.current, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out"
    }, "-=1.5");

    // Continuous Pulse for Text
    gsap.to(textRef.current, {
      opacity: 0.7,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-silk/5 rounded-full blur-[100px] animate-pulse"></div>

      {/* Weaving Animation */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(237,33,58,0.5)]">
          {/* Stylized Weaver Seal / Silk Thread Pattern */}
          <path 
            ref={pathRef}
            d="M 50 10 C 20 10, 10 40, 10 50 C 10 80, 40 90, 50 90 C 60 90, 90 80, 90 50 C 90 20, 80 10, 50 10 Z M 50 20 C 70 20, 80 40, 80 50 C 80 70, 60 80, 50 80 C 40 80, 20 70, 20 50 C 20 30, 30 20, 50 20 Z" 
            fill="none" 
            stroke="#ed213a" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          {/* Center Glow */}
          <circle cx="50" cy="50" r="5" fill="#ed213a" className="animate-ping opacity-75" />
        </svg>
      </div>

      {/* Loading Text */}
      <div ref={textRef} className="text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-silk tracking-[0.3em] font-bold">
          WEAVING
        </h2>
        <p className="font-sans text-mist text-xs md:text-sm tracking-[0.5em] mt-2 uppercase opacity-70">
          Preparing the Kingdom
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;

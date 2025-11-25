import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import noShaw from "../assets/noshaw.png";

function NotFound() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Glitch/Shake Effect on Image
    const glitchAnim = gsap.to(imageRef.current, {
      x: () => Math.random() * 10 - 5,
      y: () => Math.random() * 10 - 5,
      opacity: () => 0.8 + Math.random() * 0.2,
      duration: 0.1,
      repeat: -1,
      paused: true,
      ease: "none"
    });

    // Hover listeners for glitch
    const img = imageRef.current;
    img.addEventListener("mouseenter", () => glitchAnim.play());
    img.addEventListener("mouseleave", () => {
      glitchAnim.pause();
      gsap.to(img, { x: 0, y: 0, opacity: 1, duration: 0.2 });
    });

    // Intro Animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    );
    
    gsap.fromTo(imageRef.current,
      { scale: 0.8, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
    );

    gsap.fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.6 }
    );

    return () => {
      img.removeEventListener("mouseenter", () => glitchAnim.play());
      img.removeEventListener("mouseleave", () => glitchAnim.pause());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-void flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-silk/5 rounded-full blur-[120px] animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* No Shaw Image */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-silk/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img 
            ref={imageRef}
            src={noShaw} 
            alt="No Shaw" 
            className="w-64 md:w-80 object-contain drop-shadow-[0_0_30px_rgba(237,33,58,0.3)]"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="space-y-6">
          <h1 className="font-serif text-6xl md:text-8xl text-silk font-bold tracking-tighter drop-shadow-[0_0_10px_rgba(237,33,58,0.5)]">
            404
          </h1>
          <h2 className="font-serif text-2xl md:text-3xl text-mist tracking-widest uppercase">
            Path Sealed
          </h2>
          <p className="font-sans text-gray-400 max-w-md mx-auto leading-relaxed">
            You have strayed too far into the deep nest. <br/>
            This area is not ready for exploration.
          </p>

          {/* Return Button */}
          <Link 
            to="/" 
            className="inline-block mt-8 px-8 py-3 border border-silk/50 text-silk font-serif tracking-[0.2em] uppercase hover:bg-silk hover:text-white hover:shadow-[0_0_20px_#ed213a] transition-all duration-300 rounded-sm"
          >
            Return to Sanctuary
          </Link>
        </div>
      </div>

      {/* Decorative Runes */}
      <div className="absolute bottom-10 left-10 text-silk/10 font-serif text-6xl select-none pointer-events-none">
        †
      </div>
      <div className="absolute top-10 right-10 text-silk/10 font-serif text-6xl select-none pointer-events-none">
        ‡
      </div>
    </div>
  );
}

export default NotFound;

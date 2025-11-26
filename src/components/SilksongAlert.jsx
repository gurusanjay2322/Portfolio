import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SilksongAlert = ({ isOpen, onClose, title, message }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      // Animate in
      gsap.fromTo(".alert-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(".alert-content",
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)", delay: 0.1 }
      );
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  if (!isOpen) return null;

  return createPortal(
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div 
        className="alert-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div 
        className="alert-content relative w-full max-w-md mx-4 z-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative Border Container */}
        <div className="relative bg-void border-2 border-gold/50 p-1 shadow-[0_0_30px_rgba(255,215,0,0.2)]">
          {/* Inner Content */}
          <div className="bg-voidLight border border-gold/20 p-8 text-center relative overflow-hidden">
            
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold"></div>

            {/* Header */}
            <h3 className="text-3xl font-serif text-gold mb-4 tracking-wider uppercase border-b border-gold/30 pb-2 inline-block">
              {title || "Notification"}
            </h3>

            {/* Message */}
            <p className="text-mist font-serif text-lg mb-8 leading-relaxed">
              {message}
            </p>

            {/* Button */}
            <button
              onClick={onClose}
              className="px-8 py-3 bg-transparent border border-gold text-gold hover:bg-gold hover:text-void transition-all duration-300 uppercase tracking-widest font-bold text-sm relative group overflow-hidden"
            >
              <span className="relative z-10">Acknowledge</span>
              <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            {/* Background Texture/Pattern overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SilksongAlert;

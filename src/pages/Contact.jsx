import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { FaGithubSquare, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/all';
import SilksongAlert from "../components/SilksongAlert";
import hornetSitting from "../assets/hornetsitting.webp";

function Contact() {
  const form = useRef();
  const containerRef = useRef(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Firefly animation
    gsap.to(".firefly", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      opacity: "random(0.5, 1)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1
    });

    // Form reveal
    gsap.from(".sanctum-form", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_pech1kl", "template_zye65av", form.current, "i2luGLQyGsOubwwEU")
      .then(() => {
        setAlertTitle("Message Transmitted");
        setAlertMessage("Your voice has reached the void. We shall respond in due time.");
        setAlertOpen(true);
      }, () => {
        setAlertTitle("Transmission Failed");
        setAlertMessage("The void is silent. Please try again later.");
        setAlertOpen(true);
      });
    e.target.reset();
  };

  return (
    <section id="contact" ref={containerRef} className="relative min-h-screen bg-paper dark:bg-void flex items-center justify-center overflow-hidden py-20 transition-colors duration-500">
      
      {/* Fireflies Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="firefly absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-gold mb-4 tracking-widest uppercase">The Sanctum</h2>
          <p className="text-mistDark dark:text-mist font-serif italic">"Send a vessel into the void"</p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left: Social Pillars */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="p-8 border border-gold/20 bg-white/50 dark:bg-voidLight/50 backdrop-blur-sm rounded-lg relative overflow-hidden group hover:border-silk/50 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-50"></div>
              
              <h3 className="text-2xl font-serif text-ink dark:text-text mb-6">Connect</h3>
              
              <div className="space-y-6">
                <a href="mailto:rkgurusanjay@gmail.com" className="flex items-center gap-4 text-gray-600 dark:text-mist hover:text-silk transition-colors group/link">
                  <FaEnvelope className="text-xl" />
                  <span className="group-hover/link:translate-x-2 transition-transform">rkgurusanjay@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-gray-600 dark:text-mist">
                  <FaMapMarkerAlt className="text-xl" />
                  <span>Chennai, India</span>
                </div>
              </div>

              <div className="mt-8 flex gap-6">
                {[
                  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/guru-sanjay-65b7a5316/" },
                  { icon: <FaGithubSquare />, link: "https://github.com/gurusanjay2322" },
                  { icon: <FaInstagram />, link: "https://www.instagram.com/__.gs.__22" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-gray-500 dark:text-textDim hover:text-gold hover:scale-110 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full md:w-1/2 sanctum-form relative mt-12 md:mt-0">
            {/* Hornet Sitting Asset */}
            <div className="absolute -top-20 right-4 md:right-12 z-20 w-24 md:w-28 pointer-events-none">
              <img 
                src={hornetSitting} 
                alt="Hornet Sitting" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-6 relative pt-8">
              {/* Decorative Border */}
              <div className="absolute -inset-4 border border-mist/10 rounded-xl pointer-events-none"></div>

              <div className="group">
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Name of the Traveler"
                  className="w-full bg-white dark:bg-voidLight border-b border-mist/30 p-4 text-ink dark:text-text placeholder-textDim/50 focus:outline-none focus:border-silk transition-colors"
                />
              </div>
              
              <div className="group">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Signal Frequency (Email)"
                  className="w-full bg-white dark:bg-voidLight border-b border-mist/30 p-4 text-ink dark:text-text placeholder-textDim/50 focus:outline-none focus:border-silk transition-colors"
                />
              </div>

              <div className="group">
                <textarea
                  name="message"
                  rows="4"
                  required
                  placeholder="Inscribe your message..."
                  className="w-full bg-voidLight border-b border-mist/30 p-4 text-text placeholder-textDim/50 focus:outline-none focus:border-silk transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white dark:bg-void border border-gold/30 text-gold hover:bg-gold hover:text-white dark:hover:text-void transition-all duration-300 uppercase tracking-[0.2em] font-bold text-sm relative overflow-hidden group"
              >
                <span className="relative z-10">Transmit</span>
                <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </form>
          </div>

        </div>
      </div>
      
      <SilksongAlert 
        isOpen={alertOpen} 
        onClose={() => setAlertOpen(false)} 
        title={alertTitle} 
        message={alertMessage} 
      />
    </section>
  );
}

export default Contact;


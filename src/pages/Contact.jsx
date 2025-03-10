import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import backgroundImage from '../assets/backgrounds/axiom-pattern.png';
import { FaGithubSquare, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from 'gsap/all';

function Contact() {
  const form = useRef();
  const contactRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const text = new SplitType("#contactTitle", { types: "chars" });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
        end: "bottom center",
      },
    });
    timeline.to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.1,
      duration: 0.1,
    });
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pech1kl",
        "template_zye65av",
        form.current,
        "i2luGLQyGsOubwwEU"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send message.");
        }
      );

    e.target.reset();
  };

  return (
    <section id="contact" ref={contactRef} className="relative min-h-screen">
      <div
        className="min-h-screen bg-center bg-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Add a subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <h1 id="contactTitle" className="text-2xl md:text-5xl font-RockSalt text-lightPrimary dark:text-primary font-bold text-center mb-16">
            Let's Connect
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Contact Info & Social */}
            <div className="space-y-8">
              <div className="bg-lightSecondary/10 dark:bg-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-lightAccent/20 dark:border-accent/20">
                <h2 className="text-xl font-RockSalt text-lightPrimary dark:text-primary font-bold mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <FaEnvelope className="text-2xl text-lightAccent dark:text-accent" />
                    <div>
                      <h3 className="font-semibold text-lightText dark:text-white">Email</h3>
                      <p className="text-lightText/80 dark:text-white/80">gurusanjay2322@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaPhone className="text-2xl text-lightAccent dark:text-accent" />
                    <div>
                      <h3 className="font-semibold text-lightText dark:text-white">Phone</h3>
                      <p className="text-lightText/80 dark:text-white/80">+91 1234567890</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaMapMarkerAlt className="text-2xl text-lightAccent dark:text-accent" />
                    <div>
                      <h3 className="font-semibold text-lightText dark:text-white">Location</h3>
                      <p className="text-lightText/80 dark:text-white/80">Chennai, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-lightSecondary/10 dark:bg-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-lightAccent/20 dark:border-accent/20">
                <h2 className="text-xl font-RockSalt text-lightPrimary dark:text-primary font-bold mb-6">
                  Social Links
                </h2>
                <div className="flex space-x-6">
                  <a 
                    href="https://www.linkedin.com/in/guru-sanjay-65b7a5316/" 
                    target="_blank"
                    className="group"
                  >
                    <FaLinkedin className="text-3xl text-lightAccent dark:text-accent transform group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a 
                    href="https://github.com/gurusanjay2322" 
                    target="_blank"
                    className="group"
                  >
                    <FaGithubSquare className="text-3xl text-lightAccent dark:text-accent transform group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a 
                    href="https://www.instagram.com/__.gs.__22" 
                    target="_blank"
                    className="group"
                  >
                    <FaInstagram className="text-3xl text-lightAccent dark:text-accent transform group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-lightSecondary/10 dark:bg-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-lightAccent/20 dark:border-accent/20">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-lightText dark:text-white mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-lightSecondary/20 dark:bg-secondary/20 border border-lightAccent/30 dark:border-accent/30 text-lightText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-accent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-lightText dark:text-white mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-lightSecondary/20 dark:bg-secondary/20 border border-lightAccent/30 dark:border-accent/30 text-lightText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-accent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-lightText dark:text-white mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-lightSecondary/20 dark:bg-secondary/20 border border-lightAccent/30 dark:border-accent/30 text-lightText dark:text-white focus:outline-none focus:ring-2 focus:ring-lightAccent dark:focus:ring-accent transition-all duration-300 resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-lightAccent dark:bg-accent text-white rounded-lg font-semibold hover:bg-lightAccent/90 dark:hover:bg-accent/90 transform hover:scale-[1.02] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

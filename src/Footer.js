import React, { useRef } from "react";
import { Link } from "react-router-dom";
import footerLogo from "./footerLogo.png";
import "./App.css";
const Footer = () => {
  const audioRef = useRef(null); // Create a ref for the audio element

  const handleMouseOver = () => {
    if (audioRef.current && audioRef.current.readyState >= 3) {
      // Check if the audio is loaded and ready to play
      audioRef.current.play().catch((error) => {
        console.error("Failed to play the audio:", error);
      });
      console.log("hello");
    }
  };

  const handleMouseOut = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the beginning
    }
  };

  return (
    <>
      <Link to="/game">
        <div
          className="rounded-full fixed bottom-[8%] right-[5%] z-[20] gameBtn"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img
            src="/images/game.png"
            alt="Game Button Icon"
            className="w-[120px] h-[auto] object-cover rounded-full drop"
          />
          <audio ref={audioRef} src="/images/avengersvoice.mp3"></audio>
        </div>
      </Link>
      <footer className="bg-[#2a2a2a] text-white py-[60px] relative">
        <div className="relative z-10 text-center mb-4">
          <div className="footer-logo">
            <Link to="/">
              <img
                src={footerLogo}
                alt="Marvel's Avengers"
                className="mx-auto mb-2 w-full max-w-[120px]"
              />
            </Link>
          </div>

          <p>© 2024 Marvel. All Rights Reserved.</p>
        </div>

        {/* Minimalist Social Media Icons */}
        <div className="relative z-10 flex justify-center mb-4">
          <a href="https://facebook.com" className="mx-2">
            <img
              src="/images/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a href="https://twitter.com" className="mx-2">
            <img src="/images/twitter.svg" alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="https://instagram.com" className="mx-2">
            <img
              src="/images/instagram.svg"
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>
        </div>

        {/* Contact and Legal Links */}
        <div className="relative z-10 text-center mb-4">
          <p className="uppercase text-xs">
            <Link to="/contact-us" className="hover:text-gray-300 mx-2">
              Contact Us
            </Link>
            |
            <Link to="/privacy-policy" className="hover:text-gray-300 mx-2">
              Privacy Policy
            </Link>
            |
            <Link to="/terms-of-use" className="hover:text-gray-300 mx-2">
              Terms of Use
            </Link>
          </p>
        </div>

        {/* Quote or Tagline */}
        <div className="relative z-10 text-center mt-4">
          <p className="text-lg font-bold uppercase">Avengers Assemble!</p>
        </div>

        {/* Hero Symbol Pattern */}
        <div className="relative z-10 text-center mt-4">
          <p className="text-xs opacity-50">Powered by Marvel</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

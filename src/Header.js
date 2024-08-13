import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="flex justify-center">
          <Link to="/" className="header-link">
            <img
              src="/avengers-logo.png"
              alt="Avengers Logo"
              className="header-logo w-[100%] max-w-[300px]"
            />
          </Link>
        </div>

        {/* Add more navigation links here if needed */}
      </nav>
      <h1>Hello suumit ajfgnir</h1>
    </header>
  );
};

export default Header;

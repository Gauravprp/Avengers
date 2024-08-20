import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "./footerLogo.png";

const Progress = () => {
  return (
    <div className=" bg-[#000] flex items-center justify-center text-white py-[80px]">
      <div className="text-center">
        <Link to="/">
          <img
            src={footerLogo}
            alt="Marvel Logo"
            className="mx-auto mb-6 w-32 h-auto"
          />
        </Link>
        <h1 className="text-4xl font-bold mb-4">Site Under Maintenance</h1>
        <p className="text-lg mb-6">
          Our site is currently undergoing maintenance. We'll be back soon!
        </p>
        <div className="flex justify-center mb-6">
          <svg
            className="animate-spin h-8 w-8 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0"
            />
          </svg>
        </div>
        <p className="text-xs opacity-70">
          &copy; 2024 Marvel Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};
export default Progress;

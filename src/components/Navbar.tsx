"use client";
import Link from "next/link";
import { FaHome, FaCar } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-10">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <FaCar className="text-black w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold text-black">ParkMate</h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/dashboard">
            <span
              className={`flex items-center p-2 text-black hover:bg-blue-100 rounded transition duration-300 ${
                pathname === "/dashboard" ? "border-b-2 border-blue-600" : ""
              }`}
            >
              <FaHome className="mr-1" /> Dashboard
            </span>
          </Link>
          <Link href="/vehicles">
            <span
              className={`flex items-center p-2 text-black hover:bg-blue-100 rounded transition duration-300 ${
                pathname === "/vehicles" ? "border-b-2 border-blue-600" : ""
              }`}
            >
              <FaCar className="mr-1" /> Vehicles
            </span>
          </Link>
        </div>
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md transition-all duration-300 ease-in-out">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/dashboard">
                <span
                  className={`flex items-center p-2 text-black hover:bg-blue-100 rounded transition duration-300 ${
                    pathname === "/dashboard"
                      ? "border-b-2 border-blue-600"
                      : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <FaHome className="mr-1" /> Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link href="/vehicles">
                <span
                  className={`flex items-center p-2 text-black hover:bg-blue-100 rounded transition duration-300 ${
                    pathname === "/vehicles" ? "border-b-2 border-blue-600" : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <FaCar className="mr-1" /> Vehicles
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

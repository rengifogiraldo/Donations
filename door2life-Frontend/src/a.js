import React, { useState, useEffect } from "react";
import { Events, scrollSpy } from "react-scroll";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navColor, setNavColor] = useState("bg-transparent");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setNavColor("bg-black");
      } else {
        setNavColor("");
      }
    };
  }, []);

  return (
    <div
      className={`flex  items-center justify-between h-12 fixed w-full  ${navColor}`}
    >
      <div className="flex items-center ml-2">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              className="w-6 h-6 md:hidden z-10 relative"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 md:hidden z-10 relative
            "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
        <div className="">
          <img src="mergo.png" className="h-8 ml-3" />
        </div>
        <div className="hidden sm:block ml-3">Nst-Mail Merge</div>
      </div>
      <div className="hidden md:flex space-x-6 text-white mr-12">
        <a href="#" className="hover:text-blue-500 text-gray-100">
          Home
        </a>
        <a href="#" className="hover:text-blue-500 ">
          Features
        </a>
      </div>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }        rounded-sm w-full  md:w-auto fixed top-0  left-0 h-full
        transition-transform duration-500
        ease-in-out bg-teal-800 w-64 p-4

        `}
        style={{ width: "250px" }}
      >
        <div className=" mt-8 flex flex-col space-y-4 p-2 ">
          <a
            href="#"
            className="block text-white hover:text-blue-500 transform transition-transform duration-500 ease-in-out"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-200px)",
            }}
          >
            Home
          </a>
          <a
            href="#"
            className="block text-green-600 hover:text-blue-500 transform transition-transform duration-700 ease-in-out"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-200px)",
            }}
          >
            Features
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
      






import React, { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex  items-center justify-between px-6 py-4 bg-zinc-400">
      <div className="flex space-x-6">
        <div className="hidden sm:block ">Opening Doors To Life</div>
        <Link to="/faqs" className="hover:text-white cursor-pointer">
          Frequently Asked Questions
        </Link>
        <Link to="/belief" className="hover:text-white cursor-pointer">
          READ BELIEFS
        </Link>

        <div className="hover:text-white cursor-pointer ">DONATIONS</div>
        <div className="hover:text-white cursor-pointer">CONTACT</div>
      </div>
      <div className="flex items-center space-x-4">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Language</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink className="p-2">English</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center ml-2">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              className="w-6 h-6 md:hidden z-10 relative"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 md:hidden z-10 relative
            "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>{" "}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }        rounded-sm w-full  md:w-auto fixed top-0  left-0 h-full
        transition-transform duration-500
        ease-in-out bg-teal-800 w-64 p-4

        `}
        style={{ width: "250px" }}
      >
        <div className=" mt-8 flex flex-col space-y-4 p-2 ">
          <a
            href="#"
            className="block text-white hover:text-blue-500 transform transition-transform duration-500 ease-in-out"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-200px)",
            }}
          >
            Home
          </a>
          <a
            href="#"
            className="block text-green-600 hover:text-blue-500 transform transition-transform duration-700 ease-in-out"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-200px)",
            }}
          >
            Features
          </a>
        </div>
      </div>{" "}
    </div>
  );
};

export default Navbar;










import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Let’s Work Together
            </h1>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Mail</h2>
              <p className="text-gray-600">arhamwasif.92@gmail.com</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Address</h2>
              <p className="text-gray-600">Multan, Pakistan</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
              <p className="text-gray-600">+(92) 3060064797</p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-6 shadow-inner">
            <form>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <textarea
                placeholder="Write a message here"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                rows="4"
              />
              <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

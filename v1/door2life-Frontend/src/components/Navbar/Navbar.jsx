import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Translator from "../Language/Translator";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout Successfully!", {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: true,
      theme: "light",
    });

    setTimeout(() => {
      sessionStorage.clear();
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 z-50 flex items-center w-full px-6 py-4 bg-white shadow-md bg-opacity-90 backdrop-blur-sm">
        <div className="z-20 flex items-center md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg
                className="relative z-10 w-6 h-6"
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
                className="relative z-10 w-6 h-6"
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
        </div>

        <div className="flex items-center">
          <div className="px-4 py-1 transition-colors duration-300 rounded-md">
            <Link to="/" className="text-white cursor-pointer hover:text-white">
              <img src={logo} alt="logo" className="h-6 md:h-8" />
            </Link>
          </div>

          <Link
            to="/belief"
            className="hidden px-4 py-1 transition-colors duration-300 rounded-md cursor-pointer text-lightgray hover:bg-greengrass hover:text-white md:block"
          >
            {t("navbar.beliefs")}
          </Link>

          <Link
            to="/contact"
            className="hidden px-4 py-1 transition-colors duration-300 rounded-md cursor-pointer text-lightgray hover:bg-greengrass hover:text-white md:block"
          >
            {t("navbar.contact")}
          </Link>
          
          <Link
            to="/faqs"
            className="hidden px-4 py-1 transition-colors duration-300 rounded-md cursor-pointer text-lightgray hover:bg-greengrass hover:text-white md:block"
          >
            {t("navbar.faqs")}
          </Link>
        </div>

        {sessionStorage.getItem("token") ? (
          <div className="flex items-center ml-auto space-x-4">
            <Link to="/userpage">
              <Button>{t("navbar.myAccount")}</Button>
            </Link>
            <Button onClick={handleLogout}>{t("navbar.logout")}</Button>
          </div>
        ) : (
          <div className="flex items-center ml-auto space-x-4">
            <Link to="/login">
              <Button>{t("navbar.login")}</Button>
            </Link>
            <Link to="/register">
              <Button>{t("navbar.register")}</Button>
            </Link>
          </div>
        )}

        <div className="hidden ml-6 sm:block">
          <Translator />
        </div>

        {/* Sidebar for Mobile */}
        {isOpen && (
          <div className="fixed top-16 left-0 w-screen h-auto p-4 transition-transform duration-500 ease-in-out bg-grassGreen rounded-sm md:w-auto">
            <div className="flex flex-col p-2 mt-8 space-y-4 text-center">
              <Link
                to="/"
                className="block cursor-pointer text-gray hover:text-gray"
                onClick={() => setIsOpen(false)}
              >
                {t("navbar.home")}
              </Link>
              <Link
                to="/faqs"
                className="block cursor-pointer text-gray hover:text-gray"
                onClick={() => setIsOpen(false)}
              >
                {t("navbar.faqs")}
              </Link>
              <Link
                to="/belief"
                className="block cursor-pointer text-gray hover:text-gray"
                onClick={() => setIsOpen(false)}
              >
                {t("navbar.beliefs")}
              </Link>
              <Link
                to="/contact"
                className="block cursor-pointer text-gray hover:text-gray"
                onClick={() => setIsOpen(false)}
              >
                {t("navbar.contact")}
              </Link>
            </div>
            <div className="flex justify-center mt-2 md:hidden">
              <Translator />
            </div>
          </div>
        )}
      </nav>
      <ToastContainer stacked />
    </>
  );
};

export default Navbar;
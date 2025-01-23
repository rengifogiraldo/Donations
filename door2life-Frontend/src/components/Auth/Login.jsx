import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Import translation hook

const Login = () => {
  const { t } = useTranslation(); // Use translation hook to access language keys
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const loginData = {
    email: email.toLowerCase(),
    password: password,
  };

  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      if (!email || !password) {
        setError(t("errorMessage")); // Using translation key for error message
      } else {
        // Display a toast promise while the request is in progress
        await toast
          .promise(
            axios.post(
              "https://donations-prdd.onrender.com/api/auth/login",
              loginData
            ),
            {
              pending: t("loginInProgress"), // Translation for "Logging in..."
              success: t("loginSuccess"), // Translation for successful login
              error: t("loginError"), // Translation for login error
            },
            {
              position: "top-right",
              autoClose: 1200,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            }
          )
          .then((response) => {
            const userId = response.data.user._id;
            sessionStorage.setItem("UserId", userId);
            sessionStorage.setItem("username", response.data.user.username);
            sessionStorage.setItem("token", response.data.token);
            setToken(response.data.token);

            setTimeout(() => {
              navigate("/userpage");
            }, 1500);
          });
      }
    } catch (error) {
      console.error(error.response?.data?.error || "An error occurred");
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-green">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
            {t("login")} {/* Using translation key for "Login" */}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">
                {t("email")} {/* Translation for "Email" */}
              </label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder={t("enterEmail")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error ? <p className="text-red-600 ">{error}</p> : ""}
            </div>

            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                {t("password")} {/* Translation for "Password" */}
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("enterPassword")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div
                className="absolute text-gray-600 cursor-pointer right-3 top-[2.1rem]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </div>
              {error ? <p className="text-red-600">{error}</p> : ""}
            </div>

            <button
              type="button"
              onClick={handlelogin}
              className="w-full py-2 mt-4 font-semibold transition duration-300 rounded-lg bg-grassGreen hover:bg-darkGreen"
            >
              {t("loginButton")} {/* Using translation key for button text */}
            </button>
          </form>
        </div>
        <ToastContainer stacked />
      </div>
      <Footer />
    </>
  );
};

export default Login;

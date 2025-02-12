import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons
import { useTranslation } from "react-i18next"; // Import useTranslation hook

// Sample logo component
const Logo = () => <div className="text-2xl font-bold ">Admin Panell</div>;

const AdminLogin = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginData = {
    email: email.toLowerCase(),
    password: password,
  };

  useEffect(() => {
    if (localStorage.getItem("adminLogin")) {
      navigate("/admin/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    await toast
      .promise(
        axios.post(
          `${import.meta.env.VITE_BACKEND_HOST}/api/auth/admin/login`,
          loginData,
        ),
        {
          pending: t("Logging in..."),
          success: t("Login successful! 🎉"),
          error: t("Login failed. Please check your credentials."),
        },
        {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        },
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("adminLogin", response.data.token);

          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1600);
        }
      })
      .catch((error) => {
        console.error(error.response?.data?.message || t("An error occurred"));
        setError(error.response?.data?.message || t("An error occurred"));
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-green">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                {t("Email")} {/* Translated text */}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("Enter your email")}
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block font-medium text-gray-700"
              >
                {t("Password")}
              </label>
              <input
                type={showPassword ? "text" : "password"} // Dynamic input type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t("Enter your password")}
                required
              />

              <div
                className="absolute right-3 top-[2.1rem] cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white transition duration-200 rounded-lg bg-grassGreen hover:bg-greengrass"
            >
              {t("Login")} {/* Translated text */}
            </button>
          </form>
        </div>
        <ToastContainer stacked />
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;

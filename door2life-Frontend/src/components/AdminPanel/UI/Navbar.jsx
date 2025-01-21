import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Navbar = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleAdminLogout = () => {
    toast.info(t("Logout Successfully!"), {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: true,
      theme: "colored",
    });
    setTimeout(() => {
      localStorage.removeItem("adminLogin");
      navigate("/admin/login");
    }, 1500);
  };

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between w-full p-4 text-white shadow-md bg-grassGreen lg:px-16 bg-opacity-90 backdrop-blur-md">
      <div className="text-2xl font-bold text-black/70">{t("Admin Panel")}</div>{" "}
      {/* Translated text */}
      {localStorage.getItem("adminLogin") ? (
        <button
          onClick={handleAdminLogout}
          className="px-4 py-2 ml-auto transition bg-red-500 rounded hover:bg-red-600"
        >
          {t("Logout")} {/* Translated text */}
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 ml-auto text-black transition rounded bg-grassGreen hover:bg-darkGreen"
        >
          {t("Login")} {/* Translated text */}
        </button>
      )}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;

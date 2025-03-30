import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTable from "./UserTable";

const SingleUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editPopup, setEditPopup] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const { t } = useTranslation();

  // Handle edit button click
  const handleEdit = () => {
    if (!userData) return;
    setEditFormData({
      username: userData.username || "",
      email: userData.email || "",
      password: "",
      phone: userData.phone || "",
    });
    setEditPopup(true);
  };

  // Submit edited data
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_HOST}/api/user/${userData._id}`,
        {
          ...editFormData,
        },
      );
      setUserData(response.data);
      toast.success(t("userUpdated"));
      setEditPopup(false);
    } catch (err) {
      setError(t("errorUpdatingUser"));
      toast.error(t("errorUpdatingUser"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="relative min-h-screen p-6 bg-gradient-to-br from-gray-100 to-blue-50">
        <Link to={"/admin/dashboard"}>
          <h1 className="top-0 left-0 px-4 py-2 mx-auto text-white rounded-lg md:mx-16 hover:bg-green bg-greengrass w-max md:absolute my-7">
            {t("Go Back")}
          </h1>
        </Link>
        <div className="container mx-auto">
          <h1 className="mb-6 text-3xl font-bold text-center text-grassGreen">
            {t("User Details")}
          </h1>
        </div>
        <UserTable />
      </div>

      <Footer />
    </>
  );
};

export default SingleUserData;

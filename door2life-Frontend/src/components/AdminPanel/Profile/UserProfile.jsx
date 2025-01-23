import React, { useEffect, useState } from "react";
import DonationAndDoorStatus from "./DonationAndDoorStatus";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../UI/Navbar";
import Footer from "../UI/Footer";
import { useTranslation } from "react-i18next"; // Import the translation hook

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [bankData, setBankData] = useState([]);
  const { t } = useTranslation(); // Initialize translation hook

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = "673d75c5d4bbde57134bc77a";
        const response = await axios.get(
          `https://donations-prdd.onrender.com/api/user/${userId}`
        );
        const bankResponse = await axios.get(
          "https://donations-prdd.onrender.com/api/bank/main-bank"
        );
        if (bankResponse.status === 200) {
          setBankData(bankResponse.data);
        } else {
          setBankData([]);
        }
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("adminLogin")) {
      navigate("/admin/login");
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center w-screen h-screen ">
        <p className="text-white animate-spin transform-origin text-7xl">.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="h-[18vh] relative p-6 bg-gray-50">
        <Link to={"/admin/dashboard"}>
          <h1 className="top-0 left-0 px-4 py-2 mx-auto text-white bg-blue-600 rounded-lg w-max md:absolute md:mx-16 my-7">
            {t("goBack")} {/* Translated Go Back text */}
          </h1>
        </Link>
        <h1 className="mb-8 text-3xl font-bold text-center text-white">
          {t("adminPanel")} {/* Translated Admin Panel text */}
        </h1>
        <DonationAndDoorStatus
          bankAmount={bankData}
          donationAmount={userData.donationAmount}
          doorStatus={userData.doorStatus}
        />
      </div>
    </>
  );
};

export default UserProfile;

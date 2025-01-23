import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";
import { useTranslation } from "react-i18next"; // Import translation hook

const MainBank = () => {
  const [balance, setBalance] = useState(0);
  const { t } = useTranslation(); // Initialize translation hook

  // Simulate fetching bank balance (replace this with an API call if needed)
  useEffect(() => {
    const fetchBalance = async () => {
      // Simulate API response
      const response = await axios.get(
        "https://donations-prdd.onrender.com/api/bank/main-bank"
      );
      const bankAmount = response.data.length * 50;

      setBalance(bankAmount);
    };

    fetchBalance();
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <Link to={"/admin/dashboard"}>
          <h1 className="top-0 left-0 px-4 py-2 mx-auto text-white rounded-lg bg-grassGreen hover:bg-green md:absolute w-max md:mx-16 my-7">
            {t("goBack")} {/* Translated text */}
          </h1>
        </Link>
        <div className="w-full max-w-sm rounded-lg shadow-lg bg-green">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              {t("yourBankBalance")} {/* Translated text */}
            </h1>
            <div className="flex items-center justify-center mt-4">
              <span className="text-4xl font-extrabold text-green-500">
                ${balance.toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-center text-gray-500">
              {t("stayOnTop")} {/* Translated text */}
            </p>
          </div>
          <div className="flex justify-center p-4 border-t rounded-b-lg bg-gray-50">
            <Link to={"/admin/dashboard/mainBank/transactions"}>
              <button className="px-4 py-2 text-white rounded-lg bg-grassGreen hover:bg-greengrass">
                {t("viewTransactions")} {/* Translated text */}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainBank;

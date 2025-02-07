import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../UI/Footer";
import Navbar from "../UI/Navbar";
import { useTranslation } from "react-i18next"; // Import translation hook

const Transactions = () => {
  const [user, setUser] = useState([]);
  const { t } = useTranslation(); // Initialize translation hook

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/api/bank/main-bank`,
        );
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setUser([]);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setUser([]);
      }
    };
    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <Link to={"/admin/dashboard/mainBank"}>
          <h1 className="top-0 left-0 px-4 py-2 mx-16 text-white bg-blue-600 rounded-lg md:absolute my-7">
            {t("goBack")} {/* Translated text */}
          </h1>
        </Link>
        <div className="w-full max-h-[70vh] overflow-y-scroll max-w-6xl bg-green rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">
              {t("recentTransactions")} {/* Translated text */}
            </h1>
            <p className="text-sm text-gray-500">
              {t("stayUpdated")} {/* Translated text */}
            </p>
          </div>

          {user.length > 0 ? (
            <div className="divide-y">
              {user.map((txn) => (
                <div
                  key={txn.id}
                  className="flex flex-col items-center justify-between p-4 text-center sm:flex-row hover:bg-gray-50"
                >
                  {/* Profile Section */}
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <FaUserCircle className="w-12 h-12 border rounded-full" />
                    <div>
                      <h3 className="font-bold text-gray-800">{txn.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(txn.date)}
                      </p>
                    </div>
                  </div>

                  {/* Amount Section */}
                  <div>
                    <span className="text-lg">{txn.email}</span>
                  </div>
                  <div>
                    <span
                      className={`text-lg font-bold ${
                        txn.amount >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {txn.amount >= 0
                        ? `+$${txn.amount.toFixed(2)}`
                        : `-$${Math.abs(txn.amount).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              {t("noTransactions")} {/* Translated text */}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transactions;

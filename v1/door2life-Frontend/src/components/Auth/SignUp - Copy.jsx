import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useTranslation } from "react-i18next"; // Import useTranslation

const SignUp = () => {
  const { t } = useTranslation(); // Destructure to get the translation function
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paypalAmount, setPaypalAmount] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [generatedReferralLink, setGeneratedReferralLink] = useState("");
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const paypalRef = useRef(null);

  useEffect(() => {
    if (
      !paymentStatus &&
      paypalRef.current &&
      !paypalRef.current.hasChildNodes()
    ) {
      window.paypal
        .Buttons({
          fundingSource: undefined,
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Donations",
                  amount: {
                    currency_code: "USD",
                    value: 50.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            if (order.status === "COMPLETED") {
              setPaymentStatus(true);
              setPaypalAmount(order.purchase_units[0].amount.value);
            }
          },
          onError: (err) => {
            console.error("Payment Error: ", err);
            alert("Payment was not successful!");
          },
          funding: {
            disallowed: [
              window.paypal.FUNDING.VENMO,
              window.paypal.FUNDING.CARD,
            ],
          },
        })
        .render(paypalRef.current);
    }
  }, [paymentStatus]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refCode = queryParams.get("referralCode");
    if (refCode) setReferralCode(refCode);
  }, [location.search]);

  useEffect(() => {
    if (!name || !email || !password || !phone) {
      setError(t("signUp.provideAllData"));
    } else {
      setError("");
    }
  }, [name, email, password, phone, t]);

  const handleRegister = async () => {
    const registerData = {
      username: name,
      password: password,
      email: email,
      phone: phone,
      amount: paypalAmount,
      referralCode: referralCode || null,
    };

    await toast
      .promise(
        axios.post(
          `${import.meta.env.VITE_BACKEND_HOST}/api/auth/register`,
          registerData,
        ),
        {
          success: t("signUp.accountCreated"),
          error: {
            render({ data }) {
              return (
                data?.response?.data?.Error || "Failed to create an account."
              );
            },
          },
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
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2200);
      })
      .catch((error) => {
        setError(error?.response?.data?.Error || t("signUp.provideAllData"));
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh] mt-16 py-5 bg-gray-Dark">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-green">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            {t("signUp.title")}
          </h2>

          <form className="space-y-4">
            {/* Username Input */}
            <div>
              <label
                htmlFor="Username"
                className="block mb-1 font-medium text-gray-700"
              >
                {t("signUp.username")}
              </label>
              <input
                type="text"
                id="Username"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("signUp.username")}
              />
              {error === t("signUp.provideAllData") ? (
                <p className="text-red-600 ">{error}</p>
              ) : null}
            </div>

            {/* Phone Input */}
            <div>
              <label
                htmlFor="Phone"
                className="block mb-1 font-medium text-gray-700"
              >
                {t("signUp.phone")}
              </label>
              <input
                type="tel"
                id="Phone"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("signUp.phone")}
              />
              {error === t("signUp.provideAllData") && (
                <p className="text-red-600 ">{error}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="Email"
                className="block mb-1 font-medium text-gray-700"
              >
                {t("signUp.email")}
              </label>
              <input
                type="email"
                id="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("signUp.email")}
              />
              {error === t("signUp.emailAlreadyExist") ||
              error === t("signUp.provideAllData") ? (
                <p className="text-red-600 ">{error}</p>
              ) : null}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700"
              >
                {t("signUp.password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={t("signUp.password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 flex items-center text-gray-500 right-2 focus:outline-none"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {error === t("signUp.provideAllData") && (
                <p className="mt-1 text-red-600">{error}</p>
              )}
            </div>

            {/* PayPal Input */}
            <div>
              <label
                htmlFor="paypal"
                className="block mb-1 font-medium text-gray-700"
              >
                {t("signUp.paypal")}
              </label>
              {paymentStatus ? (
                <p className="text-[#195D49] ">
                  {t("signUp.paymentCompleted")}
                </p>
              ) : (
                <>
                  <div ref={paypalRef}></div>
                  {!paymentStatus ? (
                    <p className="text-red-600 ">
                      {t("signUp.paymentRequired")}
                    </p>
                  ) : null}
                </>
              )}
            </div>

            {/* Referral Code Input */}
            <div>
              <label
                htmlFor="referralCode"
                className="block mb-1 font-medium text-gray-700"
              >
                {t("signUp.referralCode")}
              </label>
              <input
                type="text"
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={t("signUp.referralCode")}
              />
              {error === t("signUp.provideAllData") && (
                <p className="text-red-600 ">{error}</p>
              )}
            </div>

            {/* Register Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleRegister}
                className="w-[150px] py-2 px-2 bg-grassGreen hover:bg-darkGreen text-black font-semibold rounded-lg transition duration-200 mt-4"
              >
                {t("signUp.register")}
              </button>
            </div>
          </form>

          {/* Display the generated referral link after registration */}
          {generatedReferralLink && (
            <div className="mt-4 text-center">
              <p>{t("signUp.referralLink")}</p>
              <p className="text-green-600">{generatedReferralLink}</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default SignUp;

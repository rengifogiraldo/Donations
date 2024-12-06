import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiFrown } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { toast, ToastContainer } from "react-toastify";
import { MdDone } from "react-icons/md";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const ReceviceGiftsFromOwner = () => {
  const { t } = useTranslation(); // Initialize translation
  const [pendingRequests, setPendingRequests] = useState([]);
  const [door, setDoor] = useState({});
  const [status, setStatus] = useState([]);
  const [PaymentStatus, setPaymentStatus] = useState("");
  const userId = sessionStorage.getItem("UserId");

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingResponse = await axios.get(
          `https://door2life-backend.vercel.app/api/messages/pending-requests/${userId}`
        );

        if (pendingResponse.status === 200) {
          const paymentRequests =
            pendingResponse.data[0]?.requester?.paymentRequests || [];

          // Filter payment requests specific to the userId
          const filterStatus = paymentRequests.filter(
            (status) => status.recipient === userId
          );

          // Update states based on filtered results
          if (filterStatus.length > 0) {
            setPaymentStatus(filterStatus[0]?.status || "unknown");
          }

          setStatus(paymentRequests);
          setPendingRequests(pendingResponse.data);
          setDoor(pendingResponse.data[0]?.requester?.doorStatus || {});
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, [userId]);

  // Find the first locked door (key with value `false`)
  const currentDoor =
    (door &&
      Object.entries(door).find(([key, value]) => value === false)?.[0]) ||
    null;
  const filterStatus = status.filter((status) => status._id === userId);

  const formattedDoor = currentDoor
    ? ` ${currentDoor}`
    : t("All doors unlocked");

  const handleSend = async (id) => {
    const editData = {
      requesterId: id,
      recipientId: userId,
    };

    await toast.promise(
      axios.post(
        `https://door2life-backend.vercel.app/api/messages/pending-requests/mark-approval`,
        editData
      ),
      {
        pending: t("Sending request and waiting for approval..."),
        success: t("Sent successfully and waiting for approval!"),
        error: t("Already waiting for approval or request failed."),
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
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative w-screen max-w-[80vw] mx-auto pt-[5rem] md:pt-[8rem]">
        <Link to={"/userpage"}>
          <h1 className="left-0 px-4 py-2 mx-auto rounded-lg md:mx-16 hover:bg-green bg-greengrass w-max md:absolute my-7">
            {t("Go Back")}
          </h1>
        </Link>
        <h2 className="mb-8 text-4xl font-bold text-center text-greengrass">
          {t("Manage Your Gifts and Payments")}
        </h2>

        <section className="my-16 ">
          <div className="flex flex-wrap gap-6 my-16">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((req, index) => (
                <Card
                  key={req._id}
                  className="mx-auto text-center bg-lightgray w-80"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {t("Request")} {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <table className="w-full table-auto">
                      <tbody>
                        <tr>
                          <td className="font-semibold">{t("From")}:</td>
                          <td>{req.requester?.username}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">{t("Email")}:</td>
                          <td>{req.requester?.email}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">{t("Phone#")}:</td>
                          <td>{req.requester?.phone}</td>
                        </tr>
                        <tr>
                          <td className="font-semibold">{t("Amount")}:</td>
                          <td>
                            <strong>${req.amount}</strong>
                          </td>
                        </tr>
                        {req.amount === 200 && (
                          <>
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>2</strong>
                            </td>
                          </>
                        )}
                        {req.amount === 600 && (
                          <>
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>2</strong>
                            </td>
                          </>
                        )}
                        {req.amount === 1800 && (
                          <>
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>4</strong>
                            </td>
                          </>
                        )}{" "}
                        {req.amount === 3000 && (
                          <>
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>5</strong>
                            </td>
                          </>
                        )}{" "}
                        {req.amount === 4000 && (
                          <>
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>6</strong>
                            </td>
                          </>
                        )}{" "}
                        {req.amount === 50 && (
                          <>
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>7</strong>
                            </td>
                          </>
                        )}{" "}
                        {req.amount === 200 &&
                          req.requester.doorStatus[1] === "true" && (
                            <>
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>8</strong>
                              </td>
                            </>
                          )}{" "}
                        {req.amount === 600 &&
                          req.requester.doorStatus[2] === "true" && (
                            <>
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>9</strong>
                              </td>
                            </>
                          )}{" "}
                        {req.amount === 1800 &&
                          req.requester.doorStatus[3] === "true" && (
                            <>
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>10</strong>
                              </td>
                            </>
                          )}{" "}
                        {req.amount === 3000 &&
                          req.requester.doorStatus[4] === "true" && (
                            <>
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>13</strong>
                              </td>
                            </>
                          )}{" "}
                        {req.amount === 4000 &&
                          req.requester.doorStatus[5] === "true" && (
                            <>
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>12</strong>
                              </td>
                            </>
                          )}{" "}
                        {req.amount === 12000 &&
                          req.requester.doorStatus[6] === "true" && (
                            <>
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>13</strong>
                              </td>
                            </>
                          )}{" "}
                        {req.amount === 15000 && (
                          <>
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>14</strong>
                            </td>
                          </>
                        )}{" "}
                      </tbody>
                    </table>
                  </CardContent>
                  <CardDescription
                    className={(() => {
                      if (PaymentStatus === "pending") {
                        return "bg-red-500 text-red-600 mx-auto rounded-lg w-max px-2 bg-opacity-20 uppercase";
                      } else if (PaymentStatus === "waiting for approval") {
                        return "bg-orange-500 text-orange-600 mx-auto rounded-lg w-max px-2 bg-opacity-20 uppercase";
                      } else if (PaymentStatus === "paid") {
                        return "bg-[#3dda5fe5] text-[#117813] mx-auto rounded-lg w-max px-2 bg-opacity-100 uppercase";
                      }
                      return "bg-[#3dda5fe5] text-[#117813] mx-auto rounded-lg w-max px-2 bg-opacity-100 uppercase";
                    })()}
                  >
                    {PaymentStatus}
                  </CardDescription>
                  <CardFooter className="flex justify-center gap-4 mt-4">
                    <MdDone
                      onClick={() => handleSend(req.requester._id)}
                      className="p-1 text-4xl text-black transition-all rounded-lg cursor-pointer bg-greengrass bg-opacity-40 hover:scale-75 hover:bg-green "
                    />
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex items-center mx-auto rounded-md bg-green min-w-screen">
                <div className="w-full max-w-sm p-6 text-center bg-gray-900 rounded-lg shadow-lg">
                  <FiFrown className="mx-auto mb-4 text-6xl text-darkGreen animate-bounce" />
                  <h1 className="mb-4 text-3xl font-semibold text-gray-200">
                    {t("No Request Found")}
                  </h1>
                  <p className="text-lg text-gray-400">
                    {t("No Request Message")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
        <ToastContainer stacked />
      </main>
      <Footer />
    </>
  );
};

export default ReceviceGiftsFromOwner;

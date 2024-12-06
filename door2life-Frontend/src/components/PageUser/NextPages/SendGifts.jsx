import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdDone } from "react-icons/md";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { FiFrown } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Page2 = () => {
  const { t, i18n } = useTranslation(); // Initialize translation
  const [data, setData] = useState([]);
  const [door, setDoor] = useState({});
  const username = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("UserId");

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get(
          `https://door2life-backend.vercel.app/api/messages/payment-requests/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
          setData(response.data);
          setDoor(response.data[0].recipient.doorStatus);
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, []);

  const currentDoor =
    (door &&
      Object.entries(door).find(([key, value]) => value === false)?.[0]) ||
    null;

  // Format the door for display
  const formattedDoor = currentDoor
    ? `${t("Door")} ${currentDoor}`
    : t("All doors unlocked");

  const handleSend = async (id) => {
    const editData = {
      requesterId: userId,
      recipientId: id,
    };

    const response = await toast.promise(
      axios.patch(
        `https://door2life-backend.vercel.app/api/messages/payment-requests/${id}`,
        editData
      ),

      {
        pending: t("Marking as paid..."),
        success: t("Successfully marked as paid!"),
        error: t("Waiting For Payment or Already paid"),
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
    console.log(response);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative w-screen max-w-[80vw] mx-auto pt-[5rem]">
        <Link to={"/userpage"}>
          <h1 className="left-0 px-4 py-2 mx-auto rounded-lg md:mx-16 hover:bg-green bg-greengrass w-max md:absolute my-7">
            {t("Go Back")}
          </h1>
        </Link>
        <h2 className="mt-10 text-3xl font-bold text-center text-greengrass">
          {t("Gifts To Receive")}
        </h2>
        <div className="flex flex-wrap w-full gap-6 my-16 mt-16">
          {data.length > 0 ? (
            data.map((req, index) => (
              <Card
                key={index}
                className="mx-auto text-center bg-green size-60 aspect-square"
              >
                <CardHeader>
                  {t("Request")} {index + 1}
                </CardHeader>

                <CardContent className="flex flex-col gap-2 -mt-2">
                  <CardTitle>
                    {t("To")} : {req.recipient.username}
                  </CardTitle>
                  <CardTitle>{req.recipient.email}</CardTitle>

                  <CardDescription className=" text-gray">
                    {t("Amount")} : ${req.amount}
                  </CardDescription>
                  <CardDescription
                    className={(() => {
                      if (req.status === "pending") {
                        return "bg-red-500 text-red-600 mx-auto rounded-lg w-max px-2 bg-opacity-20 uppercase";
                      } else if (req.status === "waiting for approval") {
                        return "bg-orange-500 text-orange-600 mx-auto rounded-lg w-max px-2 bg-opacity-20 uppercase";
                      } else if (req.status === "paid") {
                        return "bg-[#3dda5fe5] text-[#117813] mx-auto rounded-lg w-max px-2 bg-opacity-100 uppercase";
                      }
                      return "";
                    })()}
                  >
                    {t(req.status)}
                  </CardDescription>
                  <CardDescription className=" text-gray">
                    <div className="flex flex-col items-center">
                      {req.amount === 50 && (
                        <>
                          <div className="flex ">
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong className="inline-flex">1</strong>
                            </td>
                          </div>
                        </>
                      )}
                      {req.amount === 200 && (
                        <>
                          <div className="flex ">
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong className="inline-flex">2</strong>
                            </td>
                          </div>
                        </>
                      )}
                      {req.amount === 600 && (
                        <>
                          <div className="flex">
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>3</strong>
                            </td>
                          </div>
                        </>
                      )}
                      {req.amount === 1800 && (
                        <>
                          <div className="flex ">
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>4</strong>
                            </td>
                          </div>
                        </>
                      )}{" "}
                      {req.amount === 3000 && (
                        <>
                          <div className="flex">
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>5</strong>
                            </td>
                          </div>
                        </>
                      )}{" "}
                      {req.amount === 4000 && (
                        <>
                          <div className="flex">
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong>6</strong>
                            </td>
                          </div>
                        </>
                      )}{" "}
                      {req.amount === 50 &&
                        req.recipient.doorStatus[1] ===
                          "true"(
                            <>
                              <div className="flex">
                                <td className="font-semibold">{t("Door")}:</td>
                                <td>
                                  <strong>7</strong>
                                </td>
                              </div>
                            </>
                          )}{" "}
                      {req.amount === 200 &&
                        req.recipient.doorStatus[1] === "true" && (
                          <>
                            <div className="flex">
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>8</strong>
                              </td>
                            </div>
                          </>
                        )}{" "}
                      {req.amount === 600 &&
                        req.recipient.doorStatus[2] === "true" && (
                          <>
                            <div className="flex">
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>9</strong>
                              </td>
                            </div>
                          </>
                        )}{" "}
                      {req.amount === 1800 &&
                        req.recipient.doorStatus[3] === "true" && (
                          <>
                            <div className="flex">
                              {" "}
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>10</strong>
                              </td>
                            </div>
                          </>
                        )}{" "}
                      {req.amount === 3000 &&
                        req.recipient.doorStatus[4] === "true" && (
                          <>
                            <div className="flex">
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>11</strong>
                              </td>
                            </div>
                          </>
                        )}{" "}
                      {req.amount === 4000 &&
                        req.recipient.doorStatus[5] === "true" && (
                          <>
                            <div className="flex">
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>12</strong>
                              </td>
                            </div>
                          </>
                        )}{" "}
                      {req.amount === 12000 &&
                        req.recipient.doorStatus[6] === "true" && (
                          <>
                            <div className="flex">
                              <td className="font-semibold">{t("Door")}:</td>
                              <td>
                                <strong>13</strong>
                              </td>
                            </div>
                          </>
                        )}{" "}
                      {req.amount === 15000 && (
                        <>
                          <div className="flex">
                            <td className="font-semibold">{t("Door")}:</td>
                            <td>
                              <strong className="inline-flex">14</strong>
                            </td>
                          </div>
                        </>
                      )}{" "}
                    </div>
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 -mt-4">
                  <MdDone
                    onClick={() => handleSend(req.recipient._id)}
                    className="p-1 text-4xl text-black transition-all rounded-lg cursor-pointer bg-opacity-40 bg-greengrass hover:scale-75 hover:bg-green "
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
        <ToastContainer stacked />
      </main>
      <Footer />
    </>
  );
};

export default Page2;

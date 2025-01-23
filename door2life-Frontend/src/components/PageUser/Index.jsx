import { useEffect, useState } from "react";
import Video from "./Video";
import Register from "./Register";
import WorkGroup from "./WorkGroup";
import ReceiveGifts from "./ReceiveGifts";
import PrintCertificate from "./PrintCertificate";
import InfoOnDon from "./InfoOnDon";
import SendGifts from "./SendGifts";
import InfoDoors from "./InfoDoors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const DoorPages = () => {
  const { t } = useTranslation(); // Get translation function
  const doorPages = [
    { name: "register" },
    { name: "workGroup" },
    { name: "receiveGifts" },
    { name: "sendGifts" },
    { name: "printCertificate" },
    { name: "infoDoors" },
  ];

  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(null);
  const [requester, setRequester] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const userId = sessionStorage.getItem("UserId");
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/Login");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pending requests
        const pendingResponse = await axios.get(
          `https://meek-swan-915441.netlify.app/api/messages/pending-requests/${userId}`
        );

        // Fetch user data
        const userref = await axios.get(`https://meek-swan-915441.netlify.app/api/user/${userId}`);

        // Process user referral code
        if (userref.status === 200 && userref.data?.referralCode) {
          const referral = userref.data.referralCode.toString();
          setReferralCode(referral);
          console.log("Referral Code:", referral); // Log safely
        }

        // Process requester data
        const requesterUsername =
          pendingResponse.data[0]?.requester?.username || "Unknown";
        setRequester(requesterUsername);

        // Save requester username in session storage
        sessionStorage.setItem("requester", requesterUsername);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleClick = (page) => {
    setSelectedPage(page.name);
  };

  return (
    <>
      <Navbar />
      <h1 className="mt-10 text-2xl text-center lg:mx-16 lg:text-right text-lightgray py-9 md:mt-4">
        Referral Code : <span className="font-semibold"> {referralCode}</span>
      </h1>
      <div className="flex flex-col mt-1 h-max md:flex-row lg:mx-16 ">
        <div className="flex-none w-full m-5 overflow-y-auto text-black border rounded-md bg-green md:w-60 lg:w-72 max-h-96">
          {doorPages.map((page, index) => (
            <button
              key={index}
              className={`w-full border text-gray p-2 text-left hover:bg-green hover:text-black ${
                selectedPage === page.name ? "bg-grassGreen text-black" : ""
              }`}
              onClick={() => handleClick(page)}
            >
              {t(`doorPages.${page.name}`)} {/* Fetch translated name */}
            </button>
          ))}
        </div>

        {/* Content area that adjusts based on sidebar width */}
        <div className="flex-1 p-5 h-max">
          {selectedPage === "video" && <Video />}
          {selectedPage === "register" && <Register />}
          {selectedPage === "workGroup" && <WorkGroup />}
          {selectedPage === "receiveGifts" && <ReceiveGifts />}
          {selectedPage === "sendGifts" && <SendGifts requester={requester} />}
          {selectedPage === "printCertificate" && <PrintCertificate />}
          {selectedPage === "informationOnDonations" && <InfoOnDon />}
          {selectedPage === "infoDoors" && <InfoDoors />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoorPages;

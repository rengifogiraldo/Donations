import React, { useEffect, useState } from "react";
import axios from "axios";

const DonationTable = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/api/donate/get/${userId}`,
        );
        setDonations(response.data);
      } catch (error) {
        console.log("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const doorValues = [
    { door: 1, donationAmount: 50, amountReceived: 400 },
    { door: 2, donationAmount: 200, amountReceived: 1600 },
    { door: 3, donationAmount: 600, amountReceived: 4800 },
    { door: 4, donationAmount: 1800, amountReceived: 14400 },
    { door: 5, donationAmount: 3000, amountReceived: 24000 },
    { door: 6, donationAmount: 4000, amountReceived: 32000 },
    { door: 7, donationAmount: 12000, amountReceived: 96000 },
  ];

  return (
    <div className="container p-6 mx-auto">
      <h2 className="mb-8 text-2xl font-semibold text-center">
        Donation & Rewards Progress
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="text-white bg-indigo-600">
              <th className="px-6 py-3 text-left">Door #</th>
              <th className="px-6 py-3 text-left">Donation Amount</th>
              <th className="px-6 py-3 text-left">Amount to Receive</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {doorValues.map((door) => {
              const donation = donations.find(
                (d) => d.doorNumber === door.door,
              );
              return (
                <tr key={door.door} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3">{`Door #${door.door}`}</td>
                  <td className="px-6 py-3">${door.donationAmount}</td>
                  <td className="px-6 py-3">${door.amountReceived}</td>
                  <td className="px-6 py-3">
                    {donation ? (
                      <span className="font-semibold text-green-500">
                        Completed
                      </span>
                    ) : (
                      <span className="font-semibold text-yellow-500">
                        Donate to complete
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationTable;

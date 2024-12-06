import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import donationData from "../DataofDon";
import { Card, CardContent, CardTitle, CardFooter } from "../ui/card";

const InfoOnDon = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="p-8 rounded-lg shadow-lg ">
      <h2 className="mb-8 text-2xl font-bold text-center text-grassGreen">
        {t("informationOnDonationsTitle")} {/* Use translation key */}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {donationData.map((item, index) => (
          <Card
            key={index}
            className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md border-3 hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-64"
            />
            <CardContent className="p-6">
              <CardTitle className="mb-2 text-xl font-bold text-center text-grassGreen">
                {t(item.title)} {/* Use translation key */}
              </CardTitle>
              <div className="w-16 h-1 mx-auto mb-4 bg-grassGreen"></div>
              <p className="text-center text-gray-700">
                {t(item.description)} {/* Use translation key */}
              </p>
            </CardContent>
            <CardFooter className="p-4 mt-auto text-center">
              <button className="px-4 py-2 font-semibold text-white transition-colors rounded-md bg-grassGreen hover:bg-green-700">
                {t("learnMore")} {/* Use translation key */}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InfoOnDon;

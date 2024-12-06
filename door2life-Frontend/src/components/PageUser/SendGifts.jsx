import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

const SendGifts = ({ requester }) => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <Card className="flex flex-col items-center max-w-md p-6 mx-auto my-8 shadow-lg bg-green">
      <CardTitle className="mb-2 text-xl font-bold text-center sm:text-2xl">
        {t("sendGiftsTitle")} {/* Use translation key */}
      </CardTitle>

      <CardDescription className="mb-4 font-semibold text-center text-black">
        {t("sendGiftsDescription")} {/* Use translation key */}
      </CardDescription>

      <CardContent className="text-center">
        <p className="mb-4 font-semibold">
          {t("sendGiftsInstructions")} {/* Use translation key */}
        </p>
        <div className="flex justify-center">
          <Link to={"/userpage/send-gift"}>
            <Button className="text-sm text-black bg-greengrass hover:bg-grassGreen sm:text-sm">
              {t("sendGiftTo")} <strong>{requester}</strong>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SendGifts;

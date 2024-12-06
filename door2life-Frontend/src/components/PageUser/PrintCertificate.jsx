import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import { useTranslation } from "react-i18next"; // Import useTranslation

const PrintCertificate = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <Card className="flex flex-col items-center max-w-md p-6 mx-auto my-8 shadow-lg bg-green">
      <CardTitle className="mb-2 text-xl font-bold text-center sm:text-2xl">
        {t("printCertificateTitle")} {/* Use translation key */}
      </CardTitle>

      <CardDescription className="mb-4 font-semibold text-center text-black">
        {t("printCertificateDescription")} {/* Use translation key */}
      </CardDescription>

      <CardContent className="text-center">
        <p className="mb-4 font-semibold">
          {t("printCertificateInstructions")} {/* Use translation key */}
        </p>
        <div className="flex justify-center">
          <Button className="text-xs text-black bg-greengrass hover:bg-grassGreen sm:text-sm">
            {t("print")} {/* Use translation key */}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrintCertificate;

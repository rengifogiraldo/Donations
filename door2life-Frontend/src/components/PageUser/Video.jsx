import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Video = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <main className="flex justify-center sm:p-6 md:p-8">
      <Card className="w-full max-w-md p-6 shadow-lg bg-green">
        <CardTitle className="mb-2 text-xl font-bold text-center text-black sm:text-2xl">
          {t("videoTitle")} {/* Use translation key */}
        </CardTitle>
        <CardDescription className="mb-4 text-lg font-semibold text-center text-black sm:text-xl">
          {t("videoDescription")} {/* Use translation key */}
        </CardDescription>
        <CardContent className="text-sm text-center text-black sm:text-md">
          <p className="mb-4">{t("videoContent")}</p>
        </CardContent>
        <CardFooter className="mt-6 text-xs text-center text-black sm:text-sm">
          {t("videoFooter")}
        </CardFooter>
      </Card>
    </main>
  );
};

export default Video;

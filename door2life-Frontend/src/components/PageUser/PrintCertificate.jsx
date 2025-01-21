
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import { useTranslation } from "react-i18next";
import jsPDF from 'jspdf';
import logo from "/logo.png";

const PrintCertificate = () => {
  const { t } = useTranslation();

  const email = sessionStorage.getItem("email");
  const username = sessionStorage.getItem("username");
  const phone = sessionStorage.getItem("phone");
  const userId = sessionStorage.getItem("UserId");

  const generateCertificate = () => {
    const logoImg = new Image();
    logoImg.src = logo;

    logoImg.onload = () => {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const aspectRatio = logoImg.width / logoImg.height;
      const targetHeight = 5;
      const targetWidth = targetHeight * aspectRatio;

      doc.addImage(logo, 'PNG', 20, 20, targetWidth, targetHeight);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(t("certificateHeader"), 70, 22);

      doc.setFontSize(11);
      doc.text(t("certificateUsernamePhone", { username: username || "User", phone: phone || "N/A" }), 75, 28);

      doc.setFontSize(9);
      doc.text(t("certificateWebsite"), 80, 33);

      doc.setFontSize(9);
      doc.text(t("certificateAddress1"), 75, 38);
      doc.text(t("certificateAddress2"), 75, 43);

      doc.setFontSize(9);
      doc.text(t("certificateEmail", { email: email || "N/A" }), 70, 48);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(t("certificateMainText"), 20, 70);
      doc.text(t("certificateSecondLine"), 20, 75);
      doc.text(t("certificateThirdLine"), 20, 80);

      doc.text(t("certificateCredentials", { username: username || "N/A", userId: userId || "N/A" }), 20, 85);

      doc.setFont("helvetica", "bold");
      doc.text(t("certificateFooter1"), 20, 105);
      doc.text(t("certificateFooter2"), 20, 110);
      doc.text(t("certificateFooter3"), 20, 115);
      doc.text(t("certificateFooter4"), 20, 120);

      doc.rect(10, 10, 190, 130);
      doc.save(`certificado_${username || 'user'}.pdf`);
    };
  };

  return (
    <Card className="flex flex-col items-center max-w-md p-6 mx-auto my-8 shadow-lg bg-green rounded-lg">
      <CardTitle className="mb-2 text-xl font-bold text-center sm:text-2xl">
        {t("printCertificateTitle")}
      </CardTitle>
      <CardDescription className="mb-4 font-semibold text-center text-black">
        {t("printCertificateDescription")}
      </CardDescription>
      <CardContent className="text-center">
        <p className="mb-4 font-semibold">
          {t("printCertificateInstructions")}
        </p>
        <div className="flex justify-center">
          <Button
            onClick={generateCertificate}
            className="text-xs text-black bg-grassGreen hover:bg-darkGreen px-4 py-2 rounded sm:text-sm"
          >
            {t("print")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrintCertificate;

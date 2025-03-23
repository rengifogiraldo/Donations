import { useTranslation } from "react-i18next";
import FooterLogo from "/Logo Footer.png";
import FooterLogo2 from "/Logo Footer Hispanic American Youth Foundation.png";
import { IoLocationSharp } from "react-icons/io5";
import { TbPhone } from "react-icons/tb";
import { FaRegEnvelope } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Footer principal - Quitamos la barra verde duplicada */}
      <footer className="w-full bg-gray text-white">
        <div className="flex flex-col items-center px-4 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
            {/* About Us Section */}
            <div>
              <h2 className="text-2xl font-bold text-grassGreen mb-4">{t("footer.aboutUs")}</h2>
              <img src={FooterLogo} alt="Footer Logo" className="h-16 mb-3" />
              <p className="text-sm">{t("footer.aboutUsdesc")}</p>
            </div>

            {/* HAYF Section */}
            <div>
              <h2 className="text-2xl font-bold text-grassGreen mb-4">{t("footer.hayf")}</h2>
              <img src={FooterLogo2} alt="HAYF Logo" className="h-16 mb-3" />
              <p className="text-sm">{t("footer.hayfdesc")}</p>
            </div>

            {/* Office Section */}
            <div>
              <h2 className="text-2xl font-bold text-grassGreen mb-4">{t("footer.office")}</h2>
              <div className="flex items-start mb-3">
                <IoLocationSharp className="w-5 h-5 mt-1 mr-2 text-white" />
                <p>{t("footer.address")}</p>
              </div>
              <div className="flex items-start mb-3">
                <TbPhone className="w-5 h-5 mt-1 mr-2 text-white" />
                <p>{t("footer.mainOfficePhone")}</p>
              </div>
              <div className="flex items-start mb-3">
                <FaRegEnvelope className="w-5 h-5 mt-1 mr-2 text-white" />
                <p>{t("footer.contactEmail")}</p>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-2xl font-bold text-grassGreen mb-4">Contact</h2>
              <p className="font-bold mb-2">{t("footer.speakWithMonica")}</p>
              <div className="flex items-start mb-3">
                <TbPhone className="w-5 h-5 mt-1 mr-2 text-white" />
                <p>{t("footer.phone")}</p>
              </div>
              <p className="font-bold mb-2 mt-4">{t("footer.speakWithJuan")}</p>
              <div className="flex items-start mb-3">
                <TbPhone className="w-5 h-5 mt-1 mr-2 text-white" />
                <p>{t("footer.phone")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="py-4 bg-gray-700 text-center">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
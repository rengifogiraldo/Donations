import { useTranslation } from "react-i18next";
import FooterLogo from "/Logo Footer.png";
import FooterLogo2 from "/Logo Footer Hispanic American Youth Foundation.png";
import { IoLocationSharp } from "react-icons/io5";
import { TbPhone } from "react-icons/tb";
import { FaRegEnvelope } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation();
  // const email = sessionStorage.getItem("email");

  return (
    <div className="flex justify-center">
      <footer className="w-full bg-gray text-white mt-auto">
        <div className="flex flex-col items-center px-3 border-gray-700 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {/* Product Section */}
            <div className="space-y-4">
              <a
                href="#"
                className="transition duration-300 hover:text-lightgreen"
              >
                <h2 className="mb-4 text-3xl font-bold text-grassGreen">
                  {t("footer.aboutUs")}
                </h2>
              </a>
              <div className="space-y-6">
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <img src={FooterLogo} className="h-20" />
                  <p className="text-lg opacity-90 font-meduim font-sans mt-4">
                    {t("footer.aboutUsdesc")}
                  </p>
                </a>
              </div>
            </div>

            {/* Office and Contact Section */}
            <div className="space-y-5">
              <a
                href="#"
                className="transition duration-300 hover:text-lightgreen"
              >
                <h2 className="mb-4 text-3xl font-bold text-grassGreen">
                  {t("footer.hayf")}
                </h2>
              </a>
              <div className="space-y-6">
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <img src={FooterLogo2} className="h-20" />
                  <p className="text-lg opacity-90 font-meduim font-sans mt-4">
                    {t("footer.hayfdesc")}
                  </p>
                </a>
              </div>
            </div>

            {/* Links Section */}
            <div className="space-y-6">
              <a
                href="#"
                className="transition duration-300 hover:text-lightgreen"
              >
                <h2 className="mt-8 text-3xl uppercase font-bold text-grassGreen">
                  {t("footer.office")}
                </h2>
              </a>
              <ul className="space-y-8">
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <li className="flex items-center space-x-2 mt-2">
                    <IoLocationSharp className="h-5 w-5 text-white" />
                    <p className="text-white ">{t("footer.address")}</p>
                  </li>
                </a>
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <li className="flex items-center space-x-2 mt-2">
                    <TbPhone className="h-5 w-5 text-white" />
                    <p className="inline">{t("footer.mainOfficePhone")}</p>
                  </li>
                </a>
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <li className="flex items-center space-x-2 mt-2">
                    <FaRegEnvelope className="h-5 w-5 text-white" />
                    <p className="inline">{t("footer.contactEmail")}</p>
                  </li>{" "}
                </a>
              </ul>

              <div className="space-y-7">
                <h2 className="mt-8 text-3xl uppercase font-bold text-grassGreen">
                  {t("footer.links")}
                </h2>
                <ul className="space-y-2">
                  <li className="uppercase">
                    <a
                      href="#"
                      className="transition font-medium duration-300 hover:text-lightgreen"
                    >
                      {t("footer.policies")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="mt-5 text-3xl font-bold text-grassGreen">
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  For English
                </a>
              </h2>
              <ul className="space-y-4">
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <li className="text-white font-bold text-xl mt-2">
                    {t("footer.speakWithMonica")}
                  </li>
                </a>
                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <li className="flex items-center space-x-2 mt-4">
                    <TbPhone className="h-5 w-5 text-white" />
                    <p className="inline text-lg font-medium">
                      {t("footer.phone")}
                    </p>
                  </li>{" "}
                </a>

                <a
                  href="#"
                  className="transition duration-300 hover:text-lightgreen"
                >
                  <li className="flex items-center text-lg space-x-2 mt-2">
                    <FaRegEnvelope className="h-5 w-5 flex-shrink-0 text-white" />
                    <p className="inline font-medium">
                      {t("footer.contactEmail")}
                    </p>
                  </li>
                </a>
              </ul>

              {/* PARA Section */}
              <div className="space-y-4">
                <h2 className="mb-4 text-xl font-bold text-grassGreen">
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.para")}
                  </a>
                </h2>
                <ul className="space-y-4">
                  <li className="text-white font-bold text-xl mt-2">
                    <a
                      href="#"
                      className="transition duration-300 hover:text-lightgreen"
                    >
                      {t("footer.speakWithJuan")}
                    </a>
                  </li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    <li className="flex items-center space-x-2 mt-4">
                      <TbPhone className="h-5 w-5 text-white" />
                      <p className="inline text-lg font-medium">
                        {t("footer.phone")}
                      </p>
                    </li>{" "}
                  </a>

                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    <li className="flex items-center text-lg space-x-2 mt-2">
                      <FaRegEnvelope className="h-5 w-5 flex-shrink-0 text-white" />
                      <p className="inline font-medium">
                        {t("footer.contactEmail")}
                      </p>
                    </li>
                  </a>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Section */}
        </div>
        <div
          className="py-8 mt-8 text-sm text-center text-gray-400 bg-gray-500 w-full"
          style={{ backgroundColor: "gray" }}
        >
          <p className="text-lg">
            <a
              href="#"
              className="transition duration-300 hover:text-lightgreen"
            >
              {t("footer.copyright")}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

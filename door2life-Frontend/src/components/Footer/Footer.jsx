import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <footer className="w-full mx-auto mt-6 text-white bg-gray ">
        <div className="flex justify-center flex-col items-center border-t-[.08rem] border-b-[.08rem]">
          <div className="grid grid-cols-1 gap-12 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Product Section */}
            <div className="space-y-4">
              <h2 className="mb-4 text-xl font-bold text-grassGreen">
                {t("footer.product")}
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.product")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.helpCenter")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.blog")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.status")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.releaseNotes")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.featureRequest")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Office and Contact Section */}
            <div className="space-y-4">
              <h2 className="mb-4 text-xl font-bold text-grassGreen">
                {t("footer.forEnglish")}
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.address")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.mainOffice")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.contactEmail")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Links Section */}
            <div className="space-y-4">
              <h2 className="mb-4 text-xl font-bold text-grassGreen">
                {t("footer.links")}
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.policies")}
                  </a>
                </li>
              </ul>
            </div>

            {/* PARA Section */}
            <div className="space-y-4">
              <h2 className="mb-4 text-xl font-bold text-grassGreen">
                {t("footer.para")}
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.mainOffice")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition duration-300 hover:text-lightgreen"
                  >
                    {t("footer.contactEmail")}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Section */}
          <div className="py-4 mt-8 text-sm text-center text-gray-400">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

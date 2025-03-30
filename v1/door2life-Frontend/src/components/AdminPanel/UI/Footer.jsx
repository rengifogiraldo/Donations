import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="p-4 mt-10 text-sm text-center text-lightgray">
      © {new Date().getFullYear()} Admin Panel. {t("footerText")}
    </footer>
  );
};

export default Footer;

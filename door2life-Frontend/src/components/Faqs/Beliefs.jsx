import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Beliefs = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center w-screen mx-auto mt-20 text-3xl ">
        <h1 className="mt-16 text-6xl text-center text-grassGreen">
          {t("beliefs.title")}
        </h1>
        {t("beliefs.list", { returnObjects: true }).map((belief, index) => (
          <div
            key={index}
            className="w-[17rem] sm:w-[35rem] md:w-[45rem] lg:w-[55rem] mx-auto mt-8 lg:mt-16"
          >
            <ul className="gap-2 text-sm md:text-lg">
              <li className="relative pl-6 mt-6">
                <span className="absolute left-0">➔</span>
                {belief}
              </li>
            </ul>
          </div>
        ))}
        <h6 className="mt-6 text-xl text-center">{t("beliefs.joinUs")}</h6>
      </div>
      <Footer />
    </>
  );
};

export default Beliefs;

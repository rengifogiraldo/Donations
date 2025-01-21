import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Faqs = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center w-screen mx-auto mt-20 text-3xl ">
        <h1 className="mt-16 text-6xl text-center text-grassGreen">
          {t("faqs.title")}
        </h1>
        {t("faqs.list", { returnObjects: true }).map((faq, i) => (
          <Accordion
            key={i}
            type="single"
            collapsible
            className="w-[18rem] sm:w-[35rem] md:w-[45rem] lg:min-w-[60rem] mx-auto mt-8"
          >
            <AccordionItem value={`item-${i}`} className="text-4xl">
              <AccordionTrigger className="text-sm md:text-[1rem]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lightgray">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Faqs;

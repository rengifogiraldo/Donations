import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <button
        onClick={toggleLanguage}
        className="relative flex items-center justify-between w-20 px-4 text-black transition-all duration-300 rounded-full shadow-md h-9 bg-green"
      >
        <span
          className={`absolute -left-[.8rem] top-1 w-7 h-7 bg-gray bg-opacity-70 rounded-full shadow transform transition-transform duration-300 ${
            currentLanguage === "en" ? "translate-x-[1.5rem]" : "translate-x-14"
          }`}
        ></span>
        <span
          className={`text-sm font-bold transition-opacity ${
            currentLanguage === "en" ? "opacity-100" : "opacity-50"
          }`}
        >
          EN
        </span>
        <span
          className={`text-sm font-bold transition-opacity ${
            currentLanguage === "es" ? "opacity-100" : "opacity-50"
          }`}
        >
          ES
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;

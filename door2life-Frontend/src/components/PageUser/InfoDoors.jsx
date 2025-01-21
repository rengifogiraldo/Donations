import  { useState } from "react";
import { useTranslation } from "react-i18next";
import doorsData from "../DataofDoors";
import { Button } from "../ui/button";

const InfoDoors = () => {
  const { t } = useTranslation(); // useTranslation hook
  const [selectedDoor, setSelectedDoor] = useState(doorsData[0]);

  const handleClick = (door) => {
    setSelectedDoor(door);
  };

  return (
    <div className="container mx-auto px-4 py-8 shadow-xl max-w-[90%] md:max-w-[80%] lg:max-w-[70%] bg-green rounded-md">
      <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        {t("Opening Doors to Life")}
      </h1>

      <div className="grid grid-cols-2 gap-4 mx-auto mb-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {doorsData.map((door, index) => (
          <Button
            key={index}
            onClick={() => handleClick(door)}
            className={`text-xs sm:text-sm font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300  p-1
            ${
              selectedDoor === door
                ? "bg-greengrass text-white"
                : "bg-slate-800 text-white hover:bg-greengrass"
            } 
            hover:shadow-lg  focus:outline-none`}
          >
            {t(door.button)} {/* Translated button text */}
          </Button>
        ))}
      </div>

      {selectedDoor && (
        <div className="flex flex-col items-center mt-6 p-4 border rounded-lg bg-white shadow-lg text-center mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
          <h2 className="mb-3 text-base font-bold md:text-lg lg:text-xl">
            {t(selectedDoor.button)}
          </h2>
          <p className="mb-4 text-sm text-gray-700 sm:text-base md:text-lg">
            {t(selectedDoor.description)}
          </p>{" "}
          {/* Translated description */}
          <img
            src={selectedDoor.image}
            alt={selectedDoor.button}
            className="w-full rounded-lg shadow-md sm:w-2/3 lg:w-1/2"
          />
        </div>
      )}
    </div>
  );
};

export default InfoDoors;

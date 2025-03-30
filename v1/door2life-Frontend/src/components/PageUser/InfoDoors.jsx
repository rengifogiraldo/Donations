import { useState } from "react";
import { useTranslation } from "react-i18next";
import doorsData from "../DataofDoors";
import { Button } from "../ui/button";

const InfoDoors = () => {
  const { t } = useTranslation();
  const [selectedDoor, setSelectedDoor] = useState(doorsData[0]);
  const [textSize, setTextSize] = useState("medium");
  
  const handleClick = (door) => {
    setSelectedDoor(door);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 shadow-xl max-w-[100%] md:max-w-[100%] lg:max-w-[100%] rounded-md">
      <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl lg:text-4xl">
        {t("Opening Doors to Life")}
      </h1>
      <div className="grid grid-cols-2 gap-4 mx-auto mb-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {doorsData.map((door, index) => (
          <Button
            key={index}
            onClick={() => handleClick(door)}
            className={`text-xs sm:text-sm font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 p-1
            ${
              selectedDoor === door
                ? "bg-greengrass text-white"
                : "bg-slate-800 text-white hover:bg-greengrass"
            }
            hover:shadow-lg focus:outline-none`}
          >
            {t(door.button)}
          </Button>
        ))}
      </div>
      
      {selectedDoor && (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-sm font-medium">Tamaño del texto:</span>
            <button 
              onClick={() => setTextSize("small")} 
              className={`px-3 py-1 rounded ${textSize === "small" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              A
            </button>
            <button 
              onClick={() => setTextSize("medium")} 
              className={`px-3 py-1 rounded ${textSize === "medium" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              A
            </button>
            <button 
              onClick={() => setTextSize("large")} 
              className={`px-3 py-1 rounded ${textSize === "large" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              A
            </button>
          </div>
          
          <div className="flex flex-col items-center mt-6 p-6 border-0 rounded-lg bg-white shadow-lg text-center mx-auto w-full">
            <h2 className="mb-3 text-base font-bold md:text-lg lg:text-xl">
              {t(selectedDoor.button)}
            </h2>
            <p className={`mb-4 font-bold text-gray-700 ${
              textSize === "small" ? "text-sm sm:text-base" : 
              textSize === "medium" ? "text-base sm:text-lg md:text-xl" : 
              "text-lg sm:text-xl md:text-2xl"
            }`}>
              {t(`doorPages.doors.${selectedDoor.id}`)}
            </p>
            <img
              src={selectedDoor.image}
              alt={selectedDoor.button}
              className="w-full rounded-lg shadow-md sm:w-3/4 lg:w-2/3"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default InfoDoors;
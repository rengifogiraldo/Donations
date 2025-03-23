import React from "react";
import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = ["slide1.jpg", "slide2.jpg", "slide3.jpg"];

const CarouselComponent = () => {
  return (
    <div className="w-full">
      <CarouselUI className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <img
                src={img}
                alt={`carousel-image-${index}`}
                className="w-full object-cover h-[50vh] md:h-[60vh]"
                style={{ minHeight: "250px" }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </CarouselUI>
    </div>
  );
};

export default CarouselComponent;
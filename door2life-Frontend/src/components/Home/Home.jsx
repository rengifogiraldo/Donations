import React from "react";
import Carousel from "../Carousel/Carousel";
import Features from "../Features/Features";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Carousel />
        <Features />
      </div>
      <Footer />
    </>
  );
};

export default Home;

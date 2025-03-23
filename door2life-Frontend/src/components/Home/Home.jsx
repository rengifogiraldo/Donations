import React from "react";
import Carousel from "../Carousel/Carousel";
import Features from "../Features/Features";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-0">
        <Carousel />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
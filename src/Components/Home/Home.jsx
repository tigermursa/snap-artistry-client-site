import React from "react";
import HomeSlider from "./HomeSlider/HomeSlider";
import PopularInstructorsSection from "./PopularInstructorsSection/PopularInstructorsSection";
import TopSixClass from "./TopSixClass/TopSixClass";
import Products from "./Products/Products";

const Home = () => {
  return (
    <div>
      <div className="">
        <HomeSlider></HomeSlider>
        <h1 className="text-4xl md:text-6xl font-thin mt-36 mb-10">
          Our top Classes
        </h1>
        <TopSixClass></TopSixClass>
        <h1 className="text-4xl md:text-6xl font-thin  mt-36 mb-10">
          Our top Instructors
        </h1>
        <PopularInstructorsSection></PopularInstructorsSection>
        <h1 className="text-4xl md:text-6xl font-thin  mt-36 mb-10">
          Our top Available Products
        </h1>
        <Products></Products>
      </div>
    </div>
  );
};

export default Home;

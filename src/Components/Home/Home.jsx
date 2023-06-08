import React from "react";
import HomeSlider from "./HomeSlider/HomeSlider";
import PopularInstructorsSection from "./popular nstructorsSection/popularInstructorsSection";

const Home = () => {
  return (
    <div>
      <div className="">
        <HomeSlider></HomeSlider>
        <PopularInstructorsSection></PopularInstructorsSection>
      </div>
    </div>
  );
};

export default Home;

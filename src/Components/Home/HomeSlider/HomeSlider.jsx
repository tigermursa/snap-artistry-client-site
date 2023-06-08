import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cphoto1 from "../../../../public/cphoto1.jpg";
import cphoto2 from "../../../../public/cphoto2.jpeg";
import cphoto3 from "../../../../public/cphoto3.jpeg";
import cphoto4 from "../../../../public/cphoto4.jpeg";
import cphoto5 from "../../../../public/cphoto5.jpeg";
import "./HomeSlider.css"
const HomeSlider = () => {
  const settings = {
    dots: " ",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider-slide">
            <img src={cphoto1} alt="Slide 1" className="slider-image" />
          </div>
          <div className="slider-slide">
            <img src={cphoto2} alt="Slide 1" className="slider-image" />
          </div>
          <div className="slider-slide">
            <img src={cphoto3} alt="Slide 1" className="slider-image" />
          </div>
          <div className="slider-slide">
            <img src={cphoto4} alt="Slide 1" className="slider-image" />
          </div>
          <div className="slider-slide">
            <img src={cphoto5} alt="Slide 1" className="slider-image" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HomeSlider;

import React, { useState } from "react";
import "./HomePhoto.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { sliderImages } from "./images";
const HomePhoto = () => {
  const [current, setcurrent] = useState(0);
  const length = sliderImages.length;

  const nextSlide = () => {
    setcurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setcurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="container-slider">
      <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {sliderImages.map((item, index) => {
          return (
            <div
              className={index === current ? "slide-active" : "slide"}
              key={index}
            >
              {index === current && (
                <div className="slide-content">
                  <div>
                    <div className="saleUp">
                      <p className="text-slide">
                        Sale up to
                        <span style={{ color: `#ffa200` }}>{item.sale}%</span>
                      </p>
                    </div>
                    <div className="afterSale">
                      <p>& Luggage Event</p>
                    </div>
                    <p className="shipping"> {item.shipping}</p>
                  </div>
                  <img src={item.image} className="image" />
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default HomePhoto;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [burgers, setBurgers] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredBurgers = products.filter(
        (data) => data.product_category === "burgers"
      );
      setBurgers(filteredBurgers);
      console.log("Burgers filtrés:", filteredBurgers);
    }
  }, [products]);

  return (
    <div className="w-full pt-24">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        className="mySwiper"
      >
        {burgers.length > 0 ? (
          burgers.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard data={data} index={i} />
            </SwiperSlide>
          ))
        ) : (
          <p>Aucun burger disponible.</p>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;

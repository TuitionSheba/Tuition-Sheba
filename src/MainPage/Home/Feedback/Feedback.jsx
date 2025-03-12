import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Header from "../../../Components/Header";

import "swiper/css";
import "swiper/css/pagination";

const Feedback = () => {
  return (
    <div>
      <Header text={"Happy Clients"} />
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          {/* <img src="../../../../src/Assets/car-1.png" alt="" /> */}
          <h1>polo</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../../src/Assets/car-2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../../src/Assets/car-3.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../../src/Assets/car-4.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../../src/Assets/car-5.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../../src/Assets/car-6.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../../src/Assets/car-7.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../../src/Assets/car-8.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Feedback;

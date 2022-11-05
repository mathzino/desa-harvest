import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import fakeimage from "../../assets/img/gabi-miranda-dxb_HSjoQ40-unsplash.png";
import Rating from "../../components/atom/rating";
import shop from "../../assets/svg/shop.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Shopbagcircle from "../../components/atom/shopbagcircle";
import SettingCircle from "../../components/atom/settingcircle";
export default function ProductPage() {
  return (
    <div className="flex justify-center ">
      <div className="w-screen max-w-md h-screen bg-mygreen ">
        {/* swiper */}
        <div className="relative">
          {/* 2 absolute circle */}
          <div className=" text-white z-20 absolute right-4 top-2">
            <div className=" flex gap-2">
              <Shopbagcircle />
              <SettingCircle />
            </div>
          </div>
          {/* swiper comp */}
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            className="w-full h-96 "
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
              "--swiper-navigation-size": "20px",
            }}
          >
            <SwiperSlide className="">
              <Image src={fakeimage} className="w-full" />
            </SwiperSlide>
            <SwiperSlide className="">
              <Image src={fakeimage} className="w-full" />
            </SwiperSlide>
            <SwiperSlide className="">
              <Image src={fakeimage} className="w-full" />
            </SwiperSlide>
          </Swiper>
        </div>
        {/*  detail*/}
        <div className="relative bottom-20 z-10 flex-col">
          {true && (
            <div className="bg-white w-full h-fit rounded-[40px]  ">
              <div className="px-7 pt-5 flex-col">
                {/* detail */}
                <div>
                  <div className="">
                    <p className=" text-2xl text-[#618D80]">[Paket Sayur Sop], Wortel, Tomat, Bayam, Singkong</p>
                    <p className=" text-2xl font-bold text-[#618D80] mt-2">Rp5.000/Kg</p>
                    <div className="flex gap-1 mt-1">
                      <Rating width={24} height={24} />
                      <Rating width={24} height={24} />
                      <Rating width={24} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center mt-5">
                    <span className="mr-2">
                      <Image src={shop} alt="" width={24} height={24} />
                    </span>
                    <p className="text-[#618D80] text-2xl">H. Rico</p>
                  </div>
                </div>
              </div>
              {/* shopbag */}
              <div className=" my-5 px-7">
                <Shopbagcircle colorStroke="#618D80" size={21} />
              </div>
              {/* mass */}
              <div>
                <div className="border border-[#618D80] flex justify-between h-11 items-center">
                  <div className="  border border-[#618D80]  w-20 flex justify-center items-center text-lg font-bold h-full  text-[#618D80]">+</div>
                  <div className="border border-[#618D80] grow flex justify-center items-center h-full text-lg text-[#618D80]">100 gram</div>
                  <div className="   border border-[#618D80]  w-20 flex justify-center items-center text-lg font-bold h-full  text-[#618D80]">-</div>
                </div>
              </div>
              {/* Beli */}
              <div>
                <div className=" bg-[#618D80] flex justify-between py-3 px-10 text-2xl text-white">
                  <div>Rp. 5000</div>
                  <div>Beli</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

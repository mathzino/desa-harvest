import React from "react";
import Image from "next/image";
import Rating from "../../atom/rating";
import shop from "../../../assets/svg/shop.svg";
export default function Product({ isEmpty }) {
  return (
    <div className=" h-60 w-40 bg-white shadow-md border rounded-3xl overflow-hidden flex-col relative">
      {/* Empty */}
      {isEmpty && (
        <div className=" w-full h-full flex items-center justify-center absolute bg-black z-10 bg-opacity-50">
          <div className=" bg-[#FB7777] text-white h-9  w-32 flex items-center justify-center rounded-3xl ">Habis</div>
        </div>
      )}
      <div className="bg-gray-100 w-full  h-32  ">
        <Image className="" alt="Image not found" />
      </div>
      {/* DETAIL*/}
      <div className="py-1 px-3  flex-col  h-28 ">
        <div className="">
          <p className=" text-[10px] text-[#618D80]">[Paket Sayur Sop], Wortel, Tomat, Bayam, Singkong</p>
          <p className=" text-xs font-bold text-[#618D80] mt-2">Rp5.000/Kg</p>
          <div className=" flex gap-1 mt-1">
            <Rating />
            <Rating />
            <Rating />
          </div>
        </div>
        <div className="flex items-center absolute bottom-3 ">
          <span className=" mr-2">
            <Image src={shop} alt="" />
          </span>
          <p className=" text-[#618D80] text-[8px]">H. Rico</p>
        </div>
      </div>
    </div>
  );
}

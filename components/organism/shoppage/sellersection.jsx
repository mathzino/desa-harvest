import React from "react";
import Image from "next/image";
import shopbag from "../../../assets/svg/shopbag.svg";
import settinglogo from "../../../assets/svg/settinglogo.svg";
export default function Sellersection() {
  return (
    <div className="">
      <p className="text-[#7B7B7B]">Anda Ingin Menjual?</p>
      <div className="mt-2">
        <div className=" flex justify-between">
          <button className=" w-24 h-7 bg-[#618D80] rounded-3xl ">
            <p className="text-xs text-white font-bold">Klik disini</p>
          </button>
          <div className=" flex gap-2">
            <div className="h-9 w-9 rounded-full border border-[#ADCEC4] flex items-center justify-center">
              <Image src={shopbag} alt="" />
            </div>
            <div className="h-9 w-9 rounded-full border border-[#ADCEC4] flex items-center justify-center">
              <Image src={settinglogo} alt="" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

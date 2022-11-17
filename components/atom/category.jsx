import React from "react";

export default function Category({ category, onClick, isActive }) {
  if (isActive == category) {
    return (
      <button onClick={onClick} value={category} className="h-5 bg-[#618D80] border border-[#ADCEC4]  w-fit px-3 text-[8px] rounded-3xl flex items-center text-white ">
        {category}
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        value={category}
        className="h-5 bg-white border border-[#ADCEC4] bg-opacity-40 w-fit px-3 text-[8px] rounded-3xl flex items-center text-[#618D80] hover:text-white hover:bg-[#618D80] hover:-translate-y-1 hover:transition-transform hover:bg-opacity-40"
      >
        {category}
      </button>
    );
  }
}

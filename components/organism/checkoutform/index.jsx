import React from "react";

export default function CheckoutForm() {
  return (
    <div className="w-72 h-[575px] bg-white py-6 px-5 rounded-lg">
      <p className=" text-2xl  text-[#618D80] font-medium">Checkout Belanja!</p>
      <form action="" className=" flex flex-col gap-12 mt-16">
        <input type="text" name="nama" placeholder="Nama" className=" border-b border-[#618D80] focus:outline-0 text-[#618D80] p-1" />
        <input type="text" name="contact" placeholder="No. Whatsapp" className=" border-b border-[#618D80] focus:outline-0 text-[#618D80] p-1" />
        <input type="text" name="contact" placeholder="Alamat" className=" border-b border-[#618D80] focus:outline-0 text-[#618D80] p-1" />
        <div className=" text-base text-[#618D80]  border-b border-[#618D80]  p-1">
          Total Belanja : <span className=" font-bold">Rp.100.000</span>
        </div>
        <button className=" bg-[#FB7777] rounded-3xl w-full text-white text-base py-2 font-bold">Konfirmasi</button>
      </form>
    </div>
  );
}

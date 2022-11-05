import React from "react";
import Category from "../../components/atom/category";
import Product from "../../components/molecule/product";
import CheckoutForm from "../../components/organism/checkoutform";
import SearchSection from "../../components/organism/searchsection";
import Sellersection from "../../components/organism/shoppage/sellersection";

export default function Shop() {
  return (
    <div className="flex justify-center ">
      <div className="w-screen max-w-md bg-mygreen  relative">
        {/* checkout form */}
        {false && (
          <div className=" w-full h-full absolute z-20 bg-black bg-opacity-30">
            <div className=" flex justify-center py-8">
              <CheckoutForm />
            </div>
          </div>
        )}
        {/* go to seller page */}
        <div className="px-5 py-4">
          <Sellersection />
        </div>
        {/* search section */}
        <div className="my-4 px-5">
          <SearchSection />
        </div>
        {/* category */}
        <div className="px-5">
          <div className="flex items-center">
            <div className=" mr-2 flex text-xs font-medium text-[#618D80]">Kategori : </div>
            <div className="flex gap-2">
              <Category category="Sayur" />
              <Category category="Sayur" />
              <Category category="Sayur" />
            </div>
          </div>
        </div>
        {/* product */}
        <div className="mt-4">
          <div className=" w-full h-screen bg-white rounded-3xl ">
            <div className="p-5 flex justify-between flex-wrap gap-2">
              <Product />
              <Product isEmpty={true} />
              <Product isEmpty={true} />
              <Product />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

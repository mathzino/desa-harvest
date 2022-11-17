import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../store/products/products.selector";
import { fetchProductsAsync } from "../../../store/products/produtcs.action";

export default function CardDetailProductNotify({ product }) {
  const { id_product, product_uom, qt, total_price, name } = product;
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const selectedProduct = products.filter((p) => p.id_product == id_product)[0];
  const productName = selectedProduct?.name;
  let image;
  if (selectedProduct?.image !== undefined) {
    image = selectedProduct.image[0].filename;
  }
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);
  return (
    <div>
      <div className="w-full h-20 rounded-md shadow-md overflow-hidden flex">
        <div className=" w-24 h-full bg-gray-400">
          <Image src={`http://malon.my.id:8888/api/seller/file/product/${image ? image : ""}`} alt="" width="110" height="110" layout="fill" objectFit="contain" />
        </div>
        <div className="px-3 flex flex-col justify-center w-full">
          <div>
            <p className=" text-[#618D80] text-xs">{productName}</p>
          </div>
          <div className="mt-1 w-full">
            <div className=" flex justify-between ">
              <div className=" text-[#618D80] font-bold text-xs ">Rp {total_price}</div>
              <div className=" text-[#618D80] text-xs">
                {qt} {product_uom}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

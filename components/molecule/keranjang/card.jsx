import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import shop from "../../../assets/svg/shop.svg";
import fakeImage from "../../../assets/img/gabi-miranda-dxb_HSjoQ40-unsplash.png";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../../store/products/products.selector";
import { fetchProductsAsync, getNameProd } from "../../../store/products/produtcs.action";
import { selectCart } from "../../../store/cart/cart.selector";
export default function CartCard({ data, storeId }) {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const allCart = useSelector(selectCart);
  const getNameProd = (data, products) => {
    const id = data.id_product;
    let name = "";
    products.forEach((p) => {
      p.id_product == id ? (name = p.name) : (name = name);
    });
    return name;
  };
  let [quantity, setQuantity] = useState(data.qt);

  const cartStore = allCart.filter((c) => c._id_toko == storeId);

  const productName = getNameProd(data, products);
  const { id_product } = data;
  const [product, setProduct] = useState("");
  useEffect(() => {
    const getProd = async (id_product) => {
      const res = await axios.get(`http://malon.my.id:8888/api/seller/v1/product/data/${id_product}`);
      const data = res.data.data;
      setProduct(data);
    };

    getProd(id_product);
  }, [id_product]);

  const [shopData, setShopData] = useState("");
  useEffect(() => {
    const getShopData = async (id) => {
      try {
        if (id) {
          const { data } = await axios.get(`http://malon.my.id:8888/api/user/v1/toko/data/${id}`);
          const shopData = data.data;
          setShopData(shopData);
        }
      } catch (error) {}
    };
    getShopData(storeId);
  }, [storeId]);

  return (
    <div className=" w-full rounded-lg h-24  flex overflow-hidden shadow">
      <div className=" flex-none w-32  h-full bg-gray-500">
        <Image priority width={80} height={80} className=" w-full h-full object-cover" alt="" src={`http://malon.my.id:8888/api/seller/file/product/${product?.product?.image[0]?.filename}`} />
      </div>
      {/* detail */}
      <div className="pr-3 pl-5 py-4 flex flex-col w-full">
        {/* toko */}
        <div className="flex items-center mb-2  ">
          <span className=" mr-2">
            <Image src={shop} alt="tes" />
          </span>
          <p className=" text-[#618D80] text-[8px] ">{shopData?.name}</p>
        </div>
        {/* nama produk */}
        <div className=" text-[#618D80] text-[10px]">{productName}</div>

        {/* price */}
        <div className=" flex justify-between   w-full">
          <div className="text-[#618D80] text-xs font-bold">Rp. {data.total_price}</div>
          <div className=" flex gap-4 items-center">
            <div className="text-[#618D80] text-xs font-bold grow-0 shrink-0">
              {data.qt} {data.product_uom}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Rating from "../../components/atom/rating";
import shop from "../../assets/svg/shop.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Shopbagcircle from "../../components/atom/shopbagcircle";
import SettingCircle from "../../components/atom/settingcircle";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, getProductByID } from "../../store/products/produtcs.action";
import { selectProduct, selectProducts } from "../../store/products/products.selector";
import CheckoutComp from "../../components/organism/checkoutcomp";
import axios from "axios";
import Notifcircle from "../../components/atom/notifcircle";
export default function ProductPage() {
  const route = useRouter();
  const dispatch = useDispatch();

  //
  //
  //get product informations
  const idProduct = route.asPath.split("/")[2];
  const product = useSelector(selectProduct);
  const products = useSelector(selectProducts);
  useEffect(() => {
    dispatch(getProductByID(idProduct, products));
  }, [idProduct, products, dispatch]);
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);
  //get produxt informations
  //
  //

  //
  //
  // get store name
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    const getStoreData = async (toko_id) => {
      try {
        if (toko_id != undefined && toko_id != "[id]") {
          const res = await axios.get(`http://malon.my.id:8888/api/user/v1/toko/data/${toko_id}`);
          const data = res.data.data;
          const { name, image_profile } = data;

          setStoreName(name);
        }
      } catch (error) {}
    };
    getStoreData(product?.toko_id);
  }, [product]);
  // get store name
  //
  //

  let [ratingProduct, setRatingProd] = useState(0);
  useEffect(() => {
    try {
      const getRatingProduct = async (id_product) => {
        if (id_product != "[id]") {
          const res = await axios.get(`http://malon.my.id:8888/api/seller/v1/product/data/${id_product}`);
          const data = res.data.data;

          const allStar = data.stars;
          let totalStars = 0;
          let avgStar = 0;
          if (allStar.length > 0) {
            totalStars = allStar.reduce((a, c) => a + c);
            avgStar = Math.round(totalStars / allStar.length);
          }
          setRatingProd(avgStar);
        }
      };
      getRatingProduct(idProduct);
    } catch (error) {}
  }, [idProduct]);

  let [ratings, setRatings] = useState([]);
  useEffect(() => {
    let ratingsarr = [];
    for (let i = 0; i < ratingProduct; i++) {
      ratingsarr.push(<Rating key={i} width={24} height={24} />);
    }
    for (let i = ratingProduct; i < 5; i++) {
      ratingsarr.push(<Rating key={i} width={24} height={24} fill="empty" />);
    }
    setRatings(ratingsarr);
  }, [ratingProduct]);

  return (
    <div className="flex justify-center ">
      <div className="w-screen max-w-md h-screen bg-mygreen ">
        {/* swiper */}
        <div className="relative">
          {/* 2 absolute circle */}
          <div className=" text-white z-20 absolute right-4 top-2">
            <div className=" flex gap-2 ">
              <Shopbagcircle />
              <Notifcircle />
              {/* <SettingCircle /> */}
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
            onSwiper={(swiper) => {}}
            onSlideChange={() => {}}
            className="w-full h-96 "
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
              "--swiper-navigation-size": "20px",
            }}
          >
            {product?.image?.map((img, i) => {
              return (
                <SwiperSlide key={i} className="">
                  <Image width={80} height={80} priority alt="" src={`http://malon.my.id:8888/api/seller/file/product/${img.filename}`} className="w-full h-full" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/*  detail*/}
        <div className="relative bottom-20 z-10 flex-col">
          <div className="bg-white w-full h-screen  rounded-[40px]  relative">
            <div className="px-7 pt-5 flex-col lg:h-[300px]">
              {/* detail */}
              <div>
                <div className="">
                  <p className=" text-2xl text-[#618D80]">{product?.name}</p>
                  <p className=" text-2xl font-bold text-[#618D80] mt-2">
                    Rp{product?.price}/{product?.product_uom}
                  </p>
                  <div className="flex gap-1 mt-2">{ratings.map((e) => e)}</div>
                </div>
                <div className="flex items-center mt-8">
                  <span className="mr-2 shrink-0">
                    <Image src={shop} alt="" width={24} height={24} />
                  </span>
                  <p className="text-[#618D80] text-2xl">{storeName}</p>
                </div>
              </div>
            </div>
            {/* shopbag */}
            {/* <div className=" my-5 px-7">
                <button onClick={handleSaveCart}>
                  <div className="p-2 w-fit rounded-full border  flex items-center justify-center" style={{ borderColor: "#618D80" }}>
                    <svg width={21} height={21} viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M2.05163 6.88587C2.08017 6.53023 2.24162 6.1984 2.50382 5.95645C2.76602 5.7145 3.10973 5.58019 3.4665 5.58026H12.0225C12.3792 5.58019 12.723 5.7145 12.9852 5.95645C13.2474 6.1984 13.4088 6.53023 13.4374 6.88587L14.0071 13.9815C14.0228 14.1768 13.9979 14.3732 13.9339 14.5584C13.87 14.7435 13.7684 14.9135 13.6355 15.0574C13.5027 15.2014 13.3415 15.3163 13.1621 15.3949C12.9826 15.4735 12.7889 15.5142 12.593 15.5142H2.89601C2.70012 15.5142 2.50635 15.4735 2.32692 15.3949C2.14749 15.3163 1.98628 15.2014 1.85344 15.0574C1.7206 14.9135 1.619 14.7435 1.55505 14.5584C1.4911 14.3732 1.46617 14.1768 1.48184 13.9815L2.05163 6.88587V6.88587Z"
                        stroke="#618D80"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5828 7.70896V4.16112C10.5828 3.40836 10.2838 2.68644 9.75148 2.15416C9.2192 1.62188 8.49728 1.32285 7.74452 1.32285C6.99177 1.32285 6.26984 1.62188 5.73756 2.15416C5.20528 2.68644 4.90625 3.40836 4.90625 4.16112V7.70896"
                        stroke="#618D80"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div> */}
            {/* checkout comp */}
            <div className=" fixed bottom-0  max-w-md w-full">{product ? <CheckoutComp product={product} /> : null}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

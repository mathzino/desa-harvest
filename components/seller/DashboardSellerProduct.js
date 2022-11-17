import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import cookieCutter from "cookie-cutter";
import axios from "axios";

const DashboardSellerProduct = ({ product, toko }) => {
  const [productsWithStar, setProductWithStar] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getProductStar = async () => {
    const temp = [];
    if (product) {
      for (const prod of product) {
        const token = cookieCutter.get("token") || null;
        try {
          const { data } = await axios.get(
            `http://malon.my.id:8888/api/seller/v1/product/star/${prod._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          prod.star = data.data.total_star;
          temp.push(prod);
          setProductWithStar(temp);
        } catch (error) {
          if (error.response.data?.message === "Id product tidak ditemukan") {
            console.clear();
            prod.star = 0;
            temp.push(prod);
            setProductWithStar(temp);
          }
        }
      }
    } else {
      setProductWithStar([]);
    }
  };
  const controller = new AbortController();
  useEffect(() => {
    const signal = !controller.signal.aborted;
    signal &&
      (async () => {
        await getProductStar();
        setIsLoading(false);
      })();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div className="bg-mygreen w-full min-h-[100vh] p-3">
      <div className="p-3 bg-white rounded-xl border-2 border-mygreen_dark/30 border-dashed hover:cursor-pointer hover:scale-95 transition-all text-mygreen_dark/60">
        <Link href="/seller/product/add">
          <div className="flex justify-center items-center gap-3">
            <p className="">Tambah Jualan anda</p>
            <div className="w-[16px] h-[17px] bg-[url('/icons/tambahBarang.svg')]"></div>
          </div>
        </Link>
      </div>
      {product && product.length > 0 ? (
        <div className="grid md:grid-cols-2 grid-cols-2 sm:grid-cols-3 gap-6 bg-white my-3 p-3 rounded-xl">
          {!isLoading &&
            productsWithStar.map((prod, id) => (
              <ProductCard
                key={id}
                id={prod.id_product}
                image={prod.image}
                name={prod.name}
                price={prod.price}
                uom={prod.product_uom}
                toko={toko}
                star={prod.star}
              />
            ))}
        </div>
      ) : (
        <div className="p-16 my-6 rounded-xl text-center flex justify-center items-center  bg-white">
          <p className="text-sm text-mygreen_dark">
            Mulai tambahkan jualan untuk menampilkan produk anda!
          </p>
        </div>
      )}
    </div>
  );
};
export default DashboardSellerProduct;

import Link from "next/link";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardCatalog = () => {
  const router = useRouter();
  const [allProduct, setAllProduct] = useState();
  const [category, setCategory] = useState({});
  const [menu, setMenu] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const availableCategory = [
    "Sayur",
    "Buah",
    "Sembako",
    "Minuman",
    "Makanan",
    "Obat",
    "Bumbu",
    "Perlengkapan",
    "Lainnya",
  ];

  const getAllProduct = async () => {
    const token = cookieCutter.get("token") || null;
    const toko_id = cookieCutter.get("toko_id");
    try {
      const {
        data: {
          data: { product },
        },
      } = await axios.get(
        `http://malon.my.id:8888/api/seller/v1/shop/data/${toko_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllProduct(product);
      const Sayur =
        product.filter((prod) => prod.product_category[0].includes("Sayur")) ||
        [];
      const Buah = product.filter((prod) =>
        prod.product_category[0].includes("Buah")
      );
      const Sembako = product.filter((prod) =>
        prod.product_category[0].includes("Sembako")
      );
      const Minuman = product.filter((prod) =>
        prod.product_category[0].includes("Minuman")
      );
      const Makanan = product.filter((prod) =>
        prod.product_category[0].includes("Makanan")
      );
      const Obat = product.filter((prod) =>
        prod.product_category[0].includes("Obat")
      );
      const Bumbu = product.filter((prod) =>
        prod.product_category[0].includes("Bumbu")
      );
      const Perlengkapan = product.filter((prod) =>
        prod.product_category[0].includes("Perlengkapan")
      );
      const Lainnya = product.filter((prod) =>
        prod.product_category[0].includes("Lainnya")
      );
      setCategory({
        ["Sayur"]: Sayur,
        ["Buah"]: Buah,
        ["Sembako"]: Sembako,
        ["Minuman"]: Minuman,
        ["Makanan"]: Makanan,
        ["Obat"]: Obat,
        ["Bumbu"]: Bumbu,
        ["Perlengkapan"]: Perlengkapan,
        ["Lainnya"]: Lainnya,
      });
      setAllProduct(product);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="p-3 bg-white">
      <h1 className="font-semibold mb-3">List Produk Toko</h1>
      <Link href="/seller/product/add">
        <div className="py-3 flex justify-between items-center hover:scale-95 cursor-pointer transition-all">
          <div className="flex gap-3">
            <div className="bg-[url('/icons/tambahProduk.svg')] w-[20px] h-[22px]"></div>
            <p>Tambah Produk</p>
          </div>
          <div className="bg-[url('/icons/arrow.svg')] w-[6px] h-[10px]"></div>
        </div>
      </Link>
      {allProduct && (
        <>
          <div
            onClick={() => setMenu("allProduct")}
            className="py-3 flex justify-between items-center hover:scale-95 cursor-pointer transition-all"
          >
            <div className="flex gap-3">
              <div className="bg-[url('/icons/boxProduct.svg')] w-[20px] h-[22px]"></div>
              <p>Semua Produk</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-700 text-xs font-semibold">
                {allProduct.length}
              </span>
              <div className="bg-[url('/icons/arrow.svg')] w-[6px] h-[10px]"></div>
            </div>
          </div>
          {menu === "allProduct" &&
            allProduct.map((prod, id) => (
              <div
                key={id}
                className="px-3 border-b-2 flex justify-between text-xs pb-1 text-slate-800"
              >
                <p className="font-semibold">{prod.name}</p>
                <span>{prod.qt} Tersisa</span>
              </div>
            ))}
        </>
      )}
      {!isLoading &&
        availableCategory.map(
          (jenis, id) =>
            category[`${jenis}`].length > 0 && (
              <div key={id}>
                <div
                  onClick={() => setMenu(jenis)}
                  className="py-3 flex justify-between items-center hover:scale-95 cursor-pointer transition-all"
                >
                  <div className="flex gap-3">
                    <p>{jenis}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-700 text-xs font-semibold">
                      {category[`${jenis}`].length}
                    </span>
                    <div className="bg-[url('/icons/arrow.svg')] w-[6px] h-[10px]"></div>
                  </div>
                </div>
                {menu === jenis &&
                  category[`${jenis}`].map((prod, id) => (
                    <div
                      key={id}
                      className="px-3 border-b-2 flex justify-between text-xs pb-1 text-slate-800"
                    >
                      <p className="font-semibold">{prod.name}</p>
                      <span>{prod.qt} Tersisa</span>
                    </div>
                  ))}
              </div>
            )
        )}
    </div>
  );
};

export default DashboardCatalog;

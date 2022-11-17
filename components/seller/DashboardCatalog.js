import Link from "next/link";
import { useRouter } from "next/router";
const DashboardCatalog = () => {
  const router = useRouter();
  return (
    <div className="p-3 bg-white">
      <h1 className="font-semibold mb-3">List Produk Toko</h1>
      <Link href="/seller/product/add">
        <div className="flex justify-between items-center hover:scale-95 cursor-pointer transition-all">
          <div className="flex gap-3">
            <div className="bg-[url('/icons/tambahProduk.svg')] w-[20px] h-[22px]"></div>
            <p>Tambah Produk</p>
          </div>
          <div className="bg-[url('/icons/arrow.svg')] w-[6px] h-[10px]"></div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardCatalog;

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import shop from "../../../assets/svg/shop.svg";
import { getTotalPrice } from "../../../store/util";
import { deleteTransaction } from "../../../store/alltransaction/alltransaction.action";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTransaction } from "../../../store/alltransaction/alltransaction.selector";
export default function NotifyCard({ id }) {
  const [transaction, setTransaction] = useState("");
  const dispatch = useDispatch();
  const allId = useSelector(selectAllTransaction);
  //transaction data
  const { status, total_price, _id_toko } = transaction;
  useEffect(() => {
    const getTransaction = async (id) => {
      try {
        const res = await axios.get(`http://malon.my.id:8888/api/seller/v1/transaction/data/${id}`);
        const dataTransaction = res.data.data;
        const total_price = getTotalPrice(dataTransaction.transaction);
        const { status, _id_toko } = dataTransaction.transaction;

        setTransaction({ status, total_price, _id_toko });
      } catch (error) {}
    };
    getTransaction(id);
  }, [id]);

  //shopData
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
    getShopData(_id_toko);
  }, [_id_toko]);
  //

  // get file name image
  const [fileNameShop, setFileNameShop] = useState("");
  useEffect(() => {
    const getFileName = async () => {
      try {
        if (shopData) {
          const { data } = await axios.get(`http://malon.my.id:8888/api/user/v1/toko/image/${shopData?.image_profile}`);
          const fileName = data.data.filename;
          setFileNameShop(fileName);
        }
      } catch (error) {}
    };
    getFileName();
  }, [shopData]);

  switch (status) {
    case 0:
      return (
        <Link href={`/notify/${id}`}>
          <div className=" ">
            <div className=" w-full  px-5 py-3 shadow-md rounded-md flex">
              {fileNameShop ? (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden ">
                  <Image className="w-full h-full  object-cover" alt="" width={80} height={80} src={`http://malon.my.id:8888/api/seller/file/toko/${fileNameShop}`} />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden "></div>
              )}

              <div className="ml-10 flex flex-col ">
                {/* namatoko */}
                <div className="flex">
                  <span className=" mr-2">
                    <Image src={shop} alt="tes" width={21} height={21} />
                  </span>
                  <p className=" text-[#618D80] text-base">{shopData ? shopData.name : ""}</p>
                </div>
                {/*  harga */}
                <div>
                  <p className=" mt-3 mb-2 text-base font-bold text-[#618D80] ">Rp {total_price}</p>
                </div>
                {/* STATUS */}
                <div>
                  <div className="border border-[#CFA948] py-2 px-5 rounded-lg">
                    <p className=" font-bold text-[#CFA948] text-xs">Menunggu konfirmasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case 3:
      return (
        <Link href={`/notify/${id}`}>
          <div className=" ">
            <div className=" w-full  px-5 py-3 shadow-md rounded-md flex">
              {fileNameShop ? (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden ">
                  <Image className="w-full h-full  object-cover" alt="" width={80} height={80} src={`http://malon.my.id:8888/api/seller/file/toko/${fileNameShop}`} />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden "></div>
              )}

              <div className="ml-10 flex flex-col ">
                {/* naam toko */}
                <div className="flex">
                  <span className=" mr-2">
                    <Image src={shop} alt="tes" width={21} height={21} />
                  </span>
                  <p className=" text-[#618D80]  text-base">{shopData ? shopData.name : ""}</p>
                </div>
                {/*  harga */}
                <div>
                  <p className=" mt-3 mb-2 text-base font-bold text-[#618D80] ">Rp {total_price}</p>
                </div>
                {/* STATUS */}
                <div>
                  <div className="border border-[#FB7777] py-2 px-5 rounded-lg">
                    <p className=" font-bold text-[#FB7777] text-xs">Transaksi Ditolak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case 1:
      return (
        <Link href={`/notify/${id}`}>
          <div className=" ">
            <div className=" w-full  px-5 py-3 shadow-md rounded-md flex">
              {fileNameShop ? (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden ">
                  <Image className="w-full h-full  object-cover" alt="" width={80} height={80} src={`http://malon.my.id:8888/api/seller/file/toko/${fileNameShop}`} />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden "></div>
              )}

              <div className="ml-10 flex flex-col ">
                {/* naam toko */}
                <div className="flex">
                  <span className=" mr-2">
                    <Image src={shop} alt="tes" width={21} height={21} />
                  </span>
                  <p className=" text-[#618D80]  text-base">{shopData ? shopData.name : ""}</p>
                </div>
                {/*  harga */}
                <div>
                  <p className=" mt-3 mb-2 text-base font-bold text-[#618D80] ">Rp {total_price}</p>
                </div>
                {/* STATUS */}
                <div>
                  <div className=" border border-[#618D80] py-2 px-5 rounded-lg">
                    <p className=" font-bold text-[#618D80]  text-xs">Pesanan Dikonfirmasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    case 2:
      return (
        <Link href={`/notify/${id}`}>
          <div className=" ">
            <div className=" w-full  px-5 py-3 shadow-md rounded-md flex">
              {fileNameShop ? (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden ">
                  <Image className="w-full h-full  object-cover" alt="" width={80} height={80} src={`http://malon.my.id:8888/api/seller/file/toko/${fileNameShop}`} />
                </div>
              ) : (
                <div className="w-14 h-14 bg-gray-500 rounded-full overflow-hidden "></div>
              )}

              <div className="ml-10 flex flex-col ">
                {/* naam toko */}
                <div className="flex">
                  <span className=" mr-2">
                    <Image src={shop} alt="tes" width={21} height={21} />
                  </span>
                  <p className=" text-[#618D80]  text-base">{shopData ? shopData.name : ""}</p>
                </div>
                {/*  harga */}
                <div>
                  <p className=" mt-3 mb-2 text-base font-bold text-[#618D80] ">Rp {total_price}</p>
                </div>
                {/* STATUS */}
                <div>
                  <div className=" bg-[#618D80] py-2 px-5 rounded-lg">
                    <p className=" font-bold text-white text-xs">Transaksi Selesai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    default:
      return null;
  }
}

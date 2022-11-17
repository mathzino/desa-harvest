import React, { useEffect, useState } from "react";
import Sellersection from "../../components/organism/shoppage/sellersection";
import axios from "axios";
import Image from "next/image";
import fakeImage from "../../assets/img/gabi-miranda-dxb_HSjoQ40-unsplash.png";
import shop from "../../assets/svg/shop.svg";
import CartCard from "../../components/molecule/keranjang/card";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTransaction } from "../../store/alltransaction/alltransaction.selector";
import NotifyCard from "../../components/molecule/notify/card";
import back from "../../assets/svg/back.svg";
import { useRouter } from "next/router";
import CardDetailProductNotify from "../../components/molecule/notify/cardDetailProductNotify";
import { getTotalPrice } from "../../store/util";
import { deleteTransaction } from "../../store/alltransaction/alltransaction.action";
import Swal from "sweetalert2";
export default function DailyNotify() {
  const router = useRouter();
  const dispatch = useDispatch();
  const transactionId = router.asPath.split("/")[2];
  const [transactionDetail, setTransactionDetail] = useState("");
  ///
  useEffect(() => {
    const getTransaction = async (transactionId) => {
      try {
        const res = await axios.get(`http://malon.my.id:8888/api/seller/v1/transaction/data/${transactionId}`);
        const data = res.data.data;
        setTransactionDetail(data);
      } catch (error) {}
    };
    getTransaction(transactionId);
  }, [transactionId]);

  ///
  /// handleDeleteTransaction
  const allId = useSelector(selectAllTransaction);
  const handleDeleteTransaction = () => {
    Swal.fire({
      title: "Anda ingin menghapus data transaksi ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const id = transactionDetail.code.transaction_id;
          dispatch(deleteTransaction(id, allId));
        } catch (error) {}
        Swal.fire("Berhasil Membatalkan Pembelian", "", "success");
        router.push("/notify");
      }
    });
  };

  ////

  //
  const Status = (status) => {
    switch (status) {
      case 0:
        return <div className=" w-full border border-[#CFA948] text-[#CFA948] py-2 px-1 text-center rounded-lg font-bold">Sedang menunggu Pesanan disetujui ... </div>;
      case 1:
        return <div className=" w-full border border-[#618D80] text-[#618D80]  py-2 px-1 text-center rounded-lg font-bold">Pesanan telah disetujui, silahkan ditunggu..</div>;
      case 2:
        return (
          <Link href={`/rating/${transactionDetail?.code?.transaction_id}`}>
            <div className=" w-full bg-[#618D80] text-white py-2 px-1 text-center rounded-lg font-bold">Beri rating</div>;
          </Link>
        );
      case 3:
        return (
          <button onClick={handleDeleteTransaction} className=" w-full border border-[#FB7777] text-[#FB7777] py-2 px-1 text-center rounded-lg font-bold">
            Pesanan telah ditolak
          </button>
        );
      default:
        null;
        break;
    }
  };
  //

  ///
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (transactionDetail) {
      const total = getTotalPrice(transactionDetail?.transaction);
      setTotalPrice(total);
    }
  }, [transactionDetail]);

  ////

  ////
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
    if (transactionDetail) {
      getShopData(transactionDetail.transaction._id_toko);
    }
  }, [transactionDetail]);
  //

  ////
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

  return (
    <div className="flex justify-center ">
      <div className="w-screen max-w-md bg-mygreen  relative border border-gray-200">
        {/* back */}
        <div className="px-5 text-[#618D80] py-2 font-bold flex gap-2 items-center">
          <Link href="/shop">
            <svg width="20" height="13" viewBox="0 0 20 13" fill="#618D80" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.0023e-09 6.50258C0.00167844 6.72498 0.0871314 6.93803 0.238333 7.09676L0.243333 7.10707L5.24333 12.259C5.4005 12.4154 5.611 12.5019 5.8295 12.5C6.048 12.498 6.25701 12.4077 6.41152 12.2485C6.56602 12.0893 6.65366 11.8739 6.65556 11.6488C6.65746 11.4237 6.57347 11.2068 6.42167 11.0448L2.845 7.35779H19.1667C19.3877 7.35779 19.5996 7.26733 19.7559 7.1063C19.9122 6.94527 20 6.72687 20 6.49914C20 6.27141 19.9122 6.05301 19.7559 5.89198C19.5996 5.73096 19.3877 5.64049 19.1667 5.64049H2.845L6.42167 1.95516C6.57347 1.79322 6.65746 1.57632 6.65556 1.35119C6.65366 1.12605 6.56602 0.910693 6.41152 0.751493C6.25701 0.592292 6.048 0.501989 5.8295 0.500032C5.611 0.498076 5.4005 0.584623 5.24333 0.741033L0.243333 5.89293L0.238333 5.90152C0.164147 5.97897 0.105278 6.07054 0.0650001 6.17114C0.0221002 6.27484 -9.40675e-06 6.38641 3.0023e-09 6.49914V6.50258Z"
                fill="#618D80"
              />
            </svg>
          </Link>
          <Link href="/shop">Kembali</Link>
        </div>

        {/* notif dll */}
        <div className="px-5 py-4">
          <Sellersection />
        </div>
        {/* constent section */}
        <div className="">
          <div className=" w-full min-h-screen bg-white rounded-t-3xl ">
            <div className="px-8 py-9">
              {/* title */}
              <div className="flex gap-6 items-center ">
                <Link href="/notify">
                  <Image src={back}></Image>
                </Link>
                <p className=" text-2xl font-medium ">Detail</p>
              </div>

              {/* container transaksi */}
              <div className=" rounded-lg shadow-lg px-3 py-11">
                {/* profile transaksi */}
                <div>
                  <div className="flex w-full p-4 gap-6  ">
                    <div className=" h-28 w-28 rounded-full bg-gray-200 overflow-hidden">
                      {fileNameShop && <Image className="w-full h-full  object-cover" alt="" width={80} height={80} src={`http://malon.my.id:8888/api/seller/file/toko/${fileNameShop}`} />}
                    </div>
                    <div className="py-6">
                      {/*  */}
                      <div className="flex mb-2 items-center">
                        <span className=" mr-4">
                          <Image src={shop} alt="tes" width={21} height={21} />
                        </span>
                        <p className=" text-[#618D80] text-base">{shopData?.name}</p>
                      </div>
                      {/*  */}
                      <div className=" text-[#618D80] font-bold"> Rp. {totalPrice} </div>
                    </div>
                  </div>
                </div>
                {/* status com */}
                <div className=" my-6">{Status(transactionDetail?.transaction?.status)}</div>
                {/*  */}
                <div className=" flex flex-col items-center gap-1">
                  <div className="text-[#618D80]">Kode Konfirmasi :</div>
                  <div className="text-[#618D80] font-bold text-4xl tracking-widest">{transactionDetail?.code?.code}</div>
                </div>
                {/*  */}
                <div className=" mt-6">
                  <div className=" text-[#618D80]">Detail Belanjaan : </div>
                </div>
                {/* card prod */}
                <div className=" mt-4 flex flex-col gap-4 ">
                  {transactionDetail &&
                    transactionDetail.transaction.cart.map((prod, i) => {
                      return <CardDetailProductNotify key={i} product={prod} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* shop total */}
      </div>
    </div>
  );
}

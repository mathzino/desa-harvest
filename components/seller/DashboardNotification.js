import NotificationCard from "./NotificationCard";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DashboardNotification = ({ toko, refresh }) => {
  const [transactionList, setTransactionList] = useState();
  const [completeTransactionList, setCompleteTransactionList] = useState();
  const [completeFilter, setCompleteFilter] = useState(false);
  const [isRefreshed, setIsRefreshed] = useState(false);

  const refreshList = async () => {
    setIsRefreshed(true);
    refresh();
    await getAllTransaction();
    setIsRefreshed(false);
  };

  const getAllTransaction = async () => {
    const token = cookieCutter.get("token") || null;
    const toko_id = cookieCutter.get("toko_id");
    try {
      const {
        data: { data },
      } = await axios.get(
        `http://malon.my.id:8888/api/seller/v1/shop/transaction/${toko}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const transaction = data.filter((tsc) => tsc.status < 2);
      const transactionComplete = data.filter((tsc) => tsc.status >= 2);
      setTransactionList(transaction);
      setCompleteTransactionList(transactionComplete);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmTransaction = async (id) => {
    try {
      const { data } = await axios.put(
        `http://malon.my.id:8888/api/seller/v1/transaction/data/${id}`,
        { status: 1 }
      );
      Swal.fire("Berhasil", "Pesanan berhasil diterima", "success");
      refresh();
      getAllTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTransaction = async (id) => {
    try {
      const { data } = await axios.put(
        `http://malon.my.id:8888/api/seller/v1/transaction/data/${id}`,
        { status: 2 }
      );
      Swal.fire("Kode Valid", "Transaksi Selesai", "success");
      getAllTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectTransaction = async (id) => {
    try {
      const { data } = await axios.put(
        `http://malon.my.id:8888/api/seller/v1/transaction/data/${id}`,
        { status: 3 }
      );
      Swal.fire(":(", "Pesanan berhasil ditolak", "error");
      getAllTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  return (
    <div className="p-6">
      {isRefreshed && (
        <div
          className="absolute w-min z-10 h-10 flex flex-col justify-center bg-white drop-shadow-xl rounded-xl p-6"
          style={{ top: "40%", left: "calc(50% - 2.5rem)" }}
        >
          <p>Refreshing</p>
        </div>
      )}

      <div className="mb-3 flex justify-center items-center">
        <h1 className="text-xl text-center ml-auto mr-auto">Notifikasi Anda</h1>
        <div
          onClick={refreshList}
          className="flex items-center bg-mygreen_dark rounded-xl px-3 pb-[2px] hover:brightness-110 cursor-pointer"
        >
          <div className="bg-[url('/icons/refresh.svg')] w-[32px] h-[32px] scale-50"></div>
        </div>
      </div>
      <div className="flex gap-3 border-b-2 w-min pb-2">
        <div className="flex items-center justify-center gap-1">
          <div className="bg-[url('/icons/filter.svg')] w-[8px] h-[8px]"></div>
          <p className="text-sm">Filter</p>
        </div>
        <div
          onClick={() => {
            getAllTransaction();
            setCompleteFilter((current) => !current);
          }}
          className={`px-3 text-sm ${
            completeFilter ? "bg-mygreen_dark text-white" : "ring-1"
          } ring-slate-300 rounded-full w-min font-semibold hover:cursor-pointer transition-all`}
        >
          Selesai
        </div>
      </div>
      {completeFilter ? (
        completeTransactionList?.length > 0 ? (
          completeTransactionList.map((transaction, id) => (
            <NotificationCard
              data={transaction}
              key={id}
              onConfirm={(id) => confirmTransaction(id)}
              onReject={(id) => rejectTransaction(id)}
              onRedeem={(id) => completeTransaction(id)}
            />
          ))
        ) : (
          <div className="flex justify-center items-center p-12">
            <p className="text-slate-500">Belum ada transaksi yang selesai</p>
          </div>
        )
      ) : transactionList?.length > 0 ? (
        transactionList.map((transaction, id) => (
          <NotificationCard
            key={id}
            data={transaction}
            onConfirm={(id) => confirmTransaction(id)}
            onReject={(id) => rejectTransaction(id)}
            onRedeem={(id) => completeTransaction(id)}
          />
        ))
      ) : (
        <div className="flex justify-center items-center p-12">
          <p className="text-slate-500">Belum ada transaksi</p>
        </div>
      )}
    </div>
  );
};

export default DashboardNotification;

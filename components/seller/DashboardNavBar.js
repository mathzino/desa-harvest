import { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";
import axios from "axios";

const DashboardNavBar = ({ menu, setMenu, toko, refresh, reset }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const getAllTransaction = async () => {
    const token = await cookieCutter.get("token");
    try {
      const {
        data: { data },
      } = await axios.get(
        `http://malon.my.id:8888/api/seller/v1/shop/transaction/${toko}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let temp = 0;
      for (const transaction of data) {
        transaction.status === 0 && temp++;
      }
      setNotificationCount(temp);
    } catch (error) {
      console.log(error);
    }
  };
  const abortController = new AbortController();
  useEffect(() => {
    !abortController.signal.aborted && getAllTransaction();
    return () => abortController.abort();
  }, []);

  useEffect(() => {
    if (refresh) {
      (async () => {
        await getAllTransaction();
        reset();
      })();
    }
  }, [refresh]);
  return (
    <div className="flex justify-evenly w-full">
      <div
        className={`flex justify-center items-center border-mygreen_dark/80 ${
          menu === "product" && `border-b-2`
        } w-full py-1 [&>div]:hover:bg-[url('/icons/barang-active.svg')] hover:cursor-pointer`}
        onClick={() => setMenu("product")}
      >
        <div
          className={`${
            menu === "product"
              ? `bg-[url('/icons/barang-active.svg')]`
              : `bg-[url('/icons/barang.svg')]`
          } w-[42px] h-[40px] bg-contain scale-50 transition-all`}
        ></div>
      </div>
      <div
        className={`flex justify-center items-center border-mygreen_dark/80 ${
          menu === "notification" && `border-b-2`
        } w-full py-1 [&>div]:hover:bg-[url('/icons/notification-active.svg')] hover:cursor-pointer`}
        onClick={() => setMenu("notification")}
      >
        <div
          className={`${
            menu === "notification"
              ? `bg-[url('/icons/notification-active.svg')]`
              : `bg-[url('/icons/notification.svg')]`
          } w-[40px] h-[44px] bg-no-repeat bg-contain scale-50 transition-all relative`}
        >
          {notificationCount > 0 && (
            <>
              <div className="py-1 px-2 absolute -top-4 -right-4 h-auto w-auto z-10 rounded-full bg-red-500 text-white font-bold text-xl flex justify-center items-center">
                {notificationCount <= 10 ? notificationCount : "10+"}
              </div>
              <div className="animate-ping py-1 px-2 absolute -top-4 -right-4 h-auto w-auto rounded-full z-0 bg-red-500 font-bold text-xl text-white">
                {notificationCount <= 10 ? notificationCount : "10+"}
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className={`flex justify-center items-center border-mygreen_dark/80 ${
          menu === "catalog" && `border-b-2`
        } w-full py-1 [&>div]:hover:bg-[url('/icons/toko-active.svg')] hover:cursor-pointer`}
        onClick={() => setMenu("catalog")}
      >
        <div
          className={`${
            menu === "catalog"
              ? `bg-[url('/icons/toko-active.svg')]`
              : `bg-[url('/icons/toko.svg')]`
          } w-[42px] h-[40px] bg-contain scale-50 transition-all`}
        ></div>
      </div>
      <div
        className={`flex justify-center items-center border-mygreen_dark/80 ${
          menu === "report" && `border-b-2`
        } w-full py-1 [&>div]:hover:bg-[url('/icons/laporan-active.svg')] hover:cursor-pointer`}
        onClick={() => setMenu("report")}
      >
        <div
          className={`${
            menu === "report"
              ? `bg-[url('/icons/laporan-active.svg')]`
              : `bg-[url('/icons/laporan.svg')]`
          } w-[42px] h-[48px] bg-contain scale-50 transition-all`}
        ></div>
      </div>
    </div>
  );
};
export default DashboardNavBar;

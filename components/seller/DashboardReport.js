import axios from "axios";
import cookieCutter from "cookie-cutter";
import { useEffect, useState } from "react";

const DashboardReport = () => {
  const [report, setReport] = useState();
  const [totalProduct, setTotalProduct] = useState();
  const [menu, setMenu] = useState("all");
  const getReport = async () => {
    console.log("running");
    const token = cookieCutter.get("token");
    const toko_id = cookieCutter.get("toko_id");
    // (async() => {
    //     try {
    //         const {data}
    //     } catch (error) {

    //     }
    // })()
    try {
      const {
        data: { data },
      } = await axios.get(
        `http://malon.my.id:8888/api/seller/v1/shop/data/${toko_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReport(data);
      let total = 0;
      data.product.map((prod) => total++);
      setTotalProduct(total);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const controller = new AbortController();
  useEffect(() => {
    const signal = controller.signal.aborted;
    !signal && getReport();

    return () => controller.abort();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-normal text-slate-700">Laporan Toko Anda</h1>
      {report && (
        <div>
          <div className="py-3 [&>*:hover]:cursor-pointer [&>p:hover]:border-mygreen_dark w-min text-mygreen_dark">
            <p
              onClick={() => setMenu("all")}
              className={`p-1 text-xs font-semilight border-b-2 opacity-60 hover:opacity-100 ${
                menu === "all" ? "border-mygreen_dark opacity-100" : ""
              }`}
            >
              Keseluruhan
            </p>
          </div>
          <div className="py-3">
            <div className="py-3 px-6 text-white rounded-xl bg-mygreen_dark w-36">
              <h1 className="text-md">Total Produk</h1>
              <span className="text-2xl font-bold">
                {totalProduct < 10 ? `0${totalProduct}` : totalProduct}
              </span>
            </div>
            <h1 className="my-3 text-md font-normal text-slate-700">
              Pendapatan Total :{" "}
              <span className="font-bold text-xl text-slate-600 tracking-wide">
                Rp.{report.pendapatan_total}
              </span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardReport;

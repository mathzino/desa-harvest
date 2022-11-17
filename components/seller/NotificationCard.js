import axios from "axios";
import Swal from "sweetalert2";
import cookieCutter from "cookie-cutter";

const NotificationCard = ({ data, onConfirm, onReject, onRedeem }) => {
  const number = data.contact;
  const namePembeli = data.name;
  const alamat = data.alamat;
  const complete = data.status === 2;
  const reject = data.status === 3;
  const confirmed = data.status;
  const date = new Date(data.date);
  const cart = data.cart;

  const calculatePrice = () => {
    let total = 0;
    for (const item of cart) {
      total += parseInt(item.total_price);
    }
    return total;
  };

  const RedeemCode = async () => {
    const CodeInputSwal = Swal.mixin({
      customClass: {
        input: "text-xl",
        inputLabel: "text-md",
      },
    });
    const { value: TransactionCode } = await CodeInputSwal.fire({
      title: "Masukkan Kode",
      input: "text",
      inputLabel: "Kode Transaksi didapat dari pembeli",
      inputPlaceholder: "Kode dari Pembeli",
    });
    if (TransactionCode) {
      const token = cookieCutter.get("token") || null;
      try {
        const { data: dataPost } = await axios.post(
          `http://malon.my.id:8888/api/seller/v1/shop/code/claim`,
          { code: TransactionCode },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(dataPost);
        onRedeem(data._id);
      } catch (error) {
        Swal.fire("", error.response.data.message, "error");
      }
    }
  };

  return (
    <div className="relative">
      <div className="my-6 rounded-xl shadow-lg ring-1 ring-slate-100 shadow-slate-500/10 bg-white flex flex-row justify-start">
        {/* <div className={`h-40 w-28 flex justify-center`}>
          <div
            style={{
              backgroundImage:
                "url('http://malon.my.id:8888/api/seller/file/toko/toko-profile-63614961a8b499f7f93fee54.png')",
            }}
            className="bg-cover h-40 w-28 rounded-xl bg-center"
          />
          <Image
            href="http://malon.my.id:8888/api/seller/file/product/636f6785f62ee69d8894ec1c-1668272499523.jpg"
            alt="transaction"
            // className="h-auto w-28"
            height={100}
            width={100}
          ></Image>
        </div> */}
        <div className="p-6 text-mygreen_dark flex flex-col gap-2 w-full">
          <div>
            <h1 className="text-xs font-light">Waktu Pemesanan</h1>
            <p className="font-bold text-xs">{`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`}</p>
          </div>
          <div>
            <h1 className="text-xs font-light">Kode Transaksi</h1>
            <p className="font-bold text-xs">{data._id}</p>
          </div>
          <div className="flex gap-3 flex-wrap ">
            <div>
              <h1 className="text-xs font-light">Nama</h1>
              <p className="font-bold text-sm">{namePembeli}</p>
            </div>
            <div>
              <h1 className="text-xs font-light">No. WA</h1>
              <p className="font-bold text-sm">{number}</p>
            </div>
          </div>
          <div>
            <h1 className="text-xs font-light">Nama Product</h1>
            {cart.map((prod, id) => (
              <div
                key={id}
                className="flex flex-row flex-wrap justify-between w-full"
              >
                <p className="mb-1 font-bold text-xs">{prod.name}</p>
                <p className="mb-1 font-bold text-xs">
                  x {prod.qt}
                  {prod.product_uom}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-xs font-light">Alamat</h1>
            <p className="font-bold text-xs">{alamat}</p>
          </div>
          <div>
            <h1 className="text-sm font-light">Jumlah Pesanan</h1>
            <p className="mb-3 font-bold text-mygreen_dark text-2xl">
              {`Rp.${calculatePrice()}`}
            </p>
          </div>
        </div>
      </div>

      {confirmed && reject ? (
        <div className="px-2 absolute -top-3 -right-3 flex items-center justify-center shadow-sm bg-red-400 text-white font-semibold rounded-xl text-sm">
          Ditolak
        </div>
      ) : confirmed ? (
        !complete ? (
          <div className="text-white text-center font-semibold text-xs">
            <div
              onClick={RedeemCode}
              className="py-3 px-6 bg-mygreen_dark rounded-xl hover:bg-mygreen_dark/90 hover:cursor-pointer"
            >
              Klik Disini Untuk Memasukkan Kode
            </div>
          </div>
        ) : (
          <div className="px-2 absolute -top-3 -right-3 flex items-center justify-center shadow-sm bg-mygreen_dark text-white font-semibold rounded-xl text-sm">
            Selesai
          </div>
        )
      ) : (
        <div className="flex gap-3 text-white font-semibold text-xs">
          <div
            onClick={() => onConfirm(data._id)}
            className="bg-mygreen_dark px-6 py-3 rounded-xl hover:bg-mygreen_dark/90 hover:cursor-pointer"
          >
            Terima Pesanan
          </div>
          <div
            onClick={() => onReject(data._id)}
            className="bg-red-400 px-6 py-3 rounded-xl hover:bg-red-400/90 hover:cursor-pointer"
          >
            Tolak Pesanan
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationCard;

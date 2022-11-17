import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Logout = () => {
  const router = useRouter();

  const LogOut = async () => {
    const token = cookieCutter.get("token");
    const result = await Swal.fire({
      title: "Apakah Anda ingin Log Out?",
      showDenyButton: true,
      confirmButtonText: "Log Out",
      denyButtonText: `Cancel`,
    });
    if (result.isConfirmed) {
      try {
        await axios.get("http://malon.my.id:8888/api/seller/auth/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
        cookieCutter.set("token", "", { expires: new Date(0) });
        cookieCutter.set("toko_id", "", { expires: new Date(0) });
        Swal.fire("Log Out Berhasil", "", "success");
        router.push("/seller/login");
      } catch (error) {
        console.log(error.response);
      }
    } else if (result.isDenied) {
      Swal.fire("", "Logout dibatalkan", "success");
      router.push("/seller/dashboard/settings");
    }
  };
  const controller = new AbortController();
  useEffect(() => {
    const signal = !controller.signal.aborted;
    signal && LogOut();
    return () => controller.abort();
  }, []);
};
export default Logout;

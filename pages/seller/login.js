import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        password,
      };
      const {
        data: { token, data },
      } = await axios.post(
        "http://malon.my.id:8888/api/seller/auth/signin",
        body
      );
      cookieCutter.set("token", token);
      const toko_id = data?.toko_id || null;
      cookieCutter.set("toko_id", toko_id);
      const result = await Swal.fire("Login Berhasil", "", "success");
      if (result.isConfirmed) {
        if (toko_id !== null) router.push("/seller/dashboard");
        else router.push("/seller/createprofile");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Oops...", error.response.data.message, "error");
    }
  };
  return (
    <div className="min-h-screen flex flex-row justify-center items-center bg-[#ffffff73]">
      <Head>
        <title>Seller Login</title>
      </Head>
      <div className="h-[70vh] md:h-[60vh] w-screen bg-mygreen absolute z-0 top-0"></div>
      <div className="w-screen h-[30vh] md:h-[40vh] bg-auto md:bg-cover bg-no-repeat bg-wave_pattern absolute z-0 top-[70vh] md:top-[60vh]"></div>
      <form
        onSubmit={(e) => handleSignIn(e)}
        className="flex flex-col z-100 absolute w-full sm:w-96 p-12 text-slate-600"
      >
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 mb-6 rounded-3xl text-center focus:outline-none font-medium hover:opacity-95"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 mb-6 rounded-3xl text-center focus:outline-none font-medium hover:opacity-95"
        />
        <hr className="w-100 mb-6 bg-slate-900/10 h-0.5 scale-x-110" />
        <button
          type="submit"
          className="p-3 mb-6 rounded-3xl bg-red-400 font-bold text-white hover:bg-red-500/90 transition-colors"
        >
          Login
        </button>
        <p className="text-slate-600 text-center">
          Belum punya akun?{" "}
          <span>
            <Link
              href="/seller/signup"
              className="underline underline-offset-4 decoration-red-400 hover:text-red-400 transition-colors"
            >
              daftar disini!
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

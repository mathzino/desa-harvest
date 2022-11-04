import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const SignUp = () => {
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username,
        name,
        email,
        password,
        confirmPassword,
      };
      const { data } = await axios.post(
        "http://malon.my.id:8888/api/seller/auth/signup",
        body
      );
      const result = await Swal.fire("Pendaftaran Berhasil", "", "success");
      if (result.isConfirmed) router.push("/seller/login");
    } catch (error) {
      Swal.fire("Oops...", error.response.data.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-row justify-center items-center bg-[#ffffff73]">
      <Head>
        <title>Seller Sign Up</title>
      </Head>
      <div className="h-[70vh] md:h-[60vh] w-screen bg-mygreen absolute z-0 top-0"></div>
      <div className="w-screen h-[30vh] md:h-[40vh] bg-auto md:bg-cover bg-no-repeat bg-wave_pattern absolute z-0 top-[70vh] md:top-[60vh]"></div>

      <form
        onSubmit={(e) => handleSignUp(e)}
        className="flex flex-col absolute w-full sm:w-96 p-12 text-slate-600"
      >
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 mb-6 rounded-3xl text-center focus:outline-none font-medium "
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="p-3 mb-6 rounded-3xl text-center focus:outline-none font-medium"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 mb-6 rounded-3xl text-center focus:outline-none font-medium"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 mb-6 rounded-3xl text-center focus:outline-none font-medium"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 mb-6 rounded-3xl text-center focus:outline-none font-medium"
        />
        <hr className="w-100 mb-6 bg-slate-900/10 h-0.5 scale-x-110" />
        <button
          type="submit"
          className="p-3 mb-6 rounded-3xl bg-red-400 font-bold text-white"
        >
          Sign Up
        </button>
        <p className="text-slate-600 text-center">
          Sudah punya akun?{" "}
          <span>
            <Link
              href="/seller/login"
              className="underline underline-offset-4 decoration-red-400 hover:text-red-400 transition-colors"
            >
              masuk!
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

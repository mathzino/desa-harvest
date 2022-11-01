import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import cookieCutter from "cookie-cutter";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Createprofile = () => {
  const [file, setFile] = useState();
  const [namaToko, setNamaToko] = useState();
  const [idToko, setIdToko] = useState();
  const [alamat, setAlamat] = useState();
  const [height, setHeight] = useState(50);
  const router = useRouter();
  const alamatRef = useRef(null);

  const createProfile = async (e) => {
    e.preventDefault();
    try {
      const body = {
        file,
        name: namaToko,
        toko_id: idToko,
        alamat,
      };
      console.log(body);
      const token = cookieCutter.get("token") || null;
      //   const { data } = await axios.post(
      //     "http://malon.my.id:8888/api/seller/v1/shop/createtoko",
      //     body,
      //     { headers: { Authorization: `Bearer ${token}` } }
      //   );
      const result = await Swal.fire(
        "Berhasil",
        "Profil Toko telah dibuat",
        "success"
      );
      cookieCutter.set("createProfile", "", { expires: new Date(0) });
      if (result.isConfirmed) router.push("/seller/dashboard");
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", error.response.data.message, "error");
    }
  };

  useEffect(() => {
    if (alamat) {
      const element = alamatRef.current;
      setHeight(element.scrollHeight);
    }
  }, [alamat]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-mygreen p-6">
      <Head>
        <title>Create Toko Profile</title>
      </Head>
      <h1 className="text-lg font-bold text-slate-700 drop-shadow-sm mb-6 mr-auto sm:mx-auto">
        Buat Profil Dagangmu
      </h1>
      <Image
        src="/default-profile.svg"
        height={200}
        width={200}
        alt="profile"
      ></Image>
      <form
        onSubmit={(e) => createProfile(e)}
        className="flex flex-col w-full sm:w-96 p-12 text-slate-600"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.value)}
          className="p-3 mb-6 rounded-3xl focus:outline-none font-medium hover:opacity-95"
        />
        <input
          type="text"
          placeholder="Nama Toko"
          onChange={(e) => setNamaToko(e.target.value)}
          className="py-3 px-6 mb-6 rounded-3xl focus:outline-none font-medium hover:opacity-95"
        />
        <input
          type="text"
          placeholder="ID Toko"
          onChange={(e) => setIdToko(e.target.value)}
          className="py-3 px-6 mb-6 rounded-3xl focus:outline-none font-medium hover:opacity-95"
        />
        <textarea
          placeholder="Alamat"
          ref={alamatRef}
          onChange={(e) => setAlamat(e.target.value)}
          style={{ height: `${height}px` }}
          className="py-3 px-6 mb-6 rounded-3xl focus:outline-none overflow-auto font-medium hover:opacity-95 resize-none"
        />
        <button
          type="submit"
          className="p-3 mb-6 rounded-3xl bg-red-400 font-bold text-white hover:bg-red-500/90 transition-colors"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default Createprofile;

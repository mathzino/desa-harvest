import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import cookieCutter from "cookie-cutter";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ProductDetail = () => {
  const [toko_id, setTokoId] = useState();
  const [files, setFiles] = useState();
  const [filename, setFilename] = useState([]);
  const [name, setName] = useState();
  const [qt, setQt] = useState();
  const [price, setPrice] = useState();
  const [product_uom, setProductUom] = useState();
  const [product_category, SetProductCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  // const getTokoId = async () => {
  //   const tokoId = cookieCutter.get("toko_id");
  //   const token = cookieCutter.get("token");
  //   try {
  //     const {
  //       data: { data },
  //     } = await axios.get(
  //       `http://malon.my.id:8888/api/seller/v1/shop/data/${tokoId}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     setTokoId(data._id);
  //     return data._id;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!id) return;
    getDetailProduct();
  }, [id]);

  const getDetailProduct = async () => {
    console.log("id", id);
    try {
      const {
        data: {
          data: { product },
        },
      } = await axios.get(
        `http://malon.my.id:8888/api/seller/v1/product/data/${id}`
      );
      console.log(product);
      product.image.map((img) =>
        setFilename((current) => [...current, img.filename])
      );
      setName(product.name);
      setPrice(product.price);
      setProductUom(product.product_uom);
      SetProductCategory(product.product_category[0]);
      setQt(product.qt);
      setIsLoading(false);
    } catch (error) {
      console.log("sosas");
    }
  };

  const uploadFile = (files) => {
    const formdata = new FormData();
    const arrayFile = Array.from(files);
    arrayFile.map((file) => console.log("file=>", file));
    formdata.append("files", files);
    setFiles(arrayFile);
    console.log(arrayFile);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      files.map((file) => {
        formdata.append("files", file);
      });
      formdata.append("name", name);
      formdata.append("qt", qt);
      formdata.append("price", price);
      formdata.append("product_uom", product_uom);
      formdata.append("product_category", product_category);
      const token = cookieCutter.get("token") || null;
      const { data } = await axios.post(
        `http://malon.my.id:8888/api/seller/v1/product/create-product/${toko_id}`,
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const result = await Swal.fire(
        "Berhasil",
        "Produk Berhasil Ditambahkan",
        "success"
      );
      if (result.isConfirmed) window.location.href = "/seller/dashboard";
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", error.response.data.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-mygreen p-6">
      <Head>
        <title>Add Product</title>
      </Head>
      <h1 className="text-lg font-bold text-slate-700 drop-shadow-sm mb-6 mr-auto sm:mx-auto">
        Tambah Produk
      </h1>
      {files ? (
        <div className="p-3 grid grid-cols-3 gap-3 rounded-xl bg-mygreen_dark/10">
          {files.map((file, id) => (
            <Image
              key={id}
              src={`${URL.createObjectURL(file)}`}
              height={100}
              width={100}
              priority
              className="rounded-xl"
              alt="profile"
            ></Image>
          ))}
        </div>
      ) : filename.length > 0 ? (
        <div className="p-3 grid grid-cols-3 gap-3 rounded-xl bg-mygreen_dark/10">
          {filename.map((name, id) => (
            <Image
              key={id}
              src={`http://malon.my.id:8888/api/seller/file/product/${name}`}
              height={100}
              width={100}
              priority
              className="rounded-xl"
              alt="profile"
            ></Image>
          ))}
        </div>
      ) : (
        <Image
          src="/icons/barang.svg"
          height={100}
          width={100}
          priority
          className="rounded-xl"
          alt="profile"
        ></Image>
      )}

      <form
        onSubmit={(e) => addProduct(e)}
        className="flex flex-col w-full sm:w-96 p-12 text-slate-600"
      >
        <input
          type="file"
          multiple
          accept=".jpg, .png, .webp, .jfif"
          onChange={(e) => uploadFile(e.target.files)}
          className="p-3 mb-6 rounded-3xl focus:outline-none font-medium hover:opacity-95"
        />
        <input
          type="text"
          placeholder="Nama Produk"
          value={!isLoading ? name : ""}
          onChange={(e) => setName(e.target.value)}
          className="py-3 px-6 mb-6 rounded-3xl focus:outline-none font-medium hover:opacity-95"
        />
        <input
          type="number"
          placeholder="Jumlah (Stok)"
          value={!isLoading ? qt : ""}
          onChange={(e) => setQt(e.target.value)}
          className="py-3 px-6 mb-6 rounded-3xl focus:outline-none font-medium hover:opacity-95"
        />
        <div className="flex">
          <input
            type="number"
            placeholder="Harga"
            value={!isLoading ? price : ""}
            onChange={(e) => setPrice(e.target.value)}
            className="py-3 px-6 mb-6 rounded-3xl focus:outline-none overflow-auto font-medium hover:opacity-95 resize-none"
          />
          <div className="border-r-2 border-mygreen_dark mb-9 mt-2 mx-3 rotate-12"></div>
          <select
            onChange={(e) => setProductUom(e.target.value)}
            value={!isLoading ? product_uom : ""}
            className="py-3 px-3 mb-6 bg-white rounded-3xl focus:outline-none overflow-auto font-medium hover:opacity-95 resize-none"
          >
            <option value="">Pilih</option>
            <option value="kg">Kg</option>
            <option value="ons">Ons</option>
            <option value="pcs">Pcs</option>
          </select>
        </div>
        <label htmlFor="category" className="font-medium ml-3 mb-3">
          Kategori
        </label>
        <select
          id="category"
          type="text"
          value={!isLoading ? product_category : ""}
          onChange={(e) => SetProductCategory(e.target.value)}
          className="py-3 px-6 mb-6 bg-white rounded-3xl focus:outline-none font-medium hover:opacity-95"
        >
          <option value="">Pilih Kategori</option>
          <option value="Sayur">Sayur</option>
          <option value="Buah">Buah</option>
          <option value="Sembako">Sembako</option>
          <option value="Minuman">Minuman</option>
          <option value="Makanan">Makanan</option>
          <option value="Obat">Obat</option>
          <option value="Bumbu">Bumbu</option>
          <option value="Perlengkapan">Perlengkapan</option>
        </select>
        <button
          type="submit"
          className="p-3 mb-6 rounded-3xl bg-red-400 font-bold text-white hover:bg-red-500/90 transition-colors"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;

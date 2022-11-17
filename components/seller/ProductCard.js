import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ id, image, name, price, uom, toko, star }) => {
  // image.map((img) => {
  //   console.log(
  //     `http://malon.my.id:8888/api/seller/file/product/${img.filename}`
  //   );
  // });
  return (
    <div className="rounded-xl shadow-lg shadow-slate-500/10 bg-white hover:scale-95 transition-all hover:cursor-pointer w-40">
      <Link href={`/seller/product/${id}`}>
        {image.map((img, id) => (
          <div
            key={id}
            className={`w-full h-40 flex justify-center bg-slate-200 rounded-xl`}
          >
            <Image
              key={id}
              src={`http://malon.my.id:8888/api/seller/file/product/${img.filename}`}
              width={200}
              height={200}
              priority
              className="object-contain h-40 w-auto rounded-xl"
              alt={`${name}${id}`}
            />
          </div>
        ))}
        <div className="p-3">
          <h1 className="mb-1 font-light text-mygreen_dark text-md">{name}</h1>
          <p className="mb-3 font-bold text-mygreen_dark text-xl">
            {price}/{uom}
          </p>
          <div className="mb-3 flex">
            {star === 0 ? (
              <p className="text-xs font-light text-mygreen_dark">
                No Review Yet.
              </p>
            ) : (
              <>
                <p className="text-xs mr-1 text-mygreen_dark">{star}</p>
                {[...Array(Math.round(star)).keys()].map((st, id) => (
                  <Image
                    src="/icons/star.svg"
                    width={15}
                    height={14}
                    key={id}
                    alt={`star-${id}`}
                  ></Image>
                ))}
              </>
            )}
          </div>
          <div className="flex gap-2 items-end">
            <Image
              src="/icons/item-toko.svg"
              width={16}
              height={15}
              alt="item-toko"
            />
            <p className="font-normal text-mygreen_dark text-xs">{toko}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;

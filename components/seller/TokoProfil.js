/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

const TokoProfil = ({ filename, name, isLoading }) => {
  return (
    <div className="flex items-center justify-start px-3 py-6 gap-3 w-full">
      {filename ? (
        <img
          src={`http://malon.my.id:8888/api/seller/file/toko/${filename}`}
          className="rounded-full w-[50px] h-[50px]"
          //   className="rounded-full"
          //   width={50}
          //   height={50}
          alt=""
        ></img>
      ) : (
        <Image
          src={"/default-profile.svg"}
          className="rounded-full"
          width={50}
          height={50}
          alt="toko-pict"
        ></Image>
      )}
      <div>
        <h1 className="text-lg font-bold tracking-wide">
          {!isLoading ? (
            name
          ) : (
            <div className="animate-pulse w-24 h-5 mb-2 relative bg-slate-200 rounded-xl"></div>
          )}
        </h1>
        <div className="flex items-center">
          {!isLoading ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full mx-1"></div>
              <p className="text-xs font-normal tracking-wider">Online</p>
            </>
          ) : (
            <div className="w-16 h-5 mb-2 relative bg-slate-200 rounded-xl"></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TokoProfil;

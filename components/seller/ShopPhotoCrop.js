import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
const ShopPhotoCrop = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  return (
    <div className="">
      <div className="relative w-96 h-96">
        <Cropper
          //   image="http://malon.my.id:8888/api/seller/file/toko/toko-profile-63614961a8b499f7f93fee54.png"
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );
};

export default ShopPhotoCrop;

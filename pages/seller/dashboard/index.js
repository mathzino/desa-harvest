import cookieCutter from "cookie-cutter";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SellerDashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const profileCreated = JSON.parse(
      cookieCutter.get("createProfile") || true
    );
    if (!profileCreated) router.push("/seller/createprofile");
  });
  return (
    <>
      <h1>dashboard</h1>
    </>
  );
};

export default SellerDashboard;

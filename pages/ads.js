import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const ads = () => {
  const router = useRouter();
  const { code } = router.query;
  const { data: session, update } = useSession();
  console.log(code);
  const syncGoogleAds = async () => {
    await update(router.query.code);

    // router.push("/googleAds");
  };
  useEffect(() => {
    if (code) {
      syncGoogleAds();
    }
  }, []);
  return (
    <div>
      <button onClick={() => syncGoogleAds}>test</button>
    </div>
  );
};

export default ads;

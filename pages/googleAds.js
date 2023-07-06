import React from "react";
import styles from "./buttons.module.css"; // Import CSS module for styling
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const googleAds = () => {
  const [data, setData] = useState(null);

  const router = useRouter();
  const { refreshToken } = router.query;
  const encodedRefreshToken = encodeURIComponent(refreshToken);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/adsData?refreshToken=${encodedRefreshToken}`);
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData.data);
    } catch (error) {
      console.error("Error fetching Google Ads data:", error);
      setData(null);
    }
  };

  if (!refreshToken) {
    <h3>There is no refresh token</h3>;
  }
  return (
    <button className={styles.connectorButton} onClick={() => fetchData()}>
      Get Data
    </button>
  );
};

export default googleAds;

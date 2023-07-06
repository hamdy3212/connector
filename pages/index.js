import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./buttons.module.css"; // Import CSS module for styling

export default function IndexPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const connectorList = [
    { name: "Google Ads" },
    { name: "Google Analytics 4" },
    { name: "Google Search Console" },
    { name: "YouTube Analytics" },
  ];
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    router.push("/login");
    return null;
  }
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div>
      <h1>Data Connectors</h1>
      <div className={styles.connectorContainer}>
        <button
          key="Google-Ads"
          className={styles.connectorButton}
          onClick={() => router.push("/api/googleAdsApi")}
        >
          Google Ads
        </button>
      </div>
      <button
        className={styles.connectorButton}
        style={{ marginTop: "10px", background: "red" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

import { signIn, useSession } from "next-auth/react";
import styles from "./buttons.module.css"; // Import CSS module for styling

export default function LoginPage() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error occurred. Please try again later.</p>}
      {status === "unauthenticated" && (
        <>
          <h1>Data Connector Login Page</h1>
          <button
            className={styles.connectorButton}
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000/" })
            }
          >
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}

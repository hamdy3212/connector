import { google } from "googleapis";

export default async function handler(req, res) {
  const authClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/retrieveTokens"
  );
  try {
    // Redirect the user to the Google authorization URL
    const authUrl = authClient.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/adwords"],
      prompt: "consent",
    });
    res.redirect(authUrl);
  } catch (error) {
    console.log(error);
    console.error("Error retrieving access token:", error.message);
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
}

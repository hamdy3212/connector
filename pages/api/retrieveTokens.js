import { google } from "googleapis";

export default async function handler(req, res) {
  const authClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/retrieveTokens"
  );

  try {
    const authCode = req.query.code; // Extract the authorization code from the URL query parameters
    const { tokens } = await authClient.getToken(authCode);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    // Store the tokens securely for future use
    // ...

    // Redirect the user to a success page or perform other actions
    res.redirect(
      `http://localhost:3000/googleAds?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).json({ error: "Failed to retrieve access token" });
  }
}

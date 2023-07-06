const { GoogleAdsApi } = require("google-ads-api");

export default async function handler(req, res) {
  try {
    // Create a Google Ads API client
    const client = new GoogleAdsApi({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      developer_token: process.env.GOOGLE_DEVELOPER_TOKEN,
    });
    const decodedRefreshToken = decodeURIComponent(req.query.refreshToken);

    console.log(decodedRefreshToken);
    console.log(
      "1//03hQcEy1JkO0XCgYIARAAGAMSNwF-L9IrCIIHfFG19F2XEYXPHJwv-1_KobOn1yhSayJhfVGVrs-fq__l9oELo9ntSbuDP96u_D4"
    );
    // Set the login customer ID
    const customer = client.Customer({
      customer_id: "6843527909", // this is retrieved from google ads account
      refresh_token: decodedRefreshToken,
    });

    // Fetch the Google Ads data
    const data = await fetchDataFromGoogleAds(customer);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching Google Ads data:", error);
    res.status(500).json({ error: "Failed to fetch Google Ads data" });
  }
}

async function fetchDataFromGoogleAds(customer) {
  try {
    // Fetch the data from Google Ads API
    const response = await customer.report({
      entity: "campaign",
      attributes: ["campaign.id", "campaign.name"],
    });

    return response.results;
  } catch (error) {
    console.error("Error fetching Google Ads data:", error);
    throw error;
  }
}

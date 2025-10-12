import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY
  ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : undefined;

if (!clientEmail || !privateKey) {
  console.warn("⚠️ Missing Google Analytics credentials.");
}

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7days";

    const startDate = range === "30days" ? "30daysAgo" : "7daysAgo";

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
    });

    const data = response.rows.map((row) => ({
      date: row.dimensionValues[0].value,
      users: row.metricValues[0].value,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching GA data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

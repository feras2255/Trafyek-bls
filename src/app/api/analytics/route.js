import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7days"; // default 7 أيام

    let startDate;
    let endDate = "today";

    if (range === "7days") startDate = "7daysAgo";
    else if (range === "30days") startDate = "30daysAgo";
    else startDate = "7daysAgo";

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA_PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
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

"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function VisitorsChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(7); // المدة الافتراضية: آخر 7 أيام

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/analytics?days=${range}`);
        const json = await res.json();

        if (!json.success || !json.data) {
          console.error("No data from API:", json.error);
          setChartData(null);
          return;
        }

        const labels = json.data.map((item) => {
          let dateStr = item.date;

          // إذا كان التاريخ بصيغة YYYYMMDD (مثال: "20251011")
          if (/^\d{8}$/.test(dateStr)) {
            dateStr = `${dateStr.slice(0, 4)}-${dateStr.slice(
              4,
              6
            )}-${dateStr.slice(6)}`;
          }

          const d = new Date(dateStr);
          return d.toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "short",
            numberingSystem: "latn",
          });
        });

        const values = json.data.map((item) => parseInt(item.users, 10));

        setChartData({
          labels,
          datasets: [
            {
              label: "عدد الزوار",
              data: values,
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [range]);

  if (loading) return <p>جارِ تحميل الإحصائيات...</p>;
  if (!chartData) return <p>تعذر تحميل البيانات.</p>;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          إحصائيات الزوار (آخر {range} أيام)
        </h3>

        {/* select range  */}
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none"
        >
          <option value={7}>آخر 7 أيام</option>
          <option value={30}>آخر 30 يومًا</option>
        </select>
      </div>

      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            title: { display: false },
          },
          scales: {
            x: {
              ticks: {
                textAlign: "center",
              },
            },
          },
        }}
      />
    </div>
  );
}

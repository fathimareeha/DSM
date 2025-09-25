import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PaymentChart() {
  const [chartData, setChartData] = useState(null);
  const [filter, setFilter] = useState("daily"); // ✅ daily or monthly

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/superadmin_app/payment_history/?type=${filter}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log("API Response:", res.data);

    const labels = res.data.map((p) => p.date);

        const totals = res.data.map((p) => p.total);

        setChartData({
          labels,
          datasets: [
            {
              label: filter === "daily" ? "Daily Payments (₹)" : "Monthly Payments (₹)",
              data: totals,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              fill: true,
              tension: 0.3,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        });
      })
      .catch((err) => console.error("API Error:", err));
  }, [filter]); // ✅ reload when filter changes

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Payment Trend</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="h-96">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: filter === "daily" ? "Daily Payment Revenue" : "Monthly Payment Revenue",
              },
            },
            scales: {
              x: { title: { display: true, text: filter === "daily" ? "Date" : "Month" } },
              y: { title: { display: true, text: "Amount (₹)" } },
            },
          }}
        />
      </div>
    </div>
  );
}

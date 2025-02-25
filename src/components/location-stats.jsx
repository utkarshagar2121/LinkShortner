import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function LocationStats({ stats }) {
  const citycount = stats.reduce((access, item) => {
    access[item.city] = access[item.city] + 1 || 1;
    return access;
  }, {});

  const cities = Object.entries(citycount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          width={700}
          height={300}
          data={cities.slice(0, 5)}
          margin={{ top: 20 }}
          accessibilityLayer
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: "green" }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8"></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

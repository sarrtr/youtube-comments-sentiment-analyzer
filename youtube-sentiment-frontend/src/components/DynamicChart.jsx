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
} from "recharts";

const DynamicChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positive" stroke="#59FF00" />
          <Line type="monotone" dataKey="negative" stroke="#FF0090" />
          <Line type="monotone" dataKey="neutral" stroke="#00BFFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;

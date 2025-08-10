import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DynamicChart = ({ data }) => {
  const cumulativeData = useMemo(() => {
    let sumPositive = 0;
    let sumNegative = 0;
    let sumNeutral = 0;

    return data.map((item) => {
      sumPositive += item.positive || 0;
      sumNegative += item.negative || 0;
      sumNeutral += item.neutral || 0;

      return {
        ...item,
        positive: sumPositive,
        negative: sumPositive + sumNegative,
        neutral: sumPositive + sumNegative + sumNeutral,
      };
    });
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={cumulativeData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="positive"
            name="Позитивные"
            stackId="1"
            stroke="#59FF00"
            fill="#59FF00"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="negative"
            name="Негативные"
            stackId="1"
            stroke="#FF0090"
            fill="#FF0090"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="neutral"
            name="Нейтральные"
            stackId="1"
            stroke="#00BFFF"
            fill="#00BFFF"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;

import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#59FF00", "#FF0090", "#00BFFF"];

export default function DonutChart({ percentages }) {
  const data = [
    { name: "Positive", value: parseFloat(percentages.positive) },
    { name: "Negative", value: parseFloat(percentages.negative) },
    { name: "Neutral", value: parseFloat(percentages.neutral) },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            x
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ value }) => ` ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

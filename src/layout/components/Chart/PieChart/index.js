import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartLayout = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Mảng các màu sắc cho các khoản thu

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
    color,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    let total = 0;
    data.map((i) => {
      return (total += i.value);
    });
    const percentage = `${((value / total) * 100).toFixed(2)}%`;

    return (
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? "start" : "middle"}
        
      >
        {percentage}
      </text>
    );
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={400} height={400}>
        {/* Biểu đồ thu */}
        <Pie
          data={data}
          nameKey="name"
          cx="20%"
          cy="40%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" verticalAlign="middle" layout="vertical" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartLayout;

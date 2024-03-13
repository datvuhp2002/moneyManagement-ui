import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dataThu = [
  { name: 'Lương', value: 5000000, color: "#FF5733" },
  { name: 'Bán hàng', value: 2000000, color: "#82ca9d" },
  { name: 'Lãi đầu tư', value: 1000000, color: "#8884d8" }
];
//const COLORS = ['#FF5733', '#82ca9d', '#8884d8']; // Mảng các màu sắc cho các khoản thu

const dataChi = [
  { name: 'Mua sắm', value: 1500000, color: "#FF5733" },
  { name: 'Hóa đơn', value: 800000, color: "#82ca9d" },
  { name: 'Tiền ăn', value: 500000, color: "#8884d8" }
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  index,
  color
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
  const percentage = `${(value * 100).toFixed(2)}%`; // Biến đổi giá trị thành phần trăm
  // return (
  //   <text x={x} y={y} fill={color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
  //     {(value )}
  //   </text>
  // );
};

const MonthPieCharts = ({ data}) =>  {


  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        {/* Biểu đồ thu */}
        <Pie
          data={dataThu}
          dataKey="value"
          nameKey="name"
          cx="20%"
          cy="40%"
          innerRadius={60} // Đường kính của biểu đồ rỗng
          outerRadius={90} // Đường kính của biểu đồ tổng
          fill="#8884d8"
          paddingAngle={5}
          //dataKey="value"
          //outerRadius={100} 
          //fill={COLORS[['#FF5733', '#82ca9d', '#8884d8']]} // Sử dụng màu từ mảng COLORS
          label={renderCustomizedLabel}
        />
        
        <Tooltip />
        <Legend align="center" verticalAlign="middle" layout="vertical" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MonthPieCharts;

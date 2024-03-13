import React from "react";
import styles from "./Home.scss";
import MonthPieCharts from "./MonthPieCharts";
import MonthPieChartss from "./MonthPieChartss";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


const data = [
  { name: 'Thứ 2', thu: 500000, chi: 300000 },
  { name: 'Thứ 3', thu: 700000, chi: 400000 },
  { name: 'Thứ 4', thu: 600000, chi: 350000 },
  { name: 'Thứ 5', thu: 800000, chi: 450000 },
  { name: 'Thứ 6', thu: 900000, chi: 500000 },
  { name: 'Thứ 7', thu: 1000000, chi: 600000 },
  { name: 'Chủ nhật', thu: 1200000, chi: 700000 }
];

// const dataThu = [
//   { name: 'Lương', value: 5000000, color: "#FF5733" },
//   { name: 'Bán hàng', value: 2000000, color: "#82ca9d" },
//   { name: 'Lãi đầu tư', value: 1000000, color: "#8884d8" }
// ];

// const dataChi = [
//   { name: 'Mua sắm', value: 1500000, color: "#FF5733" },
//   { name: 'Hóa đơn', value: 800000, color: "#82ca9d" },
//   { name: 'Tiền ăn', value: 500000, color: "#8884d8" }
// ];

const Home = () => {
  return (
    <div className="home">
    <div className="bank-card-container">
      <div className="bank-card">
        <div className="card-details">
          <h2>Tổng Tiền Ví S</h2>
          <p className="card-number">1.000.000.000 VND</p>
        </div>
      </div>

      <div className="bank-card">
        <div className="card-details">
          <h2>Tổng Tiền Chi</h2>
          <p className="card-number" style={{ color: "#FF5733" }}>1.000.000.000 VND</p>
        </div>
      </div>

      <div className="bank-card">
        <div className="card-details">
          <h2>Tổng Tiền Thu</h2>
          <p className="card-number" style={{ color: "#8884d8" }}>1.000.000.000 VND</p>
        </div>
      </div>
     </div>
     <div className="chart-container">
      {/* Biểu đồ cột */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="thu" fill="rgb(106, 191, 106)" />
          <Bar dataKey="chi" fill="#FF5733" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
    {/* Biểu đồ tròn*/}
       
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Biểu đồ thu tháng</h2>
          <MonthPieCharts />
        </div>
        <div className="col">
        <h2>Biểu đồ Chi tháng</h2>
          <MonthPieChartss />
        </div>
      </div>
    </div>
     
      
      
    </div>
  );
};

export default Home;

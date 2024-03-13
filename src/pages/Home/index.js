import React, { useState } from "react";

import PieChartLayout from "~/layout/components/Chart/PieChart";
import BarChartLayout from "~/layout/components/Chart/BarChart";

const Home = () => {
  // Khai báo các biến và khởi tạo giá trị ban đầu
  const [tongTienViS, setTongTienViS] = useState(1000000000); // Tổng tiền Ví S
  const [tongTienChi, setTongTienChi] = useState(1000000000); // Tổng tiền chi
  const [tongTienThu, setTongTienThu] = useState(1000000000); // Tổng tiền thu
  const data = [
    { name: "Thứ 2", thu: 500000, chi: 300000 },
    { name: "Thứ 3", thu: 700000, chi: 400000 },
    { name: "Thứ 4", thu: 600000, chi: 350000 },
    { name: "Thứ 5", thu: 800000, chi: 450000 },
    { name: "Thứ 6", thu: 900000, chi: 500000 },
    { name: "Thứ 7", thu: 1000000, chi: 600000 },
    { name: "Chủ nhật", thu: 1200000, chi: 700000 },
  ];
  const dataThu = [
    { name: "Lương", value: 5000000 },
    { name: "Bán hàng", value: 2000000 },
    { name: "Lãi đầu tư", value: 1000000 },
    { name: "Lãi", value: 1000000 },
  ];

  const dataChi = [
    { name: "Mua sắm", value: 1500000 },
    { name: "Hóa đơn", value: 800000 },
    { name: "Tiền ăn", value: 500000 },
  ];
  return (
    <div className="home">
      <div className="bank-card-container">
        <div className="bank-card">
          <div className="card-details">
            <h2>Tổng Tiền Ví S</h2>
            <p className="card-number">{tongTienViS.toLocaleString()} VND</p>
          </div>
        </div>

        <div className="bank-card">
          <div className="card-details">
            <h2>Tổng Tiền Chi</h2>
            <p className="card-number" style={{ color: "#FF5733" }}>
              {tongTienChi.toLocaleString()} VND
            </p>
          </div>
        </div>

        <div className="bank-card">
          <div className="card-details">
            <h2>Tổng Tiền Thu</h2>
            <p className="card-number" style={{ color: "#8884d8" }}>
              {tongTienThu.toLocaleString()} VND
            </p>
          </div>
        </div>
      </div>
      <div className="chart-container">
        {/* Biểu đồ cột */}
        <h2 style={{ textAlign: "center" }}>Biểu đồ cột</h2>
        <BarChartLayout data={data} />
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Biểu đồ thu tháng</h2>
            <PieChartLayout data={dataThu} />
          </div>
          <div className="col">
            <h2>Biểu đồ Chi tháng</h2>
            <PieChartLayout data={dataChi} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

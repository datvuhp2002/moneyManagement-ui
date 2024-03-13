import React, { useState } from "react";
import MyDropdown from "./MyDropdow";


const QuanLyGiaoDich = () => {
  return (
    <div className="container">
      <div className="left-side">
        {/* Nội dung của phần bên trái */}
        <h2>Quản Lý Giao Dịch</h2>
        </div>
      <div className="right-side">
        {/* Nội dung của phần bên phải */}
        <h2>Thêm giao dịch</h2>
        <MyDropdown />
        </div>
    </div>
  );
}

export default QuanLyGiaoDich;
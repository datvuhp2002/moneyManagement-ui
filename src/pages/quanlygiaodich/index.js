import React, { useState } from "react";
import MyDropdown from "./MyDropdow";
import styles from "./quanlygiaodich.scss";
import Card from "~/layout/components/Card";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
import BarChartLayout from "~/layout/components/Chart/BarChart";
import Tabb from "./Tab";
const cx = classNames.bind(styles);
const QuanLyGiaoDich = () => {
  const datavi = [
    {
      name: " Tổng Tiền Ví",
      money: "10.000.000",
      currency: "VND",
    },
  ];
  const data = [
    {
      name: "Thu",
      money: "1.100.000",
      currency: "VND",
    },
    {
      name: "Chi",
      money: "10.023.000",
      currency: "VND",
    },
    {
      name: "Viettinbank",
      money: "100000234234111111111",
      currency: "VND",
    },
    {
      name: "Mb",
      money: "100000234234",
      currency: "VND",
    },
  ];
  const databieudocot = [
    { name: "T2", thu: 500000, chi: 300000 },
    { name: "T3", thu: 700000, chi: 400000 },
    { name: "T4", thu: 600000, chi: 350000 },
    { name: "T5", thu: 800000, chi: 450000 },
    { name: "T6", thu: 900000, chi: 500000 },
    { name: "T7", thu: 1000000, chi: 600000 },
    { name: "CN", thu: 1200000, chi: 700000 },
  ];

  return (
    <div className={cx("container")}>
      <div className={cx("left-side")}>
        {/* Nội dung của phần bên trái */}
        <div className="d-flex aligin-items-center w-100 justify-content-center">
          <h1 style={{ marginTop: "1rem" }}>Quản Lý Giao Dịch</h1>
        </div>
        <div className={cx("card", "d-flex")}>
          <SlideCard data={datavi} />
        </div>
        <div className={cx("card", "d-flex")}>
          <SlideCard data={data} />
        </div>
        <div className={cx("chart-container")}>
          <BarChartLayout data={databieudocot} />
        </div>
      </div>

      <div className={cx("right-side")}>
        {/* Nội dung của phần bên phải */}
        <div className={cx("containe")}>
          <div className={cx("top-side")}>
            {/* Nội dung của phần trên */}
            <div className="d-flex">
              <h1 style={{ margin: "1rem" }}>Thêm Giao Dịch</h1>
            </div>
            <MyDropdown />
          </div>

          <div className={cx("bottom-side")}>
            {/* Nội dung của phần dưới */}
            <div className="d-flex">
              <h1 style={{ margin: "1rem" }}>Giao Dịch</h1>
            </div>
            <Tabb />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuanLyGiaoDich;

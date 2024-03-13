import React from "react";
import styles from "./quanlyvi.module.scss";
import Card from "~/layout/components/Card";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
const cx = classNames.bind(styles);
const QuanLyVi = () => {
  const data = [
    {
      name: "Thu",
      money: "100000",
      currency: "VND",
    },
    {
      name: "Chi",
      money: "10023000",
      currency: "VND",
    },
    {
      name: "Viettinbank",
      money: "10000023423411111111111111111111111111111111111111111111",
      currency: "VND",
    },
    {
      name: "Mb",
      money: "100000234234",
      currency: "VND",
    },
  ];
  return (
    <div className={cx("wrapper", "row d-flex")}>
      <div className={cx("manager", "col-4")}>
        <h1>Quản lý ví</h1>
        <div className={cx("card", "d-flex")}>
          <SlideCard data={data} />
        </div>
      </div>
      <div className={cx("add_manager")}>
        <div> Thêm tài khoản</div>
        <div> Giao dịch</div>
      </div>
    </div>
  );
};
export default QuanLyVi;

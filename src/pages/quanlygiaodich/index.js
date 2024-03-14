import React from "react";
import styles from "./quanlygiaodich.module.scss";


import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";

import { Wrapper } from "~/layout/components/Popper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import BarChartLayout from "~/layout/components/Chart/BarChart";

const cx = classNames.bind(styles);
const QuanLyGiaoDich = () => {
  const datatong = [
    {
      name: "Tổng Tiền Ví",
      amount: "100000",
      currency: "VND",
    },
  ]
  const data = [
    {
      name: "Thu",
      amount: "100000",
      currency: "VND",
    },
    {
      name: "Chi",
      amount: "10023000",
      currency: "VND",
    },
    {
      name: "Viettinbank",
      amount: "10000023423411111111111111111111111111111",
      currency: "VND",
    },
    {
      name: "Mb",
      amount: "100000234234",
      currency: "VND",
    },
  ];
  const datacot = [
    { name: "Thứ 2", thu: 500000, chi: 300000 },
    { name: "Thứ 3", thu: 700000, chi: 400000 },
    { name: "Thứ 4", thu: 600000, chi: 350000 },
    { name: "Thứ 5", thu: 800000, chi: 450000 },
    { name: "Thứ 6", thu: 900000, chi: 500000 },
    { name: "Thứ 7", thu: 1000000, chi: 600000 },
    { name: "Chủ nhật", thu: 1200000, chi: 700000 },
  ];
  return (
    <div className={cx("wrapper", "row d-flex ")}>
      <Wrapper manager_information className="col-5 p-3 mt4">
      <div className="d-flex aligin-items-center w-100 justify-content-center">
        <h1>Quản lý giao dịch</h1>
      </div>
        <Wrapper slide_card_money>
          <div className={cx("card", "d-flex mb-4")}>
            <SlideCard data={datatong} />
          </div>
        </Wrapper>
        <Wrapper slide_card_money>
          <div className={cx("card", "d-flex mt-4")}>
            <SlideCard data={data} />
          </div>
        </Wrapper>
        <Wrapper chart_data className="mt-4">
          {/* Biểu đồ cột */}
        <h2 style={{ textAlign: "center" }}>Biểu đồ cột</h2>
        <BarChartLayout data={datacot} />
        </Wrapper>
        {/* <Wrapper>
          <h1>Tiền tiết kiệm</h1>
        </Wrapper> */}
      </Wrapper>
      <div className={cx("add_manager col-7")}> 
        <Wrapper className="py-5 px-4 ">
          <h1>Tài khoản</h1>
          <form>
            <div className="">
              <Input placeholder="Tên tài khoản" />
              <Input placeholder="Số tiền" />
              <Input placeholder="Nội dung" />
            </div>
            <div className="d-flex mt-3 align-items-center justify-content-end">
            <Button login rounded>Cập nhật số dư</Button>
            <Button login rounded>Thêm</Button>
            </div> 
          </form>
        </Wrapper>
        <Wrapper className="py-5 px-4 ">
          <h1> Giao dịch</h1>
          <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Tài khoản</th>
      <th scope="col">Nội dung</th>
      <th scope="col">Ngày</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
      data.map((item,index)=>(
        <tr>
          <th scope="row">{index}</th>
          <td>{item.name}</td>
          <td>{item.amount}{item.currency}</td>
          <td></td>
          <td><Button fix>Sửa</Button></td>
          <td><Button fix>Xóa</Button></td>
      </tr>
      ))
    }
  </tbody>
</table>
        </Wrapper>
      </div>
    </div>
  );

};

export default QuanLyGiaoDich;

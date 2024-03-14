import React from "react";
import styles from "./quanlyvi.module.scss";
import Card from "~/layout/components/Card";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
import PureComponent from "~/layout/components/Chart/LineChart";
import { Wrapper } from "~/layout/components/Popper";
import Input from "~/components/Input";
import Button from "~/components/Button";
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
      amount: "10000023423411111111111111111111111111111",
      currency: "VND",
    },
    {
      name: "Mb",
      amount: "100000234234",
      currency: "VND",
    },
  ];

  const lineChartData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  return (
    <div className={cx("wrapper", "row d-flex ")}>
      <Wrapper manager_information className="col-5 p-3">
        <h1>Quản lý ví</h1>
        <Wrapper slide_card_money>
          <div className={cx("card", "d-flex")}>
            <SlideCard data={data} />
          </div>
        </Wrapper>
        <Wrapper chart_data className="mt-4">
          <PureComponent data={lineChartData} />
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
export default QuanLyVi;

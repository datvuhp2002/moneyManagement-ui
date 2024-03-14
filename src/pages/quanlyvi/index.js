import React from "react";
import styles from "./quanlyvi.module.scss";
import Card from "~/layout/components/Card";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
import LineChartLayout from "~/layout/components/Chart/LineChart";
import { Wrapper } from "~/layout/components/Popper";
import Input from "~/components/Input";
const cx = classNames.bind(styles);
const QuanLyVi = () => {
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
      amount: "10000023423411111111111111111111111111111111111111111111",
      currency: "VND",
    },
    {
      name: "Mb",
      money: "100000234234",
      currency: "VND",
    },
  ];
  const lineChartData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className={cx("wrapper", "row d-flex ")}>
      <Wrapper manager_information className="col-4 p-3">
        <h1>Quản lý ví</h1>
        <Wrapper slide_card_money>
          <div className={cx("card", "d-flex")}>
            <SlideCard data={data} />
          </div>
        </Wrapper>
        <Wrapper chart_data className="mt-4">
          <LineChartLayout data={lineChartData} />
        </Wrapper>
        <Wrapper>
          <h1>Tiền tiết kiệm</h1>
        </Wrapper>
      </Wrapper>

      <div className={cx("add_manager col-8")}>
        <Wrapper className="py-2 px-4">
          <h1>Thêm giao dịch</h1>
          <form>
            <div className="d-flex">
              <label for="cars">Choose a car:</label>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <Input placeholder="Số tài khoản" />
              <Input placeholder="Tên tài khoản" />
            </div>
          </form>
        </Wrapper>
        <div> Giao dịch</div>
      </div>
    </div>
  );
};
export default QuanLyVi;

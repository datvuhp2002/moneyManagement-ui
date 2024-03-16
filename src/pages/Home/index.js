import React, { useEffect, useState } from "react";
import PieChartLayout from "~/layout/components/Chart/PieChart";
import BarChartLayout from "~/layout/components/Chart/BarChart";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
import Input from "~/components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "~/layout/components/Card";
import "react-datepicker/dist/react-datepicker.css";
import {
  faMoneyCheckDollar,
  faDollarSign,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { Wrapper } from "~/layout/components/Popper";
import DatePicker from "react-datepicker";
const cx = classNames.bind(styles);

const Home = () => {
  // Khai báo các biến và khởi tạo giá trị ban đầu
  const [startDate, setStartDate] = useState(new Date());

  const [cardData, setCardData] = useState([]);
  const data = [
    { name: "Thứ 2", thu: 500000, chi: 300000 },
    { name: "Thứ 3", thu: 700000, chi: 400000 },
    { name: "Thứ 4", thu: 600000, chi: 350000 },
    { name: "Thứ 5", thu: 800000, chi: 450000 },
    { name: "Thứ 6", thu: 900000, chi: 500000 },
    { name: "Thứ 7", thu: 1000000, chi: 600000 },
    { name: "Chủ nhật", thu: 1200000, chi: 700000 },
  ];
  const viData = [
    {
      name: "Thu",
      isDefault: true,
      amount: "100000",
      currency: "VND",
    },
    {
      name: "Chi",
      isDefault: true,
      amount: "10023000",
      currency: "VND",
    },
    {
      name: "Viettinbank",
      isDefault: false,
      amount: "11111111111111",
      currency: "VND",
    },
    {
      name: "MB",
      isDefault: false,
      amount: "1100000000",
      currency: "VND",
    },
  ];
  const dataThu = [
    { name: "Lương", value: 5000000 },
    { name: "Bán hàng", value: 2000000 },
    { name: "Lãi đầu tư", value: 1000000 },
    { name: "Lãi", value: 3000000 },
  ];

  const dataChi = [
    { name: "Mua sắm", value: 1500000 },
    { name: "Hóa đơn", value: 800000 },
    { name: "Tiền ăn", value: 500000 },
  ];
  const transactionData = [
    { name: "Mua sắm", amount: 20000, icon: faMoneyCheckDollar, currency: "$" },
    {
      name: "Tiền thưởng",
      amount: 20234000,
      icon: faDollarSign,
      currency: "$",
    },
    {
      name: "Tiền làm thuê",
      amount: 202111000,
      icon: faMoneyCheckDollar,
      currency: "$",
    },
    {
      name: "Tiền đầu tư",
      amount: 120000,
      icon: faMoneyCheckDollar,
      currency: "$",
    },
    {
      name: "Tiền đầu tư",
      amount: 120000,
      icon: faMoneyCheckDollar,
      currency: "$",
    },
    {
      name: "Tiền nhà",
      amount: 120000,
      icon: faMoneyCheckDollar,
      currency: "$",
    },
    {
      name: "Tiền điện",
      amount: 120000,
      icon: faMoneyCheckDollar,
      currency: "$",
    },
    {
      name: "Tiền nước",
      amount: 120000,
      icon: faMoneyCheckDollar,
      currency: "$",
    },
  ];
  useEffect(() => {
    setCardData(viData);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className="mb-5">
        <div className="d-flex row">
          <div className={cx("vitien", "col-3")}>
            <SlideCard data={cardData} />
          </div>
          <div
            className={cx(
              "default_card",
              "d-flex col-7 algin-items-center justify-content-center row"
            )}
          >
            {cardData.map((item, index) => {
              if (item.isDefault) {
                return (
                  <Wrapper className="p-4 mx-auto col-5">
                    <Card data={item} key={index} />
                  </Wrapper>
                );
              }
            })}
          </div>
        </div>
        <div className={cx("", "d-flex row mt-5")}>
          <div className={cx("bieudocot", "col-6")}>
            <h2 style={{ textAlign: "center" }}>Biểu Đồ Tuần</h2>
            <BarChartLayout data={data} />
          </div>

          <div className={cx("thu_chi", "col-5 p-4")}>
            <div className={cx("", "d-flex mb-4 align-items-center")}>
              <DatePicker
                className="me-5"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <Button rounded login type="button" className="w-10">
                Khoản Thu
              </Button>
              <Button rounded login type="button" className="w-10">
                Khoản Chi
              </Button>
            </div>
            <div className={cx("transaction_information")}>
              {transactionData.map((item, index) => (
                <div className={cx("input", "mb-3")}>
                  <Input
                    text
                    transaction_information
                    leftIcon={
                      <FontAwesomeIcon icon={item.icon} className="p-2" />
                    }
                  >
                    <div className="d-flex justify-content-between align-items-center ">
                      <h3 className="">{item.name}</h3>
                      <h3 className="">
                        {item.amount}
                        {item.currency}
                      </h3>
                    </div>
                  </Input>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between m-1">
        <div className={cx("col")}>
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
            Biểu đồ thu tháng
          </h2>
          <PieChartLayout data={dataThu} />
        </div>
        <div className="col">
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
            Biểu đồ Chi tháng
          </h2>
          <PieChartLayout data={dataChi} />
        </div>
      </div>
    </div>
  );
};

export default Home;

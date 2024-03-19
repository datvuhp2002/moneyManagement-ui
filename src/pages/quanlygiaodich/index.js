import React, { useEffect, useState } from "react";
import styles from "./quanlygiaodich.module.scss";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
import { Wrapper } from "~/layout/components/Popper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import BarChartLayout from "~/layout/components/Chart/BarChart";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Card from "~/layout/components/Card";
import MyTable from "./table";

const cx = classNames.bind(styles);
const QuanLyGiaoDich = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [cardData, setCardData] = useState([]);
  const datatong = [
    {
      name: "Tổng Tiền Ví",
      amount: "100000",
      currency: "VND",
    },
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
    {
      name: "NCP",
      isDefault: false,
      amount: "1100000000",
      currency: "VND",
    },
  ];
  useEffect(() => {
    setCardData(viData);
  }, []);
  const datacot = [
    { name: "Thứ 2", thu: 500000, chi: 300000 },
    { name: "Thứ 3", thu: 700000, chi: 400000 },
    { name: "Thứ 4", thu: 600000, chi: 350000 },
    { name: "Thứ 5", thu: 800000, chi: 450000 },
    { name: "Thứ 6", thu: 900000, chi: 500000 },
    { name: "Thứ 7", thu: 1000000, chi: 600000 },
    { name: "Chủ nhật", thu: 1200000, chi: 700000 },
  ];
   const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className={cx("wrapper", "row d-flex")}>
      <Wrapper manager_information className="col-4 p-4 ">
        <div className="d-flex aligin-items-center w-100 justify-content-center">
          <h1>Quản Lý Giao Dịch</h1>
        </div>
        <Wrapper slide_card_money>
          <SlideCard data={datatong} />
        </Wrapper>
        <Wrapper slide_card_money className={cx("mt-4")}>
          <SlideCard data={cardData} />
        </Wrapper>
        <Wrapper chart_data className={("bieudocot", "p-1 mt-5")}>
          {/* Biểu đồ cột */}
          <h2 style={{ textAlign: "center" }}>Biểu đồ cột</h2>
          <BarChartLayout data={datacot} />
        </Wrapper>
      </Wrapper>
      <div className={cx("add_manager col-8")}>
        <Wrapper className="py-4 px-4 ">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="me-auto">Giao Dịch</h1>
            <div className="d-flex">
              <Button login rounded>
                Thu
              </Button>
              <Button login rounded>
                Chi
              </Button>
            </div>
          </div>

          <form>
            <div className="">
              <div className="row">
                <div class="col">
                  <div className={cx("taikhoan")}>
                    <label for="cars">Tài Khoản</label>
                    <FontAwesomeIcon
                      icon={faBuildingColumns}
                      className={cx("ms-2")}
                    />
                    <select name="cars" id="cars">
                      <option value="vietinbank">Vietinbank</option>
                      <option value="tienmat">Tiền mặt</option>
                      <option value="mb">MB</option>
                      <option value="vietcombank">Vietcombank</option>
                    </select>
                  </div>
                  <Input placeholder="Số tiền" />

                  <div
                    className={cx("mt-3")}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày"
                    />
                  </div>
                </div>
                <div class="col">
                  <div className={cx("danhmuc")}>
                    <label for="cars">Danh Mục</label>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className={cx("ms-2")}
                    />
                    <select name="cars" id="cars">
                      <option value="thietyeu">Thiết yếu</option>
                      <option value="sinhhoat">Sinh hoạt</option>
                      <option value="anuong">Ăn uống</option>
                      <option value="huongthu">Hưởng thụ</option>
                    </select>
                  </div>
                  <Input placeholder="Nội dung" />
                  <div
                    className={cx(
                      "d-flex mt-3 align-items-center justify-content-end"
                    )}
                  >
                    <Button login rounded className={cx("")}>
                      Lọc
                    </Button>
                    <Button login rounded>
                      Thêm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Wrapper>
        <Wrapper className="py-4 px-4 mt-4">
          <div
            className={cx("d-flex align-items-center justify-content-between")}
          >
            <h1>Lịch Sử Giao dịch</h1>
            <Button login rounded>
              Xuất Báo Cáo
            </Button>
          </div>
          <div>
            <MyTable />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default QuanLyGiaoDich;

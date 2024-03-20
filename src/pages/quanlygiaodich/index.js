import React, { useEffect, useState } from "react";
import styles from "./quanlygiaodich.module.scss";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
import { Wrapper } from "~/layout/components/Popper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import BarChartLayout from "~/layout/components/Chart/BarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as BTN, Modal } from "react-bootstrap";
import {
  faBuildingColumns,
  faCartShopping,
  faEye,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Card from "~/layout/components/Card";
import dayjs from "dayjs";
import WeekPicker from "~/layout/components/CustomDatePicker";
import * as actions from "~/redux/actions";
import requestApi from "~/utils/api";
import { useDispatch } from "react-redux";
import DataTable from "~/layout/common/DataTable";
import { Link } from "react-router-dom";
import moment from "moment";
import "~/helper/vi";
const cx = classNames.bind(styles);
const QuanLyGiaoDich = () => {
  const dispatch = useDispatch();
  const [numOfPage, setNumOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [searchString, setSearchString] = useState("");
  const [cardData, setCardData] = useState([]);
  const [dateValue, setdateValue] = useState(dayjs().startOf("week"));
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [transactionsData, setTransactionsData] = useState([]);
  const [statisticsData, setStatisticsData] = useState({});
  const [walletData, setWalletData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("single");
  const [deleteItems, setDeleteItems] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refresh, setRefresh] = useState(Date.now());
  const columns = [
    {
      name: "#",
      element: (row) => row.id,
    },
    {
      name: "Loại giao dịch",
      element: (row) => (row.transactionType === "Expense" ? "Chi" : "Thu"),
    },
    {
      name: "Số tiền",
      element: (row) => row.bill,
    },
    {
      name: "Ngày giao dịch",
      element: (row) => moment(row.recordDate).local("vi").format("LL"),
    },
    {
      name: "Ghi chú",
      element: (row) => row.note,
    },
    {
      name: "Actions",
      element: (row) => (
        <>
          <div className="d-flex">
            <Button
              leftIcon={<FontAwesomeIcon icon={faEye} />}
              to={`/chitietgiaodich/${row.id}`}
              className="btn btn-sm btn-warning me-1"
            >
              <i className="fa fa-pencil"></i> Xem
            </Button>
            <Button
              deleteBtn
              leftIcon={<FontAwesomeIcon icon={faTrash} />}
              onClick={() => handleDelete(row.id)}
            >
              Xoá
            </Button>
          </div>
        </>
      ),
    },
  ];
  const handleDateChange = (newValue) => {
    setdateValue(newValue);
    const { startDate, endDate } = getWeekRange(newValue);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const getWeekRange = (date) => {
    const startOfWeek = date.startOf("week");
    const endOfWeek = date.endOf("week");
    const startDate = startOfWeek.format("YYYY-MM-DD");
    const endDate = endOfWeek.format("YYYY-MM-DD");
    return { startDate, endDate };
  };
  const handleDelete = (id) => {
    console.log("single delete", id);
    setShowModal(true);
    setDeleteItems(id);
    setDeleteType("single");
  };
  const handleMultipleDelete = () => {
    console.log("Multiple Delete rows", selectedRows);
    setShowModal(true);
    setDeleteType("multiple");
  };
  const requestDeleteApi = () => {
    if (deleteType === "single") {
      dispatch(actions.controlLoading(true));
      requestApi(`/transaction/${deleteItems}`, "DELETE")
        .then((res) => {
          setShowModal(false);
          setRefresh(Date.now());
          dispatch(actions.controlLoading(false));
        })
        .catch((err) => {
          console.log(err);
          setShowModal(false);
          dispatch(actions.controlLoading(false));
        });
    }
  };
  useEffect(() => {
    console.log(transactionType);
    if (!startDate || !endDate) {
      const currentDay = dayjs();
      const { startDate, endDate } = getWeekRange(currentDay);
      setStartDate(startDate);
      setEndDate(endDate);
    }
    const query = `?search=${searchString}&page=${currentPage}&start_date=${startDate}&end_date=${endDate}&transaction_type=${transactionType}`;
    const promiseStatistics = requestApi(
      `/statistics/calculatorByRange${query}`,
      "GET"
    );
    const promiseStatisticsMonth = requestApi(
      `/statistics/calculatorByMonth?date=${startDate}`,
      "GET"
    );
    const promiseWallet = requestApi(`/wallet/getAll`, "GET");
    dispatch(actions.controlLoading(true));
    Promise.all([promiseStatistics, promiseStatisticsMonth, promiseWallet])
      .then((res) => {
        dispatch(actions.controlLoading(false));
        setNumOfPages(res[0].data.lastPage);
        setStatisticsData(res[0].data);
        setTransactionsData(res[0].data.transaction.data);
        console.log(res[0].data.transaction.data);
        setWalletData(res[2].data.data);
      })
      .catch((err) => {
        dispatch(actions.controlLoading(false));
      });
  }, [startDate, endDate, searchString, transactionType]);
  return (
    <>
      <div className={cx("wrapper", "row d-flex")}>
        <Wrapper manager_information className="col-5 p-4 ">
          <div className="d-flex aligin-items-center w-100 justify-content-center">
            <h1>Quản Lý Giao Dịch</h1>
          </div>
          <Wrapper slide_card_money>
            <SlideCard data={walletData} />
          </Wrapper>
          {/* <Wrapper slide_card_money className={cx("mt-4")}>
          <SlideCard data={cardData} />
        </Wrapper> */}
          <Wrapper chart_data className={("bieudocot", "p-1 mt-5")}>
            {/* Biểu đồ cột */}
            <h2 style={{ textAlign: "center" }}>Biểu đồ cột</h2>
            <BarChartLayout
              data={statisticsData}
              startDate={startDate}
              endDate={endDate}
            />
          </Wrapper>
        </Wrapper>
        <div className={cx("add_manager col-7")}>
          <Wrapper className="py-4 px-4 ">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="me-auto">Giao Dịch</h1>
            </div>

            <div>
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
                        {walletData.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <Input placeholder="Số tiền" />
                    <div className={cx("mt-3")}>
                      <WeekPicker
                        value={dateValue}
                        onChange={handleDateChange}
                        className="w-100"
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
                        <option value="Expense">Chi</option>
                        <option value="Revenue">Thu</option>
                      </select>
                    </div>
                    <Input placeholder="Nội dung" />
                    <div
                      className={cx(
                        "d-flex mt-3 align-items-center justify-content-end"
                      )}
                    >
                      <select name="cars" id="cars">
                        <option value="thietyeu">Thiết yếu</option>
                        <option value="sinhhoat">Sinh hoạt</option>
                        <option value="anuong">Ăn uống</option>
                        <option value="huongthu">Hưởng thụ</option>
                      </select>
                    </div>
                    <div className="d-flex mt-3 align-items-center justify-content-end">
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
            </div>
          </Wrapper>
          <Wrapper className="py-4 px-4 mt-4">
            <div
              className={cx(
                "d-flex align-items-center justify-content-between mb-4"
              )}
            >
              <h1>Lịch Sử Giao dịch</h1>
              <Button login rounded>
                Xuất Báo Cáo
              </Button>
            </div>
            <DataTable
              name={`Lịch sử giao dịch theo tháng  ${moment(startDate)
                .local("vi")
                .format("LL")} đến ngày
              ${moment(endDate).local("vi").format("LL")}`}
              columns={columns}
              data={transactionsData}
              onChangeTransactionType={setTransactionType}
              onKeySearch={(keywords) => {
                setSearchString(keywords);
              }}
              onSelectedRows={(rows) => {
                console.log("Selected rows in user list component", rows);
                setSelectedRows(rows);
              }}
            />
          </Wrapper>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <BTN onClick={() => setShowModal(false)}>Close</BTN>
          <BTN className="btn-danger" onClick={requestDeleteApi}>
            Delete
          </BTN>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuanLyGiaoDich;

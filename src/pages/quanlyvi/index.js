import React, { useState, useEffect } from "react";
import styles from "./quanlyvi.module.scss";
import LineChartLayout from "~/layout/components/Chart/LineChart";
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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
const QuanLyVi = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
              to={`/quanlygiaodich/chitietgiaodich/${row.id}`}
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

  const onSubmit = async (data) => {
    try {
      await requestApi(`/wallet`, "POST", data)
        .then((res) => {
          toast.success("Thêm ví thành công", {
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log("Err", err);
          if (typeof err.response !== "undefined") {
            if (err.response.status !== 201) {
              toast.error(err.response.data.message, {
                position: "top-right",
              });
            }
          } else {
            toast.error("Server is down, please try again", {
              position: "top-right",
            });
          }
        });
    } catch (err) {}
  };
  useEffect(() => {
    console.log(transactionType);
    if (!startDate || !endDate) {
      const currentDay = dayjs();
      const { startDate, endDate } = getWeekRange(currentDay);
      setStartDate(startDate);
      setEndDate(endDate);
    }
    const query = `?start_date=${startDate}&end_date=${endDate}&transaction_type=${transactionType}`;
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
    <div className={cx("wrapper", "row d-flex ")}>
      <Wrapper manager_information className="col-5 p-3">
        <h1>Quản lý ví</h1>
        <Wrapper slide_card_money>
          <div className={cx("card", "d-flex")}>
            <SlideCard data={walletData} />
          </div>
        </Wrapper>
        <Wrapper chart_data className="mt-4">
          <LineChartLayout
            data={statisticsData}
            startDate={startDate}
            endDate={endDate}
          />
        </Wrapper>
      </Wrapper>
      <div className={cx("add_manager col-7")}>
        <Wrapper className="py-5 px-4 ">
          <h1>Ví người dùng</h1>
          <div>
            <div className="">
              <Input
                register={{
                  ...register(`name`, {
                    required: `Tên ví không được để trống`,
                  }),
                }}
                placeholder="Tên Ví"
              />
              {errors.name && (
                <p style={{ color: "red" }}>Tên Ví không được để trống</p>
              )}
              <Input
                register={{
                  ...register(`amount`, {
                    required: `Số tiền không được để trống`,
                  }),
                }}
                placeholder="Số tiền"
              />
              {errors.amount && (
                <p style={{ color: "red" }}>Số tiền không hợp lệ</p>
              )}
            </div>
            <div className="d-flex mt-5 align-items-center justify-content-between">
              <WeekPicker
                value={dateValue}
                onChange={handleDateChange}
                className="w-50"
              />
              <div className="d-flex">
                <Button login rounded>
                  Cập nhật số dư
                </Button>
                <Button login rounded onClick={handleSubmit(onSubmit)}>
                  Thêm
                </Button>
              </div>
            </div>
          </div>
        </Wrapper>
        <Wrapper className="py-5 px-4 ">
          <h1> Giao dịch</h1>
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
  );
};
export default QuanLyVi;

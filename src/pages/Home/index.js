import React, { useEffect, useState } from "react";
import PieChartLayout from "~/layout/components/Chart/PieChart";
import BarChartLayout from "~/layout/components/Chart/BarChart";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import SlideCard from "~/layout/components/SlideCard";
import Input from "~/components/Input";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "~/layout/components/Card";
import { capitalize } from "lodash";
import * as logo from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button";
import { Wrapper } from "~/layout/components/Popper";
import WeekPicker from "~/layout/components/CustomDatePicker";
import { useDispatch } from "react-redux";
import requestApi from "~/utils/api";
import * as actions from "~/redux/actions";
import moment from "moment";
const cx = classNames.bind(styles);
const Home = () => {
  const dispatch = useDispatch();
  const [statisticsData, setStatisticsData] = useState({});
  const [transactionsData, setTransactionsData] = useState([]);
  const [statisticsRangeMonthData, setStatisticsRangeMonthData] = useState({});
  const [transactionMonthData, setTransactionRangeMonthData] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [dateValue, setdateValue] = useState(dayjs().startOf("week"));
  const [walletData, setWalletData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
  const onChangeOption = (e) => {
    const target = e.target;
    setTransactionType(target.value);
  };
  useEffect(() => {
    if (!startDate || !endDate) {
      const currentDay = dayjs();
      const { startDate, endDate } = getWeekRange(currentDay);
      setStartDate(startDate);
      setEndDate(endDate);
    }
    const query = `?transaction_type=${transactionType}&start_date=${startDate}&end_date=${endDate}`;
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
        setStatisticsData(res[0].data);
        setTransactionsData(res[0].data.transaction.data);
        setStatisticsRangeMonthData(res[1].data);
        setTransactionRangeMonthData(res[1].data.transaction.data);
        setWalletData(res[2].data.data);
      })
      .catch((err) => {
        dispatch(actions.controlLoading(false));
      });
  }, [startDate, endDate, transactionType]);
  return (
    <div className={cx("wrapper")}>
      <div className="mb-5">
        <div className="d-flex row">
          <div className={cx("vitien", "col-5")}>
            <SlideCard data={walletData} />
          </div>
          <div
            className={cx(
              "default_card",
              "d-flex col-7 algin-items-center justify-content-center row"
            )}
          >
            <Wrapper className="p-4 col-5" money>
              <Card name="Thu" currency="VND" amount={statisticsData.revenue} />
            </Wrapper>
            <Wrapper className="p-4 col-5" money>
              <Card name="Chi" currency="VND" amount={statisticsData.expense} />
            </Wrapper>
          </div>
        </div>
        <div className={cx("", "d-flex row mt-5")}>
          <div className={cx("bieudocot", "col-6")}>
            <h2 style={{ textAlign: "center" }}>Biểu đồ cột</h2>
            {statisticsData && (
              <BarChartLayout
                data={statisticsData}
                startDate={startDate}
                endDate={endDate}
              />
            )}
          </div>
          <Wrapper className="col-6 p-4">
            <div className={cx("thu_chi", "d-flex mb-4 align-items-center")}>
              <div className="w-100 me-4">
                <WeekPicker
                  value={dateValue}
                  onChange={handleDateChange}
                  className="w-100"
                />
              </div>
              <select className="" onChange={onChangeOption}>
                <option value="" defaultChecked>
                  Tất cả
                </option>
                <option value="Chi">Chi</option>
                <option value="Thu">Thu</option>
              </select>
            </div>
            <div className={cx("transaction_information")}>
              {transactionsData.map((item, index) => (
                <Input
                  text
                  transaction_information
                  leftIcon={
                    <FontAwesomeIcon icon={item.icon || "$"} className="p-2" />
                  }
                >
                  <div className="d-flex justify-content-between align-items-center ">
                    <h2 className="">{capitalize(item.note)}</h2>
                    <h2 className="">
                      {item.bill}
                      {item.currency ? item.currency : "VND"}
                    </h2>
                  </div>
                </Input>
              ))}
            </div>
          </Wrapper>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-">
        <div className="w-100 mt-2">
          <h2 className="my-2">
            Biểu đồ thu tháng {moment(startDate).month() + 1}
          </h2>
          <PieChartLayout
            data={statisticsRangeMonthData}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

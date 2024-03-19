import React, { useEffect } from "react";
import styles from "./card.module.scss";
import classNames from "classnames/bind";
import { Wrapper } from "../Popper";

const cx = classNames.bind(styles);

const Card = ({ data, name, currency, amount }) => {
  useEffect(() => {
    console.log(data);
  }, []);

  // Sử dụng giá trị từ prop hoặc từ data nếu prop không tồn tại
  const cardName = data ? data.name : name;
  const cardCurrency = data ? data.currency : currency;
  const cardAmount = data ? data.amount : amount;

  return (
    <div className={cx("wrapper")}>
      <div className="d-flex aligin-items-center w-100 justify-content-center">
        <h1>Ví tài khoản</h1>
      </div>
      <div className="d-flex flex-column aligin-items-center w-100 justify-content-center">
        {/* Sử dụng giá trị đã xác định ở trên */}
        <h2>{cardName}</h2>
        <div className="d-flex aligin-datas-center row">
          {/* Sử dụng giá trị đã xác định ở trên */}
          <h1 className="col-8 overflow-x-auto text-nowrap">{cardAmount}</h1>
          <h1 className="col-4">{cardCurrency}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;

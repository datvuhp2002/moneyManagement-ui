import React, { useEffect } from "react";
import styles from "./card.module.scss";
import classNames from "classnames/bind";
import { Wrapper } from "../Popper";
const cx = classNames.bind(styles);
const Card = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className="d-flex aligin-items-center w-100 justify-content-center">
        <h1>Ví tài khoản</h1>
      </div>
      <div className="d-flex flex-column aligin-items-center w-100 justify-content-center">
        <h2>{data.name}</h2>
        <div className="d-flex aligin-datas-center  row ">
          <h1 className="col-8 overflow-x-auto text-nowrap">{data.money}</h1>{" "}
          <h1 className="col-4">{data.currency}</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;

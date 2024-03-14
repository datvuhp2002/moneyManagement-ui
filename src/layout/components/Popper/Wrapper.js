import React from "react";
import styles from "./Popper.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Wrapper({
  slide_card_money,
  chart_data,
  manager_information,
  children,
  className,
}) {
  const classes = cx("wrapper", {
    slide_card_money,
    chart_data,
    manager_information,
    [className]: className,
  });
  return <div className={classes}>{children}</div>;
}

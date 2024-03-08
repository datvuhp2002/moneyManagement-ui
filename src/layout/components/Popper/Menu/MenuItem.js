import React from "react";
import styles from "./MenuItem.module.scss";
import Image from "~/components/Image";
import classNames from "classnames/bind";
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const MenuItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <li className={cx("wrapper")}>
      <Button
        menuItem
        to={data.path}
        className={cx("item")}
        onClick={data.onClick}
      >
        {data.title}
      </Button>
    </li>
  );
};
export default MenuItem;

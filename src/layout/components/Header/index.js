import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { privateRoutes } from "~/Route/Routes";
import Button from "~/components/Button";
//import { AiTwotoneHome } from "react-icons/ai";


const cx = classNames.bind(styles);
const Header = () => {
  return (
    <div className={cx("wrapper","d-flex align-item-center justify-content-between container")}>
      <div className={cx('logo')}>
        logo
      </div>
      <div className={cx('navbar',"d-flex ")}>
        {privateRoutes.map((item,index)=>(
          <Button header key={index} to={item.path}>
            {item.name}
          </Button>
        ))}
      </div>
      <div className={cx('user')}>
        user
      </div>
    </div>
  );
};
export default Header;

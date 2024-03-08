import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { privateRoutes } from "~/Route/Routes";
import Button from "~/components/Button";
import Logo from "~/public/assets/images/logoApp.png";
import Image from "~/components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import {
  faMagnifyingGlass,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Wrapper as PopperWrapper } from "../Popper";
import Menu from "../Popper/Menu";
import { onHandleLogout } from "~/helper";
const cx = classNames.bind(styles);
const Header = () => {
  const Menu_item = [
    [{ title: "Trang cá nhân", path: "/trangcanhan" }],
    [
      { title: "cài đặt", path: "/caidat" },
      { title: "đăng xuất", onClick: onHandleLogout },
    ],
  ];
  return (
    <div
      className={cx(
        "wrapper",
        "d-flex align-items-center justify-content-between container"
      )}
    >
      <Button header className={cx("logo")} to="/">
        <Image logo src={Logo}></Image>
      </Button>
      <div className={cx("navbar", "d-flex ")}>
        {privateRoutes.map((item, index) =>
          item.name ? (
            <Button header key={index} toActive={item.path}>
              {item.name}
            </Button>
          ) : (
            ""
          )
        )}
      </div>

      <Menu items={Menu_item}>
        <button
          className={cx(
            "user",
            "d-flex justify-content-end align-items-center"
          )}
        >
          user
        </button>
      </Menu>
    </div>
  );
};
export default Header;

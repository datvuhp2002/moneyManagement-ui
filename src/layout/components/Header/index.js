import React from "react";
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
import requestApi from "~/utils/api";
import Menu from "../Popper/Menu";
import { onHandleLogout } from "~/helper";
const cx = classNames.bind(styles);
const Header = ({ isPublicRoute = false }) => {
  const Menu_item = [
    [{ title: "Trang cá nhân", path: "/trangcanhan" }],
    [
      { title: "cài đặt", path: "/caidat" },
      { title: "đăng xuất", onClick: onHandleLogout, path: "/login" },
    ],
  ];

  return (
    <div className={cx("wrapper")}>
      {isPublicRoute ? (
        <div
          className={cx(
            "content",
            "d-flex align-items-center justify-content-between container h-100"
          )}
        >
          <Button header className={cx("logo", "h-100")} to="/">
            <Image logo src={Logo}></Image>
          </Button>
        </div>
      ) : (
        <div
          className={cx(
            "content",
            "d-flex align-items-center justify-content-between container h-100"
          )}
        >
          <Button header className={cx("logo", "h-100")} to="/">
            <Image logo src={Logo}></Image>
          </Button>
          <div className={cx("navbar", "d-flex")}>
            {privateRoutes.map((item, index) =>
              item.name ? (
                <Button navLink header key={index} toActive={item.path}>
                  {item.name}
                </Button>
              ) : (
                ""
              )
            )}
          </div>
          <Menu items={Menu_item} />
        </div>
      )}
    </div>
  );
};
export default Header;

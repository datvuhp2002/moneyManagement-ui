import React from "react";
import Tippy from "@tippyjs/react";
import Image from "~/components/Image";
import { Wrapper as PopperWrapper } from "..";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import classNames from "classnames/bind";
import defaultAvatar from "~/public/assets/images/defaultUser.jpg";
import Button from "~/components/Button";
const cx = classNames.bind(styles);
const Menu = ({ children, items }) => {
  const render_Items = () => {
    return items?.map((group, index) => (
      <ul key={index} className={cx("item")}>
        {group.map((item, idx) => (
          <MenuItem key={idx} data={item} />
        ))}
      </ul>
    ));
  };
  return (
    <Tippy
      interactive
      placement={"bottom-end"}
      render={(attrs) => (
        <div className={cx("content")} tabIndex={-1} {...attrs}>
          <PopperWrapper>{render_Items()}</PopperWrapper>
        </div>
      )}
    >
      <div className={cx("user", "h-100 d-flex align-items-center")}>
        <Image avatar rounded src={defaultAvatar} alt="" />
      </div>
    </Tippy>
  );
};

export default Menu;

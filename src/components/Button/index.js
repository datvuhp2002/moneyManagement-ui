import React from "react";
import classNames from "classnames/bind";
import { Link, NavLink } from "react-router-dom";
import Styles from "./Button.module.scss";
const cx = classNames.bind(Styles);
export default function Button({
  to,
  toActive,
  href,
  ref,
  fix,
  play = false,
  primary = false,
  outline = false,
  disabled = false,
  rounded = false,
  text = false,
  small = false,
  large = false,
  active = false,
  login,
  navLink,
  avatar,
  menuItem,
  header,
  isActive,
  btnContinue,
  register,
  forgetPassword,
  className,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...passProps
}) {
  let Comp = "button";
  let _props = { onClick, ...passProps };
  // remove event listener when btn is disable
  if (disabled) {
    Object.keys(_props).forEach((key) => {
      if (key.startsWith("on") && _props[key] === "function") {
        delete _props[key];
      }
    });
  }
  if (to) {
    _props.to = to;
    Comp = Link;
  } else if (toActive) {
    _props.to = toActive;
    Comp = NavLink;
  } else if (href) {
    _props.href = href;
    Comp = "a";
  }
  const classes = cx("wrapper", {
    active,
    login,
    fix,
    header,
    navLink,
    btnContinue,
    forgetPassword,
    register,
    outline,
    menuItem,
    disabled,
    rounded,
    avatar,
    text,
    [className]: className,
    small,
    large,
  });
  return (
    <Comp className={classes} {..._props}>
      {leftIcon && <span className={cx("Icon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {rightIcon && <span className={cx("Icon")}>{rightIcon}</span>}
    </Comp>
  );
}

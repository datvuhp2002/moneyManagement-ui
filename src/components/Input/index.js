import React from "react";
import classNames from "classnames/bind";
import Styles from "./Input.module.scss";
const cx = classNames.bind(Styles);

export default function Input({
  text = false,
  value,
  login = false,
  className,
  leftIcon,
  rightIcon,
  onChange,
  ...passProps
}) {
  let Comp = "input";
  let _props = { onChange, ...passProps };
  if (text) {
    Comp = "h1";
  }
  const classes = cx("wrapper", {
    login,
    [className]: className,
  });
  return (
    <div className={classes}>
      {leftIcon && <span className={cx("Icon")}>{leftIcon}</span>}
      {Comp === "input" ? (
        <Comp {..._props} />
      ) : (
        <Comp {..._props}>{value}</Comp>
      )}
      {rightIcon && <span className={cx("Icon")}>{rightIcon}</span>}
    </div>
  );
}
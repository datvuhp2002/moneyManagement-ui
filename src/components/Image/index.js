import { useState } from "react";
import images from "../../public/assets/images";
import styles from "./Image.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Image = ({
  src,
  alt,
  logo,
  className,
  avatar,
  avatar_profile,
  fallback: customFallback = images.default,
  w100,
  rounded,
  w50,
  minw30,
  h100,
  h50,
  minh30,
  ...props
}) => {
  const [fallback, setFallback] = useState("");
  const Loading = () => <div className={cx("lds-dual-ring")}></div>;
  function handleError() {
    setFallback(customFallback);
  }
  const classes = cx("wrapper", {
    logo,
    w100,
    w50,
    avatar,
    rounded,
    minw30,
    h100,
    avatar_profile,
    h50,
    minh30,
    [className]: className,
  });
  return (
    <img
      className={cx("wrapper", classes)}
      src={fallback || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
};

export default Image;

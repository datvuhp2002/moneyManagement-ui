import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import requestApi from "~/utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as actions from "~/redux/actions";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const onChange = (e) => {
    let target = e.target;
    setLoginData({
      ...loginData,
      [target.name]: target.value,
    });
  };
  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (loginData.email === "" || loginData.email === undefined) {
      errors.email = "Please enter email";
    } else {
      let valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        loginData.email
      );
      if (!valid) {
        errors.email = "Email is not valid";
      }
    }
    if (loginData.password === "" || loginData.password === undefined) {
      errors.password = "Please enter password";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      isValid = false;
    } else {
      setFormErrors({});
    }
    return isValid;
  };
  const onSubmit = () => {
    let valid = validateForm();
    if (valid) {
      dispatch(actions.controlLoading(true));
      console.log("Request api");
      requestApi("/auth/login", "POST", loginData)
        .then((res) => {
          console.log(res);
          dispatch(actions.controlLoading(false));
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          navigate("/");
        })
        .catch((err) => {
          console.log("Err", err);
          dispatch(actions.controlLoading(false));
          if (typeof err.response !== "undefined") {
            if (err.response.status !== 201) {
              toast.error(err.response.data.message, {
                position: "top-right",
              });
            }
          } else {
            toast.error("Server is down, please try again", {
              position: "top-right",
            });
          }
        });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container", "d-flex row")}>
        <div className="background col"></div>
        <div className={cx("form-login", "col-md-6")}>
          <div className={cx("welcome")}>
            <h1>Xin Chào</h1>
            <h5 className={cx("", "text-opacity")}>
              Hãy đăng nhập để quản lý chi tiêu của bạn
            </h5>
          </div>
          <form>
            <div className={cx("input-field")}>
              <FontAwesomeIcon icon={faEnvelope} />
              <Input
                leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                name="email"
                type="email"
                className="login form-control "
                placeholder="Email"
                onChange={onChange}
              />
              {formErrors.email && (
                <p style={{ color: "red" }}>{formErrors.email}</p>
              )}
              <Input
                name="password"
                type="password"
                className="login form-control "
                placeholder="Password"
                onChange={onChange}
              />
              {formErrors.password && (
                <p style={{ color: "red" }}>{formErrors.password}</p>
              )}
            </div>
            <div className={cx("forget-password")}>
              <Button>Quên mật khẩu</Button>
            </div>
            <div
              className={
                (cx("action"),
                "d-flex align-items-center justify-content-between my-4 row")
              }
            >
              <Button
                rounded
                register
                type="button"
                className="col-md-5"
                to="/register"
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import requestApi from "~/utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as actions from "~/redux/actions";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import ForgetPassword from "~/layout/components/Modal/ForgetPassword";
const cx = classNames.bind(styles);
const Login = () => {
  const [modalShow, setModalShow] = useState(false);
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
        <div className={cx("form-login", "col-md-4")}>
          <div className={cx("welcome", "mb-4")}>
            <h1>Xin Chào</h1>
            <h5 className={cx("", "text-opacity")}>
              Hãy đăng nhập để quản lý chi tiêu của bạn
            </h5>
          </div>
          <form>
            <Input
              leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
              name="email"
              type="email"
              login
              placeholder="Email"
              onChange={onChange}
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
            <Input
              password
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
            />
            {formErrors.password && (
              <p style={{ color: "red" }}>{formErrors.password}</p>
            )}
            <div
              className={cx(
                "forget-password",
                "d-flex align-items-center justify-content-end"
              )}
            >
              <Button
                forgetPassword
                variant="primary"
                type="button"
                onClick={() => setModalShow(true)}
              >
                Quên mật khẩu?
              </Button>
              <ForgetPassword
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
            <div
              className={
                (cx("action"),
                "d-flex align-items-center justify-content-between my-4 row")
              }
            >
              <Button
                rounded
                login
                type="button"
                onClick={onSubmit}
                className="col-md-5 col-sm-1 w-sm-100"
              >
                Đăng nhập
              </Button>
              <Button
                rounded
                register
                type="button"
                className="col-md-5 col-sm-1 w-sm-100"
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

export default Login;

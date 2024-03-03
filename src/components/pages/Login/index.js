import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import requestApi from "~/utils/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as actions from "~/redux/actions";
const cx = classNames.bind(styles);
const Login = () => {
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
    console.log(loginData);
    let valid = validateForm();
    dispatch(actions.controlLoading(true));
    if (valid) {
      //request api login
      console.log("Request api");
      requestApi("/auth/login", "POST", loginData)
        .then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
          dispatch(actions.controlLoading(false));

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
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
    <div className={cx("wrapper", "")}>
      <div className={cx("background-img")}></div>
      <div className={cx("form-login")}>
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={onChange}
            />
            {formErrors.password && (
              <p style={{ color: "red" }}>{formErrors.password}</p>
            )}
          </div>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

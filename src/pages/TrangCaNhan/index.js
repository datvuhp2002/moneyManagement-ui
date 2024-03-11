import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import requestApi from "~/utils/api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./TrangCaNhan.module.scss";
import Image from "~/components/Image";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Logo from "~/public/assets/images/logoApp.png";
import { Wrapper } from "~/layout/components/Popper";

const cx = classNames.bind(styles);
const TrangCaNhan = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [showForm, setShowForm] = useState(true);
  const onChange = (e) => {
    let target = e.target;
    setUserData({
      ...userData,
      [target.name]: target.value,
    });
  };
  const renderInput = () => {
    return Object.keys(userData).map((key, index) => {
      {
        if (key !== "avatar") {
          return (
            <div
              key={index}
              className={cx("user-information", "d-flex align-items-center")}
            >
              <h2 className="mx-3 w-25">{key}</h2>
              <Input
                text={showForm}
                value={userData[key]}
                data={userData[key]}
                name={key}
                className="w-50"
                onChange={onChange}
              />
            </div>
          );
        }
      }
    });
  };
  const onHandleShowForm = () => {
    setShowForm(!showForm);
  };
  const onSubmit = () => {
    requestApi("/users", "PUT", userData)
      .then((res) => {
        toast.success("cập nhật thành công", {
          position: "top-right",
        });
        setShowForm(!showForm);
      })
      .catch((err) => {
        console.log("Err", err);
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
  };
  useEffect(() => {
    try {
      requestApi("/users/profile", "GET")
        .then((res) => {
          setUserData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className={cx("wrapper", "d-flex row")}>
      <div
        className={cx("avatar", "col-3 d-flex flex-column align-items-center")}
      >
        <h1>Ảnh đại diện</h1>
        <Image
          w-100
          logo
          src={userData.avatar}
          className={cx("avatar-img", "w-100")}
        ></Image>
      </div>
      <div className={cx("information", "col-9 w-75")}>
        <div>{renderInput()}</div>
        <div className="d-flex align-items-center justify-content-end w-100">
          {showForm ? (
            <Button register rounded onClick={onHandleShowForm}>
              Chỉnh sửa
            </Button>
          ) : (
            <div className="d-flex">
              <Button register rounded onClick={onSubmit}>
                Lưu
              </Button>
              <Button register rounded onClick={onHandleShowForm}>
                huỷ
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrangCaNhan;

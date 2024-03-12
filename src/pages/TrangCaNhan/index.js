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
import { useDispatch } from "react-redux";
import * as actions from "~/redux/actions";
import { useForm } from "react-hook-form";
const cx = classNames.bind(styles);
const TrangCaNhan = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState({});
  const [showForm, setShowForm] = useState(true);
  const renderInput = () => {
    return Object.keys(userData).map((key, index) => {
      {
        if (key !== "avatar")
          return (
            <div
              key={index}
              className={cx("user-information", "d-flex align-items-center")}
            >
              <h2 className="mx-3 w-25">{key}</h2>
              <Input
                register={{
                  ...register(`${key}`, {
                    required: `${key} không được để trống`,
                  }),
                }}
                key={index}
                text={showForm}
                data={userData[key]}
                name={key}
                keyName={key}
                className="w-50"
                placeholder={key}
              />
              {errors[`${key}`] && (
                <p style={{ color: "red" }}>{errors[`${key}`].message}</p>
              )}
            </div>
          );
      }
    });
  };
  const onHandleShowForm = () => {
    Object.keys(userData).map((key) => {
      setValue(key, userData[key]);
    });
    setShowForm(!showForm);
  };
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setUserData({
          ...userData,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
      try {
        let formData = new FormData();
        formData.append("avatar", file);
        dispath(actions.controlLoading(true));
        requestApi(
          "/users/upload-avatar",
          "PUT",
          formData,
          "json",
          "multipart/form-data"
        ).then((res) => {
          console.log(res);
          dispath(actions.controlLoading(false));
          toast.success("Thay avatar thành công", {
            position: "top-right",
          });
        });
      } catch (err) {
        console.log(err);
        toast.success(err.response.data.message, {
          position: "top-right",
        });
        dispath(actions.controlLoading(false));
      }
    }
  };
  const onSubmit = async (data) => {
    try {
      const { avatar, ...userDataWithoutAvatar } = data;
      await requestApi("/users", "PUT", userDataWithoutAvatar)
        .then((res) => {
          toast.success("cập nhật thành công", {
            position: "top-right",
          });
          setUserData(data);
          console.log(userData);
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
    } catch (err) {}
  };
  useEffect(() => {
    try {
      requestApi("/users/profile", "GET")
        .then((res) => {
          setUserData({
            ...res.data,
            avatar: `${process.env.REACT_APP_API_URL}/${res.data.avatar}`,
          });
          Object.keys(res.data).map((key) => {
            setValue(key, res.data[key]);
          });
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
        <div>
          <label htmlFor="file" className="btn-file btn-sm btn btn-primary">
            Thay đổi avatar
          </label>
          <Input
            file
            id="file"
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
        </div>
      </div>
      <div className={cx("information", "col-9 w-75")}>
        <form>{renderInput()}</form>
        <div className="d-flex align-items-center justify-content-end w-100">
          {showForm ? (
            <Button register rounded onClick={onHandleShowForm}>
              Chỉnh sửa
            </Button>
          ) : (
            <div className="d-flex">
              <Button register rounded onClick={handleSubmit(onSubmit)}>
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

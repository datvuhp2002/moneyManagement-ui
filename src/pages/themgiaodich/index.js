import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import requestApi from "~/utils/api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ThemGiaoDich.module.scss";
import Image from "~/components/Image";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { useDispatch } from "react-redux";
import * as actions from "~/redux/actions";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const cx = classNames.bind(styles);
const ThemGiaoDich = () => {
  const params = useParams();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [transactionData, setTransactionData] = useState({});
  const [allCategoryGroupData, setAllCategoryGroupData] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [allCurrencyData, setAllCurrencyData] = useState([]);
  const [allWalletData, setAllWalletData] = useState([]);
  const [paymentImage, setPaymentImage] = useState("");
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setPaymentImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    data.recordDate = dayjs(data.recordDate).format();
    let formData = new FormData();
    for (let key in data) {
      if (key === "paymentImage") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    dispath(actions.controlLoading(true));
    try {
      await requestApi(
        `/transaction`,
        "POST",
        formData,
        "json",
        "multipart/form-data"
      )
        .then((res) => {
          dispath(actions.controlLoading(false));
          toast.success("cập nhật thành công", {
            position: "top-right",
          });
          setTransactionData(data);
        })
        .catch((err) => {
          dispath(actions.controlLoading(false));
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
    const promiseGetAllWallet = requestApi(`/wallet/getAll`, "GET");
    const promiseGetAllCategoriesGroup = requestApi(`/category-group/getAll`);
    const promiseGetAllCategory = requestApi(`/category/getAll`);
    const promiseGetAllCurrency = requestApi(`/currency`);
    try {
      Promise.all([
        promiseGetAllCurrency,
        promiseGetAllCategory,
        promiseGetAllCategoriesGroup,
        promiseGetAllWallet,
      ])
        .then((res) => {
          setAllCurrencyData(res[0].data.data);
          console.log(res[0].data.data);
          setAllCategoryData(res[1].data.data);
          setAllCategoryGroupData(res[2].data.data);
          setAllWalletData(res[3].data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={cx("wrapper", "d-flex row ")}>
      <div
        className={cx(
          "avatar",
          "col-md-6 d-flex flex-column align-items-center mb-5"
        )}
      >
        <h1>Ảnh giao dịch</h1>
        {paymentImage && (
          <Image
            avatar_profile
            rounded
            src={paymentImage}
            className={cx("avatar-img")}
          />
        )}
        <div className="d-flex align-items-center w-100 justify-content-center mt-4">
          <label htmlFor="file" className={cx("btn_changeAvatar")}>
            Thay đổi ảnh giao dịch
          </label>
          <Input
            file
            id="file"
            type="file"
            accept="image/*"
            register={{
              ...register("paymentImage", {
                onChange: onImageChange,
              }),
            }}
          />
        </div>
      </div>
      <div className="col-md-6 h-100 d-flex flex-column">
        <h1>Thông tin giao dịch</h1>
        <form className={cx("information")}>
          <div className="d-flex w-100 justify-content-between">
            <div className={cx("user-information", "w-50")}>
              <div>
                <h3 className="mt-3">Hoá đơn</h3>
                <div>
                  <Input
                    register={{
                      ...register(`bill`, {
                        required: `Hoá đơn không được để trống`,
                      }),
                    }}
                    data={transactionData.bill}
                    keyName="bill"
                    placeholder="hoá đơn"
                  />
                  {errors[`bill`] && (
                    <p style={{ color: "red" }}>{errors[`bill`].message}</p>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <h3 className="w-40">Ghi chú</h3>
                <div>
                  <Input
                    register={{
                      ...register(`note`, {
                        required: `Hoá đơn không được để trống`,
                      }),
                    }}
                    data={transactionData.note}
                    keyName="note"
                    placeholder="ghi chú"
                  />
                  {errors[`note`] && (
                    <p style={{ color: "red" }}>{errors[`note`].message}</p>
                  )}
                </div>
              </div>
              <div className=" mt-3">
                <h3 className="w-40">Ngày giao dịch</h3>
                <div>
                  <Input
                    type="date"
                    register={{
                      ...register(`recordDate`, {
                        required: `Ngày giao dịch không được để trống`,
                      }),
                    }}
                    data={dayjs(transactionData.recordDate).format(
                      "MM/DD/YYYY"
                    )}
                    keyName="recordDate"
                    placeholder="ngày giao dịch"
                  />
                  {errors[`recordDate`] && (
                    <p style={{ color: "red" }}>
                      {errors[`recordDate`].message}
                    </p>
                  )}
                </div>
              </div>
              <div className=" mt-3">
                <h3 className="w-40">Tiền tệ</h3>
                <div>
                  <select {...register(`currency_id`)}>
                    {allCurrencyData.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className={cx("user-information", "w-50 ms-4")}>
              <div className="mt-3">
                <h3 className="w-40">Loại giao dịch</h3>
                <div>
                  <select {...register(`transactionType`)}>
                    <option value="Revenue">Thu</option>
                    <option value="Expense">Chi</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="w-40">Thể loại giao dịch</h3>
                <div>
                  <select {...register(`categoriesGroup_id`)}>
                    {allCategoryGroupData.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.note}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="w-40">Thể loại</h3>
                <div>
                  <select {...register(`category_id`)}>
                    {allCategoryData.map((item, index) => {
                      return (
                        <option value={item.categoriesGroup_id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="w-40">Ví</h3>
                <div>
                  <select {...register(`wallet_id`)}>
                    {allWalletData.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-3">
            <div className="d-flex">
              <Button register rounded onClick={handleSubmit(onSubmit)}>
                Thêm
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemGiaoDich;

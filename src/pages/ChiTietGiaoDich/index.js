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
import { useParams } from "react-router-dom";
import { startCase } from "lodash";
const cx = classNames.bind(styles);
const ChiTietGiaoDich = () => {
  const params = useParams();
  const dispath = useDispatch();
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [transactionData, setTransactionData] = useState({});
  const [categoryGroupData, setCategoryGroupData] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [currencyData, setCurrencyData] = useState({});
  const [walletData, setWalletData] = useState({});
  const [allCategoryGroupData, setAllCategoryGroupData] = useState({});
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [allCurrencyData, setAllCurrencyData] = useState([]);
  const [allWalletData, setAllWalletData] = useState([]);
  const onHandleShowForm = () => {
    Object.keys(transactionData).map((key) => {
      setValue(key, transactionData[key]);
    });
    setShowForm(!showForm);
  };
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setTransactionData({
          ...transactionData,
          paymentImage: reader.result,
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
      // Submit data to update transaction
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const promiseGetAllWallet = requestApi(`/wallet/getAll`, "GET");
    const promiseGetAllCategoriesGroup = requestApi(`/category-group/getAll`);
    const promiseGetAllCategory = requestApi(`/category/getAll`);
    const promiseGetAllCurrency = requestApi(`/currency/getAll`);
    const promiseDetailTransactionData = requestApi(
      `/transaction/detail/${params.id}`,
      "GET"
    );
    try {
      Promise.all([
        promiseDetailTransactionData,
        promiseGetAllCurrency,
        promiseGetAllCategory,
        promiseGetAllCategoriesGroup,
        promiseGetAllWallet,
      ])
        .then((res) => {
          setTransactionData({
            ...res[0].data,
            paymentImage: `${process.env.REACT_APP_API_URL}/${res[0].data.paymentImage}`,
          });
          setCategoryGroupData(res[0].data.ownership_categoriesGroup);
          setCategoryData(res[0].data.ownership_category);
          setCurrencyData(res[0].data.ownership_currency);
          setWalletData(res[0].data.ownership_wallet);
          setAllCurrencyData(res[1].data.data);
          setAllCategoryData(res[2].data.data);
          setAllCategoryGroupData(res[3].data.data);
          setAllWalletData(res[4].data.data);
          console.log(res[0].data);
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
        <Image
          avatar_profile
          rounded
          src={transactionData.paymentImage}
          className={cx("avatar-img")}
        ></Image>
        <div className="d-flex align-items-center w-100 justify-content-center mt-4">
          <label htmlFor="file" className={cx("btn_changeAvatar")}>
            Thay đổi ảnh giao dịch
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
      <div className="col-md-6 h-100 d-flex flex-column">
        <h1>Thông tin giao dịch</h1>
        <form className={cx("information")}>
          <div className="d-flex w-100">
            <div className={cx("user-information", "w-50")}>
              <div>
                <h3 className="mx-3 w-40">Hoá đơn</h3>
                <div>
                  <Input
                    register={{
                      ...register(`bill`, {
                        required: `Hoá đơn không được để trống`,
                      }),
                    }}
                    text={showForm}
                    data={transactionData.bill}
                    name="bill"
                    keyName="bill"
                    placeholder="hoá đơn"
                  />
                  {errors[`bill`] && (
                    <p style={{ color: "red" }}>{errors[`bill`].message}</p>
                  )}
                </div>
              </div>
              <div className="">
                <h3 className="mx-3 w-40">Ghi chú</h3>
                <div>
                  <Input
                    register={{
                      ...register(`note`, {
                        required: `Hoá đơn không được để trống`,
                      }),
                    }}
                    text={showForm}
                    data={transactionData.note}
                    name="note"
                    keyName="note"
                    placeholder="ghi chú"
                  />
                  {errors[`note`] && (
                    <p style={{ color: "red" }}>{errors[`note`].message}</p>
                  )}
                </div>
              </div>
              <div className=" mt-3">
                <h3 className="mx-3 w-40">Ngày giao dịch</h3>
                <div>
                  <Input
                    type="date"
                    register={{
                      ...register(`recordDate`, {
                        required: `Ngày giao dịch không được để trống`,
                      }),
                    }}
                    text={showForm}
                    data={transactionData.recordDate}
                    name="recordDate"
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
            </div>
            <div className={cx("user-information", "w-50")}>
              <div className="">
                <h3 className="mx-3 w-40">Loại giao dịch</h3>
                <div>
                  <select
                    register={{
                      ...register(`category_groups`, {
                        required: `Hoá đơn không được để trống`,
                      }),
                    }}
                  >
                    {allCategoryGroupData.map((item, index) => {
                      return (
                        <option value={item.id} key={item.key}>
                          {item.note}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className=" ">
                <h3 className="mx-3 w-40">Thể loại</h3>
                <div>
                  <select
                    register={{
                      ...register(`category`, {
                        required: `Hoá đơn không được để trống`,
                      }),
                    }}
                  >
                    {allCategoryData.map((item, index) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="">
                <h3 className="mx-3 w-40">Ví</h3>
                <div>
                  <select
                    register={{
                      ...register(`wallet`, {
                        required: `Ví không được để trống`,
                      }),
                    }}
                  >
                    {allWalletData.map((item, index) => {
                      return <option value={item.id}>{item.name}</option>;
                    })}
                  </select>
                  {errors[`wallet`] && (
                    <p style={{ color: "red" }}>{errors[`wallet`].message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-3">
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
        </form>
      </div>
    </div>
  );
};

export default ChiTietGiaoDich;

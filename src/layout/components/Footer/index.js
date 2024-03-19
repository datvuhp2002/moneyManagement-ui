import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStore,
  faWallet,
  faGear,
  faSquarePhone,
} from "@fortawesome/free-solid-svg-icons";
import { FaFacebookSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Logo from "~/public/assets/images/logoApp.png";
import Image from "~/components/Image";
import styles from "./footer.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer", "text-light py-4 px-5")}>
      <Container>
        <Row className={cx("")}>
          <Col>
            <div className={cx("content", "d-flex align-items-center")}>
              <Button
                header
                className={cx("logo", "flex-shrink-0 me-2")}
                to="/"
              >
                <Image logo src={Logo}></Image>
              </Button>
              <h2 className="">Quản Lý Thu Chi Cá Nhân</h2>
            </div>
            <ul className={cx("thongtin", "")}>
              <li>Điện thoại: 0326.456.789</li>
              <li>Email: nhom4@gmail.com</li>
              <li>Địa chỉ: Số 609, Trương Định, </li>
              <li>Hoàng Mai, Hà Nội</li>
            </ul>
          </Col>
          <Col className={cx("sanpham", "mt-4")}>
            <h2 className={cx("mb-4")}>Sản Phẩm</h2>
            <ul>
              <li>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} /> Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/quanlygiaodich">
                  <FontAwesomeIcon icon={faStore} /> Quản Lý Giao Dịch
                </Link>
              </li>
              <li>
                <Link to="/quanlyvi">
                  <FontAwesomeIcon icon={faWallet} /> Quản Lý Ví
                </Link>
              </li>
              <li>
                <Link to="/thietlapungdung">
                  <FontAwesomeIcon icon={faGear} /> Thiết Lập Ứng Dụng
                </Link>
              </li>
            </ul>
          </Col>
          <Col className={cx("danhgia", "mt-4")}>
            <h2 className={cx("mb-4")}>Đánh Giá</h2>
            <ul>
              <li>
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ Quản Lý Thu Chi Cá
                nhân để quản lý tài chính của nhóm tôi. Mọi góp ý xin vui lòng
                gửi email tới địa chỉ Nhom4@gmail.com để được giải đáp cũng như
                hỗ trợ khách hàng trong thời gian sớm nhất.
              </li>
            </ul>
            <div
              className={cx("icon-buttons", "d-flex", "justify-content-end")}
            >
              <Button
                variant="primary"
                className={cx("facebook", "me-2")}
                onClick={() => {
                  window.open("https://www.facebook.com/yourpage", "_blank");
                }}
              >
                <FaFacebookSquare size="20" />
              </Button>
              <Button
                variant="primary"
                className={cx("gmail", "me-2")}
                onClick={() => {
                  window.location.href = "/Error";
                }}
              >
                <BiLogoGmail size="20" />
              </Button>
              <Button
                variant="primary"
                className={cx("phone")}
                onClick={() => {
                  window.location.href = "tel:0326456789";
                }}
              >
                <FontAwesomeIcon icon={faSquarePhone} size="2x" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Dropdown } from "react-bootstrap";
import styles from "./MyDropdown.scss";

function MyDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Tài khoản
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-menu">
        {/* Sử dụng lớp CSS để tùy chỉnh dropdown menu */}
        <Dropdown.Item href="#/action-1">Tiền mặt</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Ví tài khoản</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Vietinbank</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyDropdown;

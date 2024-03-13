import React from "react";
import { Dropdown } from "react-bootstrap";


function MyDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Tài khoản
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Tiền mặt</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Ví tài khoản</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Vietinbank</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyDropdown;

import { text } from "@fortawesome/fontawesome-svg-core";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "~/components/Button";

function Tabb() {
    const textColor = "black";
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      style={{ color: "textColor" }}
      justify
    >
      <Tab eventKey="Ngay" title="Ngày"></Tab>
      <Tab eventKey="Taikhoan" title="Tài Khoản"></Tab>
      <Tab eventKey="Phanloai" title="Phân Loại"></Tab>
      <Tab eventKey="Noidung" title="Nội dung"></Tab>
      <Tab eventKey="Sotien" title="Số Tiền"></Tab>
      <Tab eventKey="actions" title="Sửa và Xóa">
        <div>
          {/* Nút Sửa */}
          <Button variant="primary">Sửa</Button>
          {/* Nút Xóa */}
          <Button variant="danger">Xóa</Button>
        </div>
      </Tab>
    </Tabs>
  );
}

export default Tabb;

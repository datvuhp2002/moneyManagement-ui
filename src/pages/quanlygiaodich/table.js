import React, { useState } from "react";

const MyTable = () => {
  const [data, setData] = useState([
    // Dữ liệu bảng
    {
      id: 1,
      name: "Vietinbank",
      category: "Mua sắm",
      amount: "1000000",
      content: "Mua thực phẩm",
      date: "06-03-2024",
    },
    {
      id: 2,
      name: "Vietcombank",
      category: "Đi lại",
      amount: "500000",
      content: "Mua vé xe buýt",
      date: "05-03-2024",
    },
    {
      id: 3,
      name: "MB",
      category: "Giải trí",
      amount: "800000",
      content: "Đi xem phim",
      date: "04-03-2024",
    },
    {
      id: 4,
      name: "Vietcombank",
      category: "Ăn uống",
      amount: "200000",
      content: "Ăn cơm tại nhà hàng",
      date: "03-03-2024",
    },
    {
      id: 5,
      name: "Vietinbank",
      category: "Du lịch",
      amount: "1500000",
      content: "Đặt phòng khách sạn",
      date: "02-03-2024",
    },
    {
      id: 6,
      name: "MB",
      category: "Mua sắm",
      amount: "1200000",
      content: "Mua quần áo",
      date: "01-03-2024",
    },
    {
      id: 7,
      name: "Vietcombank",
      category: "Đi lại",
      amount: "300000",
      content: "Đi taxi",
      date: "28-02-2024",
    },
    {
      id: 8,
      name: "Vietinbank",
      category: "Ăn uống",
      amount: "250000",
      content: "Ăn cơm phở",
      date: "25-02-2024",
    },
    {
      id: 9,
      name: "MB",
      category: "Giải trí",
      amount: "600000",
      content: "Đi karaoke",
      date: "22-02-2024",
    },
    {
      id: 10,
      name: "Vietinbank",
      category: "Du lịch",
      amount: "1800000",
      content: "Đặt tour du lịch",
      date: "19-02-2024",
    },
    {
      id: 11,
      name: "Vietcombank",
      category: "Mua sắm",
      amount: "900000",
      content: "Mua quần áo",
      date: "15-02-2024",
    },
    {
      id: 12,
      name: "Vietinbank",
      category: "Đi lại",
      amount: "400000",
      content: "Đi xe buýt",
      date: "12-02-2024",
    },
    {
      id: 13,
      name: "MB",
      category: "Ăn uống",
      amount: "300000",
      content: "Ăn cơm",
      date: "10-02-2024",
    },
    {
      id: 14,
      name: "Vietcombank",
      category: "Giải trí",
      amount: "700000",
      content: "Xem phim",
      date: "07-02-2024",
    },
    {
      id: 15,
      name: "Vietinbank",
      category: "Mua sắm",
      amount: "1500000",
      content: "Mua điện thoại",
      date: "04-02-2024",
    },
    {
      id: 16,
      name: "MB",
      category: "Đi lại",
      amount: "200000",
      content: "Đi xe bus",
      date: "01-02-2024",
    },
    {
      id: 17,
      name: "Vietcombank",
      category: "Ăn uống",
      amount: "350000",
      content: "Ăn sushi",
      date: "29-01-2024",
    },
    {
      id: 18,
      name: "Vietinbank",
      category: "Giải trí",
      amount: "800000",
      content: "Xem pháo hoa",
      date: "26-01-2024",
    },
    {
      id: 19,
      name: "MB",
      category: "Du lịch",
      amount: "1200000",
      content: "Đi chơi biển",
      date: "23-01-2024",
    },
    {
      id: 20,
      name: "Vietcombank",
      category: "Mua sắm",
      amount: "600000",
      content: "Mua sách",
      date: "20-01-2024",
    },
  ]);

  const [editData, setEditData] = useState(null); // Dữ liệu đang được chỉnh sửa
  const [editId, setEditId] = useState(null); // ID của dòng đang được chỉnh sửa

  const handleEdit = (id) => {
    const rowData = data.find((item) => item.id === id);
    setEditData({ ...rowData });
    setEditId(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    setData(data.map((item) => (item.id === editId ? { ...editData } : item)));
    setEditId(null);
    setEditData(null);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData(null);
  };
  
  // xóa dữ liệu
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div style={{ maxHeight: "38rem", overflowY: "scroll" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tài khoản</th>
            <th scope="col">Danh mục</th>
            <th scope="col">Số Tiền</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Ngày</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                  />
                ) : (
                  item.category
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="amount"
                    value={editData.amount}
                    onChange={handleChange}
                  />
                ) : (
                  item.amount
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="content"
                    value={editData.content}
                    onChange={handleChange}
                  />
                ) : (
                  item.content
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    name="date"
                    value={editData.date}
                    onChange={handleChange}
                  />
                ) : (
                  item.date
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <>
                    <button
                      className="btn btn-success mx-1"
                      onClick={handleSave}
                    >
                      Lưu
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={handleCancel}
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary mx-1"
                      onClick={() => handleEdit(item.id)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleDelete(item.id)}
                    >
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTable;

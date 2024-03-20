import React, { useEffect, useState } from "react";
import LiveSearch from "./LiveSearch";
const DataTable = (props) => {
  const {
    name,
    columns,
    data,
    onChangeTransactionType,
    onKeySearch,
    onSelectedRows,
  } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    console.log("selected rows=> ", selectedRows);
    onSelectedRows(selectedRows);
  }, [selectedRows]);
  const renderHeader = () => {
    return columns?.map((col, index) => <th key={index}>{col.name}</th>);
  };
  const renderData = () => {
    return data.map((item, index) => (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedRows.includes(String(item.id)) ? true : false}
            className="form-check-input"
            value={item.id}
            onChange={onClickCheckbox}
          />
        </td>
        {columns.map((col, ind) => (
          <td key={ind}>{col.element(item)}</td>
        ))}
      </tr>
    ));
  };
  const onClickCheckbox = (e) => {
    let checked = e.target.checked;
    let value = e.target.value;
    if (checked) {
      if (!selectedRows.includes(value)) {
        setSelectedRows([...selectedRows, value]);
      } else {
        let index = selectedRows.indexOf(value);
        const temp = [...selectedRows];
        temp.splice(index, 1);
        setSelectedRows(temp);
      }
    }
  };
  const onSelectAll = (e) => {
    let checked = e.target.checked;
    if (checked) {
      const temp = data.map((elements) => String(elements.id));
      setSelectedRows(temp);
    } else {
      setSelectedRows([]);
    }
  };
  const onChangeOption = (e) => {
    const target = e.target;
    onChangeTransactionType(target.value);
  };
  return (
    <div className="card mb-4 ">
      <div className="card-header">
        <i className="fas fa-table me-1">{name}</i>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label className="d-inline-flex w-25">
              <select
                name="example_length"
                className="form-select form-select-sm ms-1 me-1 "
                onChange={onChangeOption}
              >
                <option value="" defaultChecked>
                  Tất cả
                </option>
                <option value="Chi">Chi</option>
                <option value="Thu">Thu</option>
              </select>
            </label>
          </div>
          <div className="col-sm-12 col-md-6 d-flex">
            <LiveSearch onKeySearch={onKeySearch} />
          </div>
        </div>
        <table
          className="table table-striped table-bordered"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <td>
                <input
                  checked={
                    selectedRows.length === data.length && data.length > 0
                      ? true
                      : false
                  }
                  type="checkbox"
                  className="form-check-input"
                  onChange={onSelectAll}
                />
              </td>
              {renderHeader()}
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

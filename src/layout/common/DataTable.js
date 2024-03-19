import React, { useEffect, useState } from "react";
import LiveSearch from "./LiveSearch";
const DataTable = (props) => {
  const {
    name,
    columns,
    data,
    currentPage,
    numOfPage,
    onPageChange,
    onChangeItemsPerPage,
    onKeySearch,
    onSelectedRows,
  } = props;
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log("selected rows=> ", selectedRows);
    onSelectedRows(selectedRows);
  }, [selectedRows]);
  //
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
  // handle checked checkboxes
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
  // Pagination
  const renderPagination = () => {
    const pagination = [];
    const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
    pagination.push(
      <li key="prev" className={prevPage ? "page-item" : "page-item disabled"}>
        <button className="page-link" onClick={() => onPageChange(prevPage)}>
          &laquo;
        </button>
      </li>
    );
    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <li
          key={i}
          className={currentPage === i ? "page-item active" : "page-item"}
        >
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    pagination.push(
      <li key="next" className={nextPage ? "page-item" : "page-item disabled"}>
        <button className="page-link" onClick={() => onPageChange(nextPage)}>
          &raquo;
        </button>
      </li>
    );
    return pagination;
  };
  // On change items per page
  const onChangeOption = (e) => {
    const target = e.target;
    console.log(target.value);
    onChangeItemsPerPage(target.value);
  };
  return (
    <div className="card mb-4 ">
      <div className="card-header">
        <i className="fas fa-table me-1">{name}</i>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label className="d-inline-flex">
              Show
              <select
                name="example_length"
                className="form-select form-select-sm ms-1 me-1"
                onChange={onChangeOption}
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              entries
            </label>
          </div>
          <div className="col-sm-12 col-md-6">
            <label className="d-line-flex float-end">
              Search:
              <LiveSearch onKeySearch={onKeySearch} />
            </label>
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
        {numOfPage > 1 && (
          <nav aria-label="Page navigation example ">
            <ul className="pagination d-flex justify-content-center">
              {renderPagination()}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default DataTable;

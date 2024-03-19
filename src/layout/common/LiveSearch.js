import React, { useEffect, useState } from "react";
const LiveSearch = ({ onKeySearch }) => {
  const [keyword, setKeyword] = useState("");
  //   debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {}, 500);
    onKeySearch(keyword);
    return () => clearTimeout(delayDebounce);
  }, [keyword]);
  const onTyping = (e) => {
    const target = e.target;
    console.log(target.value);
    setKeyword(target.value);
  };
  return (
    <input
      type="search"
      onChange={onTyping}
      className="form-control form-control-sm ms-1"
      placeholder="Email or Name"
    />
  );
};

export default LiveSearch;

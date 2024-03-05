import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const onHandleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };
  return (
    <div>
      Home <a onClick={onHandleLogout}>logout</a>
    </div>
  );
};

export default Home;

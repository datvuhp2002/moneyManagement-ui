import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

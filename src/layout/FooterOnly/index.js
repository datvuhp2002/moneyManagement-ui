import React from "react";
import Footer from "../components/Footer";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div className="container">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

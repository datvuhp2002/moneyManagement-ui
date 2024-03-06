import React from "react";
import Footer from "../components/Footer";
const FooterOnly = ({ children }) => {
  return (
    <div>
      <div className="container">
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default FooterOnly;

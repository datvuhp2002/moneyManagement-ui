import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header isPublicRoute={false} />
      <div className="body my-5">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

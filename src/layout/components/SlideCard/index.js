import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "../Card";
import "./slider.scss";
import { Wrapper } from "../Popper";
const SlideCard = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Wrapper>
      <Carousel data-bs-theme="dark" interval={null}>
        {data.map((item, index) => (
          <Carousel.Item key={index}>
            <Card data={item} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Wrapper>
  );
};

export default SlideCard;

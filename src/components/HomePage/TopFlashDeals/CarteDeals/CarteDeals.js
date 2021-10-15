/* eslint-disable react/prop-types */
import React from "react";
import "./CarteDeals.css";

const CarteDeals = (props) => {
  return (
    <div style={{ paddingBottom: "10px" }}>
      {props.children}
      <img
        className={`${props.hovered === true ? "carteDealImage" : ""}`}
        style={{
          width: "170px",
        }}
        src={props.url}
      />
    </div>
  );
};

export default CarteDeals;

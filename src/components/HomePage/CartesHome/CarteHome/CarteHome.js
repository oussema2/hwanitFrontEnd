/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./CarteHome.css";
const CarteHome = (props) => {
  const [show, setshow] = useState(false);
  const [indexHovered, setindexHovered] = useState(null);
  const displayContent = (index) => {
    setshow(true);
    setindexHovered(index);
  };
  const hideContent = () => {
    setshow(false);
  };

  return (
    <div
      onMouseOver={() => displayContent(props.index)}
      onMouseOut={hideContent}
      style={{
        padding: `10px`,
      }}
    >
      <div
        className="carte"
        style={{
          backgroundImage: `url(${props.url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `cover`,
          height: `270px`,
          width: `350px`,
          borderRadius: `10px`,
          display: `flex`,
          flexDirection: `column-reverse`,
        }}
      >
        <div
          className={`${
            show === true && props.index === indexHovered ? "display " : "hide "
          } carteContent`}
        >
          <div className="carteContentTitle">
            <h3>{props.product.nom}</h3>
            <h4>
              {props.product.prix}
              <span> TND</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteHome;

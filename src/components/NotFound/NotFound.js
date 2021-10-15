import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="notFoundContainer">
      <div className="notFoundWrrapper">
        <div className="titleNotFOund">
          4<div className="notFoundZero">0</div>4
        </div>

        <Link to="/">
          <div>
            <button className="btnGoHome">Go Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

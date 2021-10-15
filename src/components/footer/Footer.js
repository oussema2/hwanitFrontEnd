import React from "react";
import "./Footer.css";
import { FaFacebookMessenger, FaMailBulk, FaTwitter } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook } from "react-icons/fa";
const footer = () => {
  return (
    <div className="footer">
      <div className="coopSideContainer">
        <div className="coopSide">
          <FontAwesomeIcon
            icon={faCopyright}
            style={{ fontSize: `25px`, width: `50px` }}
          />{" "}
          <div>2021 hwanit.com</div>
        </div>
      </div>
      <div className="logosFooterContainer">
        <div className="logosFooter">
          <div className="logoFooterItemFacebook">
            <FaFacebook />
          </div>
          <div className="logoFooterItemTwitter">
            <FaTwitter />
          </div>
          <div className="logoFooterItemMail">
            <FaMailBulk />
          </div>

          <div className="logoFooterItemmessnger">
            <FaFacebookMessenger />
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;

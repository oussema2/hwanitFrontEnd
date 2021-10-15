import React, { useEffect } from "react";
import "./Navbar.css";

import { FiAlignJustify } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/UserSide/UserAuth/UserAuthAction";
import { fetchCategorie } from "../../Redux/PannelSide/AddCategorieRedux/AddCategorieAction";
/* eslint-disable react/prop-types */
import SearchAutocmp from "../Layout/searchAutocmp/searchAutocmp";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const Navbar = (props) => {
  const panierData = useSelector((state) => state.panierData);
  const authData = useSelector((state) => state.authData);
  const categorie = useSelector((state) => state.categoriePannel.categories);
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: `#ffa200`,
    },
  }))(Badge);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategorie());
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userNom");
    localStorage.removeItem("_id");
    localStorage.removeItem("userPrenom");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
    localStorage.removeItem("userNumTel");
    localStorage.removeItem("");

    dispatch(logOut());
    props.removeCookie("userId");
  };

  return (
    <div
      className={`${
        props.scrolEtat === true ? "MiniNavbar " : "NormalNavbar"
      } navbar`}
    >
      <div className="navbarContainer">
        <div className="navbarLeft">
          <div className="navbarLeftWrapper">
            <div>
              <Link to="/">
                <img
                  className="navbarLeftImg"
                  src={`${process.env.PUBLIC_URL} /44677268_188351612082045_8720791757198983168_n.png`}
                  alt="logo"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="navbarCenter">
          <div className="navbarCenterContainer">
            <SearchAutocmp />
          </div>
        </div>
        <div className="navbarRight">
          {authData.loggedIn ? (
            <div className="navbarRightLogRegister">
              <div
                style={{ padding: `15px` }}
              >{`${authData.userData?.userPrenom}`}</div>
              <button className="logOutButton" onClick={logout}>
                LOGOUT
              </button>
              {authData.userData.userType === "Vendor" ? (
                <Link
                  to="/pannel"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  {" "}
                  <div className="navbarRightRegister">AdminSide</div>
                </Link>
              ) : null}
              {authData.userData.userType === "Super Admin" ? (
                <Link
                  to="/pannel"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  {" "}
                  <div className="navbarRightRegister">AdminSide</div>
                </Link>
              ) : null}
              {authData.userData.userType === "Transporter" ? (
                <Link
                  to="/pannel"
                  style={{ color: `white`, textDecoration: `none` }}
                >
                  {" "}
                  <div className="navbarRightRegister">AdminSide</div>
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="navbarRightLogRegister">
              <Link
                to="/login"
                style={{ textDecoration: `none`, color: `white` }}
              >
                {" "}
                <div
                  className="navbarRightLogin" /* onClick={() => props.showModal(true)} */
                >
                  Login
                </div>
              </Link>
              <Link
                to="/register"
                style={{ color: `white`, textDecoration: `none` }}
              >
                {" "}
                <div className="navbarRightRegister">register</div>
              </Link>
            </div>
          )}

          <div className="navbarRightBasket">
            <Link to="/pannier">
              {" "}
              <IconButton aria-label="cart">
                <StyledBadge
                  badgeContent={panierData.numberOfProduit}
                  color="secondary"
                >
                  <ShoppingCartIcon
                    style={{ color: `white`, fontSize: `30px` }}
                    className="basketIconNavBAr"
                  />
                </StyledBadge>
              </IconButton>
            </Link>

            <div className="navbarRightBasketTotal" style={{ width: `100px` }}>
              {panierData.totalPrix} TND
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          props.scrolEtat === true ? "hiddenNavbar " : "showNavbar"
        } navbarButtom`}
      >
        <div className="navbarLeftKey">
          <ul className="menu">
            <li>
              <div style={{ display: `flex` }}>
                <FiAlignJustify
                  style={{ marginRight: "10px", fontSize: "20px" }}
                />
                <span className="navbarLeftValue">all depertments</span>
              </div>

              <ul className="menuCatNavBar">
                {categorie.map((item, i) => (
                  <div key={i}>
                    <li className="depList">
                      <Link
                        style={{ textDecoration: `none`, color: "black" }}
                        to={`/produits/cat/${item.categorieName}/1`}
                      >
                        <div className="deListItem">
                          <span>{item.categorieName}</span>
                        </div>
                      </Link>
                    </li>

                    <hr></hr>
                  </div>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div className="navbarButtomCenter">
          <ul className="navbarBottomList">
            <Link to="/" style={{ color: `white`, textDecoration: `none` }}>
              {" "}
              <li className="navbarBottomListValue">Home</li>
            </Link>
            <Link to="/shop" style={{ color: `white`, textDecoration: `none` }}>
              {" "}
              <li className="navbarBottomListValue">Shop</li>
            </Link>
            <Link
              to={`/produits/${1}`}
              style={{ color: `white`, textDecoration: `none` }}
            >
              {" "}
              <li className="navbarBottomListValue"> Products</li>
            </Link>
            <li className="navbarBottomListValue">Pages</li>
            <li className="navbarBottomListValue">Become A Vendor</li>
          </ul>
        </div>
        <div className="navbarButtomRight">
          <ul className="navbarBottomList">
            <li className="navbarBottomListValue">Flash sale</li>
            <li className="navbarBottomListValue">ordre</li>
            <li className="navbarBottomListValue">
              Home
              <MdKeyboardArrowDown />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "./TopFlashDeals.css";
import CarteDeals from "./CarteDeals/CarteDeals";
import Slider from "react-slick";
import "./../../../../node_modules/slick-carousel/slick/slick.css";
import "./../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { axiosConfigured } from "../../../axiosInstance";

import { FiShoppingCart } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { useHistory } from "react-router";

const TopFlashDeals = () => {
  const [hovered, sethovered] = useState(false);
  const [promotionProduit, setpromotionProduit] = useState([]);
  const [hoveredItemIndex, sethoveredItemIndex] = useState(-1);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await axiosConfigured.get("/getPromoOfHome");
      setpromotionProduit(res.data);
    })();
  }, []);
  console.log(promotionProduit);
  const settings = {
    dots: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,

    infinite: false,
  };

  const mouseHovered = (index) => {
    sethovered(true);
    sethoveredItemIndex(index);
  };
  const mouseHoveredOut = () => {
    sethovered(false);
  };

  const viewDetail = (id) => {
    history.push(`/produit/${id}`);
  };
  return (
    <div className="TopFlashContainer">
      <div className="TopFlashContainerItem">
        <div className="TopFlashContainerItemHeader">
          <h4 className="titleTopFlashContainerItem">Top Flash Deals </h4>
          <div className="TopFlashContainerDate">
            <p>ENd in: 334d : 20h : 05m : 05s</p>
          </div>
        </div>
        <div
          className="todFlashCardContainer"
          style={{
            backgroundColor: "white",
            height: "80%",
            marginTop: "50px",
          }}
        >
          {
            <Slider {...settings}>
              {promotionProduit.map((item, index) => (
                <div key={index} style={{ width: "206px" }}>
                  <div
                    onMouseOver={() => mouseHovered(index)}
                    onMouseOut={mouseHoveredOut}
                    className="todFlashCardITem"
                  >
                    <CarteDeals
                      url={`http://localhost:8000/images/produit/${item.produit?._id}/s/${item.produit?.thumbnail}`}
                    >
                      <div
                        className={`${
                          hovered === true && index === hoveredItemIndex
                            ? "hovered "
                            : "quit "
                        }cardItemICons`}
                      >
                        {" "}
                        <FiShoppingCart className="cardItemICon" />
                        <hr className="ligneIcons"></hr>
                        <BsEye
                          onClick={() => viewDetail(item.produit._id)}
                          className="cardItemICon"
                        />
                      </div>
                    </CarteDeals>
                    <div style={{ width: "170px" }}>
                      <p className="cartTitleDeals">handpicked For Home</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "90%",
                        }}
                      >
                        {" "}
                        <p>450.00Dt</p>
                        <p
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                          }}
                        >
                          600.00Dt
                        </p>
                      </div>
                      <p style={{ color: "gray" }}>Sold By : hwanit</p>
                      <p style={{ color: "gray" }}>Sold 2/52</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          }
        </div>
      </div>
    </div>
  );
};

export default TopFlashDeals;

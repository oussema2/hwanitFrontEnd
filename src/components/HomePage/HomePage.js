import React from "react";
import HomePhoto from "./HomePhoto/HomePhoto";
import HomeBrands from "./HomeBrands/HomeBrands";
import CartesHome from "./CartesHome/CartesHome";
import "./HomePage.css";
import TopFlashDeals from "./TopFlashDeals/TopFlashDeals";

const HomePage = () => {
  return (
    <div>
      <HomePhoto />

      <div className="homeBRandHomePAge">
        <h3 className="titleOfHomeBRands">Our Brands</h3>
        <HomeBrands />
      </div>
      <div>
        <CartesHome />
      </div>
      <TopFlashDeals />
    </div>
  );
};

export default HomePage;

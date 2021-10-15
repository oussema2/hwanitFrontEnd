import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { axiosConfigured } from "../../../axiosInstance";
import CarteHome from "./CarteHome/CarteHome";
import "./CartesHome.css";
const CartesHome = () => {
  const [produit, setProduit] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axiosConfigured.get("/getProduitHome");
      setProduit(response.data);
    })();
  }, []);
  return (
    <div className="produitHomeContainerStyle">
      <div className="cartesContainer">
        {produit.map((item, index) => (
          <Link
            to={`/produit/${item?._id}`}
            style={{ textDecoration: `none` }}
            key={index}
          >
            <CarteHome
              index={index}
              product={item}
              url={`http://localhost:8000/images/produit/${item._id}/m/${item.thumbnail}`}
            />
          </Link>
        ))}
      </div>

      <div className="carteTags">
        <h2 className="h2CarteTag">Trending Tags</h2>
        <p className="h4CarteTag">
          Please go to the product save to get the tag.
        </p>
      </div>
    </div>
  );
};

export default CartesHome;

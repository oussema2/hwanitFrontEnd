import React, { useEffect, useState } from "react";
import "./ProduitDetails.css";
import { axiosConfigured } from "../../axiosInstance";
import { useParams } from "react-router";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { ajouterPRoduitFromPRoduitDetail } from "../../Redux/UserSide/PannierData/PannierDataAction";
const ProduitDetails = () => {
  const { id } = useParams();
  const [produitData, setproduitData] = useState({});
  const [imagesProduit, setimagesProduit] = useState({});
  const [indexPh, setindexPh] = useState(0);
  const [promotion, setpromotion] = useState(null);
  const panierdata = useSelector((state) => state.panierData);
  const [productSuggested, setproductSuggested] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await axiosConfigured.get(`/findProduit/${id}`);
      const res1 = await axiosConfigured.get(
        `/getPRoduitInProdDetail/${res.data[0].id_categorie}`
      );
      setproductSuggested(res1.data);

      setproduitData(res.data[0]);
      setpromotion(res.data[1]);
      const res2 = await axios.get(
        `http://localhost:8000/getImagesById/${res.data[0].idInMongo}`
      );

      setimagesProduit(res2.data);
    })();
  }, []);

  const changePhoto = (index) => {
    setindexPh(index);
  };

  const addToCart = () => {
    const filtredData = panierdata.produit.filter(
      (value) => value.dataProduit._id === produitData._id
    );
    const forReduxData = {
      dataProduit: produitData,
      dataPromo: promotion,
    };
    if (filtredData.length === 0) {
      dispatch(ajouterPRoduitFromPRoduitDetail(forReduxData));
    }
  };
  return (
    <div className="produitDetailContainer">
      <div className="produitImgDetailCOntainer">
        <div className="produitImage">
          <div className="thumbnail">
            {imagesProduit.images ? (
              <img
                className="tumbnailphoto"
                src={`http://localhost:8000/images/produit/${imagesProduit.codeProduit}/l/${imagesProduit.images[indexPh]}`}
              />
            ) : (
              <BeatLoader />
            )}
          </div>
          <div className="allImageProduit">
            {imagesProduit.images ? (
              imagesProduit.images.map((item, index) => (
                <div
                  key={index}
                  className="imageUniqueContainer"
                  onClick={() => changePhoto(index)}
                >
                  <img
                    className="imageAllImage"
                    src={`http://localhost:8000/images/produit/${imagesProduit.codeProduit}/s/${item}`}
                  />
                </div>
              ))
            ) : (
              <BeatLoader />
            )}
          </div>
        </div>
        <div className="produitDetailConatainer">
          <div className="produitDetailContent">
            <h1>{produitData.nom}</h1>
            <div className="priceSide">
              {promotion?.inPromo === false ? (
                <div>
                  <h2>{produitData.prix}</h2>
                </div>
              ) : (
                <div className="promotionPriceSide">
                  <div>
                    <h3>
                      {produitData.prix -
                        (promotion?.pourcentage * produitData.prix) / 100}
                    </h3>
                  </div>
                  <div>
                    <p>{produitData.prix}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="description">
              <h2>Description</h2>
              <div className="descContent">
                <p>{produitData.description}</p>
              </div>
            </div>

            <div className="cartSide">
              <div>
                {" "}
                <button className="addToCartBtn" onClick={addToCart}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="suggestedProduit">
        <div className="suggTitle">
          <h2>SUGGESTED PRODUCT</h2>
        </div>

        <div className="suggestedProduitData">
          {productSuggested.map((item, i) => (
            <div key={i} className="prodDetailSugg">
              <img
                className="imageSuggPRod"
                src={`http://localhost:8000/images/produit/${item.produiDetail._id}/m/${item.produiDetail.thumbnail}`}
              />
              <h3 className="titleSugg">{item.produiDetail.nom}</h3>
              {item.promoData.promotionPourcentage ? (
                <div className="prixDetailSugg">
                  <h3 className="prixSugg">
                    {(
                      item.produiDetail.prix -
                      (item.produiDetail.prix *
                        item.promoData.promotionPourcentage) /
                        100
                    ).toFixed(2)}{" "}
                    TND
                  </h3>
                  <p className="prixSugg promoText">
                    {item.produiDetail.prix} TND
                  </p>
                </div>
              ) : (
                <p className="prixSugg">{item.produiDetail.prix} TND</p>
              )}

              {item.promoData.promotionPourcentage ? (
                <div className="promotionTag">PROMOTION</div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProduitDetails;

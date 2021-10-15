/* eslint-disable react/prop-types */
import React from "react";
import "./ProduitPannier.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addQuantiteProd,
  minusQuantiteProd,
} from "../../../Redux/UserSide/PannierData/PannierDataAction";

const ProduitPannier = (props) => {
  const dispatch = useDispatch();
  const addQuantite = () => {
    dispatch(addQuantiteProd(props.data.dataProduit.dataProduit._id));
  };
  const MinusQuantite = () => {
    if (props.data.quantite !== 0) {
      dispatch(minusQuantiteProd(props.data.dataProduit.dataProduit._id));
    }
  };
  return (
    <div className="produitContainer">
      <div className="pannierProduitImmage">
        <img
          style={{ width: `100px` }}
          src={`http://localhost:8000/images/produit/${props.data.dataProduit?.dataProduit._id}/l/${props.data?.dataProduit.dataProduit.thumbnail}`}
          alt="logo"
        />
      </div>
      <div className="pannierProduitDetails">
        <div className="pannierPRoduitTopDetail">
          <div className="pannierPRoduitTopDetailTitle">
            <h4>{props.data.dataProduit.dataProduit.nom}</h4>
          </div>
          <div className="pannierPRoduitTopDetailTitle">
            <p>{props.data.dataProduit.dataProduit.prix}TND</p>
          </div>
          <div className="pannierPRoduitTopDetailTitle">
            <button className="btnPlusMinus btnPlus" onClick={addQuantite}>
              <FaPlus />
            </button>
            <input
              type="number"
              className="inputPannier"
              value={props.data.quantite}
            />
            <button className="btnPlusMinus btnMinus" onClick={MinusQuantite}>
              <FaMinus />
            </button>
          </div>
          <div className="pannierPRoduitTopDetailTitle">
            {props.data.dataProduit.dataPromo.inPromo ? (
              <div>
                <h4>promotion</h4>
                <h4>
                  {props.data.quantite *
                    (props.data.dataProduit.dataProduit.prix -
                      (props.data.dataProduit.dataProduit.prix *
                        props.data.dataProduit.dataPromo.pourcentage) /
                        100)}
                  TND
                </h4>
              </div>
            ) : (
              props.data.dataProduit.dataProduit.prix
            )}
          </div>
        </div>
        <hr className="ligneInProduitDetail"></hr>
        <div className="pannierPRoduitBottomDetail">
          <div className="pannierPRoduitBottomDetailTop">
            <div>
              <p>{props.data.dataProduit.dataProduit.description}</p>
            </div>
            <div>
              <button>remove</button>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default ProduitPannier;

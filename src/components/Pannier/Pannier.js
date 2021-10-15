import { TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axiosConfigured } from "../../axiosInstance";
import "./Pannier.css";
import ProduitPannier from "./ProduitPannier/ProduitPannier";
import { toast, ToastContainer } from "react-toastify";

const Pannier = () => {
  const panierData = useSelector((state) => state.panierData);
  const [showFOrm, setshowFOrm] = useState(false);
  const enregistrerCommande = () => {
    if (localStorage.getItem("token")) {
      setshowFOrm(true);
    } else {
      toast.warning("you have To LogIn");
    }
  };

  const formik = useFormik({
    initialValues: {
      address: null,
      numTel: null,
    },
    onSubmit: async (values) => {
      const filtrerPRoduit = panierData.produit.filter(
        (item) => item.quantite > 0
      );
      const dataProduitAPI = filtrerPRoduit.map((item) => ({
        id_produit: item.dataProduit.dataProduit._id,
        id_hanout: item.dataProduit.dataProduit.id_hanout,
        quantitie: item.quantite,
      }));
      const data = {
        numTelDestinataire: values.numTel,
        addressDestinataire: values.address,
        productNumber: panierData.numberOfProduit,
        dateCommande: formatDate(),
        total: panierData.totalPrix,
        produits: dataProduitAPI,
      };
      try {
        const response = await axiosConfigured.post("/addCommande", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.statusText === "Created") {
          toast.success("Commande Enregistrer Avec Success");
        }
      } catch (error) {
        toast.error("Error d'enregistrement de Comande");
      }
    },
  });

  function formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  return (
    <div className="pannierContainer">
      <div className="pannierWrraper">
        <div>
          <div className="pannierTitle">
            <h1 style={{ fontWeight: `400` }}>Items in your bag</h1>
          </div>

          <hr className="lignePannier"></hr>

          {panierData.produit.map((item, i) => (
            <div key={i}>
              <ProduitPannier data={item} />
              <hr className="lignePannier"></hr>
            </div>
          ))}

          <div className="totalPannierContainer">
            <div className="totalPannierwrrapper">
              <div className="bagtotal">
                <div className="titlePanierTotal">
                  <h4 style={{ color: `blue` }}>Bag SubTotal</h4>
                </div>
                <div>
                  <p>{panierData.totalPrix} TND</p>
                </div>
              </div>
              <div className="totalShipping">
                <div className="titlePanierTotal">
                  <h2 style={{ color: `green` }}>Trasnport</h2>{" "}
                </div>
                <div>
                  <p style={{ color: `green` }}>8 TND</p>
                </div>
              </div>
              <hr className="lignePanniertotal"></hr>
              <div className="totalPannier">
                <div className="titlePanierTotal">
                  <h1>Total</h1>{" "}
                </div>
                <div>
                  <h1>{panierData.totalPrix + 8} TND</h1>
                </div>
              </div>

              <div className="commanderBtn">
                <button
                  className="commanderBtnbtn"
                  onClick={enregistrerCommande}
                >
                  Enregisrer Commande
                </button>
              </div>
            </div>
          </div>
        </div>

        {showFOrm ? (
          <div className="formPanier">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Numero Téléphone"
                type="number"
                placeholder="Entrer Numéro Téléphone"
                id="numTel"
                name="numTel"
                onChange={formik.handleChange}
                value={formik.values.numTel}
              />
              <TextField
                fullWidth
                label="Adress"
                placeholder="Entrer Adress de delivration"
                id="address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <div className="btnConfirmation">
                <input className="btnConf" type="submit" value="Confirmer" />
              </div>
            </form>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Pannier;

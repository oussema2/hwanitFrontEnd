import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import "./CommandeDetail.css";

const CommandeDetail = () => {
  const { idCommande } = useParams();

  const [commandeDetail, setCommandeDetail] = useState({});
  const [totalCommande, settotalCommande] = useState(null);
  const authData = useSelector((state) => state.authData);

  useEffect(() => {
    (async () => {
      if (authData.userData.userType !== "Transporter") {
        const res = await axios.get(
          `http://localhost:9005/api/getCommandeDetailHanout/${idCommande}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res) {
          setCommandeDetail(res.data);
        }
      } else {
        const res = await axios.get(
          `http://localhost:9005/api/getCommandeDetailForTransporter/${idCommande}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res) {
          setCommandeDetail(res.data);
          let total = 0;
          for (let i = 0; i < commandeDetail?.produitCommande?.length; i++) {
            total =
              total +
              commandeDetail?.produitCommande[i]?.detailProduit?.prix *
                commandeDetail?.produitCommande[i]?.quantitie;
          }
          settotalCommande(total);
        }
        totalCommande;
      }
    })();
  }, []);
  return authData.userData.userType !== "Transporter" ? (
    commandeDetail ? (
      <div className="commandePageContainer">
        <div className="commandeBox">
          <div>
            <div className="titleCommande">
              <div className="titleBigCommande">
                <h1 className="theTitleCOmmqnde">Bon de Commande</h1>
              </div>
              <div className="logoCommande">
                <img
                  style={{ width: "170px" }}
                  src={`${process.env.PUBLIC_URL} /44677268_188351612082045_8720791757198983168_n.png`}
                  alt="logo"
                />
              </div>
            </div>

            <hr className="commandeLigne"></hr>

            <div className="hannoutDetailCOmmande">
              <div className="hannoutDetailCOmmandeData">
                <div>
                  <h1>{commandeDetail?.hanoutDetail?.nom}</h1>
                </div>
                <div>
                  <p>{commandeDetail?.hanoutDetail?.adress}</p>
                </div>
                <div>
                  <p>{commandeDetail?.hanoutDetail?._id}</p>
                </div>
              </div>
            </div>

            <div className="middleSIdeCommande">
              <div className="middleSIdeCommandeLeft">
                <table className="tablemiddleSIdeCommandeLeft">
                  <td>
                    <tr>Date</tr>
                    <tr>Bon de Commande</tr>
                    <tr>Mode de Paiment</tr>
                    <tr>Contact Client</tr>
                    <tr>Téléphone Client</tr>
                  </td>

                  <td>
                    <tr>{commandeDetail?.detailCommande?.dateCommande}</tr>
                    <tr>{commandeDetail?.detailCommande?._id}</tr>
                    <tr>Mode de Paiment</tr>
                    <tr>
                      {commandeDetail?.detailCommande?.userData?.nom}{" "}
                      {commandeDetail?.detailCommande?.userData?.prenom}
                    </tr>
                    <tr>
                      {commandeDetail?.detailCommande?.numTelDestinataire}
                    </tr>
                  </td>
                </table>
              </div>

              <div className="middleSIdeCommandeRight">
                <div className="middleSIdeCommandeRightData">
                  <h2>Destinataire</h2>
                  <p>
                    {commandeDetail?.detailCommande?.userData?.nom}{" "}
                    {commandeDetail?.detailCommande?.userData?.prenom}
                  </p>
                  <p>{commandeDetail?.detailCommande?.addressDestinataire}</p>
                </div>
              </div>
            </div>

            <div className="miidleSideCommandeBottom">
              <h1>information additionnelles</h1>
              <p>Merci d'avoir choisi Hwanit Pour acheter tout</p>
              <p>Service Apres Vente Garantie 1ans</p>
            </div>

            <hr className="commandeLigne"></hr>

            <div className="tablePRoduitCommandeDetails">
              <table className="thetablePRoduitCommandeDetails">
                <thead className="tableHEadCommandePRoduit">
                  <th>Id Produit </th>
                  <th>Description</th>
                  <th>Quantite</th>
                  <th>Prix Unitaire</th>
                  <th>Prix Total</th>
                </thead>

                <hr className="commandeLProduitigne"></hr>

                <tbody>
                  {commandeDetail?.produitCommande?.map((produit, i) => (
                    <tr key={i} className="ligneTableProduitCOmmande">
                      <td>{produit?.id_produit}</td>
                      <td>{produit?.detailProduit.description}</td>
                      <td>{produit?.quantitie}</td>
                      <td>{produit?.detailProduit.prix}</td>
                      <td>
                        {produit?.detailProduit?.prix * produit?.quantitie} TND
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="tablePRoduitCommandeTotalsPRix">
                <table className="thetabledataProduit">
                  <td align="right">
                    <tr>
                      <p className="tablePRoduitCommandeTitle">Total HTT</p>
                    </tr>
                    <tr>
                      <p className="tablePRoduitCommandeTitle">
                        Frais de livraison
                      </p>
                    </tr>

                    <tr>
                      <p className="tablePRoduitCommandeTitle">Total TTC</p>
                    </tr>
                  </td>
                  <td align="left">
                    <tr>{commandeDetail?.totalFacture}</tr>
                    <tr>7 TND</tr>
                    <tr>{commandeDetail?.totalFacture + 7}</tr>
                  </td>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  ) : commandeDetail ? (
    <div className="commandePageContainer">
      <div className="commandeBox">
        <div>
          <div className="titleCommande">
            <div className="titleBigCommande">
              <h1 className="theTitleCOmmqnde">Bon de Commande</h1>
            </div>
            <div className="logoCommande">
              <img
                style={{ width: "170px" }}
                src={`${process.env.PUBLIC_URL} /44677268_188351612082045_8720791757198983168_n.png`}
                alt="logo"
              />
            </div>
          </div>

          <hr className="commandeLigne"></hr>

          <div className="middleSIdeCommande">
            <div className="middleSIdeCommandeLeft">
              <table className="tablemiddleSIdeCommandeLeft">
                <td>
                  <tr>Date</tr>
                  <tr>Bon de Commande</tr>
                  <tr>Mode de Paiment</tr>
                  <tr>Contact Client</tr>
                  <tr>Téléphone Client</tr>
                </td>

                <td>
                  <tr>{commandeDetail.dataCommande?.dateCommande}</tr>
                  <tr>{commandeDetail.dataCommande?._id}</tr>
                  <tr>Mode de Paiment</tr>
                  <tr>
                    {commandeDetail?.userData?.nom}{" "}
                    {commandeDetail?.userData?.prenom}
                  </tr>
                  <tr>{commandeDetail.dataCommande?.numTelDestinataire}</tr>
                </td>
              </table>
            </div>

            <div className="middleSIdeCommandeRight">
              <div className="middleSIdeCommandeRightData">
                <h2>Destinataire</h2>
                <p>
                  {commandeDetail?.userData?.nom}{" "}
                  {commandeDetail?.detailCommande?.userData?.prenom}
                </p>
                <p>{commandeDetail?.dataCommande?.addressDestinataire}</p>
              </div>
            </div>
          </div>

          <div className="miidleSideCommandeBottom">
            <h1>information additionnelles</h1>
            <p>Merci d'avoir choisi Hwanit Pour acheter tout</p>
            <p>Service Apres Vente Garantie 1ans</p>
          </div>

          <hr className="commandeLigne"></hr>

          <div className="tablePRoduitCommandeDetails">
            <table className="thetablePRoduitCommandeDetails">
              <thead className="tableHEadCommandePRoduit">
                <th>Id Produit </th>
                <th>quantitie</th>
                <th>Id Hanout</th>
                <th>Adress Hanout </th>
                <th>Prix Unitaire</th>
                <th>Prix Total</th>
              </thead>

              <hr className="commandeLProduitigne"></hr>

              <tbody>
                {commandeDetail?.produitCommande?.map((produit, i) => (
                  <tr key={i} className="ligneTableProduitCOmmande">
                    <td>{produit?.id_produit}</td>
                    <td>{produit?.quantitie}</td>
                    <td>{produit?.id_hanout}</td>
                    <td>{produit?.hanoutData?.adress}</td>
                    <td>{produit?.detailProduit?.prix}</td>
                    <td>
                      {produit?.detailProduit?.prix * produit?.quantitie} TND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="tablePRoduitCommandeTotalsPRix">
              <table className="thetabledataProduit">
                <td align="right">
                  <tr>
                    <p className="tablePRoduitCommandeTitle">Total HTT</p>
                  </tr>
                  <tr>
                    <p className="tablePRoduitCommandeTitle">
                      Frais de livraison
                    </p>
                  </tr>

                  <tr>
                    <p className="tablePRoduitCommandeTitle">Total TTC</p>
                  </tr>
                </td>
                <td align="left">
                  <tr>{commandeDetail?.totalFacture}</tr>
                  <tr>7 TND</tr>
                  <tr>{commandeDetail?.totalFacture + 7}</tr>
                </td>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CommandeDetail;

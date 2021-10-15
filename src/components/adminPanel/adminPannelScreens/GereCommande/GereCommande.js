import React, { useEffect, useState } from "react";
import { axiosConfigured } from "../../../../axiosInstance";
import { useCookies } from "react-cookie";
import { FormControl, MenuItem, InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import TableData from "../../../Layout/table/TableData";
import { BeatLoader } from "react-spinners";
import { useSelector } from "react-redux";
import axios from "axios";

const GereCommande = () => {
  const [loading, setloading] = useState(false);
  const [HanoutSerch, setHanoutSerch] = useState(null);
  const [hanouts, sethanouts] = useState([]);
  const [cookies] = useCookies(["userId"]);
  const [commandes, setcommandes] = useState([]);
  const authData = useSelector((state) => state.authData);

  useEffect(() => {
    (async () => {
      if (!authData.userData.userType === "Transporter") {
        const response2 = await axiosConfigured.get(
          `/getHanouts/${cookies.userId}`
        );
        const data3 = response2.data;
        sethanouts(data3);
      } else {
        const response = await axios.get(
          `http://localhost:9005/api/getAllCommandesForTransporter`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        if (response) {
          setloading(false);
          setcommandes(data.data);
        }
      }
    })();
  }, []);

  const handleHanoutChange = async (event) => {
    setloading(true);

    const response = await axiosConfigured.get(
      `/getCommandeHanout/${event.target.value}`
    );
    const data = response.data;
    if (response) {
      setloading(false);
      setcommandes(data);
    }

    setHanoutSerch(event.target.value);
  };
  const tableHead = [
    "Date De Commande",
    "Nombre de Produit",
    "Total de Commande",
    "Delivrer",
    "voir Detail",
  ];
  const tableHeadForTransporter = [
    "idCommande",
    "Numer Telephone Dest",
    "Adress Destinataire",
    "Nombre De Produit",
    "Date Commande",
    "Delivrer",
    "voir Detail",
  ];
  return (
    <div>
      <div className="container">
        <div className="containerListeBoutique">
          <div className="tableTitleContainer">
            <div className="titleLIstCatContainer">
              <h1 className="titleLIstCat">Gerer Commandes</h1>
            </div>

            {!authData.userData.userType === "Transporter" ? (
              <div className="selectionTypeProduit">
                <FormControl style={{ width: "25%" }}>
                  <InputLabel
                    style={{ width: "300px" }}
                    id="demo-simple-select-label"
                  >
                    Select Hanout
                  </InputLabel>
                  <Select
                    style={{ width: "300px" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={HanoutSerch}
                    onChange={handleHanoutChange}
                  >
                    {hanouts.map((han, i) => (
                      <MenuItem key={i} value={han._id}>
                        {han.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ) : null}

            <div className="tableCategorie">
              <TableData
                dataBody={commandes}
                tableHead={
                  !authData.userData.userType
                    ? tableHead
                    : tableHeadForTransporter
                }
                loading={loading}
                typeData={`${
                  !authData.userData.userType === "Transporter"
                    ? "commandes"
                    : "commandeTransporter"
                }`}
              />
            </div>

            {loading ? (
              <div className="loadingBar">
                {" "}
                <BeatLoader size={40} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GereCommande;

import React, { useEffect, useState } from "react";
import { axiosConfigured } from "../../../../axiosInstance";
import { BeatLoader } from "react-spinners";
import { useHistory } from "react-router";
import TableData from "../../../Layout/table/TableData";
import "./ListProduit.css";
import { FormControl, MenuItem, InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorie } from "../../../../Redux/PannelSide/AddCategorieRedux/AddCategorieAction";
import { useCookies } from "react-cookie";

const ListProduit = () => {
  const [loading, setloading] = useState(false);
  const [produits, setproduits] = useState([]);
  const history = useHistory();
  const [HanoutSerch, setHanoutSerch] = useState(null);

  const [hanouts, sethanouts] = useState([]);

  const categories = useSelector((state) => state.categoriePannel.categories);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["userId"]);

  useEffect(() => {
    (async () => {
      const response2 = await axiosConfigured.get(
        `/getHanouts/${cookies.userId}`
      );
      const data3 = response2.data;
      sethanouts(data3);

      dispatch(fetchCategorie());
    })();
  }, []);

  const handleClick = async (id) => {
    const response = await axiosConfigured.delete(`/deleteProduit/${id}`);
    if (response) {
      const res = await axiosConfigured.get(`/getWithHanout/${HanoutSerch}`);
      const data = res.data;

      setproduits(data);
    }
  };

  const getCategorie = (id) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        return categories[i].categorieName;
      }
    }
  };

  const handleHanoutChange = async (event) => {
    setloading(true);

    const response = await axiosConfigured.get(
      `/getWithHanout/${event.target.value}`
    );
    const data = response.data;
    setproduits(data);
    if (response) {
      setloading(false);
    }

    setHanoutSerch(event.target.value);
  };

  const tableHead = [
    "Produit ID",
    "Produit Name",
    "Produit description",
    "Produit Prix",
    "Produit Quantité",
    "Produit Categorie",
    "Action",
  ];
  return (
    <div>
      <div className="container">
        <div className="containerListeBoutique">
          <div className="tableTitleContainer">
            <div className="titleLIstCatContainer">
              <h1 className="titleLIstCat">Produits </h1>
            </div>
            <div className="selectionTypeProduit">
              <FormControl style={{ width: "25%" }}>
                <InputLabel
                  style={{ width: "300px" }}
                  id="demo-simple-select-label"
                >
                  Hanout
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

            <div className="tableCategorie">
              <TableData
                dataBody={produits}
                tableHead={tableHead}
                loading={loading}
                delete={handleClick}
                typeData="Produit"
                getCat={getCategorie}
              />
            </div>
            {loading ? (
              <div className="loadingBar">
                {" "}
                <BeatLoader size={40} />
              </div>
            ) : null}
            <div className="buttonListAdd">
              <button
                className="addHanoutBtn"
                onClick={() => history.push("/ajouterProduit")}
              >
                Ajouter Produit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduit;

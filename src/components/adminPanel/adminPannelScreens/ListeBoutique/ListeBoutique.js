import React, { useEffect, useState } from "react";
import { axiosConfigured } from "../../../../axiosInstance";
import "./ListeBoutique.css";
import { useHistory } from "react-router";
import TableData from "../../../Layout/table/TableData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const ListeBoutique = () => {
  const history = useHistory();
  const [boutiques, setboutiques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["userId"]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const response = await axiosConfigured.get(
        `/getHanouts/${cookies.userId}`
      );
      const data = (await response).data;
      if (response) {
        setLoading(false);
      }
      setboutiques(data);
    })();
  }, []);
  const handleClick = async (id) => {
    try {
      const response = await axiosConfigured.delete(`/deleteHanout/${id}`);
      if (response) {
        toast.success("Boutique Supprimer avec success ");
      }
    } catch (error) {
      toast.error("Error dans la suppression ");
    }
  };
  const tableHead = [
    "Boutique ID",
    "Boutique Name",
    "Boutique Adress",
    "Action",
  ];
  return (
    <div>
      <div className="container">
        <div className="containerListeBoutique">
          <div className="tableTitleContainer">
            <div className="titleLIstCatContainer">
              <h1 className="titleLIstCat">Boutiques </h1>
            </div>

            <div className="tableCategorie">
              <TableData
                dataBody={boutiques}
                tableHead={tableHead}
                loading={loading}
                delete={handleClick}
                typeData="Boutique"
              />
            </div>
            <div className="buttonListAdd">
              <button
                className="addHanoutBtn"
                onClick={() => history.push("/pannel/AjouterBoutique")}
              >
                Ajouter Hanout
              </button>
            </div>
          </div>
        </div>
        <ToastContainer style={{}} />
      </div>
    </div>
  );
};

export default ListeBoutique;

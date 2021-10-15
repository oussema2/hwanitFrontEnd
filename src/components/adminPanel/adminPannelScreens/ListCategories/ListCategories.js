import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { axiosConfigured } from "../../../../axiosInstance";
import { fetchCategorie } from "../../../../Redux/PannelSide/AddCategorieRedux/AddCategorieAction";
import TableData from "../../../Layout/table/TableData";
import "./ListCategories.css";

const ListCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriePannel.categories);

  useEffect(() => {
    dispatch(fetchCategorie());
  }, []);

  const handleClick = async (id) => {
    try {
      await axiosConfigured.delete(`/deleteCategorie/${id}`);
      dispatch(fetchCategorie());
    } catch (error) {
      toast.error("error List Categorie");
    }
  };
  const tableHead = ["id", "categorieName", "Action"];

  return (
    <div>
      <div className="tableTitleContainer">
        <div className="titleLIstCatContainer">
          <h1 className="titleLIstCat">Categories </h1>
        </div>

        <div className="tableCategorie">
          <TableData
            dataBody={categories}
            tableHead={tableHead}
            delete={handleClick}
            typeData="Categories"
          />

          {/*   <table className="theTable" >
                        <tr>
                            <th>Categorie ID</th>
                            <th>Categorie Name</th>
                            <th>Action</th>

                        </tr>

                        {
                            categories.map(cat => (
                                <tr className="tableBodyLigneListCat">
                                    <td>{cat.id}</td>
                                    <td>{cat.categorieName}</td>
                                    <td><button className="deleteButtonCats" onClick={() => handleClick(cat.id)}>Delete</button></td>

                                </tr>

                            ))
                        }

                    </table> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListCategories;

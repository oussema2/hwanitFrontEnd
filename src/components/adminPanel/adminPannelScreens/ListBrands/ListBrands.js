import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { axiosConfigured } from "../../../../axiosInstance";
import { fetchBrand } from "../../../../Redux/PannelSide/BrandRedux/BrandAction";
import TableData from "../../../Layout/table/TableData";

const ListBrands = () => {
  const brands = useSelector((state) => state.brandPannel.brands);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrand());
  }, []);

  const handleClick = async (id) => {
    try {
      await axiosConfigured.delete(`/deleteBrand/${id}`);
      dispatch(fetchBrand());
    } catch (error) {
      toast.error("Error de la Suppression de Brand");
    }
  };
  const tableHead = ["id", "BrandName", "Action"];
  return (
    <div>
      <div className="tableTitleContainer">
        <div className="titleLIstCatContainer">
          <h1 className="titleLIstCat">BRANDS </h1>
        </div>

        <div className="tableCategorie">
          <TableData
            dataBody={brands}
            tableHead={tableHead}
            delete={handleClick}
            typeData="Brands"
          />

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ListBrands;

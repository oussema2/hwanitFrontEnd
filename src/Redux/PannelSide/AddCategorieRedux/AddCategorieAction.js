import {
  DELETE_CATEGORIE,
  FETCH_CATEGORIE_ERROR,
  FETCH_CATEGORIE_REQUEST,
  FETCH_CATEGORIE_SUCCESS,
} from "./CategorieTypes";

import { axiosConfigured } from "../../../axiosInstance";

export const fetchCategorie = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCategorieRequest());
      const response = await axiosConfigured.get("/getCategories");
      const data = await response.data;
      dispatch(fetchCategorieSuccess(data));
    } catch (error) {
      const errorMsj = error.message;
      dispatch(fetchCategorieFailure(errorMsj));
    }
  };
};

export const deleteCat = (idcat) => {
  return {
    type: DELETE_CATEGORIE,
    payload: idcat,
  };
};

export const fetchCategorieRequest = () => {
  return {
    type: FETCH_CATEGORIE_REQUEST,
  };
};
export const fetchCategorieSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIE_SUCCESS,
    payload: categories,
  };
};
export const fetchCategorieFailure = (error) => {
  return {
    type: FETCH_CATEGORIE_ERROR,
    payload: error,
  };
};

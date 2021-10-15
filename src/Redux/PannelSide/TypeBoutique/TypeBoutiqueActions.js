import { axiosConfigured } from "../../../axiosInstance";
import {
  FETCH_TYPESBOUTIQUE_FAILURE,
  FETCH_TYPESBOUTIQUE_REQUEST,
  FETCH_TYPESBOUTIQUE_SUCCESS,
} from "./TypeBoutiqueTypes";

export const fetchTypesBoutique = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchTypesBoutiqueRequest());
      const response = await axiosConfigured.get("/getTypeHanouts");
      const data = response.data;
      dispatch(fetchTypesBoutiqueSuccess(data.vendor));
    } catch (error) {
      const errorMsj = error.message;
      dispatch(fetchTypesBoutiqueFailure(errorMsj));
    }
  };
};

const fetchTypesBoutiqueRequest = () => {
  return {
    type: FETCH_TYPESBOUTIQUE_REQUEST,
  };
};
const fetchTypesBoutiqueFailure = (error) => {
  return {
    type: FETCH_TYPESBOUTIQUE_FAILURE,
    error: error,
  };
};
const fetchTypesBoutiqueSuccess = (data) => {
  return {
    type: FETCH_TYPESBOUTIQUE_SUCCESS,
    payload: data,
  };
};

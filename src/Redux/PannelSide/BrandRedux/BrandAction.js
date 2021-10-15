import { axiosConfigured } from "../../../axiosInstance";
import {
  FETCH_BRAND_FAILED,
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
} from "./BrandsTypes";

export const fetchBrand = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchBRandRequest());
      const response = await axiosConfigured.get("/getBrands");

      const data = response.data;
      dispatch(fetchBRandSuccess(data));
    } catch (error) {
      const errorMsj = error.message;
      dispatch(fetchBrandfailure(errorMsj));
    }
  };
};

export const fetchBRandRequest = () => {
  return {
    type: FETCH_BRAND_REQUEST,
  };
};
export const fetchBRandSuccess = (brands) => {
  return {
    type: FETCH_BRAND_SUCCESS,
    payload: brands,
  };
};
export const fetchBrandfailure = (error) => {
  return {
    type: FETCH_BRAND_FAILED,
    error: error,
  };
};

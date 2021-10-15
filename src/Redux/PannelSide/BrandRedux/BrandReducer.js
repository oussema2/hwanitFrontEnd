import {
  FETCH_BRAND_FAILED,
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
} from "./BrandsTypes";

const initialState = {
  brands: [],
  loading: false,
  error: "",
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BRAND_FAILED:
      return {
        loading: false,
        ...state,
        error: action.error,
      };
    case FETCH_BRAND_SUCCESS:
      return {
        loading: false,
        brands: action.payload,
        error: "",
      };

    default:
      return state;
  }
};

export default brandReducer;

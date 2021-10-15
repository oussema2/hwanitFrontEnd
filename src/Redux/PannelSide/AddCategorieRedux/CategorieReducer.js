import {
  FETCH_CATEGORIE_ERROR,
  FETCH_CATEGORIE_REQUEST,
  FETCH_CATEGORIE_SUCCESS,
} from "./CategorieTypes";

const initialState = {
  categories: [],
  loading: false,
  error: "",
};

const categorieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIE_ERROR:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };
    case FETCH_CATEGORIE_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
        error: "",
      };

    default:
      return state;
  }
};

export default categorieReducer;

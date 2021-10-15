import {
  FETCH_TYPESBOUTIQUE_FAILURE,
  FETCH_TYPESBOUTIQUE_REQUEST,
  FETCH_TYPESBOUTIQUE_SUCCESS,
} from "./TypeBoutiqueTypes";

const initialState = {
  typeHanout: [],
  loading: false,
  error: "",
};

const typeBoutiqueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TYPESBOUTIQUE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TYPESBOUTIQUE_SUCCESS:
      return {
        loading: false,
        typeHanout: action.payload,
        error: "",
      };
    case FETCH_TYPESBOUTIQUE_FAILURE:
      return {
        loading: false,
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default typeBoutiqueReducer;

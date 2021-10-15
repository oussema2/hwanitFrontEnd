import {
  ADD_PRODUIT,
  AJOUTER_PRODUIT,
  MINUS_PRODUIT,
  AJOUTER_PRODUIT_PRDODETAIL,
} from "./PannierDataTypes";

const initialState = {
  produit: [],
  numberOfProduit: 0,
  totalPrix: 0.0,
};

const pannierReducer = (state = initialState, action) => {
  var data, produit;
  switch (action.type) {
    case AJOUTER_PRODUIT:
      data = [...state.produit];
      produit = {
        dataProduit: action.payload,
        quantite: 1,
      };
      data.push(produit);
      return {
        produit: data,
        numberOfProduit: state.numberOfProduit + 1,
        totalPrix: state.totalPrix + action.payload.dataProduit.prix,
      };

    case AJOUTER_PRODUIT_PRDODETAIL:
      data = [...state.produit];
      produit = {
        dataProduit: action.payload,
        quantite: 1,
      };
      data.push(produit);
      return {
        produit: data,
        numberOfProduit: state.numberOfProduit + 1,
        totalPrix: state.totalPrix + action.payload.dataProduit.prix,
      };

    case ADD_PRODUIT:
      data = state.produit.map((item) =>
        item.dataProduit.dataProduit._id === action.payload
          ? { ...item, quantite: item.quantite + 1 }
          : item
      );

      return {
        produit: data,
        numberOfProduit: state.numberOfProduit,
        totalPrix:
          state.totalPrix +
          state.produit.filter(
            (item) => item.dataProduit.dataProduit._id === action.payload
          )[0].dataProduit.dataProduit.prix,
      };

    case MINUS_PRODUIT:
      data = state.produit.map((item) =>
        item.dataProduit.dataProduit._id === action.payload
          ? { ...item, quantite: item.quantite - 1 }
          : item
      );

      return {
        produit: data,
        numberOfProduit: state.numberOfProduit,
        totalPrix:
          state.totalPrix -
          state.produit.filter(
            (item) => item.dataProduit.dataProduit._id === action.payload
          )[0].dataProduit.dataProduit.prix,
      };

    default:
      return state;
  }
};

export default pannierReducer;

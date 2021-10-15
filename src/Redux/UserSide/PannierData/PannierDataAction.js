import {
  AJOUTER_PRODUIT,
  DELETE_PRODUIT,
  ADD_PRODUIT,
  MINUS_PRODUIT,
  AJOUTER_PRODUIT_PRDODETAIL,
} from "./PannierDataTypes";

export const ajouterProduit = (data) => {
  return {
    type: AJOUTER_PRODUIT,
    payload: data,
  };
};

export const addQuantiteProd = (id) => {
  return {
    type: ADD_PRODUIT,
    payload: id,
  };
};

export const ajouterPRoduitFromPRoduitDetail = (data) => {
  return {
    type: AJOUTER_PRODUIT_PRDODETAIL,
    payload: data,
  };
};

export const minusQuantiteProd = (id) => {
  return {
    type: MINUS_PRODUIT,
    payload: id,
  };
};

export const deleteProduit = (id) => {
  return {
    type: DELETE_PRODUIT,
    payload: id,
  };
};

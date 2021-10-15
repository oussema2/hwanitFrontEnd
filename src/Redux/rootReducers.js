import { combineReducers } from "redux";
import categorieReducer from "./PannelSide/AddCategorieRedux/CategorieReducer";
import brandReducer from "./PannelSide/BrandRedux/BrandReducer";
import typeBoutiqueReducer from "./PannelSide/TypeBoutique/TypeBoutiqueReducer";
import pannierReducer from "./UserSide/PannierData/PannierDatareducer";
import userAuthReducer from "./UserSide/UserAuth/UserAuthReducer";

const rootReducer = combineReducers({
  categoriePannel: categorieReducer,
  panierData: pannierReducer,

  brandPannel: brandReducer,
  typeHanoutPannel: typeBoutiqueReducer,
  authData: userAuthReducer,
});

export default rootReducer;

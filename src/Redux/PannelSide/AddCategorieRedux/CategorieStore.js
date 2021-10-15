import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../rootReducers";
import thunk from "redux-thunk";

const categorieStore = createStore(rootReducer, applyMiddleware(thunk));
export default categorieStore;

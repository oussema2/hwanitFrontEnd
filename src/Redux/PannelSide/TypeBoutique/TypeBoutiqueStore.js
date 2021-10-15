import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../rootReducers";

const typeHanoutStore = createStore(rootReducer, applyMiddleware(thunk));
export default typeHanoutStore;

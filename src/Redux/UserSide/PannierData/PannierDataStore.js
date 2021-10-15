import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../rootReducers";

const pannierStore = createStore(rootReducer, applyMiddleware(thunk));
export default pannierStore;

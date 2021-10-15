import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../rootReducers";
import thunk from "redux-thunk";

const brandStore = createStore(rootReducer, applyMiddleware(thunk));
export default brandStore;

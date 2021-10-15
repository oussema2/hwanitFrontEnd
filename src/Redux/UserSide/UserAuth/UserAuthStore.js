import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../rootReducers";

const userStore = createStore(rootReducer, applyMiddleware(thunk));
export default userStore;

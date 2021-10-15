import { LOGOUT, LOGIN } from "./UserAuthTypes";

const initialState = {
  loggedIn: false,
  userData: {},
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        userData: action.payload,
      };

    case LOGOUT:
      return {
        loggedIn: false,
        userData: null,
      };

    default:
      return state;
  }
};

export default userAuthReducer;

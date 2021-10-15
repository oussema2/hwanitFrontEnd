import { LOGOUT, LOGIN } from "./UserAuthTypes";

export const logIn = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
  };
};

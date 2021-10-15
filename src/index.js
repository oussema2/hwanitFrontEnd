/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import Main from "./Main";
import categorieStore from "./Redux/PannelSide/AddCategorieRedux/CategorieStore";
import brandStore from "./Redux/PannelSide/BrandRedux/BrandStore";
import typeHanoutStore from "./Redux/PannelSide/TypeBoutique/TypeBoutiqueStore";
import userStore from "./Redux/UserSide/UserAuth/UserAuthStore";
import { CookiesProvider } from "react-cookie";
import pannierStore from "./Redux/UserSide/PannierData/PannierDataStore";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CookiesProvider>
        <Provider
          store={
            (categorieStore,
            brandStore,
            typeHanoutStore,
            userStore,
            pannierStore)
          }
        >
          <Main />
        </Provider>
      </CookiesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import App from "./App";
import Pannel from "./components/adminPanel/Pannel";
import Register from "./components/Register/Register";
import Pannier from "./components/Pannier/Pannier";
import LogIn from "./components/LogIn/LogIn";
import { logIn } from "./Redux/UserSide/UserAuth/UserAuthAction";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import NotFound from "./components/NotFound/NotFound";
axios.get("http://localhost:9005/sanctum/csrf-cookie");

const Main = () => {
  const [cookies, setCookie] = useCookies(["userId"]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      //categorieStore.addCategorie();
      const reponse = await axios.get(`http://localhost:9005/api/user`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = reponse.data;
      if (reponse.status === 200) {
        setCookie("userId", data._id, { path: "/" });

        dispatch(
          logIn({
            id: data._id,
            userNom: data.nom,
            userPrenom: data.prenom,
            userEmail: data.email,
            userType: data.type,
            userNumTel: data.numTel,
          })
        );
      }
    })();
    if (!cookies.userId) {
      setCookie("userId", localStorage.getItem("_id"));
    }
  }, []);
  return (
    <div>
      <Switch>
        <Route path="/pannel" exact component={Pannel} />
        <Route path="/register" exact component={Register} />
        <Route path="/pannier" exact component={Pannier} />
        <Route path="/login" exact component={LogIn} />

        <Route path="/" component={App} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Main;

import React, { useEffect, useState } from "react";
import NavSide from "./navSide/NavSide";

import { Vendor, Transporter, SuperAdmin } from "./actionData";
import UpdateBoutique from "./adminPannelScreens/updateBoutique/UpdateBoutique";
import ListProduit from "./adminPannelScreens/ListProduit/ListProduit";
import ListBrands from "./adminPannelScreens/ListBrands/ListBrands";
import ListeBoutique from "./adminPannelScreens/ListeBoutique/ListeBoutique";
import UpdateProduit from "./adminPannelScreens/UpdateProduit/UpdateProduit";
import AddProduit from "./adminPannelScreens/AddProduit/AddProduit";
import GereCommande from "./adminPannelScreens/GereCommande/GereCommande";
import Statistics from "./adminPannelScreens/statistics/Statistics";
import AjouterBoutique from "./adminPannelScreens/AjouterBoutique/AjouterBoutique";
import ListCategories from "./adminPannelScreens/ListCategories/ListCategories";
import AddCategories from "./adminPannelScreens/AddCategories/AddCategories";
import AddBrand from "./adminPannelScreens/AddBRand/AddBrand";
import Vendors from "./adminPannelScreens/Vendors/Vendors";
import UJsers from "./adminPannelScreens/UJsers/UJsers";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPromotion from "./adminPannelScreens/ListPromotion/ListPromotion";
import AddPromotion from "./adminPannelScreens/AddPromotion/AddPromotion";
import CommandeDetail from "./adminPannelScreens/CommandeDetail/CommandeDetail";
import { useSelector } from "react-redux";

const Pannel = () => {
  const [menu, setMenu] = useState([]);
  const authData = useSelector((state) => state.authData);
  useEffect(() => {
    (async () => {
      if (authData.userData.userType === "Super Admin") {
        setMenu(SuperAdmin);
      } else if (authData.userData.userType === "Vendor") {
        setMenu(Vendor);
      } else {
        setMenu(Transporter);
      }
    })();
  }, []);

  return (
    <div>
      <Router>
        <NavSide action={menu} />
        <Switch>
          <Route path="/pannel/ModifierBoutique" component={UpdateBoutique} />
          <Route path="/pannel/ToutBoutiques" component={ListeBoutique} />
          <Route path="/pannel/ModifierProduit" component={UpdateProduit} />
          <Route path="/pannel/listerProduit" component={ListProduit} />
          <Route path="/pannel/ajouterProduit" component={AddProduit} />
          <Route path="/pannel/ListerCommandes" component={GereCommande} />
          <Route path="/pannel/VenteStatistics" component={Statistics} />
          <Route path="/pannel/AjouterBoutique" component={AjouterBoutique} />
          <Route path="/pannel/LesCategories" component={ListCategories} />
          <Route path="/pannel/AddCategories" component={AddCategories} />
          <Route path="/pannel/LesBrands" component={ListBrands} />
          <Route path="/pannel/AddBrands" component={AddBrand} />
          <Route path="/pannel/ListVendors" component={Vendors} />
          <Route path="/pannel/ListUsers" component={UJsers} />
          <Route path="/pannel/ListePromotion" component={ListPromotion} />
          <Route path="/pannel/AjouterPromotion" component={AddPromotion} />
          <Route path="/pannel/:idCommande" exact component={CommandeDetail} />
          <Route
            path="/pannel/updateProduit/:idProduit"
            exact
            component={UpdateProduit}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default Pannel;

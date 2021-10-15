import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import { Route } from "react-router";
import HomePage from "./components/HomePage/HomePage";
import ShopPage from "./components/ShopPage/ShopPage";
import "./App.css";
import Footer from "./components/footer/Footer";
import Produit from "./components/Produit/Produit";
import ShopDetails from "./components/shopDetails/ShopDetails";
import { useCookies } from "react-cookie";
import ProduitDetails from "./components/ProduitDetails/ProduitDetails";

function App() {
  const [positionScroll, setpositionScroll] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

  window.onscroll = function () {
    if (window.scrollY > 78) {
      setpositionScroll(true);
    } else {
      setpositionScroll(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: `column`,
      }}
    >
      <div>
        <Navbar
          scrolEtat={positionScroll}
          setCookie={setCookie}
          removeCookie={removeCookie}
          cookies={cookies}
        />
      </div>
      <Route path="/shop" exact component={ShopPage} />\
      <Route path="/shop/:shopId" exact component={ShopDetails} />
      <Route path="/produits/:typeSearch/:target" exact component={Produit} />
      <Route
        path="/produits/:typeSearch/:target/:numPage"
        exact
        component={Produit}
      />
      <Route path="/produits" exact component={Produit} />
      <Route path="/produits/:numPage" exact component={Produit} />
      <Route path="/produit/:id" exact component={ProduitDetails} />
      <Route path="/" exact component={HomePage} />
      <Footer />
    </div>
  );
}

export default App;

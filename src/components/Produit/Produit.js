import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { axiosConfigured } from "../../axiosInstance";
import "./Produit.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { BeatLoader } from "react-spinners";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { ajouterProduit } from "../../Redux/UserSide/PannierData/PannierDataAction";
import { useSelector } from "react-redux";
const useStyles = makeStyles(() => ({
  root: {
    width: `445px`,
  },
  media: {
    height: 0,
    padding: "23.25%", // 16:9
  },

  avatar: {},
}));

const Produit = () => {
  const classes = useStyles();
  const [headerPage, setheaderPage] = useState({ comp: null });
  const panierdata = useSelector((state) => state.panierData);
  const dispatch = useDispatch();
  const history = useHistory();
  const { typeSearch, target, numPage } = useParams();
  const [produits, setproduits] = useState([]);
  const [numberOfProduct, setnumberOfProduct] = useState(0);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    (async () => {
      setloading(true);
      let response;
      switch (typeSearch) {
        case "cat":
          response = await axiosConfigured.get(
            `/getWithCategorie/${target}/${(numPage - 1) * 10}`
          );

          setproduits(response.data[1]);
          setnumberOfProduct(response.data[0]);
          setloading(false);
          setheaderPage({ comp: <h1>WITHCATEGORIE</h1> });
          break;
        case "br":
          response = await axiosConfigured.get(
            `/getWithBrand/${target}/${(numPage - 1) * 10}`
          );
          setproduits(response.data[1]);
          setnumberOfProduct(response.data[0]);
          setloading(false);
          setheaderPage({ comp: <h1>WITHBrand</h1> });

          break;
        case "han":
          response = await axiosConfigured.get(
            `/getWithHanout/${target}/${(numPage - 1) * 10}`
          );
          setproduits(response.data[1]);
          setnumberOfProduct(response.data[0]);
          setloading(false);
          setheaderPage({ comp: <h1>WITHHANOUT</h1> });

          break;
        case "search":
          response = await axiosConfigured.get(
            `/getWithSearch/${target}/${(numPage - 1) * 10}`
          );
          setproduits(response.data[1]);
          setnumberOfProduct(response.data[0]);
          setloading(false);
          setheaderPage({ comp: <h1>WITHBSEARSH</h1> });

          break;
        default:
          response = await axiosConfigured.get(
            `/getAllProduits/${(numPage - 1) * 10}`
          );
          setproduits(response.data[1]);
          setnumberOfProduct(response.data[0]?.numbofProduit);
          setloading(false);
          setheaderPage({ comp: <h1>Produit</h1> });

          break;
      }
    })();
  }, [target]);

  const addProduit = (item) => {
    const filtredData = panierdata.produit.filter(
      (value) => value.dataProduit._id === item.dataProduit._id
    );

    if (filtredData.length === 0) {
      const forReduxData = {
        dataProduit: item.dataProduit,
        dataPromo: item.dataPromo,
      };
      dispatch(ajouterProduit(forReduxData));
    }
  };

  const changePage = async (pageNumber) => {
    setloading(true);
    let response;
    switch (typeSearch) {
      case "cat":
        response = await axiosConfigured.get(
          `/getWithCategorie/${target}/${(pageNumber - 1) * 10}`
        );

        setproduits(response.data[1]);
        setnumberOfProduct(response.data[0]);
        setloading(false);
        setheaderPage({ comp: <h1>WITHCATEGORIE</h1> });
        break;
      case "br":
        response = await axiosConfigured.get(
          `/getWithBrand/${target}/${(pageNumber - 1) * 10}`
        );
        setproduits(response.data[1]);
        setnumberOfProduct(response.data[0]);
        setloading(false);
        setheaderPage({ comp: <h1>WITHBrand</h1> });

        break;
      case "han":
        response = await axiosConfigured.get(
          `/getWithHanout/${target}/${(pageNumber - 1) * 10}`
        );
        setproduits(response.data[1]);
        setnumberOfProduct(response.data[0]);
        setloading(false);
        setheaderPage({ comp: <h1>WITHHANOUT</h1> });

        break;
      case "search":
        response = await axiosConfigured.get(
          `/getWithSearch/${target}/${(pageNumber - 1) * 10}`
        );
        setproduits(response.data[1]);
        setnumberOfProduct(response.data[0]);
        setloading(false);
        setheaderPage({ comp: <h1>WITHBSEARSH</h1> });

        break;
      default:
        response = await axiosConfigured.get(
          `/getAllProduits/${(pageNumber - 1) * 10}`
        );
        setproduits(response.data[1]);
        setnumberOfProduct(response.data[0]?.numbofProduit);
        setloading(false);
        setheaderPage({ comp: <h1>Produit</h1> });

        break;
    }
    history.push(`/produits/${pageNumber}`);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      {headerPage.comp}
      <div className="containerOfPROduit">
        <div className="filterSide">
          <h1>hello in filterSide</h1>
        </div>
        <div className="produitCardSide">
          {loading ? (
            <div style={{ marginLeft: `50%` }}>
              {" "}
              <BeatLoader />
            </div>
          ) : null}
          <div className="produitCardSideContainer">
            {produits.map((item, i) => (
              <div key={i} className="cardContainer">
                <Card className={`${classes.root}`}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <img
                          style={{ width: `30px`, borderRadius: `50%` }}
                          src={`http://localhost:9005/${item.dataHanout.imageHAnout}`}
                        />
                      </Avatar>
                    }
                    action={
                      <Grid>
                        {item.dataPromo.inPromo ? (
                          <div className="promotionTag">
                            <h4>Promotion</h4>
                          </div>
                        ) : null}
                      </Grid>
                    }
                    title={item.dataHanout.nom}
                    subheader={item.dataProduit.created_at}
                  />
                  <CardMedia
                    className={classes.media}
                    image={`http://localhost:8000/images/produit/${item.dataProduit?._id}/m/${item?.dataProduit.thumbnail}`}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h1"
                    >
                      {item.dataProduit.nom}
                    </Typography>
                    <div className="produitPrixSide">
                      <Typography
                        variant={`${item.dataPromo.inPromo ? "body2" : "h5"}`}
                        color={`${
                          item.dataPromo.inPromo ? "textSecondary" : null
                        }`}
                        component={`${item.dataPromo.inPromo ? "p" : "h1"}`}
                        className={`${
                          item.dataPromo.inPromo ? "inPromoProd" : null
                        }`}
                      >
                        {item.dataProduit.prix} TND
                      </Typography>

                      {item.dataPromo.inPromo ? (
                        <Typography
                          style={{ marginLeft: `20px` }}
                          gutterBottom
                          variant="h5"
                          component="h1"
                        >
                          {item.dataProduit.prix -
                            (item.dataProduit.prix *
                              item.dataPromo.pourcentage) /
                              100}{" "}
                          TND
                        </Typography>
                      ) : null}
                    </div>
                    <Link to={`/produit/${item.dataProduit._id}`}>
                      <button className="showDetailButton">Show Detail</button>
                    </Link>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to ShoppingBasket">
                      <AddShoppingCartIcon onClick={() => addProduit(item)} />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
          <div className="paginationside">
            {" "}
            {Array(Math.floor(numberOfProduct / 10) + 1)
              .fill(5)
              .map((item, index) => (
                <div key={index} className="paginationButn">
                  <button
                    className="btnPagination"
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produit;

import "./AddPromotion.css";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { axiosConfigured } from "../../../../axiosInstance";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { useCookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";

import { toast, ToastContainer } from "react-toastify";

const AddPromotion = () => {
  const [loading, setloading] = useState(false);
  const [loadingSelect, setloadingSelect] = useState(false);

  const paperStyle = {
    padding: "30px 20px",
    width: `100%`,
    margin: "20px auto",
    height: `1500px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [boutiques, setboutiques] = useState([]);
  const [cookies] = useCookies(["userId"]);
  const [produits, setproduits] = useState([]);
  const [addedProduit] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axiosConfigured.get(
        `/getHanouts/${cookies.userId}`
      );
      const data = (await response).data;
      if (response) {
        setloading(false);
      }
      setboutiques(data);
    })();
  }, []);

  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const formikZ = useFormik({
    initialValues: {
      id_hanout: "",
      namePromo: "",
      date_Debut: null,
      date_Fin: null,
      pourcentage: null,
      products: [],
    },
    onSubmit: async (values) => {
      //setloading(true)

      for (let i = 0; i < addedProduit.length; i++) {
        values.products.push(addedProduit[i]._id);
      }
      //
      try {
        const response = await axiosConfigured.post("/addPromotion", values);
        if (response) {
          toast.success("ajout avec success");
        }
      } catch (error) {
        toast.error("ajout erreur");
      }
    },
  });

  const getProduit = async () => {
    if (!formikZ.values.id_hanout) {
      toast.warning("Erreur Choisi un Hanout");
    } else if (produits.length === 0) {
      setloadingSelect(true);
      const response1 = await axiosConfigured.get(
        `/getWithHanout/${formikZ.values.id_hanout}`
      );
      const data = response1.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = { ...data[i], added: false };
      }

      setproduits(data);
      if (response1.status === 200) {
        setloadingSelect(false);
      }
    }
  };

  const addProduitToPromo = (item, index) => {
    if (addedProduit.filter((itemx) => itemx._id === item._id).length === 0) {
      addedProduit.push(item);
    }

    const data = [...produits];
    data[index].added = !data[index].added;
    setproduits(data);
  };

  const getSearchedData = async (target) => {
    setloadingSelect(true);
    const res = await axiosConfigured.get(`/getAllProduits/${target}`);
    if (res) {
      setloadingSelect(false);
      setproduits(res.data);
    }
  };
  const classes = useStyles();

  return (
    <div className="ajouterBoutiqueFullContainet">
      <div className="ajoutBoutiqueContainer">
        <div className="ajoutBoutiqueForm">
          <Grid style={{ width: `75%` }}>
            <Paper elevation={20} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}></Avatar>
                <h2 style={headerStyle}>Ajout Promotion</h2>
                <Typography variant="caption" gutterBottom>
                  Remplir le Form pour Ajouter Une Promotion
                </Typography>
              </Grid>

              <form
                onSubmit={formikZ.handleSubmit}
                style={{
                  height: `1050px`,
                  display: `flex`,
                  justifyContent: `space-evenly`,
                  flexDirection: `column`,
                  marginTop: `100px`,
                }}
              >
                <FormControl style={{ width: "25%", marginTop: `20px` }}>
                  <InputLabel
                    style={{ width: "300px" }}
                    id="demo-simple-select-label"
                  >
                    Hanout
                  </InputLabel>
                  <Select
                    style={{ width: "300px" }}
                    labelId="id_hanout"
                    id="id_hanout"
                    name="id_hanout"
                    onChange={formikZ.handleChange}
                    value={formikZ.values.id_hanout}
                    onBlur={getProduit}
                  >
                    {boutiques.map((item, i) => (
                      <MenuItem key={i} value={item._id}>
                        {item.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl style={{ marginTop: `20px` }}>
                  <TextField
                    fullWidth
                    label="Nom de Promotion"
                    placeholder="Entrer Nom de Produit"
                    id="namePromo"
                    name="namePromo"
                    onChange={formikZ.handleChange}
                    value={formikZ.values.namePromo}
                  />
                </FormControl>

                <FormControl style={{ marginTop: `20px` }}>
                  <TextField
                    id="date"
                    label="Debut Promotion"
                    type="date"
                    name="date_Debut"
                    onChange={formikZ.handleChange}
                    value={formikZ.values.date_Debut}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />{" "}
                </FormControl>

                <FormControl style={{ marginTop: `20px` }}>
                  <TextField
                    id="date"
                    label="Fin Promotion"
                    type="date"
                    name="date_Fin"
                    onChange={formikZ.handleChange}
                    value={formikZ.values.date_Fin}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <FormControl
                  style={{ marginTop: `20px`, marginBottom: `50px` }}
                >
                  <TextField
                    fullWidth
                    label="Pourcentage"
                    placeholder="Entrer Pourcentage de Promotion"
                    id="pourcentage"
                    name="pourcentage"
                    type="number"
                    onChange={formikZ.handleChange}
                    value={formikZ.values.pourcentage}
                  />
                </FormControl>

                <Paper
                  elevation={3}
                  style={{
                    height: `500px`,
                    width: `95%`,
                  }}
                >
                  <TextField
                    fullWidth
                    style={{ marginTop: `20px`, width: `40%` }}
                    placeholder="Entrer Nom de Produit"
                    id="nom"
                    name="nom"
                    onChange={(e) => getSearchedData(e.target.value)}
                    //value={formikZ.values.nom}
                  />

                  {produits.length > 0 ? (
                    <div className="produitPromoConatainerSuperieur">
                      <div className="produitPromoConatainer">
                        {produits.map((item, index) => (
                          <div
                            key={index}
                            className="produitPromo"
                            onClick={() => addProduitToPromo(item, index)}
                          >
                            <img
                              src={`http://localhost:8000/images/produit/${item._id}/s/${item.thumbnail}`}
                            />
                            <div>
                              <h3>{item.nom} </h3>
                            </div>
                          </div>
                        ))}
                      </div>{" "}
                    </div>
                  ) : (
                    <h2 style={{ marginTop: `70px` }}>Choisi Hanout !</h2>
                  )}
                  {loadingSelect ? <BeatLoader /> : null}
                </Paper>
                <div className="addedProduitPromoion">
                  <h3>Added Produit</h3>
                  <div className="produiitContainrPromoAdded">
                    {addedProduit.map((item, i) => (
                      <div key={i} className="produitPromo">
                        <img
                          src={`http://localhost:8000/images/produit/${item._id}/s/${item.thumbnail}`}
                        />
                        <div>
                          <h3>{item.nom}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {loading ? (
                  <BeatLoader />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: `20% `, marginTop: `50px` }}
                    color="primary"
                  >
                    Add Promotion
                  </Button>
                )}
              </form>
            </Paper>

            <ToastContainer />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default AddPromotion;

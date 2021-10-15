import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { fetchCategorie } from "../../../../Redux/PannelSide/AddCategorieRedux/AddCategorieAction";
import { fetchBrand } from "../../../../Redux/PannelSide/BrandRedux/BrandAction";
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
import { ToastContainer } from "react-toastify";
import axios from "axios";

const AddProduit = () => {
  const dataForm = new FormData();
  const categorie = useSelector((state) => state.categoriePannel.categories);
  const brands = useSelector((state) => state.brandPannel.brands);
  const authData = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const paperStyle = {
    padding: "30px 20px",
    width: `100%`,
    margin: "20px auto",
    height: `750px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [boutiques, setboutiques] = useState([]);

  const [images, setimages] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:9005/api/getHanouts/${authData.userData._id}`
      );
      const data = (await response).data;
      if (response) {
        setloading(false);
      }
      setboutiques(data);
    })();
    dispatch(fetchCategorie());
    dispatch(fetchBrand());
  }, []);

  const formikZ = useFormik({
    initialValues: {
      nom: "",
      description: "",
      prix: null,
      id_categorie: 0,
      id_brand: null,
      quantitie: null,
      id_hanout: null,
    },
    onSubmit: async (values) => {
      //setloading(true)

      //

      const valuesRes = {
        ...values,
        id_categorie: Number(values.id_categorie),
        id_brand: Number(values.id_brand),
        images,
      };
      const _id = Date.now() + "pr";

      dataForm.append("nom", valuesRes.nom);
      dataForm.append("description", valuesRes.description);
      dataForm.append("prix", valuesRes.prix);
      dataForm.append("id_categorie", valuesRes.id_categorie);
      dataForm.append("id_brand", valuesRes.id_brand);
      dataForm.append("quantitie", valuesRes.quantitie);
      dataForm.append("id_hanout", valuesRes.id_hanout);
      dataForm.append("token", localStorage.getItem("token"));
      for (let i = 0; i < images.length; i++) {
        dataForm.append("images", images[i]);
      }

      const response = await axios.post(
        `http://localhost:8000/addImages/${_id}`,
        dataForm
      );

      if (response) {
        setloading(false);
      }
      /*    history.push('/listerProduit') */
    },
  });

  return (
    <div className="ajouterBoutiqueFullContainet">
      <div className="ajoutBoutiqueContainer">
        <div className="ajoutBoutiqueForm">
          <Grid style={{ width: `75%` }}>
            <Paper elevation={20} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}></Avatar>
                <h2 style={headerStyle}>Ajout Produit</h2>
                <Typography variant="caption" gutterBottom>
                  Remplir le Form pour Ajouter Un produit
                </Typography>
              </Grid>
              <form
                onSubmit={formikZ.handleSubmit}
                style={{
                  height: `650px`,
                  display: `flex`,
                  justifyContent: `space-evenly`,
                  flexDirection: `column`,
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
                  >
                    {boutiques.map((item, index) => (
                      <MenuItem key={index} value={item._id}>
                        {item.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Nom de Produit"
                  placeholder="Entrer Nom de Produit"
                  id="nom"
                  name="nom"
                  onChange={formikZ.handleChange}
                  value={formikZ.values.nom}
                />

                <TextField
                  multiline
                  rows={2}
                  rowsMax={4}
                  fullWidth
                  label="description"
                  placeholder="Entrer La Description "
                  id="description"
                  name="description"
                  onChange={formikZ.handleChange}
                  value={formikZ.values.description}
                />
                <TextField
                  fullWidth
                  label="prix"
                  type="number"
                  placeholder="Entrer Votre Numero Telephone "
                  id="prix"
                  name="prix"
                  onChange={formikZ.handleChange}
                  value={formikZ.values.prix}
                />

                <TextField
                  fullWidth
                  label="quantitie"
                  placeholder="Entrer Quantite de Produit"
                  id="quantitie"
                  name="quantitie"
                  type="number"
                  onChange={formikZ.handleChange}
                  value={formikZ.values.quantitie}
                />

                <FormControl style={{ width: "25%" }}>
                  <InputLabel
                    style={{ width: "300px" }}
                    id="demo-simple-select-label"
                  >
                    Categorie
                  </InputLabel>
                  <Select
                    style={{ width: "300px" }}
                    labelId="id_categorie"
                    id="id_categorie"
                    name="id_categorie"
                    onChange={formikZ.handleChange}
                    value={formikZ.values.id_categorie}
                  >
                    {categorie.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.categorieName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl style={{ width: "25%", marginTop: `20px` }}>
                  <InputLabel
                    style={{ width: "300px" }}
                    id="demo-simple-select-label"
                  >
                    Brand
                  </InputLabel>
                  <Select
                    style={{ width: "300px" }}
                    labelId="id_brand"
                    id="id_brand"
                    name="id_brand"
                    onChange={formikZ.handleChange}
                    value={formikZ.values.id_brand}
                  >
                    <MenuItem selected value={null}>
                      No Brand
                    </MenuItem>
                    {brands.map((item, i) => (
                      <MenuItem key={i} value={item.id}>
                        {item.brandName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl style={{ width: "100%", marginTop: `50px` }}>
                  <input
                    multiple
                    onChange={(e) => setimages(e.target.files)}
                    fullWidth
                    label="Prenom"
                    placeholder="Entrer Votre Prenom"
                    id="prenom"
                    name="prenom"
                    type="file"
                  />
                </FormControl>

                {loading ? (
                  <BeatLoader />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: `20%` }}
                    color="primary"
                  >
                    Add Produit
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

export default AddProduit;

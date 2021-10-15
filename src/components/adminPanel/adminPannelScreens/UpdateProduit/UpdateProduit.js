import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import { useParams } from "react-router";
import { axiosConfigured } from "../../../../axiosInstance";
import "./UpdateProduit.css";

const UpdateProduit = () => {
  const { idProduit } = useParams();
  const [productData, setproductData] = useState({});
  const dataForm = new FormData();
  const [loading] = useState(false);
  const paperStyle = {
    padding: "30px 20px",
    width: `100%`,
    margin: "20px auto",
    height: `750px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const [modaleIsOpen, setmodaleIsOpen] = useState(false);

  const formikZ = useFormik({
    initialValues: {
      nom: productData?.nom,
      description: productData?.description,
      prix: productData?.nom,
      quantitie: productData?.quantitie,
    },
    onSubmit: async (values) => {
      //setloading(true)

      //

      const valuesRes = {
        ...values,
        id_categorie: Number(values.id_categorie),
        id_brand: Number(values.id_brand),
      };

      dataForm.append("nom", valuesRes.nom);
      dataForm.append("description", valuesRes.description);
      dataForm.append("prix", valuesRes.prix);
      dataForm.append("quantitie", valuesRes.quantitie);
      dataForm.append("token", localStorage.getItem("token"));

      setmodaleIsOpen(true);
    },
  });

  useEffect(() => {
    (async () => {
      const response = await axiosConfigured.get(`/findProduit/${idProduit}`);
      if (response) {
        setproductData(response.data[0]);
      }
    })();
  }, []);
  console.log(productData);
  return (
    <div className="ajouterBoutiqueFullContainet">
      <div className="ajoutBoutiqueContainer">
        <div className="ajoutBoutiqueForm">
          <Grid style={{ width: `75%` }}>
            <Paper elevation={20} style={paperStyle}>
              <Grid align="center">
                <Avatar style={avatarStyle}></Avatar>
                <h2 style={headerStyle}>Modifier Produit</h2>
                <Typography variant="caption" gutterBottom>
                  Modifier le Form pour Modifier le produit
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

                {loading ? (
                  <BeatLoader />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: `20%` }}
                    color="primary"
                  >
                    Modifier Produit
                  </Button>
                )}
              </form>
            </Paper>

            <ToastContainer />
          </Grid>
        </div>
      </div>

      <Modal
        style={{
          overlay: {
            backgroundColor: `rgba(0,0,0,0.5)`,
          },
          content: {
            width: `500px`,
            height: `300px`,
            marginTop: `100px`,
            marginLeft: `35%`,
          },
        }}
        isOpen={modaleIsOpen}
        onRequestClose={() => setmodaleIsOpen(false)}
      >
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            height: `80%`,
            padding: `20px`,
          }}
        >
          <div
            style={{
              margin: `auto`,
            }}
          >
            <h1>Confirmee La Modification</h1>
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-evenly`,
                marginTop: `50px`,
              }}
            >
              <button
                style={{
                  height: `50px`,
                  width: `100px`,
                  border: `none`,
                  outline: `none`,
                  backgroundColor: `red`,
                  cursor: `pointer`,
                  color: `white`,
                  fontSize: `20px`,
                  borderRadius: `7px`,
                }}
              >
                Annuler
              </button>
              <input
                className="confirmeButton"
                style={{
                  height: `50px`,
                  width: `100px`,
                  border: `none`,
                  outline: `none`,

                  cursor: `pointer`,
                  color: `white`,
                  fontSize: `20px`,
                  borderRadius: `7px`,
                }}
                type="button"
                value="Confirmer"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateProduit;

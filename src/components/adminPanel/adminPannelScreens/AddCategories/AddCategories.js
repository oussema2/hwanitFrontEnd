import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { axiosConfigured } from "../../../../axiosInstance";
import "./AddCategories.css";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const AddCategories = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: `40%`,
    margin: "20px auto",
    height: `350px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const [categorieName, setcategorieName] = useState("");
  const history = useHistory();

  const onhandleCLick = async () => {
    try {
      const response = await axiosConfigured.post("/addCategorie", {
        categorieName: categorieName,
      });
      if (response) {
        history.push("/pannel/LesCategories");
      }
    } catch (error) {
      toast.error("Error de l'ajout de la Categorie");
    }
  };

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 style={headerStyle}>Register</h2>
            <Typography variant="caption" gutterBottom>
              Remplir le Form pour Ajouter un Produit Categorie
            </Typography>
          </Grid>
          <FormControl style={{ width: "100%" }}>
            <TextField
              onBlur={(e) => setcategorieName(e.target.value)}
              fullWidth
              label="Categorie Name"
              placeholder="Entrer Categorie Name"
              id="Categorie"
              name="Categorie"
            />
          </FormControl>

          <Button
            style={{ marginTop: `50px` }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={onhandleCLick}
          >
            Add Categorie
          </Button>
        </Paper>

        <ToastContainer />
      </Grid>
    </div>
  );
};

export default AddCategories;

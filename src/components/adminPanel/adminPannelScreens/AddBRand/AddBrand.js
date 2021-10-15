import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";

const AddBrand = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: `40%`,
    margin: "20px auto",
    height: `350px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [brandName, setbrandName] = useState("");
  const history = useHistory();
  const [images, setimages] = useState({});

  const onhandleCLick = async () => {
    const dataForm = new FormData();
    dataForm.append("brandName", brandName);
    dataForm.append("brandImages", images);

    try {
      const response = await axios.post(
        "http://localhost:9005/api/addBrand",
        dataForm,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response) {
        history.push("/pannel/LesBrands");
      }
    } catch (error) {
      toast.error("Erreur de l'ajout");
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
              Remplir le Form pour Créer un compt
            </Typography>
          </Grid>
          <FormControl style={{ width: "100%" }}>
            <TextField
              onBlur={(e) => setbrandName(e.target.value)}
              fullWidth
              label="Brand Name"
              placeholder="Entrer Brand Name"
              id="brand"
              name="brand"
            />
          </FormControl>
          <FormControl style={{ width: "100%", marginTop: `50px` }}>
            <TextField
              onChange={(e) => setimages(e.target.files[0])}
              fullWidth
              label="Prenom"
              placeholder="Entrer Votre Prenom"
              id="prenom"
              name="prenom"
              type="file"
            />
          </FormControl>

          <Button
            style={{ marginTop: `50px` }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={onhandleCLick}
          >
            Add Brand
          </Button>
        </Paper>

        <ToastContainer />
      </Grid>
    </div>
  );
};

export default AddBrand;

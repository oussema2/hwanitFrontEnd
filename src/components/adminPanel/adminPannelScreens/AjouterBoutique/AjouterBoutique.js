import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import "./AjouterBoutique.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypesBoutique } from "../../../../Redux/PannelSide/TypeBoutique/TypeBoutiqueActions";
import { axiosConfigured } from "../../../../axiosInstance";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";

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

const AjouterBoutique = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: `40%`,
    margin: "20px auto",
    height: `550px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const typeHanout = useSelector((state) => state.typeHanoutPannel.typeHanout);
  const [cookies] = useCookies(["userId"]);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const [images, setimages] = useState({});
  const formData = new FormData();
  useEffect(() => {
    dispatch(fetchTypesBoutique());
  }, []);
  const formik = useFormik({
    initialValues: {
      nom: "",
      adress: "",
      id_idOwner: cookies.userId,
      id_typehanouts: "",
    },
    onSubmit: async (values) => {
      formData.append("nom", values.nom);
      formData.append("adress", values.adress);
      formData.append("id_idOwner", values.id_idOwner);
      formData.append("id_typehanouts", values.id_typehanouts);
      formData.append("imageHAnout", images);

      setloading(true);

      const response = await axiosConfigured.post("/addHanout", formData);
      if (response) {
        setloading(false);
      }
      history.push("/pannel/ToutBoutiques");
    },
  });

  return (
    <div className="ajouterBoutiqueFullContainet">
      <Grid style={{ width: `100%` }}>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}></Avatar>
            <h2 style={headerStyle}>Register</h2>
            <Typography variant="caption" gutterBottom>
              Remplir le Form pour Créer un compt
            </Typography>
          </Grid>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              height: `450px`,
              display: `flex`,
              justifyContent: `space-evenly`,
              flexDirection: `column`,
            }}
          >
            <FormControl style={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Nom Hanout"
                placeholder="Entrer Nom Hanout"
                id="nom"
                name="nom"
                onChange={formik.handleChange}
                value={formik.values.nom}
              />
            </FormControl>

            <FormControl style={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Adress Hanout"
                placeholder=" Enter Adress  Hanout"
                id="adress"
                name="adress"
                onChange={formik.handleChange}
                value={formik.values.adress}
              />
            </FormControl>

            <FormControl style={{ width: "25%" }}>
              <InputLabel
                style={{ width: "300px" }}
                id="demo-simple-select-label"
              >
                Type Hanout
              </InputLabel>
              <Select
                style={{ width: "300px" }}
                labelId="id_typehanouts"
                id="id_typehanouts"
                name="id_typehanouts"
                onChange={formik.handleChange}
                value={formik.values.id_typehanouts}
              >
                {typeHanout.map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.nomType}
                  </MenuItem>
                ))}
              </Select>

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
            </FormControl>

            {loading ? (
              <BeatLoader />
            ) : (
              <Button
                style={{ marginTop: `50px` }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Add Brand
              </Button>
            )}
          </form>
        </Paper>

        <ToastContainer />
      </Grid>
    </div>
  );
};

export default AjouterBoutique;

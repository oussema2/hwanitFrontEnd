import React from "react";
import "./Register.css";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import { useFormik } from "formik";
import { axiosConfigured } from "../../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";

const Register = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: `40%`,
    margin: "20px auto",
    height: `750px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const history = useHistory();

  const formikZ = useFormik({
    initialValues: {
      nom: "",
      prenom: "",
      numTel: null,
      email: "",
      password: "",
      Confirmpassword: "",
      type: "",
    },
    onSubmit: async (values) => {
      const res = await axiosConfigured.post("/register", values);
      const data = res.data;
      if (res.data === "user Exist") {
        toast.warning("Erreur Dans la Registration Email deja Utilisé");
      } else {
        toast.success("Registrer avec success");

        document.cookie = data._id;
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    },
  });
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Register</h2>
          <Typography variant="caption" gutterBottom>
            Remplir le Form pour Créer un compt
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
            label="Prenom"
            placeholder="Entrer Votre Prenom"
            id="prenom"
            name="prenom"
            onChange={formikZ.handleChange}
            value={formikZ.values.prenom}
          />
          <TextField
            fullWidth
            label="nom"
            placeholder="Entrer Votre Nom "
            id="nom"
            name="nom"
            onChange={formikZ.handleChange}
            value={formikZ.values.nom}
          />
          <TextField
            fullWidth
            label="numTel"
            type="number"
            placeholder="Entrer Votre Numero Telephone "
            id="numTel"
            name="numTel"
            onChange={formikZ.handleChange}
            value={formikZ.values.numTel}
          />

          <TextField
            fullWidth
            label="Email"
            placeholder="Entrer Votre Email"
            id="email"
            name="email"
            onChange={formikZ.handleChange}
            value={formikZ.values.email}
          />

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            id="password"
            name="password"
            type="password"
            onChange={formikZ.handleChange}
            value={formikZ.values.password}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            placeholder="Confirm your password"
            id="Confirmpassword"
            name="Confirmpassword"
            type="password"
            onChange={formikZ.handleChange}
            value={formikZ.values.Confirmpassword}
          />
          <FormControl style={{ width: "25%" }}>
            <InputLabel
              style={{ width: "300px" }}
              id="demo-simple-select-label"
            >
              Type Compte
            </InputLabel>
            <Select
              style={{ width: "300px" }}
              labelId="type"
              id="type"
              name="type"
              onChange={formikZ.handleChange}
              value={formikZ.values.type}
            >
              <MenuItem value="Client">Client</MenuItem>
              <MenuItem value="Vendor">Vendor</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button type="submit" variant="contained" color="primary">
            Sign up
          </Button>
        </form>
      </Paper>

      <ToastContainer />
    </Grid>
  );
};

export default Register;

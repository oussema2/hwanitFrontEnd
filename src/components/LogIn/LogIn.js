import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useFormik } from "formik";
import { axiosConfigured } from "../../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { logIn } from "../../Redux/UserSide/UserAuth/UserAuthAction";
import Loader from "react-loader-spinner";

const LogIn = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: `27%`,
    margin: "auto",
    height: `400px`,
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const [loading, setloading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const setCookie = useCookies(["userId"])[1];
  const formikZ = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setloading(true);
      const response = await axiosConfigured.post(`/logIn`, values);

      const data = response.data.user;
      if (response.data.status !== 200) {
        toast.error("Erreur Verifier Votre Mot De Pass ou Email");
        setloading(false);
      } else {
        localStorage.setItem("token", response.data.token);

        setCookie("userId", data._id, { path: "/" });

        dispatch(
          logIn({
            _id: data._id,
            userNom: data.nom,
            userPrenom: data.prenom,
            userEmail: data.email,
            userType: data.type,
            userNumTel: data.numTel,
          })
        );
        setloading(false);
        history.push("/");
      }
    },
  });
  return (
    <Grid
      style={{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        height: `100vh`,
      }}
    >
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>LogIn</h2>
          <Typography variant="caption" gutterBottom>
            Remplir le Form pour Ouvrir Votre Compt
          </Typography>
        </Grid>
        <form
          onSubmit={formikZ.handleSubmit}
          style={{
            height: "250px",
            display: `flex`,
            justifyContent: `space-between`,
            flexDirection: `column`,
          }}
        >
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

          {loading === true ? (
            <div
              style={{
                width: `100%`,
                display: `flex`,

                justifyContent: `center`,
              }}
            >
              <Loader type="Oval" color="#00BFFF" height={30} width={50} />
            </div>
          ) : (
            <Button
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                height: `40px`,
              }}
              type="submit"
              variant="contained"
              color="primary"
            >
              <span>LogIn</span>
            </Button>
          )}
        </form>
      </Paper>

      <ToastContainer />
    </Grid>
  );
};

export default LogIn;

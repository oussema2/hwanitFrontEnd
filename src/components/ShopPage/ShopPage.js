import React, { useEffect, useState } from "react";
import { axiosConfigured } from "../../axiosInstance";
import "./ShopPage.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: 345,
  },
  media: {
    height: 340,
  },
});
const ShopPage = () => {
  const [hwanit, sethwanit] = useState([]);
  const [typeHanouts, settypeHanouts] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axiosConfigured.get("/getHanouts");
      /*             const response1 = await axiosConfigured.get(`/getlikedHanout/${f}`)
       */
      const rep = await axiosConfigured.get(`/getTypeHanouts`);

      settypeHanouts(rep.data.vendor);
      sethwanit(response.data);
    })();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <div>
        <h1>hello in shop comp</h1>
      </div>

      <div className="hwanitCardsContainer">
        {hwanit.map((item, index) => (
          <div key={index} className=" cardHanout">
            <Card className={`${classes.root}`} style={{ width: `400px` }}>
              <Link
                to={`/produits/han/${item._id}/1`}
                style={{ textDecoration: `none` }}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`http://127.0.0.1:9005/${item.imageHAnout}`}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <div className="titleHanout">
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.nom}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        type :{" "}
                        {
                          typeHanouts.filter((itemx) => itemx.id === 3)[0]
                            ?.nomType
                        }
                      </Typography>
                    </div>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Adress : {item.adress}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Link to={`/produits/han/${item._id}/1`}>
                  <Button size="small" color="primary">
                    Visit Hanout
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;

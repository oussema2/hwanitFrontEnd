/* eslint-disable react/prop-types */
import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BeatLoader } from "react-spinners";
import { AiOutlineEdit } from "react-icons/ai";

import "./TableData.css";
import { Link, useHistory } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 17,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

export default function TableData(props) {
  const classes = useStyles();
  const history = useHistory();

  const redirect = (id) => {
    history.push(`/pannel/${id}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.tableHead.map((item, i) => (
              <StyledTableCell key={i} align="center">
                {item}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ alignItems: "center" }}>
          {props.typeData !== "Boutique" ? null : props.loading ? (
            <div>
              {" "}
              <BeatLoader size={40} />
            </div>
          ) : (
            props.dataBody.map((bout) => (
              <StyledTableRow key={bout.name}>
                <StyledTableCell component="th" scope="row">
                  {bout._id}
                </StyledTableCell>
                <StyledTableCell align="center">{bout.nom}</StyledTableCell>
                <StyledTableCell align="center">{bout.adress}</StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    className="buttonAction"
                    onClick={() => props.delete(bout._id)}
                  >
                    Supprimer
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}

          {props.typeData !== "Categories"
            ? null
            : props.dataBody.map((cat) => (
                <StyledTableRow key={cat.id}>
                  <StyledTableCell component="th" scope="row">
                    {cat.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {cat.categorieName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      className="buttonAction"
                      onClick={() => props.delete(cat.id)}
                    >
                      Supprimer
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}

          {props.typeData !== "Brands"
            ? null
            : props.dataBody.map((brand) => (
                <StyledTableRow key={brand.id}>
                  <StyledTableCell component="th" scope="row">
                    {brand.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {brand.brandName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      className="buttonAction"
                      onClick={() => props.delete(brand.id)}
                    >
                      Supprimer
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}

          {props.typeData !== "commandes"
            ? null
            : props.dataBody.map((commande) => (
                <StyledTableRow
                  key={commande.commandeHanoutdetail[0].idCommande}
                >
                  <StyledTableCell align="center" component="th" scope="row">
                    {commande.dateCommande}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {commande.commandeHanoutdetail[0].nombreProduit}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {commande.total} TND
                  </StyledTableCell>

                  {commande.delivred === 0 ? (
                    <StyledTableCell align="center">
                      <button
                        className="buttonAction notDelivred"
                        onClick={() => props.delete(commande.id)}
                      >
                        Not Delivred
                      </button>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <button
                        className="buttonAction delivred"
                        onClick={() => props.delete(commande.id)}
                      >
                        Delivred
                      </button>
                    </StyledTableCell>
                  )}

                  <StyledTableCell
                    align="center"
                    onClick={() =>
                      redirect(commande.commandeHanoutdetail[0].id)
                    }
                  >
                    {" "}
                    voir detail
                  </StyledTableCell>
                </StyledTableRow>
              ))}

          {props.typeData !== "commandeTransporter"
            ? null
            : props.dataBody.map((commande) => (
                <StyledTableRow key={commande._id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {commande._id}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {commande.numTelDestinataire}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {commande.addressDestinataire}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {commande.productNumber} TND
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {commande.dateCommande} TND
                  </StyledTableCell>

                  {commande.delivredTransporteur === 0 ? (
                    <StyledTableCell align="center">
                      <button
                        className="buttonAction notDelivred"
                        onClick={() => props.delete(commande.id)}
                      >
                        Not Delivred
                      </button>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">
                      <button
                        className="buttonAction delivred"
                        onClick={() => props.delete(commande.id)}
                      >
                        Delivred
                      </button>
                    </StyledTableCell>
                  )}

                  <StyledTableCell
                    align="center"
                    onClick={() => redirect(commande._id)}
                  >
                    {" "}
                    voir detail
                  </StyledTableCell>
                </StyledTableRow>
              ))}

          {props.typeData !== "Produit" ? null : props.dataBody ? (
            props.dataBody.map((prod) => (
              <StyledTableRow key={prod._id}>
                <StyledTableCell component="th" scope="row">
                  {prod._id}
                </StyledTableCell>
                <StyledTableCell align="center">{prod.nom}</StyledTableCell>
                <StyledTableCell align="center">
                  {prod.description}
                </StyledTableCell>
                <StyledTableCell align="center">{prod.prix}</StyledTableCell>
                <StyledTableCell align="center">
                  {prod.quantitie}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {props.getCat(prod.id_categorie)}
                </StyledTableCell>
                <StyledTableCell align="center" className="actionTable">
                  <FaRegTrashAlt
                    className="deleteIconListPRoduitAdmin"
                    onClick={() => props.delete(prod._id)}
                  />
                  <Link to={`/pannel/updateProduit/${prod._id}`}>
                    <AiOutlineEdit />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <h1>Select un Hanout ou vous n &lsquo avez pas des produits</h1>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

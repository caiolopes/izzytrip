import React, { Component } from "react";
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import SwipeDeck from "../components/SwipeDeck.js";

class BuildItineraryCityPage extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Typography variant="headline">Selecione atrações</Typography>
          <Typography>Arraste para direita para selecionar ou esquerda para retirar</Typography>
          <SwipeDeck />
        </Grid>
      </Grid>
    );
  }
}

export default BuildItineraryCityPage;

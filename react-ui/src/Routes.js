import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CssBaseline from 'material-ui/CssBaseline';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import SearchPage from "./pages/SearchPage";
import Itinerary from "./pages/ItineraryPage";
import BuildItinerary from "./pages/BuildItineraryPage";
import BuildItineraryCity from "./pages/BuildItineraryCityPage";
import ItineraryList from "./pages/ItineraryListPage";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  button: {
    textDecoration: 'none',
  }
};

class Routes extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  IzzyTrip
                </Typography>
                <Link to="/" className={classes.button}><Button>Buscar itinerários</Button></Link>
                <Link to="/build/it" className={classes.button}><Button>Criar itinerário</Button></Link>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route exact path="/list/it/:city" component={ItineraryList} />
              <Route exact path="/it" component={Itinerary} />
              <Route exact path="/build/it" component={BuildItinerary} />
              <Route exact path="/build/it/new/:city" component={BuildItineraryCity} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Routes);

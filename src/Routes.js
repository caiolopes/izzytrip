import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "material-ui/CssBaseline";
import SearchPage from "./pages/SearchPage";
import Itinerary from "./pages/ItineraryPage";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/it" component={Itinerary} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

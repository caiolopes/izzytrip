import React, { Component, Fragment } from "react";
import Tinder from "../components/Tinder.js";

const s = {
  width: 400,
  height: 400
};

class BuildItineraryCityPage extends Component {
  render() {
    return (
      <div style={s}>
        <Tinder />
      </div>
    );
  }
}

export default BuildItineraryCityPage;

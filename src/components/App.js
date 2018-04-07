import React, { Component } from "react";
import Maps from "./Maps";
import { width } from "window-size";

const div_style = {
  height: 200,
  width: 200
};

class App extends Component {
  render() {
    return (
      <div>
        <div style={div_style}>
          <Maps />
        </div>
      </div>
    );
  }
}

export default App;

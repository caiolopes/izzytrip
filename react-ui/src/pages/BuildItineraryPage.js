import React, { Component } from "react";
import SearchPage from "./SearchPage";
import image from "./beach.jpg";

class BuildItineraryPage extends Component {
  render() {
    return (
      <div>
        <SearchPage
          headline="Organize sua viagem"
          buttonText="Criar"
          pathname="/build/it/new"
          image={image}
        />
      </div>
    );
  }
}

export default BuildItineraryPage;

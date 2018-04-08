import React, { Component, Fragment } from "react";
import SearchPage from './SearchPage';
import image from './beach.jpg';

class BuildItineraryCityPage extends Component {
  render() {
    return (
      <Fragment>
        <SearchPage
          headline="Organize sua viagem"
          buttonText="Criar"
          pathname="build/it/new"
          image={image} />
      </Fragment>
    );
  }
}

export default BuildItineraryCityPage;

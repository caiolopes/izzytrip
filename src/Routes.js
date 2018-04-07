import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';

import SearchPage from './pages/SearchPage';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <SearchPage />
      </React.Fragment>
    );
  }
}

export default App;

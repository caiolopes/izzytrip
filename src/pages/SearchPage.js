import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppSearch from '../components/AppSearch';

const styles = theme => ({
  text: {
  },
  search: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const image = "https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5297440765001_5280261645001-vs.jpg?pubId=5104226627001&videoId=5280261645001";

class SearchPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Parallax bgImage={image} blur={{min: -1,max:3}}>
          <div className={classes.search}>
            <Typography variant="display1" className={classes.text}>Aonde você quer ir?</Typography>
            <br />
            <AppSearch />
          </div>
        </Parallax>
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import tileData from "./tileData";
import * as api from "../api";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1000,
    height: 640
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     image: data[i].image,
 *     location: geocode.displayString,
 *     name: data[i].name,
 *     id : data[i].id
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
class ItineraryListPage extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    const city = this.props.match.params.city;
    api.getPlaces(city).then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;

    return (
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }} />
          {data.map((item, key) => (
            //<Link to={"/it/"}>
            <GridListTile key={item.image}>
              <a href={`/it/${key}`}>
                <img src={item.image} alt={item.image} />
                <GridListTileBar
                  title={item.location.city}
                  subtitle={<span>{item.name}</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <Icon>info</Icon>
                    </IconButton>
                  }
                />
              </a>
            </GridListTile>
            //</Link>
          ))}
        </GridList>
      </div>
    );
  }
}

ItineraryListPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItineraryListPage);

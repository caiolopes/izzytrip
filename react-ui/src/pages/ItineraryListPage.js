import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import tileData from "./tileData";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1200,
    height: 600
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
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ItineraryListPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }} />
        {tileData.map(tile => (
          //<Link to={"/it"}>
            <GridListTile key={tile.img}>
              <a href={"/it"} ><img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
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

ItineraryListPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItineraryListPage);

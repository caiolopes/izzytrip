import React, { Component } from "react";
import Typography from 'material-ui/Typography';
import Cards, { Card } from "react-swipe-card";
import * as api from '../api';
import "./styles.css";

class SwipeDeck extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    api.getPlaces('').then(res => {
      this.setState({ data: res.data });
    });
  }

  handleEnd = () => {};

  render() {
    const { data } = this.state;

    return (
      <div>
        <Cards onEnd={() => console.log("end")} className="master-root">
          {data.map((item, key) => (
            <Card
              onSwipeLeft={() => console.log("left")}
              onSwipeRight={() => console.log("right")}
              key={key}
            >
              <div className="place-container">
                <img src={item.image} />
                <div className="overlay-title">
                  <Typography variant="title" style={{color: 'white'}}>{item.name}</Typography>
                  <Typography>{item.local}</Typography>
                </div>
              </div>
            </Card>
          ))}
        </Cards>
      </div>
    );
  }
}

export default SwipeDeck;

import React, { Component } from "react";
import Cards, { Card } from "react-swipe-card";
import * as api from '../api';
import "./styles.css";

class SwipeDeck extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    api.getPlaces('').then(res => {
      const data = res.data.map((place, index) => {
        console.log(place.image);
        if (place.image) {
          return {
            ...place,
            backgroundImage: `url(${place.image})`
          };
        }
      });
      this.setState({ data });
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
              style={{backgroundImage: item.backgroundImage}}
            >
              <div className="Title">
                <h2>{item.name}</h2>
                <p>{item.local}</p>
              </div>
            </Card>
          ))}
        </Cards>
      </div>
    );
  }
}

export default SwipeDeck;

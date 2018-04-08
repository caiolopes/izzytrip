import React, { Component, Fragment } from "react";
import Cards, { Card } from "react-swipe-card";

class Tinder extends Component {
  render() {
    const data = ["Alexandre", "Thomas", "Lucien"];

    return (
      <Cards className="master-root">
        {data.map(item => (
          <Card
            onSwipeLeft={() => console.log("left")}
            onSwipeRight={() => console.log("right")}
          >
            <h2>{item}</h2>
          </Card>
        ))}
      </Cards>
    );
  }
}

export default Tinder;

import React, { Component } from "react";
import Cards, { Card } from "react-swipe-card";
import "./styles.css";

const data = [
  {
    name: "Taberna",
    local: "Av. ",
    img:
      "https://img3.ibxk.com.br/2017/10/20/20152659110210.jpg?w=480&h=280&mode=crop"
  },
  {
    name: "Bar",
    local: "Rua do ",
    img:
      "https://img3.ibxk.com.br/2017/10/20/20152659110210.jpg?w=480&h=280&mode=crop"
  },
  {
    name: "Cachoeirra",
    local: "Deserto",
    img:
      "https://img3.ibxk.com.br/2017/10/20/20152659110210.jpg?w=480&h=280&mode=crop"
  }
];

class SwipeDeck extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    // Call API to fetch the data
    const data = data.map((item, index) => {
      return {
        ...item,
        backgroundImage: `url(${item.img})`
      };
    });

    this.setState({ data });
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
              style={item.backgroundImage}
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

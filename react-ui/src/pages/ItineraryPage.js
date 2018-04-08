import React, { Component } from "react";
import Maps from "../components/Maps.js";

import * as api from "../api";

import "./ItineraryPage.css";

class Itinerary extends Component {
  state = {
    data: null,
    markers: null,
    index: 0
  };

  componentDidMount = () => {
    const index = this.props.match.params.id ? this.props.match.params.id : 0;
    this.setState({ index });

    api.getIt().then(res => {
      this.setState({ data: res });

      let loc = res.data[index].places.map(place => {
        return {
          lat: place.location.lat,
          lng: place.location.lng,
          name: place.name,
          phone: place.contact.phone,
          url: place.url
        };
      });

      this.setState({ markers: loc });
      // }
    });
  };

  render() {
    const { index } = this.state;

    if (this.state.data) {
      // console.log(this.state.data.data[0].likes);

      return (
        <div>
          <div className="split left">
            {this.state.markers && (
              <Maps
                center={{ lat: -23.5506396, lng: -46.5915389 }}
                markers={this.state.markers}
              />
            )}
          </div>
          <div className="split right">
            <div>
              <img
                className="image_preview"
                src="http://alaya.com.br/wp-content/uploads/2014/11/nascente-areia-que-canta-brotas.jpg"
                alt="Brotas"
              />
            </div>
            <div className="content">
              <div>
                <h2>{this.state.data.data[index].title}</h2>
                <p>{this.state.data.data[index].places[0].hours.status} </p>
                <img src="https://png.icons8.com/ios/25/000000/facebook.png" />
                <img src="https://png.icons8.com/wired/25/000000/facebook-like.png" />
                {this.state.data.data[index].likes}
                <div className="line" />
              </div>
              <div>
                <p>{this.state.data.data[index].description}</p>
              </div>
              <div className="line" />
              <h3>Principais pontos</h3>
              <div className="col">
                <div className="col-1">
                  <ul>
                    <li>
                      <img
                        className="icon"
                        src="https://png.icons8.com/ios/50/000000/bank.png"
                      />
                      <b>Gasto total</b>: {this.state.data.data[index].budget}
                    </li>
                    <li>
                      <img
                        className="icon"
                        src="https://png.icons8.com/ios/50/000000/home.png"
                      />
                      <b>Acomodações</b>: Hostel
                    </li>
                    <li>
                      <img
                        className="icon"
                        src="https://png.icons8.com/ios/50/000000/clock.png"
                      />
                      <b>Duração</b>: {this.state.data.data[index].time}
                    </li>
                    <li>
                      <img
                        className="icon"
                        src="https://png.icons8.com/ios/50/000000/airport.png"
                      />
                      <b>Transporte</b>: Carro
                    </li>
                  </ul>
                </div>
              </div>
              <div className="line" />
              <div className="user">
                <h3>Contato</h3>
                <div className="borda-user">
                  <img
                    className="img-user"
                    src="https://png.icons8.com/ios/50/000000/contacts.png"
                  />
                  <p className="nome-user">
                    <b>Paulo Gandalf</b>
                  </p>

                  <p className="text-user">
                    Bacon ipsum dolor amet pancetta andouille sirloin, bacon
                    leberkas pork chop tri-tip prosciutto capicola cupim
                    drumstick fatback pastrami
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Itinerary;

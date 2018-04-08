import React, { Component } from "react";
import Maps from "../components/Maps.js";

import "./ItineraryPage.css";

class Itinerary extends Component {
  render() {
    return (
      <div>
        <div className="split left">
          <Maps
            markers={[
              { lat: -23.5506396, lng: -46.5915389 },
              { lat: -23.5891025, lng: -46.6839002 }
            ]}
          />
        </div>
        <div className="split right">
          <div>
            <img
              className="image_preview"
              src="http://alaya.com.br/wp-content/uploads/2014/11/nascente-areia-que-canta-brotas.jpg"
              alt="sei la"
            />
          </div>
          <div className="content">
            <div>
              <h2>Muchilão lou cost</h2>
              <div className="line" />
            </div>
            <div>
              <p>
                Bacon ipsum dolor amet pancetta andouille sirloin, bacon
                leberkas pork chop tri-tip prosciutto capicola cupim drumstick
                fatback pastrami. Cupim sirloin beef ribs andouille. Shoulder
                porchetta turkey tenderloin beef, boudin kielbasa prosciutto
                chicken pancetta ribeye buffalo. Hamburger kevin sausage picanha
                ball tip kielbasa.
              </p>
            </div>
            <div className="line" />
            <div className="info"> 200 reais, 4 horas</div>
            <div className="line" />
            <div className="user"> User </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Itinerary;

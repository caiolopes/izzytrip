import React, { Component } from "react";
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Cards, { Card } from "react-swipe-card";
import * as api from '../api';
import "./styles.css";


class SwipeDeck extends Component {
  constructor(props) {
    super(props);

    this.liked = [];
  }

  shouldComponentUpdate() {
    return false;
  }

  updateInfo(item) {
    const $ = window.$;

    const address = item.location.formattedAddress.join(' ');
    const categories = item.categories.map(c => c.name).join(', ');
    const html = `
        <p><b>Endereço:</b> ${address}</p>
        <p><b>Categoria:</b> ${categories}</p>
        <p><b>Verificado:</b> ${item.verified ? 'Sim' : 'Não'}</p>
        <p><b>Site:</b> ${item.url ? item.url : ''}</p>
        <p><b>Estatítsicas:</b>
        <table>
        <tr><th>Dicas</th><th>Usuários</th><th>Checkins</th>
        <tr>
          <td>${item.stats.tipCount}</td>
          <td>${item.stats.usersCount}</td>
          <td>${item.stats.checkinsCount}</td>
        </tr>
        </table>
        `;
    $('#place-info').html(html);
  }

  componentDidMount() {
    const $ = window.$;
    const paths = window.location.pathname.split('/');
    const city = decodeURIComponent(paths[paths.length-1].trim());
    console.log(city);
    api.getPlaces(city).then(res => {
      this.response = res;
      const ul = $("#tinderslide").find('ul');
      ul.empty();
      if (res && res.data) {

        const data = res.data;
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          let li = $('<li/>');
          let divLike = $('<div/>');
          divLike.addClass('like');
          let divDislike = $('<div/>');
          divDislike.addClass('dislike');
          let divName = $('<div/>');
          divName.text(item.name);
          let divImg = $('<div/>');
          divImg.addClass('img');
          divImg.css("background", `url("${item.image}") no-repeat scroll center center`);
          divImg.css("background-size", "cover");
          li.append(divImg);
          li.append(divName);
          li.append(divLike);
          li.append(divDislike);
          ul.append(li);
        }

        if (data.length > 0) {
          this.updateInfo(data[data.length - 1]);
        }

        $("#tinderslide").jTinder({
          onDislike: (item) => {
            if (data[item.index()-1]) this.updateInfo(data[item.index()-1]);
          },
          onLike: (item) => {
            if (data[item.index()-1]) this.updateInfo(data[item.index()-1]);
            this.liked.push(data[item.index()]);
            console.log(this.liked);
          },
          animationRevertSpeed: 200,
          animationSpeed: 400,
          threshold: 1,
          likeSelector: '.like',
          dislikeSelector: '.dislike'
        });

        $('.actions .like, .actions .dislike').click(function(e){
          e.preventDefault();
          $("#tinderslide").jTinder($(this).attr('class'));
        });
      }
    });
  }

  createItinerary = (e) => {
    api.createItinerary({geocode: this.response.geocode, places: this.liked}).then(res => {
      window.location = '/';
    });
  }

  render() {
    return (
      <Grid container justify="center">
        <Grid item md={6}>
          <div className="wrap">
            <div id="tinderslide">
              <ul>
              </ul>
            </div>
            <div className="actions">
              <a href="#" className="dislike"><i></i></a>
              <a href="#" className="like"><i></i></a>
            </div>
          </div>
        </Grid>
        <Grid item md={6}>
          <div id="place-info">
          </div>
        </Grid>
        <div style={{right: 0, marginLeft: 100}}><Button variant="raised" color="primary" onClick={this.createItinerary}>Criar</Button></div>
      </Grid>
    );
  }
}

export default SwipeDeck;

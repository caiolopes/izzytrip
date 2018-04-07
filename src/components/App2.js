import React, { Component } from 'react';
import data from '../data/trip';


const nstyle = {
  display: 'inline-block'
};

class Block extends Component{
	render() {
  return (<div style ={nstyle}>{this.props.data}<br/><img src={this.props.image}></img><br/>{this.props.price}</div>);
  };
}


class App extends Component {

  render() {
    console.log(data.awards);
    return (
      <div>
        <p>{data.address_obj.street1}</p>
        <Block data = '2 dias' image='' price = 'R$ 200 ~ 300'/>
        <Block data = '3 dias' image='' price = 'R$ 400 ~ 500'/>
      



        
      </div>
    );
    

  }
}

export default App;

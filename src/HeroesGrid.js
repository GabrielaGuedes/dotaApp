import React, { Component } from "react";
import "./HeroesGrid.css";
import HeroCard from "./HeroCard.js";

class HeroesGrid extends Component {
  state = {
    heroSelected: []
  };

  putHeroesInGrid = () => {
    if (this.props.heroes.length > 0) {
      return this.props.heroes.map(hero => {
        return <HeroCard hero={hero} />;
      });
    }
  };

  render() {
    return <div id="grid">{this.putHeroesInGrid()}</div>;
  }
}

export default HeroesGrid;

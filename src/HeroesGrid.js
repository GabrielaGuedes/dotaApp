import React, { Component } from "react";
import "./HeroesGrid.css";

class HeroesGrid extends Component {
  state = {};

  putHeroesInGrid = () => {
    if (this.props.heroes.length > 0) {
      return this.props.heroes.map(hero => {
        return (
          <div className="hero">
            <img className="imagem" src={"http://cdn.dota2.com" + hero.img} />
            <div className="heroInfo">
              <p className="hero-name">
                {hero.localized_name}{" "}
                <img
                  className="icon"
                  src={this.iconHeroType(hero.primary_attr)}
                />
              </p>
              <p className="hero-main-role">Main role: {hero.roles[0]}</p>
            </div>
          </div>
        );
      });
    }
  };

  iconHeroType = type => {
    switch (type) {
      case "int":
        return "https://pt.dotabuff.com/assets/hero_int-76ea2af3bdf60a1c92d82a1fc0845d47a071cfacfca111aa2d5e43fbae01b580.png";
      case "str":
        return "https://pt.dotabuff.com/assets/hero_str-eac64b6191e66b593d7f1ac81bb262afed6565794d8f9014d66b0cbc99fa3d01.png";
      case "agi":
        return "https://pt.dotabuff.com/assets/hero_agi-693306f455235ff5628c3429a80f2dc7e7795c013c540832dbba61ab691a73b5.png";
    }
  };

  render() {
    return <div id="grid">{this.putHeroesInGrid()}</div>;
  }
}

export default HeroesGrid;

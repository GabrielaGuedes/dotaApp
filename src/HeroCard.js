import React, { Component } from "react";
import { getItems } from "./HttpClient";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class HeroCard extends Component {
  state = {};
  render() {
    return (
      <div className="hero" onClick={this.handleClick}>
        <Link to={"/" + this.props.hero.id}>
          <img
            className="imagem"
            alt=""
            src={"http://cdn.dota2.com" + this.props.hero.img}
          />
        </Link>
        <div className="heroInfo">
          <p className="hero-name">
            {this.props.hero.localized_name}{" "}
            <img
              className="icon"
              alt=""
              src={this.iconHeroType(this.props.hero.primary_attr)}
            />
          </p>
          <p className="hero-main-role">
            Main role: {this.props.hero.roles[0]}
          </p>
        </div>
      </div>
    );
  }

  iconHeroType = type => {
    switch (type) {
      case "int":
        return "https://pt.dotabuff.com/assets/hero_int-76ea2af3bdf60a1c92d82a1fc0845d47a071cfacfca111aa2d5e43fbae01b580.png";
      case "str":
        return "https://pt.dotabuff.com/assets/hero_str-eac64b6191e66b593d7f1ac81bb262afed6565794d8f9014d66b0cbc99fa3d01.png";
      case "agi":
        return "https://pt.dotabuff.com/assets/hero_agi-693306f455235ff5628c3429a80f2dc7e7795c013c540832dbba61ab691a73b5.png";
      default:
        return " ";
    }
  };
}

export default HeroCard;

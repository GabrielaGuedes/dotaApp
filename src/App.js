import React from "react";
import "./App.css";
import Header from "./Header";
import HeroesGrid from "./HeroesGrid";

class App extends React.Component {
  state = {
    heroes: []
  };

  componentDidMount() {
    this.getRequestInJSON("https://api.opendota.com/api/heroStats").then(
      heroesGot => {
        this.setState({
          heroes: heroesGot,
          allHeroes: heroesGot
        });
      }
    );
  }

  getRequestInJSON = url => {
    return fetch(url).then(response => response.json());
  };

  filterHeroes = heroSearched => {
    if (heroSearched === "") {
      this.setState(prevState => {
        return { heroes: prevState.allHeroes };
      });
    } else {
      this.setState(prevState => {
        return {
          heroes: prevState.allHeroes.filter(function(elem, index, array) {
            return (
              elem.localized_name
                .substring(0, heroSearched.length)
                .toLowerCase() === heroSearched.toLowerCase()
            );
          })
        };
      });
    }
  };

  render() {
    return (
      <div>
        <Header filterHeroes={this.filterHeroes} />
        <div className="heroes-grid-container">
          <HeroesGrid heroes={this.state.heroes} />
        </div>
      </div>
    );
  }
}

export default App;

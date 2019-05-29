import React from "react";
import Header from "./Header.js";
import HeroesGrid from "./HeroesGrid.js";
import "./App.js";
import { getHeroes } from "./HttpClient.js";

class App extends React.Component {
  state = {
    heroes: []
  };

  componentDidMount() {
    getHeroes().then(heroes => {
      this.setState({
        heroes: heroes,
        allHeroes: heroes
      });
    });
  }

  filterHeroes = heroSearched => {
    if (heroSearched === "") {
      this.setState(prevState => {
        return { heroes: prevState.allHeroes };
      });
    } else {
      this.setState(prevState => {
        return {
          heroes: prevState.allHeroes.filter((elem, index, array) => {
            return elem.localized_name
              .toLowerCase()
              .includes(heroSearched.toLowerCase());
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

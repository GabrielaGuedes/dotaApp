import React from "react";
import Header from "./Header.js";
import HeroesGrid from "./HeroesGrid.js";
import "./App.js";
import { getHeroes } from "./HttpClient.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HeroDetailed from "./HeroDetailed.js";

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
      <Router>
        <div>
          <Header filterHeroes={this.filterHeroes} />
          <div className="heroes-grid-container">
            <Route
              exact
              path="/"
              render={props => (
                <HeroesGrid {...props} heroes={this.state.heroes} />
              )}
            />
            <Route
              path="/:id"
              render={props => {
                console.log(props);
                return (
                  <HeroDetailed {...props} heroes={this.state.allHeroes} />
                );
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

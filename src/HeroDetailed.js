import React, { Component } from "react";
import { getLaneRole, getMatches, getMatchups, getItems } from "./HttpClient";

class HeroDetailed extends Component {
  state = {
    heroid: this.props.match.params.id,
    hero: "",
    mostPopularItem: "",
    highestWinrateItem: "",
    itemWinrate: 0,
    loosererHero: "",
    heroWinrateAgainstLooserer: 0,
    averageKDA: "",
    highestWinrateRole: "",
    roleWinrate: 0,
    mainLaneRole: ""
  };

  componentDidMount() {
    getItems(this.state.heroid).then(itemTimings => {
      this.setState(
        {
          itemTimings
        },
        () => {
          this.setState({
            mostPopularItem: this.findMostPopularItem(
              this.getItemsNamesFromItems()
            )
          });
          this.setState({
            highestWinrateItem: this.findHighestWinrateItem(
              this.getItemsNamesFromItems()
            )
          });
        }
      );
    });
    getMatchups(this.state.heroid).then(matchups => {
      this.setState(
        {
          matchups
        },
        () => {
          this.setState({
            loosererHero: this.findLoosererHero()
          });
        }
      );
    });
    getMatches(this.state.heroid).then(matches => {
      this.setState(
        {
          matches
        },
        () => {
          this.setState({
            averageKDA: this.calculateAverageKDA().toFixed(2)
          });
        }
      );
    });
    getLaneRole(this.state.heroid).then(laneRole => {
      this.setState(
        {
          laneRole
        },
        () => {
          this.setState({
            highestWinrateRole: this.findHighestWinrateRole()
          });
          this.setState({
            mainLaneRole: this.findMainLaneRole()
          });
        }
      );
    });
    this.setState({
      hero: this.findHeroByOptionalId()
    });
  }

  render() {
    return (
      <div>
        <img
          className="imagem"
          alt=""
          src={"http://cdn.dota2.com" + this.state.hero.img}
        />
        <div className="heroInfo">
          <p className="hero-name">{this.state.hero.localized_name} </p>
        </div>
        <div className="description">
          <p>
            Main role:{" "}
            {this.state.hero.roles !== undefined
              ? this.state.hero.roles[0]
              : " "}
          </p>
          <p>Most popular item: {this.state.mostPopularItem}</p>
          <p>
            Item with highest winrate: {this.state.highestWinrateItem} (
            {this.state.itemWinrate}%)
          </p>
          <p>
            Best oponent (the oponent with who {this.state.hero.localized_name}{" "}
            has the highest winrate): {this.state.loosererHero} (
            {this.state.heroWinrateAgainstLooserer}%)
          </p>
          <p>Average KDA: {this.state.averageKDA}</p>
          <p>
            Role with highest winrate:{" "}
            {this.getLaneRoleName(this.state.highestWinrateRole)} (
            {this.state.roleWinrate}%)
          </p>
          <p>Main lane role: {this.getLaneRoleName(this.state.mainLaneRole)}</p>
        </div>
      </div>
    );
  }

  findHeroByOptionalId = (id = this.state.heroid) => {
    return this.props.heroes.find(
      element => parseInt(element.id) === parseInt(id)
    );
  };

  getLaneRoleName = roleNumber => {
    switch (roleNumber) {
      case 1:
        return "Safe";
      case 2:
        return "Mid";
      case 3:
        return "Off";
      case 4:
        return "Jungle";
      default:
        return " ";
    }
  };

  getItemsNamesFromItems = () => {
    let itemsNames = [];
    this.state.itemTimings.forEach(element => {
      if (!itemsNames.includes(element.item)) {
        itemsNames.push(element.item);
      }
    });
    return itemsNames;
  };

  get0edArrayWithTheSameSizeOf = array => {
    let parcialEmptyArray = [];
    array.forEach(() => {
      parcialEmptyArray.push(0);
    });
    return parcialEmptyArray;
  };

  numberOfGamesPerItem = itemsNames => {
    let gamesPerItem = this.get0edArrayWithTheSameSizeOf(itemsNames);
    itemsNames.forEach((name, nameIndex) => {
      this.state.itemTimings.forEach(element => {
        if (name === element.item) {
          gamesPerItem[nameIndex] += parseInt(element.games);
        }
      });
    });
    return gamesPerItem;
  };

  numberOfWinsPerItem = itemsNames => {
    let winsPerItem = this.get0edArrayWithTheSameSizeOf(itemsNames);
    itemsNames.forEach((name, nameIndex) => {
      this.state.itemTimings.forEach(element => {
        if (name === element.item) {
          winsPerItem[nameIndex] += parseInt(element.wins);
        }
      });
    });
    return winsPerItem;
  };

  findMostPopularItem = itemsNames => {
    let higherValue = 0;
    let index;
    this.numberOfGamesPerItem(itemsNames).forEach((element, elementIndex) => {
      if (element > higherValue) {
        higherValue = element;
        index = elementIndex;
      }
    });
    return itemsNames[index];
  };

  findHighestWinrateItem = itemsNames => {
    let higherWinrate = 0;
    let index;
    this.winratePerItem(itemsNames).forEach((element, elementIndex) => {
      if (element > higherWinrate) {
        higherWinrate = element;
        index = elementIndex;
      }
    });
    this.setState({
      itemWinrate: (higherWinrate * 100).toFixed(2)
    });
    return itemsNames[index];
  };

  findLoosererHero = () => {
    let highestWinrate = 0;
    let index;
    this.state.matchups.forEach((element, elementIndex) => {
      if (element.wins / element.games_played > highestWinrate) {
        highestWinrate = element.wins / element.games_played;
        index = elementIndex;
      }
    });
    this.setState({
      heroWinrateAgainstLooserer: (highestWinrate * 100).toFixed(2)
    });
    return this.findHeroByOptionalId(this.state.matchups[index].hero_id)
      .localized_name;
  };

  calculateAverageKDA = () => {
    let sumKDA = 0;
    this.state.matches.forEach(element => {
      sumKDA +=
        (parseInt(element.kills) + parseInt(element.assists)) /
        (parseInt(element.deaths) > 0 ? parseInt(element.deaths) : 1);
    });

    return sumKDA / this.state.matches.length;
  };

  findHighestWinrateRole = () => {
    let higherWinrate = 0;
    let lane;
    this.winratePerLane().forEach((element, elementIndex) => {
      if (element > higherWinrate) {
        higherWinrate = element;
        lane = elementIndex;
      }
    });
    this.setState({
      roleWinrate: (higherWinrate * 100).toFixed(2)
    });
    return lane;
  };

  findMainLaneRole = () => {
    let higherValue = 0;
    let mainLaneRole;

    this.numberOfGamesPerLane().forEach((element, elementIndex) => {
      if (element > higherValue) {
        higherValue = element;
        mainLaneRole = elementIndex;
      }
    });

    return mainLaneRole;
  };

  winratePerItem = itemsNames => {
    let winratePerItem = [];
    itemsNames.forEach((element, elementIndex) => {
      winratePerItem[elementIndex] =
        this.numberOfWinsPerItem(itemsNames)[elementIndex] /
        this.numberOfGamesPerItem(itemsNames)[elementIndex];
    });

    return winratePerItem;
  };

  winratePerLane = () => {
    let winratePerLane = [0, 0, 0, 0, 0];
    let winsPerLane = this.numberOfWinsPerLane();
    let gamesPerLane = this.numberOfGamesPerLane();
    for (let lane = 1; lane < 5; lane++) {
      winratePerLane[lane] = winsPerLane[lane] / gamesPerLane[lane];
    }
    return winratePerLane;
  };

  numberOfWinsPerLane = () => {
    let numberOfWinsPerLane = [0, 0, 0, 0, 0];

    this.state.laneRole.forEach(element => {
      numberOfWinsPerLane[parseInt(element.lane_role)] += parseInt(
        element.wins
      );
    });
    return numberOfWinsPerLane;
  };

  numberOfGamesPerLane = () => {
    let numberOfGamesPerLane = [0, 0, 0, 0, 0];

    this.state.laneRole.forEach(element => {
      numberOfGamesPerLane[parseInt(element.lane_role)] += parseInt(
        element.games
      );
    });
    return numberOfGamesPerLane;
  };
}

export default HeroDetailed;

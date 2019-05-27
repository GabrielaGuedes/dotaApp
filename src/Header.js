import React from "react";

class Header extends React.Component {
  state = {
    searchBar: ""
  };

  handleChange = event => {
    this.setState(
      {
        searchBar: event.target.value
      },
      () => {
        this.props.filterHeroes(this.state.searchBar);
      }
    );
  };

  search = () => {
    this.props.filterHeroes(this.state.searchBar);
  };

  render() {
    return (
      <div className="header-container">
        <input
          id="busca-field"
          name="busca"
          value={this.state.searchBar}
          onChange={this.handleChange}
          placeholder="Insira o nome do Heroi"
        />
        <button onClick={this.search} className="go-button">
          Ir
        </button>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";

export default class Random extends Component {
  handleRandomSubmit = (e) => {
    e.preventDefault();
    this.props.onRandomSearch(this.randomQuery.value);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form className="random-form" onSubmit={this.handleRandomSubmit}>
        <label className="is-hidden" htmlFor="Random Search">
          Random Matched Gif
        </label>
        <input
          type="search"
          name="random-search"
          ref={(input) => (this.randomQuery = input)}
          placeholder="Search a random Gif..."
        />
        <button type="submit" id="submit" className="search-button">
          <i className="material-icons icn-search">search</i>
        </button>
      </form>
    );
  }
}

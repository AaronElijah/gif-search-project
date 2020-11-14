import "./App.css";

import React, { Component } from "react";

import GifList from "./Components/GifList";
import Popup from "./Components/Popup";
import Random from "./Components/Random";
import SearchForm from "./Components/SearchForm";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      randomGif: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC")
      .then((response) => {
        this.setState({
          gifs: response.data.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  }

  performSearch = (query) => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${query}&limit=25&rating=pg&lang=zh-CN&offset=5&api_key=dc6zaTOxFJmzC`
      )
      .then((response) => {
        this.setState({
          gifs: response.data.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  performRandomSearch = (randomQuery) => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/translate?s=${randomQuery}&weirdness=10&api_key=dc6zaTOxFJmzC`
      )
      .then((response) => {
        this.setState({
          randomGif: response.data.data,
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing random gif data", error);
      });
  };

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <Random onRandomSearch={this.performRandomSearch} />
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        {this.state.randomGif.images ? (
          <Popup url={this.state.randomGif.images.fixed_height.url} />
        ) : (
          <></>
        )}
        <div className="main-content">
          {this.state.isLoading ? (
            <p>Loading...</p>
          ) : (
            <GifList data={this.state.gifs} />
          )}
        </div>
      </div>
    );
  }
}

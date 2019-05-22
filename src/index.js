import React, { Component } from "react";
import ReactDOM from "react-dom";
import Weather from "./weather.js";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      period: "",
      data: {},
      temp: "",
      pressure: "",
      humidity: "",
      tempMin: "",
      tempMax: "",
      weatherType: "",
      loaded: false,
      city: "",
      lng: 73,
      lat: 19
    };
  }

  handleChange = e => {
    this.setState({ city: e.target.value });
  };

  handleClick = () => {
    this.fetchGoogleApi();
  };

  // Google Api for lattitudes and longitutdes

  fetchGoogleApi = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        this.state.city
      }&key=AIzddsKCcLUgaD-MkmKgF5UADktGEHH3gIUrTwcg`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.results[0]);
        this.setState({
          lng: data.results[0]["geometry"]["location"]["lng"],
          lat: data.results[0]["geometry"]["location"]["lat"],
          city: ""
        });
        this.fetchOpenWeatherApi();
      })
      .catch(error => {
        alert("Enter correct address");
        console.log("parsing failed", error);
      });
  };

  // Open weather api for getting weather data for particular location
  fetchOpenWeatherApi = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        this.state.lat
      }&lon=${
        this.state.lng
      }&units=metric&appid=298025735638d42e396360874c9ed955`
    )
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        this.setState({ data: data, loaded: true });
        this.setState({
          temp: data.main["temp"],
          pressure: data.main["pressure"],
          humidity: data.main["humidity"],
          tempMax: data.main["temp_max"],
          tempMin: data.main["temp_min"],
          weatherType: data.weather[0].main,
          timeStamp: data.dt,
          period: data.weather[0].icon
        });
      })
      .catch(error => {
        console.log("parsing failed", error);
      });
  };
  render() {
    return (
      <div className="App">
        <h1 className="heading">Weather App</h1>
        <Weather
          period={this.state.period}
          city={this.state.city}
          method1={this.handleChange}
          method2={this.handleClick}
          loaded={this.state.loaded}
          temp={this.state.temp}
          pressure={this.state.pressure}
          humidity={this.state.humidity}
          tempMin={this.state.tempMin}
          tempMax={this.state.tempMax}
          weatherType={this.state.weatherType}
        />
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

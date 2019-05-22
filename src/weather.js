import React, { Component } from "react";
let url = "http://openweathermap.org/img/w/";
//let newURL = "http://api.openweathermap.org/data/2.5/weather?q=London"

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValue: "",
      weatherImgDayArr: [
        { Clear: "01d.png" },
        { Clouds: "02d.png" },
        { Rain: "09d.png" },
        { Thunderstorm: "11d.png" },
        { Snow: "13d.png" },
        { Mist: "50d.png" },
        { Haze: "50d.png" },
        { Dust: "50d.png" },
        { Ash: "50d.png" },
        { Squall: "50d.png" },
        { Tornado: "50d.png" }
      ],
      weatherImgNightArr: [
        { Clear: "01n.png" },
        { Clouds: "02n.png" },
        { Rain: "10n.png" },
        { Thunderstorm: "11n.png" },
        { Snow: "13n.png" },
        { Mist: "50n.png" },
        { Haze: "50d.png" },
        { Dust: "50d.png" },
        { Ash: "50d.png" },
        { Squall: "50d.png" },
        { Tornado: "50d.png" }
      ]
    };
  }
  justcheck = () => {
    let value = this.props.weatherType;
    console.log(this.props.period[2]);
    if (this.props.period[2] === "n") {
      let weather = this.state.weatherImgNightArr;
      weather.forEach((element, index, array) => {
        if (Object.keys(array[index]) == value) {
          url = url.substring(0, 32);
          url = url + Object.values(array[index]);
          document.body.style.background =
            "linear-gradient(to bottom, #2C5364, #203A43, #0F2027)";
          document.getElementById("tableBox").setAttribute("class", "night");
        }
      });
    } else {
      let weather = this.state.weatherImgDayArr;
      weather.forEach((element, index, array) => {
        if (Object.keys(array[index]) == value && url.length <= 39) {
          url = url.substring(0, 32);
          url = url + Object.values(array[index]);
          document.body.style.background =
            "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)";
          document.getElementById("tableBox").setAttribute("class", "sky");
        }
      });
    }
  };
  render(props) {
    if (this.props.loaded === false) {
      return (
        <div className="inputBox">
          <input
            type="text"
            className="Input-text"
            value={this.props.city}
            onChange={this.props.method1}
            placeholder="Enter location"
          />
          <button onClick={this.props.method2}>Search</button>
        </div>
      );
    } else {
      this.justcheck();
      return (
        <div className="weather">
          <input
            className="Input-text"
            type="text"
            value={this.props.city}
            onChange={this.props.method1}
            placeholder="Enter location"
          />
          <button onClick={this.props.method2}>Search</button>
          <center>
            <div className="weatherBox">
              <table id="tableBox" className="tablediv">
                <tbody>
                  <tr>
                    <td>
                      <img className="urlImg" src={url} alt="check" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="weatherType">
                        {this.props.weatherType}
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Temp:</label>
                    </td>
                    <td>
                      <p>{this.props.temp}&#8451;</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Humidity:</label>
                    </td>
                    <td>
                      <p>{this.props.humidity}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Pressure:</label>
                    </td>
                    <td>
                      <p>{this.props.pressure}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>TempMin:</label>
                    </td>
                    <td>
                      <p>{this.props.tempMin}&#8451;</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>TempMax:</label>
                    </td>
                    <td>
                      <p>{this.props.tempMax}&#8451;</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </center>
        </div>
      );
    }
  }
}
export default Weather;

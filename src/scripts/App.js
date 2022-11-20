import '../styles/App.css'
import React from 'react';
import TodayData from './TodayData.js';
import FuturePanelData from './FuturePanelData.js';
import { IconSquareGithub } from '../assets/imports'
import Spline from '@splinetool/react-spline';
import {
  cloud, sun, sCloud,
  sRain, sSnow, sElectricStorm,
  sWind, moon, mCloud, mRain, mSnow,
  mElectricStorm, mWind, cBroken,
  sShowerRain, mShowerRain,
} from '../assets/imports'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.changeLocation = this.changeLocation.bind(this)
    this.imagesID = {
      '01d': sun,
      '02d': sCloud,
      '03d': cloud,
      '04d': cBroken,
      '09d': sShowerRain,
      '10d': sRain,
      '11d': sElectricStorm,
      '13d': sSnow,
      '50d': sWind,
      '01n': moon,
      '02n': mCloud,
      '03n': cloud,
      '04n': cBroken,
      '09n': mShowerRain,
      '10n': mRain,
      '11n': mElectricStorm,
      '13n': mSnow,
      '50n': mWind,
    }
    this.state = {
      location: 'salta, argentina',
      info: {
        state: '',
        country: '',
        weatherImage: '',
        description: '',

        feels_like: '',
        humidity: '',
        pressure: '',
        temp: '',
        temp_max: '',
        temp_min: '',

        visibility: '',
        wind_speed: '',

        uvi: '',
      }
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData(e) {
    try {

      const geoCodingRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.state.location}&limit=1&appid=11c5983b7ba6619286736eb3da4d20cc`);
      const geoCodingJson = await geoCodingRequest.json();

      const weatherDataRequest = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${geoCodingJson[0].lat}&lon=${geoCodingJson[0].lon}&exclude={part}&appid=11c5983b7ba6619286736eb3da4d20cc&units=metric`);
      const weatherDataJson = await weatherDataRequest.json();

      this.setState({
        info: {
          state: geoCodingJson[0].state,
          country: geoCodingJson[0].country,

          weatherImage: this.imagesID[weatherDataJson.current.weather[0].icon],
          description: weatherDataJson.current.weather[0].main,
          feels_like: weatherDataJson.current.feels_like,
          humidity: weatherDataJson.current.humidity,
          pressure: weatherDataJson.current.pressure,
          temp: weatherDataJson.current.temp,
          uvi: weatherDataJson.current.uvi,
          visibility: weatherDataJson.current.visibility,
          wind_speed: weatherDataJson.current.wind_speed,

        },
      })

      setTimeout(() => {
        console.log(weatherDataJson)
        console.log(geoCodingJson)

      }, 0);
    } catch (error) {
      console.log(error)
    }
  }

  async changeLocation(e) {
    try {
      e.preventDefault()
      const geoCodingRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.state.location}&limit=1&appid=11c5983b7ba6619286736eb3da4d20cc`);
      const geoCodingJson = await geoCodingRequest.json();

      const weatherDataRequest = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${geoCodingJson[0].lat}&lon=${geoCodingJson[0].lon}&exclude={part}&appid=11c5983b7ba6619286736eb3da4d20cc&units=metric`);
      const weatherDataJson = await weatherDataRequest.json();

      this.setState({
        info: {
          state: geoCodingJson[0].name,
          country: geoCodingJson[0].country,

          weatherImage: this.imagesID[weatherDataJson.current.weather[0].icon],
          description: weatherDataJson.current.weather[0].main,
          feels_like: weatherDataJson.current.feels_like,
          humidity: weatherDataJson.current.humidity,
          pressure: weatherDataJson.current.pressure,
          temp: weatherDataJson.current.temp,
          uvi: weatherDataJson.current.uvi,
          visibility: weatherDataJson.current.visibility,
          wind_speed: weatherDataJson.current.wind_speed,

        },
      })

      setTimeout(() => {
        console.log(weatherDataJson)
        console.log(geoCodingJson)

      }, 0);
    } catch (error) {
      console.log(error)
    }
  }

  setLocation(e) {
    const inputForm = document.querySelector('#inputForm')
    this.setState({
      location: inputForm.value
    })

    console.log(this.state.location)
  }

  render() {
    return (
      <div className="App">
        <Spline className="background" scene="https://prod.spline.design/2Yx8sTuTP47sABzS/scene.splinecode" />
        <div className="appContainer">

          <a className='github' href="https://github.com/Apheiro/weather-app">
            <IconSquareGithub width='50px' height='50px' />
            <h2>Apheiros</h2>
          </a>

          <div className='weatherAppContainer'>
            <TodayData data={this.state.info} setLocation={this.setLocation} changeLocation={this.changeLocation} />
            <FuturePanelData />
          </div>

        </div>
      </div>
    );
  }

}

export default App;


import '../styles/App.css'
import React from 'react';
import TodayData from './TodayData.js';
import FuturePanelData from './FuturePanelData.js';
import { IconSquareGithub } from '../assets/imports'
import uniqid from 'uniqid'
import LoadingScreen from './LoadingScreen'
import { AnimatePresence } from 'framer-motion'

import {
  cloud, sun, sCloud,
  sRain, sSnow, sElectricStorm,
  sWind, moon, mCloud, mRain, mSnow,
  mElectricStorm, mWind, cBroken,
  sShowerRain, mShowerRain
} from '../assets/imports'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.changeUnitMeasure = this.changeUnitMeasure.bind(this)
    this.imagesID = {
      '01d': sun, '02d': sCloud, '03d': cloud, '04d': cBroken, '09d': sShowerRain, '10d': sRain,
      '11d': sElectricStorm, '13d': sSnow, '50d': sWind, '01n': moon, '02n': mCloud, '03n': cloud,
      '04n': cBroken, '09n': mShowerRain, '10n': mRain, '11n': mElectricStorm, '13n': mSnow, '50n': mWind,
    }
    this.unitsOfMeasure = {
      metric: {
        tempUnit: '°C',
        windSpeedUnit: 'm/s',
      },
      imperial: {
        tempUnit: '°F',
        windSpeedUnit: 'm/h',
      }
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
      },
      daily: [],
      hourly: [],
      unitOfMeasure: 'metric'
    }
  }

  componentDidMount() {
    this.getData()
  }

  changeUnitMeasure(unit) {
    this.setState({
      unitOfMeasure: unit
    }, () => { console.log(this.state.unitOfMeasure) })
  }

  async getData(e) {
    try {
      e?.preventDefault?.()
      const geoCodingRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.state.location}&limit=1&appid=11c5983b7ba6619286736eb3da4d20cc`);
      const geoCodingJson = await geoCodingRequest.json();
      const weatherDataRequest = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${geoCodingJson[0].lat}&lon=${geoCodingJson[0].lon}&exclude={part}&appid=11c5983b7ba6619286736eb3da4d20cc&units=${this.state.unitOfMeasure}`);
      const weatherDataJson = await weatherDataRequest.json();
      weatherDataJson.daily.forEach((day) => {
        day.uniqid = uniqid()
        day.temp.min = `${Math.round(day.temp.min)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`
        day.temp.max = `${Math.round(day.temp.max)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`
        day.temp.day = `${Math.round(day.temp.day)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`
        day.temp.night = `${Math.round(day.temp.night)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`
        day.wind_speed = `${day.wind_speed} ${this.unitsOfMeasure[this.state.unitOfMeasure].windSpeedUnit}`
      })
      weatherDataJson.hourly.forEach((hour) => {
        hour.uniqid = uniqid()
        hour.temp = `${Math.round(hour.temp)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`
        hour.feels_like = `${Math.round(hour.feels_like)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`
        hour.dew_point = `${Math.round(hour.dew_point)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`
        hour.visibility = `${hour.visibility} m`
        hour.wind_speed = `${hour.wind_speed} ${this.unitsOfMeasure[this.state.unitOfMeasure].windSpeedUnit}`
        hour.pop = `${hour.pop * 100}%`
      })
      this.setState({
        info: {
          state: geoCodingJson[0].state,
          country: geoCodingJson[0].country,
          temp: `${Math.round(weatherDataJson.current.temp)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`,
          wind_speed: `${weatherDataJson.current.wind_speed}${this.unitsOfMeasure[this.state.unitOfMeasure].windSpeedUnit}`,
          weatherImage: this.imagesID[weatherDataJson.current.weather[0].icon],
          description: weatherDataJson.current.weather[0].main,
          feels_like: `${Math.round(weatherDataJson.current.feels_like)}${this.unitsOfMeasure[this.state.unitOfMeasure].tempUnit}`,
          humidity: weatherDataJson.current.humidity,
          pressure: weatherDataJson.current.pressure,
          uvi: weatherDataJson.current.uvi,
          visibility: weatherDataJson.current.visibility,
        },
        daily: weatherDataJson.daily,
        hourly: weatherDataJson.hourly,
      })
    } catch (error) {
      console.log(error)
    }
  }

  setLocation(e) {
    const inputForm = document.querySelector('#inputForm')
    this.setState({
      location: inputForm.value
    })
  }


  render() {

    return (
      <div className="App">
        {/* <div className="background"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F58%2F6e%2F51%2F586e51559dc40f48cd8ce65af9c1522f.gif&f=1&nofb=1&ipt=c298129c39d8fa5dd8293245986ac07095604cdc5e5545bdb48ed5fab87e4fd0&ipo=images" alt="" srcset="" /></div> */}
        <AnimatePresence>
          {!!this.state.daily.length ? <>
            <div className="appContainer">
              <a className='github' href="https://github.com/Apheiro/weather-app">
                <IconSquareGithub width='50px' height='50px' />
                <h2>Apheiros</h2>
              </a>
              <div className='weatherAppContainer'>
                <TodayData data={this.state.info} setLocation={this.setLocation} getData={this.getData} hourly={this.state.hourly} />
                <FuturePanelData daily={this.state.daily} hourly={this.state.hourly} changeUnitMeasure={this.changeUnitMeasure} getData={this.getData} />
              </div>
            </div>
          </> : <LoadingScreen />
          }
        </AnimatePresence>



      </div>
    );
  }

}

export default App;


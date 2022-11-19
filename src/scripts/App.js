import '../styles/App.css'
import React from 'react';
import TodayData from './TodayData.js';
import { IconSquareGithub } from '../assets/imports'
import Spline from '@splinetool/react-spline';
class App extends React.Component {

  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
  }

  async getData(e) {
    const city = 'salta, argentina'
    const geoCodingRequest = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=11c5983b7ba6619286736eb3da4d20cc`);
    const geoCodingJson = await geoCodingRequest.json();

    const weatherDataRequest = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoCodingJson[0].lat}&lon=${geoCodingJson[0].lon}&appid=11c5983b7ba6619286736eb3da4d20cc&units=metric`);
    const weatherDataJson = await weatherDataRequest.json();

    console.log(geoCodingJson)
    console.log(weatherDataJson)
  }



  render() {
    return (
      <div className="App" >
        <Spline className="background" scene="https://prod.spline.design/2Yx8sTuTP47sABzS/scene.splinecode" />
        <div className='weatherAppContainer'>
          <a className='github' href="https://github.com/Apheiro/weather-app">
            <IconSquareGithub width='50px' height='50px' />
            <h2>Apheiros</h2>
          </a>

          <TodayData />

          {/* <button className="testaso" onClick={this.getData}>test</button> */}
        </div>
      </div>
    );
  }

}

export default App;


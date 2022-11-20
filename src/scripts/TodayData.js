import React from 'react';
import '../styles/TodayData.css'
import {
    cloud, cRain, cElectricStorm,
    cSnow, cWind, sun, sCloud, sRain,
    sSnow, sElectricStorm, sWind, moon,
    mCloud, mRain, mSnow, mElectricStorm, mWind
} from '../assets/imports'
import {
    IconWiThermometer, IconSpeedometer,
    IconWiRaindrop, IconWind,
    IconEyeFill, IconWiHot,
} from '../assets/imports'
class TodayData extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='todayData'>
                <div className='todayCard cardStyle'>
                    <div className='todayInfo'>
                        <h3 className='todayLocation'>Salta, Argentina <br />Thursday, 17th Nov '22</h3>
                        <h2 className='todayTemperature'>40°C</h2>
                    </div>
                    <img src={mRain} alt="moon1" />
                    <h1 className='todayWeather'>Slightly Cloudy</h1>
                </div>
                <div className='info'>
                    <div className='hour cardStyle'>
                        <h2>15:38:24 AM</h2>
                    </div>
                    <div className='visibility cardStyle cardInfoText'>
                        <p>5km</p>
                        <IconEyeFill className='iconsInfo' />
                        <p>Visibility</p>
                    </div>
                    <div className='humidity cardStyle cardInfoText'>
                        <p>50%</p>
                        <IconWiRaindrop className='iconsInfo' />
                        <p>Humidity</p>
                    </div>
                    <div className='windSpeed cardStyle cardInfoText'>
                        <p>5.4 k/m</p>
                        <IconWind className='iconsInfo' />
                        <p>Wind speed</p>
                    </div>
                    <div className='feelsLike cardStyle cardInfoText'>
                        <p>25°C</p>
                        <IconWiThermometer className='iconsInfo' />
                        <p>Feels like</p>
                    </div>
                    <div className='pressure cardStyle cardInfoText'>
                        <p>1011mb</p>
                        <IconSpeedometer className='iconsInfo' />
                        <p>Pressure</p>
                    </div>
                    <div className='uvIndex cardStyle cardInfoText'>
                        <p>0</p>
                        <IconWiHot className='iconsInfo' />
                        <p>UV index</p>
                    </div>
                </div>
            </div>

        );
    };
};

export default TodayData; 
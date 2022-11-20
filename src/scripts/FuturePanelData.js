import React from 'react';
import '../styles/FuturePanelData.css'
import {
    cloud, cRain, cElectricStorm,
    cSnow, cWind, sun, sCloud, sRain,
    sSnow, sElectricStorm, sWind, moon,
    mCloud, mRain, mSnow, mElectricStorm, mWind
} from '../assets/imports'

import {
    IconWiThermometer, IconSpeedometer,
    IconWiRaindrop, IconWind,
    IconEyeFill, IconWiHot, IconSearch
} from '../assets/imports'

class FuturePanelData extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='futurePanelData'>
                <div className='futurePanelDataCard cardStyle'>

                    <div className='switchesBtnsContainer'>
                        <form action="" className='formatUnitForm'>
                            <input type="radio" name="formatUnit" id="radio1" />
                            <label htmlFor="radio1">Fahrenheit</label>
                            <input type="radio" name="formatUnit" id="radio2" />
                            <label htmlFor="radio2">Celsius</label>
                        </form>
                        <form action="" className='formatTimeForm'>
                            <input type="radio" name="formatTime" id="radio3" />
                            <label htmlFor="radio3">Daily</label>
                            <input type="radio" name="formatTime" id="radio4" />
                            <label htmlFor="radio4">Hourly</label>
                        </form>
                    </div>

                    <div className='futureDataCardsContainer'>
                        <div className='futureDayDataCard cardStyle'>
                            <h2>Friday</h2>
                            <img src={sWind} alt="" />
                            <h3>32°C - 10°C</h3>
                            <div>
                                <p>Humidity 22%</p>
                                <p>Pressure 1011 hPa</p>
                                <p>Wind speed 5.17m/s</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    };
};

export default FuturePanelData; 
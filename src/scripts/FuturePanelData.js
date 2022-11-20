import React from 'react';
import { format, fromUnixTime } from 'date-fns'
import '../styles/FuturePanelData.css'
import {
    cloud, sun, sCloud,
    sRain, sSnow, sElectricStorm,
    sWind, moon, mCloud, mRain, mSnow,
    mElectricStorm, mWind, cBroken,
    sShowerRain, mShowerRain,
} from '../assets/imports'
import {
    IconWiThermometer, IconSpeedometer,
    IconWiRaindrop, IconWind,
    IconEyeFill, IconWiHot, IconSearch
} from '../assets/imports'

class FuturePanelData extends React.Component {
    constructor(props) {
        super(props)
        this.changeUnit = this.changeUnit.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
        this.imagesID = {
            '01d': sun, '02d': sCloud, '03d': cloud, '04d': cBroken, '09d': sShowerRain, '10d': sRain,
            '11d': sElectricStorm, '13d': sSnow, '50d': sWind, '01n': moon, '02n': mCloud, '03n': cloud,
            '04n': cBroken, '09n': mShowerRain, '10n': mRain, '11n': mElectricStorm, '13n': mSnow, '50n': mWind,
        }
        this.state = {
            format: 'daily',
        }
    }

    changeUnit(e) {
        this.props.updateUnit(e.target.value);
        console.log(e.target.value);
        console.log(e);
    }

    changeFormat(e) {
        this.setState({
            format: e.target.value
        })
        setTimeout(() => {
            console.log(this.state.format)
        }, 1);
    }

    render() {
        const { daily } = this.props
        console.log(daily)

        return (
            <div className='futurePanelData'>
                <div className='futurePanelDataCard cardStyle'>

                    <div className='switchesBtnsContainer'>
                        <form action="" className='formatUnitForm'>
                            <input type="radio" value='imperial' name="formatUnit" id="fahrenheit" onChange={this.changeUnit} />
                            <label htmlFor="fahrenheit">Fahrenheit</label>
                            <input type="radio" value='metric' name="formatUnit" id="celsius" onChange={this.changeUnit} defaultChecked />
                            <label htmlFor="celsius">Celsius</label>
                        </form>
                        <form action="" className='formatTimeForm'>
                            <input type="radio" value='daily' name="formatTime" id="daily" onChange={this.changeFormat} defaultChecked />
                            <label htmlFor="daily">Daily</label>
                            <input type="radio" value='hourly' name="formatTime" onChange={this.changeFormat} id="hourly" />
                            <label htmlFor="hourly">Hourly</label>
                        </form>
                    </div>

                    <div className='futureDataCardsContainer'>
                        {
                            this.props[this.state.format].map((day) => {
                                if (this.state.format == 'daily') {
                                    return <div id={`${day.uniqid}`} className='futureDayDataCard cardStyle'>
                                        <h2>{format(fromUnixTime(day.dt), 'EEEE dd')}</h2>
                                        <img src={this.imagesID[day.weather[0].icon]} alt="" />
                                        <h3>{day.temp.min} - {day.temp.max}</h3>
                                        <div>
                                            <p>Humidity {day.humidity}%</p>
                                            <p>Pressure {day.pressure} hPa</p>
                                            <p>WindSpeed {day.wind_speed}</p>
                                        </div>
                                    </div>
                                } else if (this.state.format == 'hourly') {
                                    return <div id={`${day.uniqid}`} className='futureDayDataCard cardStyle' >
                                        <h2>{format(fromUnixTime(day.dt), 'hh:mm a')}</h2>
                                        <img src={this.imagesID[day.weather[0].icon]} alt="" />
                                        <h3>{day.temp}</h3>
                                        <div>
                                            <p>Humidity {day.humidity}%</p>
                                            <p>Pressure {day.pressure} hPa</p>
                                            <p>WindSpeed {day.wind_speed}</p>
                                        </div>
                                    </div>
                                }
                            })
                        }




                    </div>
                </div>

            </div>

        );
    };
};

export default FuturePanelData; 
import React from 'react';
import '../styles/TodayData.css';
import { format } from 'date-fns';
import {
    IconWiThermometer, IconSpeedometer,
    IconWiRaindrop, IconWind,
    IconEyeFill, IconWiHot, IconSearch
} from '../assets/imports'
class TodayData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hour: ''
        }
    }

    componentDidMount() {
        setInterval(() => {
            const hour = format(new Date(), 'hh:mm:ss a')
            this.setState({
                hour: hour
            })
        }, 1000)
    }

    render() {
        const { data, changeLocation, setLocation } = this.props
        return (
            <div className='todayData'>
                <div className='todayCard cardStyle'>
                    <div className='todayInfo'>
                        <h3 className='todayLocation'>{data.state}, {data.country}<br />{format(new Date(), 'PPPP')}</h3>
                        <h2 className='todayTemperature'>{data.temp}</h2>
                    </div>
                    <img src={data.weatherImage} alt="moon1" />
                    <h1 className='todayWeather'>{data.description}</h1>
                </div>
                <form className='searchFromCard' action="" onSubmit={changeLocation}>
                    <input type="search" placeholder='Search your city' name="" id="inputForm" onChange={setLocation} />
                    <button type="submit"><IconSearch width="100%" height="100%" /></button>
                </form>
                <div className='info'>
                    <div className='hour cardStyle'>
                        <h2>{this.state.hour}</h2>
                    </div>
                    <div className='visibility cardStyle cardInfoText'>
                        <p>{`${data.visibility}`.slice(0, 1)} km</p>
                        <IconEyeFill className='iconsInfo' />
                        <p>Visibility</p>
                    </div>
                    <div className='humidity cardStyle cardInfoText'>
                        <p>{data.humidity}%</p>
                        <IconWiRaindrop className='iconsInfo' />
                        <p>Humidity</p>
                    </div>
                    <div className='windSpeed cardStyle cardInfoText'>
                        <p>{data.wind_speed}</p>
                        <IconWind className='iconsInfo' />
                        <p>Wind speed</p>
                    </div>
                    <div className='feelsLike cardStyle cardInfoText'>
                        <p>{data.feels_like}</p>
                        <IconWiThermometer className='iconsInfo' />
                        <p>Feels like</p>
                    </div>
                    <div className='pressure cardStyle cardInfoText'>
                        <p>{data.pressure} hPa</p>
                        <IconSpeedometer className='iconsInfo' />
                        <p>Pressure</p>
                    </div>
                    <div className='uvIndex cardStyle cardInfoText'>
                        <p>{data.uvi}</p>
                        <IconWiHot className='iconsInfo' />
                        <p>UV index</p>
                    </div>
                </div>
            </div>
        );
    };
};

export default TodayData; 
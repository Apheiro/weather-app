import React from 'react';
import '../styles/TodayData.css';
import { fromUnixTime, format } from 'date-fns'
import GraphicData from './GraphicData'
import {
    IconWiThermometer, IconSpeedometer,
    IconWiRaindrop, IconWind,
    IconEyeFill, IconWiHot, IconSearch
} from '../assets/imports'
class TodayData extends React.Component {
    constructor(props) {
        super(props)
        this.showGraphic = this.showGraphic.bind(this)
        this.removeGraphic = this.removeGraphic.bind(this)
        this.state = {
            names: {
                visibility: 'Visibility',
                humidity: 'Humidity',
                wind_speed: 'Wind speed',
                feels_like: 'Feels like',
                pressure: 'Pressure',
                uvi: 'UV index',
            },
            showGraphic: false,
            showGraphicName: '',
            hour: '',
            data: []
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

    removeGraphic(e) {
        this.setState({ showGraphic: false })
    }

    showGraphic(e) {
        let data = [];
        const propertyName = e.currentTarget.getAttribute('id')
        this.props.hourly.forEach((element) => {
            data.push({ temp: parseInt(element[propertyName]), hour: format(fromUnixTime(element.dt), 'h a') })
        });

        this.setState({
            showGraphic: true,
            showGraphicName: e.currentTarget.getAttribute('id'),
            data: data,
        })
    }

    render() {
        const { data, getData, setLocation } = this.props

        return (
            <div className='todayData'>
                {this.state.showGraphic ? <GraphicData data={this.state.data} names={this.state.names} showGraphicName={this.state.showGraphicName} removeGraphicFunction={this.removeGraphic} /> : null}
                <div className='todayCard cardStyle'>
                    <div className='todayInfo'>
                        <h3 className='todayLocation'>{data.state}, {data.country}<br />{format(new Date(), 'PPPP')}</h3>
                        <h2 className='todayTemperature'>{data.temp}</h2>
                    </div>
                    <img src={data.weatherImage} alt="moon1" />
                    <h1 className='todayWeather'>{data.description}</h1>
                </div>
                <form className='searchFromCard' action="" onSubmit={getData}>
                    <input type="search" placeholder='Search your city' name="" id="inputForm" onChange={setLocation} />
                    <button type="submit"><IconSearch width="100%" height="100%" /></button>
                </form>
                <div className='info'>
                    <div className='hour cardStyle'>
                        <h2>{this.state.hour}</h2>
                    </div>
                    <div className='visibility cardStyle cardInfoText' id='visibility' onClick={this.showGraphic}>
                        <p>{`${data.visibility}`.slice(0, 1)} km</p>
                        <IconEyeFill className='iconsInfo' />
                        <p>Visibility</p>
                    </div>
                    <div className='humidity cardStyle cardInfoText' id='humidity' onClick={this.showGraphic}>
                        <p>{data.humidity}%</p>
                        <IconWiRaindrop className='iconsInfo' />
                        <p>Humidity</p>
                    </div>
                    <div className='windSpeed cardStyle cardInfoText' id='wind_speed' onClick={this.showGraphic}>
                        <p>{data.wind_speed}</p>
                        <IconWind className='iconsInfo' />
                        <p>Wind speed</p>
                    </div>
                    <div className='feelsLike cardStyle cardInfoText' id='feels_like' onClick={this.showGraphic}>
                        <p>{data.feels_like}</p>
                        <IconWiThermometer className='iconsInfo' />
                        <p>Feels like</p>
                    </div>
                    <div className='pressure cardStyle cardInfoText' id='pressure' onClick={this.showGraphic}>
                        <p>{data.pressure} hPa</p>
                        <IconSpeedometer className='iconsInfo' />
                        <p>Pressure</p>
                    </div>
                    <div className='uvIndex cardStyle cardInfoText' id='uvi' onClick={this.showGraphic}>
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
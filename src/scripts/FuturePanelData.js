import React from 'react';
import { format, fromUnixTime } from 'date-fns'
import '../styles/FuturePanelData.css'
import PopupInfo from './PopupInfo';
import {
    cloud, sun, sCloud,
    sRain, sSnow, sElectricStorm,
    sWind, moon, mCloud, mRain, mSnow,
    mElectricStorm, mWind, cBroken,
    sShowerRain, mShowerRain,
} from '../assets/imports'
import { motion, AnimatePresence } from 'framer-motion'


class FuturePanelData extends React.Component {
    constructor(props) {
        super(props)
        this.changeUnit = this.changeUnit.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
        this.removePopup = this.removePopup.bind(this)
        this.addPopup = this.addPopup.bind(this)
        this.imagesID = {
            '01d': sun, '02d': sCloud, '03d': cloud, '04d': cBroken, '09d': sShowerRain, '10d': sRain,
            '11d': sElectricStorm, '13d': sSnow, '50d': sWind, '01n': moon, '02n': mCloud, '03n': cloud,
            '04n': cBroken, '09n': mShowerRain, '10n': mRain, '11n': mElectricStorm, '13n': mSnow, '50n': mWind,
        }
        this.state = {
            popupShow: false,
            popupAttribute: '',
            format: 'daily',
        }
    }

    changeUnit(e) {
        this.props.changeUnitMeasure(e.target.value);
        this.props.getData()
        // console.log(e.target.value);
        // console.log(e);
    }

    removePopup(e) {
        this.setState({ popupShow: false })
    }

    addPopup(e) {
        this.setState({
            popupShow: true,
            popupAttribute: e.currentTarget.getAttribute('id')
        })
    }

    changeFormat(e) {
        this.setState({
            format: e.target.value
        })
    }

    render() {
        return (
            <div className='futurePanelData'>
                <AnimatePresence>
                    {this.state.popupShow ? <PopupInfo formatDateType={this.state.format} formatDate={this.props[this.state.format]} removePopup={this.removePopup} uniqKey={this.state.popupAttribute} /> : null}
                </AnimatePresence>
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
                    <motion.div className='futureDataCardsContainer' >
                        <AnimatePresence mode='wait'>
                            {
                                this.props[this.state.format].map((day, index) => {
                                    let enter = {
                                        opacity: 1,
                                        scale: 1,
                                        transition: {
                                            delay: 0.05 * index,
                                            duration: 0.1,
                                            ease: [0.60, -0.67, 0.30, 1.67]
                                        }
                                    }
                                    let exit = {
                                        opacity: 0,
                                        scale: 0.5,
                                        transition: {
                                            delay: 0.03 * index,
                                            duration: 0.3,
                                            ease: [0.60, -0.67, 0.30, 1.67]
                                        }
                                    }
                                    let initial = {
                                        opacity: 0,
                                        scale: 0.5,
                                        transition: {
                                            when: "afterChildren",
                                        }
                                    }
                                    if (this.state.format == 'daily') {
                                        return (
                                            <motion.div key={day.uniqid} id={day.uniqid} className='futureDayDataCard' onClick={this.addPopup} variants={this.bigger} initial={initial} animate={enter} exit={exit}>
                                                <h2>{format(fromUnixTime(day.dt), 'EEEE dd')}</h2>
                                                <img src={this.imagesID[day.weather[0].icon]} alt="" />
                                                <h3>{day.temp.min} - {day.temp.max}</h3>
                                                <div>
                                                    <p>Humidity {day.humidity}%</p>
                                                    <p>Pressure {day.pressure} hPa</p>
                                                    <p>WindSpeed {day.wind_speed}</p>
                                                </div>
                                            </motion.div>
                                        )
                                    } else if (this.state.format == 'hourly') {
                                        return (
                                            <motion.div key={day.uniqid} id={day.uniqid} className='futureDayDataCard' onClick={this.addPopup} variants={this.smaller} initial={initial} animate={enter} exit={exit}>
                                                <h2>{format(fromUnixTime(day.dt), 'hh:mm a')}</h2>
                                                <img src={this.imagesID[day.weather[0].icon]} alt="" />
                                                <h3>{day.temp}</h3>
                                                <div>
                                                    <p>Humidity {day.humidity}%</p>
                                                    <p>Pressure {day.pressure} hPa</p>
                                                    <p>WindSpeed {day.wind_speed}</p>
                                                </div>
                                            </motion.div>
                                        )
                                    }
                                })
                            }
                        </AnimatePresence>
                    </motion.div>
                </div>

            </div >

        );
    };
};

export default FuturePanelData; 
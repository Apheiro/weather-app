import react from 'react'
import '../styles/PopupInfo.css'
import { fromUnixTime, format } from 'date-fns'
// import format from 'date-fns/format'
import {
    cloud, sun, sCloud,
    sRain, sSnow, sElectricStorm,
    sWind, moon, mCloud, mRain, mSnow,
    mElectricStorm, mWind, cBroken,
    sShowerRain, mShowerRain,
} from '../assets/imports'
import {
    IconWiHot,
    IconWiSunrise, IconWiSunset,
    IconMoon, IconSun, IconWiRain, IconWiCloud,
    IconEye, IconWiThermometerExterior
} from '../assets/imports'

class PopupInfo extends react.Component {
    constructor(props) {
        super(props)
        this.imagesID = {
            '01d': sun, '02d': sCloud, '03d': cloud, '04d': cBroken, '09d': sShowerRain, '10d': sRain,
            '11d': sElectricStorm, '13d': sSnow, '50d': sWind, '01n': moon, '02n': mCloud, '03n': cloud,
            '04n': cBroken, '09n': mShowerRain, '10n': mRain, '11n': mElectricStorm, '13n': mSnow, '50n': mWind,
        }
    }


    render() {
        const { uniqid, formatDate, formatDateType } = this.props;

        return (

            < div className='popupInfo' onClick={this.props.removePopup} >
                {

                    formatDate.map((element) => {
                        if (formatDateType == 'daily') {
                            if (element.uniqid == uniqid) {
                                return (
                                    <div className='moreInfoCard'>
                                        <div className='basicInfo'>
                                            <h2>{format(fromUnixTime(element.dt), 'PPPP')}</h2>
                                            <img src={this.imagesID[element.weather[0].icon]} alt="" />
                                            <p>{element.temp.min}-{element.temp.max}</p>
                                            <h2>{element.weather[0].description.toUpperCase()}</h2>
                                        </div>
                                        <div className='moreInfo'>
                                            <h2>info</h2>
                                            <p><IconWiSunrise />sunrise: {format(fromUnixTime(element.sunrise), 'hh:mm a')}</p>
                                            <p><IconWiSunset />sunset: {format(fromUnixTime(element.sunset), 'hh:mm a')}</p>
                                            <p><IconSun />temp day: {element.temp.day}</p>
                                            <p><IconMoon />temp night: {element.temp.night}</p>
                                            <p><IconWiHot />uv index: {element.uvi}</p>
                                        </div>


                                    </div>
                                )

                            }
                        } else if (formatDateType == 'hourly') {
                            if (element.uniqid == uniqid) {
                                return (
                                    <div className='moreInfoCard'>
                                        <div className='basicInfo'>
                                            <h2>{format(fromUnixTime(element.dt), 'hh:mm a')}</h2>
                                            <img src={this.imagesID[element.weather[0].icon]} alt="" />
                                            <p>{element.temp}</p>
                                            <h2>{element.weather[0].description.toUpperCase()}</h2>
                                        </div>
                                        <div className='moreInfo'>
                                            <h2>info</h2>
                                            <p><IconWiThermometerExterior />feels like: {element.feels_like}</p>
                                            <p><IconEye />visibility: {element.visibility}</p>
                                            <p><IconWiCloud />atmoshpehric temp: {element.dew_point}</p>
                                            <p><IconWiRain></IconWiRain> precipitation: {element.pop}</p>
                                            <p><IconWiHot />uv index: {element.uvi}</p>
                                        </div>


                                    </div>
                                )

                            }
                        }

                    })
                }

            </div >
        )

    }
}

export default PopupInfo 
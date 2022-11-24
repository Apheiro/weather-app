import React from 'react';
import '../styles/TodayData.css';
import { fromUnixTime, format } from 'date-fns'
import GraphicData from './GraphicData'
import {
    IconWiThermometer, IconSpeedometer,
    IconWiRaindrop, IconWind,
    IconEyeFill, IconWiHot, IconSearch
} from '../assets/imports'
import { motion, AnimatePresence } from 'framer-motion'

class TodayData extends React.Component {
    constructor(props) {
        super(props)
        this.showGraphic = this.showGraphic.bind(this)
        this.removeGraphic = this.removeGraphic.bind(this)
        this.bigger = {
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.1,
                    duration: 0.5,
                    ease: [0.60, -0.67, 0.30, 1.67]
                }
            },
            hidden: {
                opacity: 0,
                scale: 1.3,
                transition: {
                    when: "afterChildren",
                }
            }
        }
        this.smaller = {
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.75,
                    ease: [0.60, -0.67, 0.30, 1.67]
                }
            },
            hidden: {
                opacity: 0,
                scale: 0.3,
            }
        }
        this.themeGraph = {
            "textColor": "#333333",
            "fontSize": 11,
            "axis": {
                "domain": {
                    "line": {
                        "stroke": "#ffffff",
                        "strokeWidth": 1
                    }
                },
                "legend": {
                    "text": {
                        "fontSize": 12,
                        "fill": "#ffffff"
                    }
                },
                "ticks": {
                    "line": {
                        "stroke": "#ffffff",
                        "strokeWidth": 1
                    },
                    "text": {
                        "fontSize": 11,
                        "fill": "#ffffff"
                    }
                }
            },
            "grid": {
                "line": {
                    "stroke": "#ffffff",
                    "strokeWidth": 1
                }
            },
            "legends": {
                "title": {
                    "text": {
                        "fontSize": 11,
                        "fill": "#333333"
                    }
                },
                "text": {
                    "fontSize": 11,
                    "fill": "#333333"
                },
                "ticks": {
                    "line": {},
                    "text": {
                        "fontSize": 10,
                        "fill": "#333333"
                    }
                }
            },
            "annotations": {
                "text": {
                    "fontSize": 13,
                    "fill": "#333333",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "link": {
                    "stroke": "#000000",
                    "strokeWidth": 1,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "outline": {
                    "stroke": "#000000",
                    "strokeWidth": 2,
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                },
                "symbol": {
                    "fill": "#000000",
                    "outlineWidth": 2,
                    "outlineColor": "#ffffff",
                    "outlineOpacity": 1
                }
            },
            "tooltip": {
                "container": {
                    "background": "#5c5c5c",
                    "color": "#ffffff",
                    "fontSize": 15
                },
                "basic": {},
                "chip": {},
                "table": {},
                "tableCell": {},
                "tableCellValue": {}
            }
        }
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
        const hourNow = format(new Date(), 'hh:mm:ss a')
        this.setState({
            hour: hourNow
        })
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
            data.push({ x: format(fromUnixTime(element.dt), ' hh:mmaaa'), y: element[propertyName] })
        });

        this.setState({
            showGraphic: true,
            showGraphicName: e.currentTarget.getAttribute('id'),
            data: [{
                id: e.currentTarget.getAttribute('id'),
                color: "hsl(129, 70%, 50%)",
                data: data
            }],
        })
    }

    render() {
        const { data, getData, setLocation } = this.props

        return (
            <div className='todayData'>
                <AnimatePresence>
                    {this.state.showGraphic ? <GraphicData data={this.state.data} names={this.state.names} showGraphicName={this.state.showGraphicName} removeGraphicFunction={this.removeGraphic} theme={this.themeGraph} /> : null}
                </AnimatePresence>
                <motion.div className='todayCard cardStyle' variants={this.bigger} initial={"hidden"} animate={"visible"} >
                    <motion.div className='todayInfo' variants={this.smaller}>
                        <h3 className='todayLocation'>{data.state}, {data.country}<br />{format(new Date(), 'PPPP')}</h3>
                        <h2 className='todayTemperature'>{data.temp}</h2>
                    </motion.div>
                    <motion.img src={data.weatherImage} alt="moon1" variants={this.smaller} />
                    <motion.h1 className='todayWeather' variants={this.smaller}>{data.description}</motion.h1>
                </motion.div>
                <form className='searchFromCard' action="" onSubmit={getData}>
                    <input type="search" placeholder='Search your city' name="" id="inputForm" onChange={setLocation} />
                    <button type="submit"><IconSearch width="100%" height="100%" /></button>
                </form>
                <motion.div className='info' variants={this.bigger} initial={"hidden"} animate={"visible"} >

                    <motion.div className='hour cardStyle' variants={this.bigger}>
                        <h2 variants={this.smaller} >{this.state.hour}</h2>
                    </motion.div>

                    <div className='infoGrid'>
                        <motion.div className='cardStyle cardInfoText' id='visibility' onClick={this.showGraphic} variants={this.bigger}>
                            <p>{`${data.visibility}`.slice(0, 1)} km</p>
                            <IconEyeFill className='iconsInfo' />
                            <p>Visibility</p>
                        </motion.div>
                        <motion.div className='cardStyle cardInfoText' id='humidity' onClick={this.showGraphic} variants={this.bigger} >
                            <p variants={this.smaller}>{data.humidity}%</p>
                            <IconWiRaindrop className='iconsInfo' />
                            <p variants={this.smaller}>Humidity</p>
                        </motion.div>
                        <motion.div className='cardStyle cardInfoText' id='wind_speed' onClick={this.showGraphic} variants={this.bigger} >
                            <p>{data.wind_speed}</p>
                            <IconWind className='iconsInfo' />
                            <p>Wind speed</p>
                        </motion.div>
                        <motion.div className='cardStyle cardInfoText' id='feels_like' onClick={this.showGraphic} variants={this.bigger}>
                            <p>{data.feels_like}</p>
                            <IconWiThermometer className='iconsInfo' />
                            <p>Feels like</p>
                        </motion.div>
                        <motion.div className='cardStyle cardInfoText' id='pressure' onClick={this.showGraphic} variants={this.bigger} >
                            <p>{data.pressure} hPa</p>
                            <IconSpeedometer className='iconsInfo' />
                            <p>Pressure</p>
                        </motion.div>
                        <motion.div className='cardStyle cardInfoText' id='uvi' onClick={this.showGraphic} variants={this.bigger}>
                            <p>{data.uvi}</p>
                            <IconWiHot className='iconsInfo' />
                            <p>UV index</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    };
};

export default TodayData; 
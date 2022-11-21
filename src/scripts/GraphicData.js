import react from 'react'
import '../styles/GraphicData.css'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import {
    IconWiHot,
    IconWiSunrise, IconWiSunset,
    IconMoon, IconSun, IconWiRain, IconWiCloud,
    IconEye, IconWiThermometerExterior
} from '../assets/imports'

class GraphicData extends react.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { removeGraphicFunction, showGraphicName, names, data } = this.props
        return (
            < div className='graphicContainer' onClick={removeGraphicFunction}>
                <div className='graphicContainerCard'>
                    <h2>{names[showGraphicName]}: Last 48 hours</h2>
                    <AreaChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="transparent" strokeDasharray="5 5" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'black', background: 'black' }} />

                        <Area type="monotone" dataKey="temp" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </div>

            </div >
        )

    }
}

export default GraphicData 
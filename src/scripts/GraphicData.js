import react from 'react'
import '../styles/GraphicData.css'
import { linearGradientDef } from '@nivo/core'
import { ResponsiveLine } from '@nivo/line'
import { motion } from 'framer-motion'
class GraphicData extends react.Component {
    constructor(props) {
        super(props)
        this.initial = {
            scale: 0.6,
            opacity: 0,
        }
        this.enter = {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.60, -0.67, 0.30, 1.67]
            }
        }
        this.exit = {
            scale: 0.6,
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: [0.60, -0.67, 0.30, 1.67]
            }
        }
    }

    render() {
        const { removeGraphicFunction, showGraphicName, names, data, theme } = this.props
        return (
            < motion.div key='graphicData' className='graphicContainer' onClick={removeGraphicFunction} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className='graphicContainerCard' initial={this.initial} animate={this.enter} exit={this.exit}>
                    <ResponsiveLine
                        data={data}
                        theme={theme}
                        margin={{ top: 30, right: 50, bottom: 70, left: 50 }}
                        xScale={{
                            type: 'point',
                        }}
                        yScale={{
                            type: 'linear',
                            // min: 'auto',
                            // max: 'auto',
                            stacked: true,
                            reverse: false
                        }}
                        yFormat=" >-.2f"
                        curve="monotoneX"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            legend: `${names[showGraphicName]}: next 24 hours`,
                            legendPosition: 'middle',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 90,
                            legendOffset: 65,
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={6}
                        pointBorderWidth={2}
                        pointLabelYOffset={-16}
                        enableArea={true}
                        areaOpacity={0.3}
                        useMesh={true}

                        defs={[
                            linearGradientDef('gradientA', [
                                { offset: 0, color: 'inherit' },
                                { offset: 100, color: 'inherit', opacity: 0 },
                            ]),
                        ]}
                        fill={[{ match: '*', id: 'gradientA' }]}
                    />
                </motion.div>
            </motion.div >
        )

    }
}

export default GraphicData 
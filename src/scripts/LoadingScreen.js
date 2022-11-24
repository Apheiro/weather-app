import react from 'react';
import '../styles/LoadingScreen.css'
import ReactLoading from 'react-loading';
import { motion } from 'framer-motion'


class LoadingScreen extends react.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <motion.div className='LoadingScreen' intial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ReactLoading type={'spin'} color={'#ffff'} height={50} width={50} />
            </motion.div>
        )

    }
}

export default LoadingScreen
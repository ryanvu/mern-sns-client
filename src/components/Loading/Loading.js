import React from 'react'
import './Loading.scss';
import { motion } from 'framer-motion';
const Loading = () => {
    return (
        <motion.div
        style={{originX: "center", originY:"center"}} 
        animate={{rotate: "360deg"}}
        transition={{repeat: Infinity, duration: 2}}
        className="loading">
            <div className="loading__ball loading__ball1"><div className="loading__object"/></div>
            <div className="loading__ball loading__ball2"><div className="loading__object"/></div>
            <div className="loading__ball loading__ball3"><div className="loading__object"/></div>
            <div className="loading__ball loading__ball4"><div className="loading__object"/></div>
            <div className="loading__ball loading__ball5"><div className="loading__object"/></div>
        </motion.div>
    )
}

export default Loading

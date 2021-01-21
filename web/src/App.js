import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import Header from './Header.js'
import Lights from './Lights.js'
import Thermostat from './Thermostat.js'

import './App.css'

const useStyles = makeStyles(theme => ({
    bodyWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    body: {
        maxWidth: '100%',
        width: 850,
        margin: '0 auto',
        // flexGrow: 1,
    },
}))

function App() {
    const classes = useStyles()

    return (
        <div className="App">
            <Header />
            <div className={classes.body}>
                <Lights />
                <Thermostat />
            </div>
        </div>
    )
}

export default App

import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    thermostat: {
        margin: 40,
    },
    slider: {
        height: 300,
        maxWidth: 345,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    temperature: {
        marginLeft: 50,
        fontSize: 150,
        minWidth: 100,
    },
})

function Thermostat() {
    const route = '/thermostat'
    const classes = useStyles()
    const [thermostat, setThermostat] = useState({ target_temperature: 72 })

    useEffect(() => {
        fetch(route)
            .then(res => res.json())
            .then(data => {
                console.log('data', data)

                setThermostat(data)
            })
    }, [])

    // update ui if user drags temperature
    const handleTempChange = (event, value) => {
        console.log(event)
        setThermostat({
            ...thermostat,
            target_temperature: value,
        })
    }

    // send update if user settles on a temperature
    const handleTempSubmit = (_, value) => {
        console.log(value)
        fetch(route, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                target_temperature: value,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                setThermostat(data)
            })
    }

    const valueText = value => {
        return `${value}°F`
    }

    return (
        <div className={classes.root}>
            <div className={classes.thermostat}>
                <div className={classes.slider}>
                    <Slider
                        value={thermostat.target_temperature}
                        min={50}
                        max={90}
                        orientation="vertical"
                        getAriaValueText={valueText}
                        aria-labelledby="vertical-slider"
                        onChange={handleTempChange}
                        onChangeCommitted={handleTempSubmit}
                    />
                    <div className={classes.temperature}>
                        {valueText(thermostat.target_temperature)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Thermostat

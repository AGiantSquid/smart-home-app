import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import Header from './Header.js'
import Lights from './Lights.js'

import './App.css';

const useStyles = makeStyles(theme => ({
    root: {
      height: 300,
    },
  }));

function App() {
    const classes = useStyles();
  const [lights, setLights] = useState([]);
  const [thermostat, setThermostat] = useState({});

  useEffect(() => {
    fetch('/lights').then(res => res.json()).then(data => {
        console.log('data', data);

      setLights(data.lights);
    });
    fetch('/thermostat').then(res => res.json()).then(data => {
        console.log('data', data);

      setThermostat(data.thermostat);
    });
  }, []);

  const handleTempChange = (event, value) => {
    setThermostat({
        ...thermostat,
        target_temperature: value,
    });
      console.log(value)
  }

  const valueText = (value) => {
    return `${value}°C`;
  }

  return (
      <div className="App">
        <Header />
        <Lights />
        <Typography id="discrete-slider-always" gutterBottom>
            Thermostat
        </Typography>
        <div className={classes.root}>

            <Slider
                orientation="vertical"
                getAriaValueText={valueText}

                // defaultValue={thermostat.target_temperature}
                aria-labelledby="vertical-slider"
                onChange={handleTempChange}
            />
        </div>
        <span>{thermostat.target_temperature}</span>
    </div>
  );
}

export default App;

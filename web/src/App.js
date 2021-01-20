import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

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

  const handleChange = (event) => {
      console.log(event.target.name)
  };

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
        <ul>
        {
            lights.map(light => (
                <li key={light.id}>
                    <Switch
                        checked={light.status}
                        onChange={handleChange}
                        name={light.id}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <span>name: {light.name}</span>
                </li>
            ))
        }
        </ul>
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

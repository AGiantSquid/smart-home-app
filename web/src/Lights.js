import React, { useState, useEffect } from 'react';

import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function handleLightSwitch(event) {
    console.log(event.target.name)
};

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

function Lights() {
    const classes = useStyles();
    const [lights, setLights] = useState([]);

    useEffect(() => {
        fetch('/lights').then(res => res.json()).then(data => {
            console.log('data', data);

          setLights(data.lights);
        });
      }, []);


    return (
    lights.map(light => (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {light.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Switch
              checked={light.status}
              onChange={handleLightSwitch}
              name={light.id}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
        </Card>
    )))
}


export default Lights;

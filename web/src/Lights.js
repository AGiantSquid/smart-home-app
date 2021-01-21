import React, { useState, useEffect } from 'react'

import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        margin: 20,
        width: 200,
        minWidth: 200,
    },
    media: {
        height: 140,
    },
    lightIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    lightOn: {
        fontSize: 150,
        color: '#f50057',
        // backgroundColor: 'black',
    },
    lightOff: {
        fontSize: 100,
        color: 'black',
        background: 'white',
    },
})

function Lights() {
    const classes = useStyles()
    const [lights, setLights] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        fetch('/lights')
            .then(res => res.json())
            .then(data => {
                console.log('data', data)

                setLights(data.lights)
            })
    }, [])

    const handleChange = event => {
        console.log(event)
        setName(event.target.value)
    }

    const handleAdd = () => {
        setLights(
            lights.concat({
                id: '',
                name: name,
                status: 0,
            }),
        )
        setName('')
    }

    const handleLightSwitch = event => {
        const lightId = event.currentTarget.name
        const filteredLights = lights.reduce((accum, x) => {
            if (x.id == lightId) {
                x.status = !x.status
            }
            return accum.concat(x)
        }, [])

        setLights(filteredLights)
    }

    return (
        <div className={classes.root}>
            {lights.map(light => (
                <Card className={classes.card} key={light.id}>
                    <CardActionArea onClick={handleLightSwitch} name={light.id}>
                        <div className={classes.lightIcon}>
                            <EmojiObjectsIcon
                                className={
                                    light.status
                                        ? classes.lightOn
                                        : classes.lightOff
                                }
                            />
                        </div>
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {light.name}
                            </Typography>
                        </CardContent>
                        <Switch
                            checked={light.status}
                            // onChange={handleLightSwitch}
                            name={light.id}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </CardActionArea>
                </Card>
            ))}
            <div>
                <input type="text" onChange={handleChange} />
                <button type="button" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default Lights

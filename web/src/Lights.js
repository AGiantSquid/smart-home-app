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

function handleLightSwitch(event) {
    console.log(event.target.name)
}

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
    light: {
        fontSize: 150,
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

    return (
        <div className={classes.root}>
            {lights.map(light => (
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <EmojiObjectsIcon className={classes.light} />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
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

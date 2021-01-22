import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    title: {
        textAlign: 'center',
        padding: 40,
    },
    card: {
        flexGrow: 0,
        margin: 20,
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
    lightInput: {
        // minHeight: 260,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
})

function Lights() {
    const route = '/lights/'
    const classes = useStyles()
    const [lights, setLights] = useState({})
    const [name, setName] = useState('')

    useEffect(() => {
        fetch(route)
            .then(res => res.json())
            .then(data => {
                console.log('data', data)

                setLights(data)
            })
    }, [])

    const handleChange = event => {
        setName(event.target.value)
    }

    const handleAdd = () => {
        if (name === '') {
            return
        }
        fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: 0,
                name: name,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                setLights({
                    ...lights,
                    ...data,
                })
                setName('')
            })
    }

    const handleLightSwitch = event => {
        const lightId = event.currentTarget.id

        const newValue = {
            ...lights[lightId],
            status: !lights[lightId].status,
        }
        fetch(route + lightId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newValue),
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                setLights({
                    ...lights,
                    ...data,
                })
            })
    }

    const deleteLight = event => {
        console.log(event)
        const lightId = event.currentTarget.id

        fetch(route + lightId, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data)
                setLights(data)
            })
    }

    return (
        <>
            <div className={classes.lightInput}>
                <TextField
                    value={name}
                    label="Enter Light Name"
                    onChange={handleChange}
                />
                <Button
                    disabled={name === ''}
                    color="primary"
                    variant="contained"
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </div>
            <div className={classes.root}>
                {Object.entries(lights).map(([id, light]) => (
                    <Card className={classes.card} key={id}>
                        <CardActionArea onClick={handleLightSwitch} id={id}>
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
                        </CardActionArea>
                        <Button onClick={deleteLight} id={id}>
                            <DeleteTwoToneIcon />
                        </Button>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Lights

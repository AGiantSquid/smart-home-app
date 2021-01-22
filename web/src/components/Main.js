import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Routes from '../Routes'

import { Toolbar } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    content: {
        margin: '0 280px',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

function Main() {
    const classes = useStyles()

    return (
        <main className={classes.content}>
            <Toolbar />
            <Switch>
                {Routes.map(route => (
                    <Route exact path={route.path} key={route.label}>
                        <route.component />
                    </Route>
                ))}
            </Switch>
        </main>
    )
}

export default Main

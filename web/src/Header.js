import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
        height: 50,
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}))

function Header() {
    const classes = useStyles()

    const title = 'Home Controller'

    return (
        <AppBar position="static" title={title} className={classes.root}>
            <Typography variant="h6" className={classes.title}>
                {title}
            </Typography>
        </AppBar>
    )
}

export default Header

import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: '#222',
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
}))

function Header() {
    const classes = useStyles()

    const title = 'Home Controller'

    return (
        <AppBar position="fixed" title={title} className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header

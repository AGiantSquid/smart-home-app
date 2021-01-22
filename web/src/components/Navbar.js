import React from 'react'

import { NavLink, withRouter } from 'react-router-dom'

import {
    Toolbar,
    ListItemText,
    ListItemIcon,
    MenuList,
    MenuItem,
} from '@material-ui/core'

import Routes from '../Routes'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

const drawerWidth = 280

const useStyles = makeStyles(theme => ({
    listItem: {},
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}))

function Navbar(props) {
    const classes = useStyles()

    const activeRoute = routeName => {
        return props.location.pathname === routeName
    }

    return (
        <>
            <Drawer
                variant="permanent"
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
            >
                <Toolbar />
                <MenuList>
                    {Routes.map(route => (
                        <NavLink
                            to={route.path}
                            style={{ textDecoration: 'none' }}
                            key={route.label}
                        >
                            <MenuItem button selected={activeRoute(route.path)}>
                                <ListItemIcon className={classes.listItem}>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText
                                    className={classes.listItem}
                                    primary={route.label}
                                ></ListItemText>
                            </MenuItem>
                        </NavLink>
                    ))}
                </MenuList>
            </Drawer>
        </>
    )
}

export default withRouter(Navbar)

import React from 'react'

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import Lights from './components/Lights'
import Thermostat from './components/Thermostat'
import AcUnitIcon from '@material-ui/icons/AcUnit'

const Routes = [
    {
        icon: <EmojiObjectsIcon />,
        label: 'Lights',
        path: '/',
        component: Lights,
    },
    {
        icon: <AcUnitIcon />,
        label: 'Thermostat',
        path: '/thermostat',
        component: Thermostat,
    },
]

export default Routes

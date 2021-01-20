import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
// import IconButton from 'material-ui/IconButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


function Header() {
    const classes = useStyles();

    const title = "Smart Home App";

    return(
      <div>
       <AppBar
       position="static"
            title={title}
            className="appbar"
        >
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </AppBar>
        {/* <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >

        </Drawer> */}
        </div>
    )
}

export default Header;

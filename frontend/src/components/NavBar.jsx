import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  toolbarButtons: {
    marginLeft: "auto"
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const { loggedIn } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.logo}
            color="inherit"
            aria-label="home"
            href="/"
          >
            LOGO
          </IconButton>
          <div className={classes.toolbarButtons}>
            <Link href="/about" color="inherit">
              About Us
            </Link>
            {loggedIn && <Button color="inherit">Log Out</Button>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

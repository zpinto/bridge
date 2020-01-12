import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Warning from "./Warning";
import Idm from "../services/Idm";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  login: {
    border: 1
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = props => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const { handleLogin } = props;

  function handleSubmit(e) {
    e.preventDefault();
    Idm.login(email, password)
      .then(response => {
        console.log(response);
        const { access_token, refresh_token } = response.data;
        handleLogin(email, access_token, refresh_token);
      })
      .catch(error => {
        console.log(error);
        setWarning("Invalid username or password.");
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box p="1rem">
          <Typography component="h1" variant="h1">
            Bridge
          </Typography>
          <Typography component="h1" variant="h4">
            A Peer-Review Resume Site
          </Typography>
        </Box>
        <Box border={1} borderRadius={10} p="1rem">
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {warning ? <Warning message={warning} /> : null}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Click to register.
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </Container>
  );
};

export default Login;

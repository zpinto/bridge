import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

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

function Submission() {
    const classes = useStyles();
  return (
    <Container component="main" fullWidth>
      <CssBaseline />
      <div className={classes.paper}>
       <Typography component="h1" variant="h2">
           Attach Resume below to submit application!
       </Typography>
       <p></p>
       <Button
        variant="contained"
        component="label"
        >
        Upload Resume
        <input
            type="file"
            style={{ display: "none" }}
        />
        </Button>
        <p></p>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Sumbit Application
        </Button>
      </div>
    </Container>
  );
};

export default function Submission();
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Applicant from "../services/Applicant";

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

function Submission(props) {
  const classes = useStyles();

  const { title, job_post_id } = props.location.state;

  function handleSubmit() {
    Applicant.apply(1, job_post_id)
      .then(response => {
        console.log(response);
        window.location.replace("/");
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h2">
          Attach Resume below to submit for {title}!
        </Typography>
        <p></p>
        <Button variant="contained" component="label">
          Upload Resume
          <input type="file" style={{ display: "none" }} />
        </Button>
        <p></p>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Submit Application
        </Button>
      </div>
    </Container>
  );
}

export default Submission;

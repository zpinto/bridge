import React from "react";
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
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));


//IGNORE ALL THIS WE ALREADY HAVE ONE


export default function FormPropsTextFields() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const handleChange = event => {
    setChecked(event.target.checked);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h1 >Input information below to register!</h1>
      <div>
        <TextField
          required
          id="Name"
          defaultValue="Enter Your Name..."
          variant="filled"
        />
        <p></p>
        <TextField
          id="password-input"
          label="Enter Password..."
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <p></p>
        <TextField
          id="password-confirmation"
          label="Enter Password Again..."
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <p></p>
        <TextField
          required
          id="Email"
          defaultValue="Enter Your Email..."
          variant="filled"
        />
        <p></p>
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <p></p>
        <Checkbox
        defaultChecked
        color="default"
        value="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
        
      />
      Applicant 
      <Checkbox
        defaultChecked
        color="default"
        value="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      /> Recruiter
      </div>
      
    </form>
  );
}
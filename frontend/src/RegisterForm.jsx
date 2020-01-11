import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

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
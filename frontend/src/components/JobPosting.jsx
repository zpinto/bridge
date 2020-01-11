import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextareaAutosize} from "@material-ui/core";

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

  export default function Login() {
    const classes = useStyles();
  
    return (
      <Container component="main" fullWidth alignItems="left">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography
            component="h1" 
            varient="h1"
            >
                Input Job Information Below:
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="Job Title"
                    label="Job Title"
                    name="Job Title"
                    autoComplete="Job Title"
                    autoFocus
                />
                
                <p></p>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="Job Description"
                    label="Job Description"
                    name="Job Description"
                    autoComplete="Job Description"
                    autoFocus
                />
                <p></p>
                <TextField
                    id="Deadline"
                    label="Deadline"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                > Post Job!
                </Button>
            </form>
        </div>
      </Container>
    );
  }

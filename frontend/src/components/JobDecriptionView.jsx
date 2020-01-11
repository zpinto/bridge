import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";



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
      width: "100%",
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));

export default function JobDescriptionView() {
    const classes = useStyles();
  return (
      <Container component="main" >
        <div className={classes.paper}>
        <Typography component="h1" variant="h1">
            Insert Job Title Here!
        </Typography>
        <p></p>
        <Typography variant="body1" gutterBottom>
        INSERT JOB DESCRIPTION HERE. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
        unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    <p></p>
    <Button 
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
    >
        Apply!
    </Button>
    </div>
    </Container>
  );
}
import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
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
  },
}));

function ApplicantCard(props) {
  const classes = useStyles();
  const { number } = props;

  return (
    <Grid item xs={3}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Applicant Name {number}
          </Typography>
          <Typography variant="body2" component="p">
            Peer score:
          </Typography>
          <Typography variant="body2" component="p" align="left">
            Ready: 90
          </Typography>
          <Typography variant="body2" component="p" align="left">
            Needs work: 9
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

function Applicants() {
  const classes = useStyles();
  let { id } = useParams();

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h2">
        Applicants for {id}
      </Typography>
      <p> </p>
      <Grid container spacing={3}>
        {numbers.map((index, value) => (
          <ApplicantCard key={index} number={value} />
        ))}
      </Grid>
    </div>
  );
}

export default Applicants;

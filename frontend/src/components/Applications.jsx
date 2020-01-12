import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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

function AppCard(props) {
  const classes = useStyles();

  const { number } = props;
  return (
    <Grid item xs={3}>
      <Link href={"apps/" + number} underline="none">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Job Title Here
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Company Name Here
            </Typography>
            <Typography variant="body2" component="p">
              DeadLine Date here
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}

function Applications() {
  const classes = useStyles();
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={classes.root}>
      <p></p>
      <Typography component="h2" variant="h2">
        Live Applications
      </Typography>
      <p> </p>
      <Grid container spacing={3}>
        {numbers.map((index, value) => (
          <AppCard key={index} number={value} />
        ))}
      </Grid>
    </div>
  );
}

export default Applications;

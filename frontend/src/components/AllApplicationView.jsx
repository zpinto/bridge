import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

<<<<<<< HEAD
const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

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
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));
=======

const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  
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
      },
      paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
  }
  });
>>>>>>> not fully functional

export default function AllApplicationView() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
<<<<<<< HEAD

    <div className={classes.root}>
      <p></p>
      <Typography component="h2" variant="h2">Applications you have posted!</Typography>
      <p>  </p>
      <Grid container spacing={3}>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
      </Grid>
    </div>

=======
    <div className={classes.root}>
    <Grid container spacing={3}>
    <Grid item xs={3}>
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
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paper}>xs=6</Paper>
    </Grid> 

    <Grid item xs={3}>
      <Paper className={classes.paper}>xs=6</Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paper}>xs=3</Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paper}>xs=3</Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paper}>xs=3</Paper>
    </Grid>
    <Grid item xs={3}>
      <Paper className={classes.paper}>xs=3</Paper>
    </Grid>
  </Grid>
  </div>
    
>>>>>>> not fully functional
  );
}
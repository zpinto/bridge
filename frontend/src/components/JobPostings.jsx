import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Container from "@material-ui/core/Container";
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
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
  }
}));

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Job Description ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function JobPostings() {
  const classes = useStyles();

  return (
    <Container component="main" fullWidth align="center">
    <div className={classes.root} alignItems="center">
    <Typography component="h1" variant="h1" fullwidth align="center">Jobs Available:</Typography>
      <FixedSizeList height={400} width={300} itemSize={46} itemCount={200} >
        {renderRow}
      </FixedSizeList>
    </div>
    </Container>
  );
}
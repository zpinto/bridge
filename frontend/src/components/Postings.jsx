import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
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

function RenderRow(props) {
  const { value } = props;

  return (
    <ListItem button>
      <ListItemText primary={`Job Description ${value + 1}`} />
    </ListItem>
  );
}

export default function JobPostings(props) {
  const classes = useStyles();

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const count = numbers.length;

  return (
    <Container component="main" fullWidth align="center">
      <Grid container direction="column" alignItems="center">
        <Typography component="h2" variant="h2">
          Jobs Available:
        </Typography>
        <Box border={1}>
          <FixedSizeList
            height={400}
            width={700}
            itemSize={46}
            itemCount={count}
            itemData={numbers}
          >
            {RenderRow}
          </FixedSizeList>
        </Box>
      </Grid>
    </Container>
  );
}

// {numbers.map((index, value) => <RenderRow key={index} value={value} />)}

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import Applicant from "../services/Applicant"

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

function RenderRow({data, index}) {
  return (
    <ListItem button>
      <Link href={`jobs/${index}`} underline="none">
      <ListItemText primary={`Job Description ${data[index] + 1}`}/> 
      </Link>
    </ListItem>
  );
}

function Jobs(props) {
  const [jobs, setJobs] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Applicant.jobPosts()
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <Container component="main" align="center">
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
            itemData={jobs}
          >
            {RenderRow}
          </FixedSizeList>
        </Box>
      </Grid>
    </Container>
  );
}

export default Jobs;
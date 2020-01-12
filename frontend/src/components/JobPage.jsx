import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Applicant from "../services/Applicant";

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

function JobPage() {
  const classes = useStyles();
  let { id } = useParams();

  const [post, setPost] = useState("");

  useEffect(() => {
    Applicant.jobPosts()
      .then(response => {
        console.log(response);
        const { posts } = response.data;
        const post = posts.filter(post => post.post_id === id)[0];

        if (post) setPost(post);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const {
    title,
    job_description,
    company_description,
    job_type
  } = post;

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h2" variant="h2">
          {title} ({job_type})
        </Typography>
        <p></p>
        <Typography variant="body1" gutterBottom>
          COMPANY DESCRIPTION: {company_description}
        </Typography>
        <p></p>
        <Typography variant="body1" gutterBottom>
          JOB DESCRIPTION: {job_description}
        </Typography>
        <p></p>
        <Link
          to={{
            pathname: "/submit",
            state: {
              title: title,
              job_post_id: id
            }
          }}
          underline="none"
        >
          <Button variant="contained" color="inherit">Apply</Button>
        </Link>
      </div>
    </Container>
  );
}

export default JobPage;

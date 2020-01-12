import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import Applicant from "../services/Applicant";

function RenderRow({ data, index }) {
  const { post_id, title } = data[index];

  return (
    <ListItem button>
      <Link href={`jobs/${post_id}`} underline="none">
        <ListItemText color="inherit">{title}</ListItemText>
      </Link>
    </ListItem>
  );
}

function Jobs(props) {
  const [posts, setPosts] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Applicant.jobPosts()
      .then(response => {
        console.log(response);
        const { posts } = response.data;
        setPosts(posts);
        setCount(posts.length);
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
            itemData={posts}
          >
            {RenderRow}
          </FixedSizeList>
        </Box>
      </Grid>
    </Container>
  );
}

export default Jobs;

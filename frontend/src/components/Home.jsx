import React from "react";
import Axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Grid, Button, Typography } from "@material-ui/core";

const HomeButtons = () => {
  const button1 = {
    href: "/portal",
    title: "Apply"
  };

  const button2 = {
    href: "/review",
    title: "Review"
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Button variant="contained" href={button1.href}>
          {button1.title}
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" href={button2.href}>
          {button2.title}
        </Button>
      </Grid>
    </Grid>
  );
};

function HomeContent({ children }) {
  return (
    <Grid container direction="column" spacing={5}>
      {children}
    </Grid>
  );
}

function HomeTitle(props) {
  const { type } = props;
  return (
    <Grid item>
      <Typography component="h1" variant="h3">
        {type === "applicant"
          ? "Your Application Status"
          : "Application Breakdown"}
      </Typography>
    </Grid>
  );
}

function ApplicantContent(props) {
  const { email } = props;
  return <Grid item>hello app</Grid>;
}

function RecruiterContent(props) {
  const { email } = props;
  return <Grid item>hello rec</Grid>;
}

const Home = () => {
  const { common } = Axios.defaults.headers;
  const { email } = common;

  return (
    <Container>
      <CssBaseline />
      <Typography component="h1" variant="h4" p={3}>
        Welcome!
      </Typography>
      <HomeButtons />
      <HomeContent>
        <HomeTitle type={type} />
        {type === "applicant" ? (
          <ApplicantContent email={email} />
        ) : (
          <RecruiterContent email={email} />
        )}
      </HomeContent>
    </Container>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";

import Idm from "../services/Idm";
import Applicant from "../services/Applicant";
import Recruiter from "../services/Recruiter";
import Applicant from "../services/Applicant";

const HomeButtons = props => {
  const { type } = props;

  const isApp = type === "applicant";

  const button1 = {
    href: isApp ? "/jobs" : "/post",
    title: isApp ? "Apply" : "Post Job"
  };

  const button2 = {
    href: isApp ? "/review" : "/apps",
    title: isApp ? "Review" : "Applications"
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
        {type === "applicant" ? "Your Applications" : "Applications Breakdown"}
      </Typography>
    </Grid>
  );
}

function AppCard(props) {
  const { data } = props;

  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Application #{data}
          </Typography>
          <Typography variant="body2" component="p">
            Company
          </Typography>
          <Typography variant="body2" component="p" align="left">
            Submission Status
          </Typography>
          <Typography variant="body2" component="p" align="left">
            Review Status
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

function ApplicantContent() {
  const [apps, setApps] = useState(null);

  function getApps() {
    Applicant.myAppList()
      .then(response => {
        console.log(response);
        const { applications } = response.data;
        setApps(applications);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(getApps, []);

  return (
    <div>
      {apps ? (
        apps.length > 0 ? (
          <Grid container spacing={3}>
            {apps.map((index, data) => (
              <AppCard key={index} data={data} />
            ))}
          </Grid>
        ) : (
          <Typography>No applications yet. Go apply!</Typography>
        )
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
}

function RecruiterContent(props) {
  const [jobCount, setJobCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);
  const { email } = props;

  Recruiter.recruitersPosts()
    .then(response => {
      const { posts } = response.data;

      setJobCount(posts.size());

      Object.keys(posts).forEach(key => {
        Recruiter.applicantList(key)
          .then(response => {
            setApplicationCount(applicationCount + response.data.size());
          })
          .catch(error => {
            console.log(error);
          });
      });
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div>
      <Typography component="h2" variant="h4" align="left">
        Jobs Posted: {jobCount}
      </Typography>
      <Typography component="h2" variant="h4" align="left">
        Total Applications: {applicationCount}
      </Typography>
    </div>
  );
}

const Home = () => {
  const { common } = Axios.defaults.headers;
  const { email } = common;

  const [type, setType] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  Idm.user(email)
    .then(response => {
      const { user_type, first_name, last_name } = response.data;
      setFirstName(first_name);
      setLastName(last_name);
      setType(user_type);
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <Container>
      <CssBaseline />
      {type ? (
        <div>
          <Grid
            container
            direction="column"
            spacing={3}
            alignItems="center"
            justify="center"
          >
            <Grid item p={3}>
              <Typography component="h2" variant="h2">
                Welcome, {first_name} {last_name}!
              </Typography>
            </Grid>
            <Grid item>
              <HomeButtons type={type} />
            </Grid>
            <Grid item>
              <HomeContent>
                <HomeTitle type={type} />
                {type === "applicant" ? (
                  <ApplicantContent />
                ) : (
                  <RecruiterContent email={email} />
                )}
              </HomeContent>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Typography component="h1" variant="h4" p={3}>
          Loading...
        </Typography>
      )}
    </Container>
  );
};

export default Home;

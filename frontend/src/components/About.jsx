import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const About = () => {
  return (
    <Container>
      <CssBaseline />
      <Typography component="h2" variant="h2">
        Welcome to Bridge!
      </Typography>
      <p></p>
      <Typography component="h2" variant="h5" align="center">
        Bridge is a peer review based job application portal made for both
        applicants and recruiters!
      </Typography>
      <p></p>
      <Typography component="h1" variant="h5" align="left">
        For job applicants, the service is simple as browsing through jobs
        available and dropping a resume. Then, after applicants are urged to
        evaluate resumes of other applicants to see if they are good fits for
        positions they are applying for. If a user leaves a positive review for
        peer and they get an interview with their company the reviewer will
        receive points! Points are accumulated with the intention of helping
        showcase industry understanding and create constructive communities for
        job applicants.
      </Typography>
      <p></p>
      <Typography component="h1" variant="h5" align="left">
        For recruiters, applicantions are able to be pre-evaluated by industry
        members before they have to review the applicants. With a presort based
        on resume quality they can parse through and find more qualified
        candidates faster! Furthermore, this method combats automated resume
        screeners and allows for human review for all applicants!
      </Typography>
      <p></p>

      <Typography component="h1" variant="h3">
        Meet the Team!
      </Typography>
      <Link
        component="h1"
        variant="h5"
        target="_blank"
        rel="noopener"
        to="https://github.com/jp-nguyen"
      >
        JP Nguyen
      </Link>
      <Link
        component="h1"
        variant="h5"
        target="_blank"
        rel="noopener"
        to="https://github.com/bluecard7"
      >
        Paul Yang
      </Link>
      <Link
        component="h1"
        variant="h5"
        target="_blank"
        rel="noopener"
        to="https://github.com/zpinto"
      >
        Zach Pinto
      </Link>
      <Link
        component="h1"
        variant="h5"
        target="_blank"
        rel="noopener"
        to="https://github.com/kalamd"
      >
        Daania Kalam
      </Link>
    </Container>
  );
};

export default About;

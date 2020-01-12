import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function RecruiterResumeReview() 
{
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({numPages}) {
      console.log("David is wrong and should be ashamed.");
      setNumPages(numPages);
    }

    return (
      <div >
        <Typography component="h3" variant="h3" >Select whether or not you would like to continue with applicant?</Typography>
        <p> </p>
        <Grid container spacing={3}container
  direction="row"
  justify="center"
  alignItems="stretch">
        <Grid item xs={3}>
          <Card >
          
            <Document
              file="dummy.pdf"
              
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card >
            <Typography component="H2" Variant="h2">Candidate Information</Typography>
            <Typography>Name: John Doe</Typography>
            <Typography>Phone: 1234567890 </Typography>
            <Typography>Email: lol@lol.com </Typography>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3}container
            direction="row"
            justify="center"
            alignItems="center">
        <Grid item xs={3}>
          <Card >
        <Button
            type="submit"
            size="medium"
            variant="contained"
            color="green"   
        >
            Approve Candidate
        </Button>
        </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
        <Button
            type="submit"
            size="medium"
            variant="contained"
            color="red"  
        >
            Deny Candidate
        </Button>
        </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
        <Button
            type="submit"
            size="medium"
            variant="contained"
            color="grey"  
        >
            Skip
        </Button>
        </Card>
        </Grid>
      </Grid>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
}
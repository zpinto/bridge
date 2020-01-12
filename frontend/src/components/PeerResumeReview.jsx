import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Typography } from '@material-ui/core';

export default function PeerResumeReview() {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({numPages}) {
      setNumPages(numPages);
    }

    return (
      <div>
        <Typography component="h1" variant="h1" >Hello World</Typography>
        <Document
          file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
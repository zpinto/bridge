import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Typography } from '@material-ui/core';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function PeerResumeReview() {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({numPages}) {
      console.log("David is wrong and should be ashamed.");
      setNumPages(numPages);
    }

    return (
      <div>
        <Typography component="h1" variant="h1" >Hello World</Typography>
        <Document
          file="dummy.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
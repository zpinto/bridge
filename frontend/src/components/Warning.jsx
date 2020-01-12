import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const Warning = props => {
    const { message } = props;
    return(
        <Box borderRadius={10} p="0.2rem" color="white" bgcolor="red">
          <Typography component="h1" variant="h5" color="inherit">
            {message}
          </Typography>
        </Box>
    )
}

export default Warning;
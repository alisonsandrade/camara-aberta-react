import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

function MyLinearProgress() {
  return (
    <Box component="div" sx={{ width: "100%", m: "1rem" }}>
      <LinearProgress />
      <Typography variant="caption" component="span">
        Aguarde...
      </Typography>
    </Box>
  );
}

export default MyLinearProgress;

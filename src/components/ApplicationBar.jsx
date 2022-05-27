/* eslint-disable react/prop-types */
import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function ApplicationBar({ title, children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

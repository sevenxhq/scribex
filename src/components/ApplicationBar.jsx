/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { AppContext } from "../hooks/App.context";

export default function ApplicationBar({ children }) {
  const { state: { title } } = useContext(AppContext);

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

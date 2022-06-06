/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

export default function ApplicationBar({ children }) {
  const { state: { title } } = useContext(AppContext);
  useLifecycleLog(ApplicationBar);

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

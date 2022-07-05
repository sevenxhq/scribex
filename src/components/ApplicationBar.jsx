/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AppContext } from "../hooks/App.context";
import useLifecycleLog from "../hooks/useLifecycleLog";

export default function ApplicationBar({ children }) {
  const {
    state: { title },
  } = useContext(AppContext);
  useLifecycleLog(ApplicationBar);

  return <>{children}</>;
}
